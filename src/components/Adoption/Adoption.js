import { useState, useEffect } from 'react';
import styled from 'styled-components';
import faker from 'faker';
import Wrapper from '../Wrapper/Wrapper';
import { API_URL } from '../../config';
import { useInterval } from 'react-interval-hook';

const Adoption = () => {
  const [dog, setDog] = useState(null);
  const [cat, setCat] = useState(null);
  const [people, setPeople] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [inLine, setInline] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { start, stop } = useInterval(
    async () => {
      try {
        const res = await fetch(`${API_URL}/people`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: faker.name.findName() })
        });
        const data = await res.json();
        setPeople([...people, data.name]);
      } catch (err) {
        console.log(err);
      }
    },
    5000,
    {
      autoStart: false,
      immediate: false
    }
  );

  useEffect(() => {
    const getPets = async () => {
      try {
        const res = await fetch(`${API_URL}/pets`);
        const { dog, cat } = await res.json();

        setDog(dog);
        return setCat(cat);
      } catch (err) {
        console.log(err);
      }
    };

    getPets();
    getPeople();
  }, []);

  useEffect(() => {
    if (people && people.length === 5) {
      return stop();
    }

    if (people && people[0] === currentUser) {
      start();
      return clearInterval(intervalId);
    }
  }, [intervalId, currentUser, people, start, stop]);

  const getPeople = async () => {
    try {
      const res = await fetch(`${API_URL}/people`);
      const { people } = await res.json();

      return setPeople(people);
    } catch (err) {
      console.log(err);
    }
  };

  const removePet = async (type) => {
    try {
      const res = await fetch(`${API_URL}/pets/${type}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json'
        }
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleDogAdoption = async (user) => {
    const { success } = await removePet('dog');

    if (!success) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/pets`);
      const { dog } = await res.json();
      await getPeople();

      if (user) {
        alert('You successfully adopted a dog!');
        setInline(false);
        setCurrentUser('');
      }

      return setDog(dog);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCatAdoption = async (user) => {
    const { success } = await removePet('cat');

    if (!success) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/pets`);
      const { cat } = await res.json();
      await getPeople();

      if (user) {
        alert('You successfully adopted a cat!');
        setInline(false);
        setCurrentUser('');
      }

      return setCat(cat);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser.trim().length) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/people`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: currentUser })
      });
      const data = await res.json();
      setPeople([...people, data.name]);
      setInline(true);
      console.log('running');

      setIntervalId(
        setInterval(function () {
          handleCatAdoption();
        }, 5000)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return dog && cat && people ? (
    <Wrapper>
      <StyledMain>
        <h1>Adoption</h1>

        <div className='adopt-dog'>
          <h2>Adopt a Dog</h2>
          <div className='dog-details'>
            <img src={dog.imageURL} alt='Dog' />
            <p>Age: {dog.age}</p>
            <p>Breed: {dog.breed}</p>
            <p>Description: {dog.description}</p>
            <p>Gender: {dog.gender}</p>
            <p>Name: {dog.name}</p>
            <p>Story: {dog.story}</p>
          </div>
          {people && people[0] === currentUser ? (
            <button onClick={() => handleDogAdoption(true)}>Adopt</button>
          ) : null}
        </div>

        <div className='adopt-cat'>
          <h2>Adopt a Cat</h2>
          <div className='cat-details'>
            <img src={cat.imageURL} alt='Cat' />
            <p>Age: {cat.age}</p>
            <p>Breed: {cat.breed}</p>
            <p>Description: {cat.description}</p>
            <p>Gender: {cat.gender}</p>
            <p>Name: {cat.name}</p>
            <p>Story: {cat.story}</p>
          </div>
          {people && people[0] === currentUser ? (
            <button onClick={() => handleCatAdoption(true)}>Adopt</button>
          ) : null}
        </div>

        <h2>Line</h2>
        <div className='line'>
          {people.map((person, idx) => (
            <div key={idx}>{person}</div>
          ))}
        </div>
        {!inLine ? (
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              onChange={(e) => setCurrentUser(e.target.value)}
            />
            <button type='submit'>Join Q</button>
          </form>
        ) : (
          <p>You're currently in line!</p>
        )}
      </StyledMain>
    </Wrapper>
  ) : null;
};

const StyledMain = styled.main`
  .line {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1.6rem;
    width: 100%;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      background: yellow;
      height: 10rem;

      :first-child {
        background: green;
      }
    }
  }
`;

export default Adoption;

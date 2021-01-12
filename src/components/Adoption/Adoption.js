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

  const handleRandomAdoption = async (user) => {
    const choices = ['cat', 'dog'];
    const choice = choices[Math.floor(Math.random() * choices.length)];

    const { success } = await removePet(choice);

    if (!success) {
      return;
    }

    if (choice === 'cat') {
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
    } else if (choice === 'dog') {
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
          handleRandomAdoption();
        }, 5000)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return dog && cat && people ? (
    <Wrapper>
      <StyledMain>
        <h1 className='title'>Adoption</h1>
        <div className='adopt'>
          <div className='adopt-pet'>
            <div className='pet-details'>
              <img src={dog.imageURL} alt='Dog' />
              <p>
                <span>Age:</span> {dog.age}
              </p>
              <p>
                <span>Breed:</span> {dog.breed}
              </p>
              <p>
                <span>Description:</span> {dog.description}
              </p>
              <p>
                <span>Gender:</span> {dog.gender}
              </p>
              <p>
                <span>Name:</span> {dog.name}
              </p>
              <p>
                <span>Story:</span> {dog.story}
              </p>
            </div>
            {people && people[0] === currentUser ? (
              <button
                className='adopt-btn'
                onClick={() => handleDogAdoption(true)}
              >
                Adopt Me!
              </button>
            ) : null}
          </div>
          <div className='adopt-pet'>
            <div className='pet-details'>
              <img src={cat.imageURL} alt='Cat' />
              <p>
                <span>Age:</span> {cat.age}
              </p>
              <p>
                <span>Breed:</span> {cat.breed}
              </p>
              <p>
                <span>Description:</span> {cat.description}
              </p>
              <p>
                <span>Gender:</span> {cat.gender}
              </p>
              <p>
                <span>Name:</span> {cat.name}
              </p>
              <p>
                <span>Story:</span> {cat.story}
              </p>
            </div>
            {people && people[0] === currentUser ? (
              <button
                className='adopt-btn'
                onClick={() => handleCatAdoption(true)}
              >
                Adopt Me!
              </button>
            ) : null}
          </div>
        </div>

        <h2 className='line-title'>Line</h2>
        {!inLine ? (
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              onChange={(e) => setCurrentUser(e.target.value)}
              placeholder='enter your name'
            />
            <button type='submit'>Join Queue</button>
          </form>
        ) : (
          <p>You're currently in line!</p>
        )}
        <div className='line'>
          {people.map((person, idx) => (
            <div key={idx}>{person}</div>
          ))}
        </div>
      </StyledMain>
    </Wrapper>
  ) : null;
};

const StyledMain = styled.main`
  .title {
    margin: 3.2rem 0;
  }

  .line-title {
    margin: 2.4rem 0 0.8rem 0;
  }

  .adopt {
    display: grid;
    grid-gap: 1.6rem;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;

    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    .adopt-pet {
      background: #212121;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 0.4rem;
      padding-bottom: 0.4rem;

      img {
        width: 100%;
        border-radius: 0.4rem 0.4rem 0 0;
      }

      .pet-details {
        p {
          :not(:first-child) {
            padding-top: 0.4rem;
          }

          padding-left: 0.4rem;

          span {
            font-weight: 700;
          }
        }
      }

      .adopt-btn {
        width: 98%;
        height: 4.8rem;
        border-radius: 0.4rem;
        border: none;
        cursor: pointer;
        background: #2e8540;
        color: #fff;
        display: block;
        margin: 1.6rem auto 0.8rem auto;
      }
    }
  }

  form {
    margin-bottom: 1.6rem;
    display: flex;
    flex-direction: column;
    border-bottom: 0.05px solid black;
    padding-bottom: 2.4rem;

    input {
      height: 4.8rem;
      padding-left: 0.8rem;
      border-radius: 0.4rem;
      border: 0.05rem solid #212121;
    }

    button {
      margin-top: 0.8rem;
      height: 4.8rem;
      border-radius: 0.4rem;
      border: none;
      cursor: pointer;
      padding: 0.8rem 1.6rem;
      color: #fff;
      background: #205493;
      width: 100%;
    }

    @media (min-width: 992px) {
      flex-direction: row;
      padding-bottom: none;
      border-bottom: none;
      padding-bottom: 0;

      input {
        width: 20rem;
      }

      button {
        margin: 0 0 0 0.8rem;
        width: auto;
      }
    }
  }

  .line {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1.6rem;
    width: 100%;
    margin-top: 2.4rem;
    margin-bottom: 4.8rem;

    @media (min-width: 992px) {
      grid-template-columns: repeat(5, 1fr);
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #212121;
      color: #fff;
      height: 10rem;
      border-radius: 0.4rem;

      :first-child {
        background: #2e8540;
      }
    }
  }
`;

export default Adoption;

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heroImg from './images/hero-image.jpg';
import Wrapper from '../Wrapper/Wrapper';

const LandingPage = () => {
  return (
    <Wrapper>
      <StyledMain>
        <div className='hero-img'>
          <img src={heroImg} alt='Hero' />
        </div>
        <div className='hero-cta'>
          <h1>Adopt, Don't Shop</h1>
          <p>
            Find your new best friend today! We operate on a first come, first
            served basis and you can only adopt the next pet in line.
          </p>
          <Link to='/adoption'>Adopt</Link>
        </div>
      </StyledMain>
    </Wrapper>
  );
};

const StyledMain = styled.main`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 4.8rem;
  margin-top: 4.8rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-img {
    display: flex;
    justify-content: center;

    img {
      width: 100%;
    }

    width: 100%;
    height: 50rem;
  }

  .hero-cta {
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      margin: 0.8rem 0 1.6rem 0;
    }

    a {
      text-decoration: none;
      color: #fff;
      background: #212121;
      width: 12rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4.8rem;
      cursor: pointer;
      border-radius: 0.4rem;
    }
  }
`;

export default LandingPage;

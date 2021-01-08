import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heroImg from './images/hero-image.jpg';

const LandingPage = () => {
  return (
    <StyledMain>
      <div className='hero-img'>
        <img src={heroImg} alt='Hero' />
      </div>
      <div>
        <h1></h1>
      </div>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  .hero-img {
    display: flex;
    justify-content: center;

    img {
      width: 46rem;
      height: 46rem;
      height: auto;
    }

    width: 100%;
    height: 50rem;
  }
`;

export default LandingPage;

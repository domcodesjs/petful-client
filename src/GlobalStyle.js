import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  html {
    box-sizing: inherit;
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }

  h1, h2, h3 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

export default GlobalStyle;

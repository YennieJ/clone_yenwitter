import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

input {
  all: unset;
  box-sizing: border-box;
  appearance: none;
}

body {
  background-color: black;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  color: white;
}

button {
  background-color: white;
  color: black;
  cursor: pointer;

}

a {
  text-decoration: none;
  color: inherit;
}

form {
  width: 100%;
}
`;

export default GlobalStyle;

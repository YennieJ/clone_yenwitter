import styled from "styled-components";

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 320px;

  input {
    max-width: 320px;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 30px;

    font-size: 12px;
    color: black;
    background-color: rgba(255, 255, 255, 1);
  }
  button {
    max-width: 320px;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 30px;

    text-align: center;
    color: white;
    background-color: #04aaff;
    cursor: pointer;
  }
  span {
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: tomato;
  }
`;

export const AuthSwitch = styled.span`
  display: block;

  margin-top: 10px;
  margin-bottom: 50px;

  font-size: 12px;
  text-decoration: underline;
  color: #04aaff;

  cursor: pointer;
`;

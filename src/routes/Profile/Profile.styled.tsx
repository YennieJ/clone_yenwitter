import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 320px;

  button {
    width: 100%;
    padding: 7px 20px;
    margin-top: 50px;
    border: none;
    border-radius: 20px;

    text-align: center;
    color: white;
    background-color: tomato;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);

  input {
    width: 100%;
    padding: 10px 20px;
    border: 1px solid black;
    border-radius: 20px;

    text-align: center;
    color: black;
    background-color: white;
  }
  button {
    width: 100%;
    padding: 7px 20px;
    margin-top: 10px;
    border-radius: 20px;

    text-align: center;
    color: white;
    background-color: #04aaff;
  }
`;

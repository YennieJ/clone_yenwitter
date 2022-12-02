import styled from "styled-components";

export const Yenweet = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 320px;
  width: 100%;
  padding: 5px 20px;
  margin-bottom: 20px;
  border: 0;
  border-radius: 10px;

  color: rgba(0, 0, 0, 0.8);
  background-color: white;

  position: relative;

  h4 {
    font-size: 14px;
  }
  img {
    position: absolute;
    top: 20px;
    right: -10px;

    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 10px;
  }
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;

  max-width: 320px;
  width: 100%;

  margin-top: 15px;
  margin-bottom: 5px;

  input {
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 15px;
    border: 1px solid black;
    border-radius: 20px;

    text-align: center;
    color: black;
    background-color: white;
  }
  button {
    width: 100%;
    padding: 7px 20px;
    border: 0;
    border-radius: 20px;

    text-align: center;
    color: white;
    background-color: #04aaff;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 7px 20px;
  margin-bottom: 15px;
  border: 0;
  border-radius: 20px;

  text-align: center;
  color: white;
  background-color: tomato;
`;

export const Action = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  button {
    padding: 0 6px;
    border: 0;
  }
`;

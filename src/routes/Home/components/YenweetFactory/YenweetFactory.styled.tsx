import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  label {
    color: #04aaff;
    cursor: pointer;
    span {
      font-size: 12px;
      margin-right: 10px;
    }
  }

  input {
    :nth-child(3) {
      opacity: 0;
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 20px;

  position: relative;

  input {
    :nth-child(1) {
      flex-grow: 1;

      height: 40px;
      padding: 0px 20px;
      border: 1px solid #04aaff;
      border-radius: 20px;

      font-size: 12px;
      font-weight: 500;
      color: white;
    }
  }
  button {
    position: absolute;
    right: 0;
    width: 40px;
    height: 40px;
    padding: 10px 0px;
    border: 0;
    border-radius: 20px;

    text-align: center;
    color: white;
    background-color: #04aaff;

    cursor: pointer;
  }
`;

export const Attachment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    height: 80px;
    width: 80px;
    border-radius: 40px;
  }
  button {
    text-align: center;
    color: #04aaff;
    cursor: pointer;

    span {
      font-size: 12px;
      margin-right: 10px;
    }
  }
`;

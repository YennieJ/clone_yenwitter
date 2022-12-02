import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;

export const SocialAction = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  max-width: 320px;
  button {
    width: 150px;
    padding: 10px 0px;

    border: none;
    border-radius: 20px;

    font-size: 12px;
    text-align: center;
    background: white;

    cursor: pointer;
  }
`;

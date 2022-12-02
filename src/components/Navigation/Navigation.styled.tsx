import { Link } from "react-router-dom";

import styled from "styled-components";

export const Container = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  margin-top: 60px;

  li {
    list-style: none;
  }
`;

export const LinkHome = styled(Link)`
  padding-right: 40px;
`;

export const LinkProfile = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 12px;

  span {
    padding-top: 10px;
  }
`;

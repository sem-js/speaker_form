import React, { Fragment } from "react";
import styled from "styled-components";

import Logo from "./Logo";

const Wrapper = styled.div`
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  background-color: #323230;
`;

const Heading = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;

  & h1 {
    margin-left: 20px;
  }
`;

const Main = styled.main`
  padding: 10px 20px;
  max-width: 100%;
`;

export default function Layout({ children }) {
  return (
    <Wrapper className="wrapper">
      <Heading>
        <Logo />
        <h1>Call for Lightning Talks!</h1>
      </Heading>
      <Main>{children}</Main>
    </Wrapper>
  );
}

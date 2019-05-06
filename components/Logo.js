import React from "react";

import logo from "./logo.png";
import styled from "styled-components";

const Image = styled.img`
  height: 128px;
  width: 128px;
`;

export default function Logo() {
  return <Image src={logo} alt="SEMjs" />;
}

import React from "react";
import styled, { keyframes } from "styled-components";

// Esto es para que el componente Loading se vea como un circulo
const rotate360 = keyframes`
from {
    transform: rotate(0deg);
} to {
    transform: rotate(360deg);
}`;

// Spinner es el circulo que se va a mostrar
const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid grey;
  background: transparent;
  width: 80px;
  height: auto;
  border-radius: 50%;
`;

export const Loading = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Spinner />
    </div>
  );
};

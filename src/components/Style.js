import styled from "styled-components";
import { device } from "./device";


export const Display = styled.div`
  font-family: sans-serif;
  margin-top: 50px;
  padding: 25px
  font-size: 20px;
  text-align: center;
`;

export const DisplayInline = styled.div`
  display: flex;
  flex-direction: column;
  margin: 70px 0px;

  @media ${device.tablet} {
    max-width: 605px;
    margin-left: 10%;
    margin-top: 90px;

    flex-direction: row;
    justify-content: space-between;
  }

  @media ${device.laptop} {
    margin-left: 20%;
    margin-top: 15%;
  }

  @media ${device.laptopL} {
    margin-left: 25%;
    margin-top: 15%;
  }

  @media ${device.desktop} {
    margin-left: 35%;
    margin-top: 15%;
  }
`;

export const ButtonIncrement = styled.button`
  font-family: sans-serif;
  width: auto;
  padding: 20px 50px;
  font-size: 20px;
  border: none;
  padding: 7px, 10px;
  border-radius: 40px;
  //if we set props in button
  background: ${(props) => (props.primary ? "hotpink" : "green")};
  color: #ffffff;
  &:hover {
    background: rebeccapurple;
  }
`;

export const ButtonDecrement = styled.button`
  font-family: sans-serif;
  width: auto;
  padding: 20px 50px;
  font-size: 20px;
  border: 2px solid #000000;
  padding: 7px, 10px;
  border-radius: 40px;
  //if we set props in button
  background: ${(props) => (props.primary ? "white" : "green")};
  color: #000000;
  &:hover {
    background: black;
    color: white;
  }
`;

export const Title = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: flext-start;

  padding: 10px;
  font-size: 20px;
  font-weight: 200;
  text-align: center;
  background-color: #ffffff;
`;
export const Spansign = styled.span`
  font-size: 24px;
  font-weight: 700;
  padding: 5px;
`;

export const Span = styled.span`
  padding: 10px;
  line-height: 1.5em;
`;

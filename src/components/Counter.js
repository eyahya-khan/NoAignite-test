import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { BeatLoader } from "react-spinners";
import { device } from "./device";

const Display = styled.div`
  font-family: sans-serif;
  margin-top: 50px;
  padding: 25px
  font-size: 20px;
  text-align: center;
`;

const DisplayInline = styled.div`
  display: flex;
  flex-direction: column;

  margin: 70px 0px;

  @media ${device.tablet} {
    max-width: 80%;
    margin-left: 10%;
    margin-top: 90px;


    flex-direction: row;
    justify-content: space-between;
  }

  @media ${device.laptop} {
    max-width: 60%;
    margin-left: 20%;
    margin-top: 15%;
  }

  @media ${device.laptopL} {
    max-width: 50%;
    margin-left: 25%;
    margin-top: 15%;
  }

  @media ${device.desktop} {
    max-width: 30%;
    margin-left: 35%;
    margin-top: 15%;
  }
`;

const ButtonIncrement = styled.button`
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

const ButtonDecrement = styled.button`
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

const Title = styled.p`
  display:flex;
  flex-direction:column;
  justify-content:flext-start;

  padding:10px;
  font-size: 20px;
  font-weight: 200;
  text-align: center;
  background-color: #ffffff;
`;

const Span = styled.span`
  padding:10px;
  line-height:1.5em;

`;

function Counter() {
  //loading icon
  const [isLoading, setIsLoading] = useState(false);
  //for fetching data
  const [post, setPost] = useState({});
  const [error, setError] = useState("");
  //for counter
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);

  const repoList = [
    "eslint/eslint",
    "oakwood/front-end-questions",
    "babel/babel",
    "webpack/webpack",
    "storybooks/storybook",
    "facebook/react",
    "reactjs/redux",
    "expressjs/express",
  ];

  const increment = () => {
    setCount(count + 1 > repoList.length - 1 ? count : count + 1);
    //loading
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };
  const decrement = () => {
    setCount(count - 1 < 0 ? count : count - 1);
    //loading
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${repoList[count]}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        setPost(err.message);
        setError(err.message);
      });
  }, [count]);

  return (
    <Display>
      <DisplayInline>
        <ButtonDecrement primary onClick={decrement}>
          - DECREMENT
        </ButtonDecrement>

        <Title>Count: {count}</Title>

        <ButtonIncrement primary onClick={increment}>
          <Span>+</Span> INCREMENT
        </ButtonIncrement>
      </DisplayInline>

      {isLoading && <BeatLoader color="green" loading />}

      {error === post ? error : null}

      <Title>
      <Span>
        <strong>Title: </strong>
        {post.full_name}
        </Span>
          <Span>
        <strong>Description: </strong>
        {post.description}
        </Span>  
      <Span>
        <strong>Amounts of stars: </strong>
        {post.stargazers_count}
      </Span>
      </Title>
    </Display>
  );
}

export default Counter;

import React, { useState,useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Display = styled.div`
  font-family: sans-serif;
  margin-top: 50px;
  font-size: 16px;
  text-align: center;
`;

const DisplayInline = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: 1fr;

max-width: 40%;
margin-left: 30%;
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
    color:white
  }
`;

const Title = styled.p`
  font-family: sans-serif;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 200;
  text-align: center;
  background-color: #ffffff;
`;


function Counter() {
//for fetching data
const [post, setPost] = useState({});
//for counter
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);

  const repoList = [
    'eslint/eslint',
    'oakwood/front-end-questions',
    'babel/babel',
    'webpack/webpack',
    'storybooks/storybook',
    'facebook/react',
    'reactjs/redux',
    'expressjs/express'
  ]

const increment = ()=>{ 
  setCount((count + 1) > repoList.length-1 ? count : count + 1)
}
const decrement = ()=>{ 
  setCount((count - 1) < 0 ? count : count - 1)
}

useEffect(() => {
  axios
    .get(`https://api.github.com/repos/${repoList[count]}`)
    .then((res) => {
      console.log(res);
      setPost(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, [count]);

  return (
    <Display>
      <DisplayInline>
          <ButtonDecrement primary onClick={decrement}>- DECREMENT </ButtonDecrement>
          <Title>Count: {count}</Title>
          <ButtonIncrement primary onClick={increment}>+ INCREMENT</ButtonIncrement>
      </DisplayInline>
      <Title>
        <strong>Title: </strong>
        {post.full_name}
      </Title>

      <Title>
        <strong>Description: </strong>
        {post.description}
      </Title>

      <Title>
        <strong>Amounts of stars: </strong>
        {post.stargazers_count}
      </Title>

    </Display>
  );
}

export default Counter;

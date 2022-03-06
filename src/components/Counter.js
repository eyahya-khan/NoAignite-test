import React, { useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import {Display, DisplayInline,ButtonIncrement,
        ButtonDecrement, Title,Span, Spansign} from "./Style"


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
        <ButtonDecrement 
          primary 
          onClick={decrement}
          disabled={count === 0 ? true : false}
          > 
         <Spansign>-</Spansign> DECREMENT
        </ButtonDecrement>

        <Title>Count: {count}</Title>

        <ButtonIncrement 
          primary 
          onClick={increment}
          disabled={count === repoList.length - 1 ? true : false}
          >
          <Spansign>+</Spansign>INCREMENT
        </ButtonIncrement>
      </DisplayInline>

      {isLoading && <BeatLoader color="green" loading />}

      {error === post ? 
      <Title>
      {error }
      </Title>
      : 

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
}
    </Display>
  );
}

export default Counter;

import styled from "styled-components";

export const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.$primary ? "green" : "white")};
  color: ${(props) => (props.$primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 5px;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export const TodoCard = styled.div`

display: flex;
flex-direction: column;

  padding: 1em;
  display: block;
  max-width: 400px

  margin: 20px;

  color: ${(props) => props.inputColor || "palevioletred"};
  background: white;
  border: 0px solid black;
  border-radius: 5px;
`;

export const Wrap = styled.span`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.text`{
  font-size: 1.3rem;
  font-weight: semibold;
  margin-left: 20px;

}`
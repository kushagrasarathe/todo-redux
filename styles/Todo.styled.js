import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const Button = styled.button`
  background: ${(props) => (props.$primary ? "green" : "white")};
  color: ${(props) => (props.$primary ? "white" : "palevioletred")};
  cursor: pointer;
  font-size: 1em;
  margin: 0 12px;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;

export const Navbar = styled.nav`
  background: white;
  padding: 5px 12px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoutButn = styled.button`
  background: red;
  color: white;
  cursor: pointer;
  font-size: 1em;
  margin: 5px;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;

export const Title = styled.span`
   {
    font-size: 2rem;
    font-weight: bold;
    color: black;
    color: #010401;
  }
`;

export const Input = styled.input`
  padding: 8px 12px;
  margin: 0.5em 0;
  color: black;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
`;

export const WrapTodos = styled.div``;

export const TodoCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  display: block;
  width: 900px;
  max-height: 80px;
  overflow: auto;
  margin: 20px 0;

  color: ${(props) => props.inputColor || "palevioletred"};
  background: white;
  border-left: 3px solid black;
  // border-radius: 5px;
`;

export const Wrap = styled.span`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

export const Description = styled.span`
   {
    font-size: 1.2rem;
    font-weight: semibold;
    margin-left: 20px;
    color: black;
  }
`;

export const DeleteBtn = styled.span`
  margin: 0 10px;
  cursor: pointer;
`;

export const MarkComplete = styled.span`
  margin: 0 10px;
  cursor: pointer;
`;

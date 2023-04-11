import styled from "styled-components";

export const Form = styled.form`
  width: 540px; 
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  box-shadow: 0px 4px 0px rgba(0,0,0,0.3);
  padding: 40px 0px;
  /* LAPTOP */
  @media only screen and (max-width: 1115px) {
    width: 100%; 
  }
`
export const Wrapper = styled.div`
  width: 85%; 
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Terms = styled.p`
  font-size: 11px; 
  font-weight: bold;
  color: #BAB7D4;
  line-height: 26px;
  margin-top: 5px;
  span {
    color: #FF7979;
  }
  /* MOBILE */
  @media only screen and (max-width: 460px) {
    margin-top: 10px;
    text-align: center;
    line-height: 15px;
  }
`
import styled from "styled-components"

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 85%; 
`


export const Error = styled.span`
    text-align: right;
    color: #FF7979;
    font-size: 13px;
    font-style: italic;
    display: none;
`


export const Input = styled.input`
    width: 100%;
    height: 56px;
    padding: 5px 25px; 
    font-size: 16px;
    font-weight: 600;
    color: #3D3B48;
    border-radius: 5px;
    border: 1px #DEDEDE solid;
    &:invalid ~ ${Error} {
        display: ${props => props.focused && 'block'};
    }
    &:invalid {
        border: ${props => props.focused && '2px red solid'};
        background: ${props => props.focused};
        background-position: bottom 15px right 20px;
    }
    &:valid {
        border: 2px #38CC8B solid;
    }
    &:focus {
        outline: 2px solid transparent;
    }
`
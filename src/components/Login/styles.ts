import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  h1 {
    margin-bottom: 20px;

    font-size: 24px;
    font-weight: 600;
    color: #333;
  }
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 300px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f9f9f9;
  color: #333;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

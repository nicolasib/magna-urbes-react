import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  width: 100%;

  form{
    display: flex;
    flex-direction: column;
  }

    input {
        cursor: text;
        padding: 6px;
        margin: 0 0 4px 0;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border: 2px solid #ddd;
        transition: ease-in-out;
        transition-duration: 200ms;
        font-size: 14px;
    }
    input:hover {
        border: 2px solid #aaa;
    }
    input:focus {
        border: 2px solid #e8c52a;
    }
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px;
        background: transparent;
        border: 2px solid #e8c52a;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
        color: #666;
        font-weight: 400;
        font-size: 16px;
        margin: 4px 0;
        cursor: pointer;
        transition: ease-in-out;
        transition-duration: 150ms;
    }
    button:hover {
        color: #000;
        background: #e8c52a;
    }

    span{
        text-align: center;
        color: #f00;
    }
`;

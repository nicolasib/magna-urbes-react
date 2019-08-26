import styled from 'styled-components';

export const Container = styled.div`
    height: calc(100% - 80px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: default;
    form {
        display: flex;
        flex-direction: column;

        input {
            cursor: text;
            padding: 6px;
            margin: 0 4px 10px 4px;
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
        span {
            margin: 5px 0;
            font-weight: 500;
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
    }
`;

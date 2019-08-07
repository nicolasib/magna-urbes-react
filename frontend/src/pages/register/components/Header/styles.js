import styled from 'styled-components';

export const Container = styled.div`
    height: 80px;
    background: #333;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: center;
    position: relative;
    cursor: default;
    h1 {
        color: #fff;
    }
    span {
        position: absolute;
        left: 50%;
        bottom: -50%;
        transform: translate(-50%, -50%);
        padding: 8px;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background: #e8c52a;
        font-weight: 500;
    }
`;

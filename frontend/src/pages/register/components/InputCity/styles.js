import styled from 'styled-components';

export const Container = styled.div`
    
    display: flex;

    input {
        padding: 6px;
        margin: 0 0 4px 0;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border: 2px solid #ddd;
        transition: ease-in-out;
        transition-duration: 200ms;
        font-size: 14px;
        width: 100%;
    }
    input:focus {
        border: 2px solid #e8c52a;
    }
`;

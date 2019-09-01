import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    background-color: #111521;
    display: flex;
    flex-direction: column;
    padding: 30px 24px;
    cursor: default;
    h1{
        margin: 0;
        color: #fff;
        font-size: 40px;
    }
    p{
        width: 100%;
        margin: 20px 0;
        color: #fff;
    }
    div{
        display: flex;
        margin: 20px 0;
        flex-wrap: wrap;
        align-items: stretch;
        text-align: center;
        justify-content: space-around;
    }

    @media (max-width: 400px) {
        text-align: center;
        p{
            text-align: center;
            font-size: 20px;
            margin: 20px 0;
        }
        div{
            flex-direction: column;
        }

    }
`;

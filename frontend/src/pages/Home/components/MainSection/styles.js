import styled from 'styled-components';

import bg from '../../../../resources/images/bg.jpg';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    padding: 0 20px;

    button{
        z-index: 99;
        color: #fff;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        width: 100px;
        border: 2px solid #fff;
        animation-name: fadeDown;
        animation-duration: 2s;
        margin: 20px 0 0 0;
        background: transparent;
        transition: ease-in-out;
        cursor: pointer;
        &:hover{
            background-color: #fff;
            color: #000;
            transition-duration: 300ms;
        }
    }

    div{
        display: flex;
        width: 220px;
        justify-content: space-between;
        a > button {
            z-index: 99;
            color: #fff;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            width: 100px;
            border: 2px solid #fff;
            animation-name: fadeDown;
            animation-duration: 2s;
            margin: 20px 0 0 0;
            background: transparent;
            transition: ease-in-out;
            cursor: pointer;
        }
        a > button:hover{
            background-color: #fff;
            color: #000;
            transition-duration: 300ms;
        }
        a{
            display: flex;
            text-decoration: none;
        }
    
    }

    

    h1, h3{
        color: #fff;
        z-index: 99;
    }

    h1{
        font-size: 60px;
        animation-name: fadeUp;
        animation-duration: 1200ms;
    }

    @media (max-width: 400px) {
        justify-content: center;
        align-items: center;
        h1{
            font-size: 40px;
            text-align: center;
        }
        h3{
            font-size: 18px !important;
            text-align: center;
        }
        div{
            width: 100%;
            justify-content: center;
            a > button{
                margin: 20px 4px 10px 4px;
            }
        }
    }

    h3{
        font-size: 20px;
        font-weight: normal;
        animation-name: fadeDown;
        animation-duration: 1200ms;
    }

    position: relative;

    .bgDark{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #00000065;
        z-index: 1;
    }

    .image{
        position: absolute;
        background: url(${bg});
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        filter: blur(0.4px);
    }

    @keyframes fadeUp {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to{
            transform: translateY(0);
            opacity: 100;
        }
    }
    @keyframes fadeDown {
        from{
            transform: translateY(100%);
            opacity: 0;
        }
        to{
            transform: translateY(0);
            opacity: 100;
        }
    }


`;

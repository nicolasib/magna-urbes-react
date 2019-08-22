import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Raleway:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic");
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: 'Raleway', sans-serif;
        -webkit-font-smoothing: antialiased !important;
    }

    html, body, #root{
        height: 100%;
        background-color: #fdfdfd;
    }
`;

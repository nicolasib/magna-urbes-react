import React from 'react';

import GlobalStyle from '../../styles/global';
import Header from './components/Header';
import FormBody from './components/FormBody';

const register = () => {
    return (
        <>
            <Header />
            <FormBody />
            <GlobalStyle />
        </>
    );
};

export default register;

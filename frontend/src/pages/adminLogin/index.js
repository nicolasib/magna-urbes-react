import React from 'react';

import { Container } from './styles';
import Header from '../global/Header';
import FormLogin from './components/FormLogin';

export default function adminLogin({ history }) {
  return (
    <>
      <Header />
      <Container>
          <FormLogin history={history}/>
      </Container>
    </>
  );
}

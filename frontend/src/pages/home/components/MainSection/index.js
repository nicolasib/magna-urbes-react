import React from 'react';

import { Container } from './styles';

import { Link }  from 'react-router-dom';

export default function MainSection() {
  return (
    <Container>
        <h1>MagnaUrbes</h1>
        <h3>
            Id incididunt laboris cillum dolor aliqua 
            cupidatat eiusmod ipsum elit do.
        </h3>
        <div>
          <Link to="/register">
            <button>Veja mais</button>
          </Link>
          <Link to="/">
            <button>Login</button>
          </Link>
        </div>

        <div className="bgDark"/>
        <div className="image" />
    </Container>

  );
}

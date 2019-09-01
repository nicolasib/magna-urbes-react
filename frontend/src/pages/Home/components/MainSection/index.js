import React, { Component } from 'react';

import { Container } from './styles';

export default class MainSection extends Component {  
  handleClick(){
    this.props.handleScroll(document.getElementById('bout'));
  }
  
  render() {

    return (
      <Container>
        <h1>MagnaUrbes</h1>
        <h3>
            Id incididunt laboris cillum dolor aliqua 
            cupidatat eiusmod ipsum elit do.
        </h3>
        <button onClick={ this.handleClick.bind(this) }>Ver mais</button>

        <div className="bgDark"/>
        <div className="image" />
    </Container>
    );
  }
}

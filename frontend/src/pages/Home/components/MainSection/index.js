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
          Descubra as cidades com maior destaque e 
          suas crescentes evoluções com o passar do tempo!
        </h3>
        <button onClick={ this.handleClick.bind(this) }>Ver mais</button>

        <div className="bgDark"/>
        <div className="image" />
    </Container>
    );
  }
}

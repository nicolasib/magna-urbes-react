import React, { Component } from 'react';

import { Container } from './styles';

import { Link } from 'react-router-dom';

import Card from './components/Card';

export default class BoutSection extends Component {
  render() {
    return (
      <Container id={this.props.id}>
        <h1>Sobre o projeto</h1>  
        <p>
          Nesse projeto, 5 alunos e um professor desenvolveram uma interface com intuito educacional, que demonstra de uma maneira simples e intuitiva, um mapa com as cidades mais importantes em cada século ao longo da vida terrestre.
        </p>
        <h1>Equipe</h1>
        <div>
          <Card name={`flavio`} />
          <Card name={`gpenido`} />
          <Card name={`nicolas`} />
          <Card name={`pedrin`} />
          <Card name={`churras`}/>
          <Card name={`yuri`}/>
        </div>
        <Link to="/map" className="gotoMap">Acessar o mapa</Link>
      </Container>
    );
  }
}

import React, { Component } from 'react';

import { Container } from './styles';

import { Link } from 'react-router-dom';

import Card from './components/Card';

export default class BoutSection extends Component {
  render() {
    return (
      <Container id={this.props.id}>
        <h1>Sobre o projeto</h1>  
        <p>Velit magna ad et id. Est Lorem enim nisi aliqua Lorem reprehenderit Lorem laboris consectetur commodo excepteur voluptate exercitation. Magna qui esse sit cillum aliqua proident nulla excepteur fugiat non dolore pariatur. Anim voluptate aliquip officia ad. Reprehenderit officia consequat aute adipisicing consequat deserunt minim voluptate.</p>
        <h1>Equipe</h1>
        <div>
          <Card name={`flavio`} />
          <Card name={`gpenido`} />
          <Card name={`nicolas`} />
          <Card name={`pedrin`} />
          <Card name={`churras`}/>
          <Card name={`yuri`}/>
        </div>
        <Link to="/map">Acessar o mapa</Link>
      </Container>
    );
  }
}

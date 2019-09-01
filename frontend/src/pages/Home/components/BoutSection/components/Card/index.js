/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';

import { Container } from './styles';

import imgFlavio from '../../../../../../resources/images/flavio.jpeg';
import imgPenido from '../../../../../../resources/images/gpenido.jpeg';
import imgNicolas from '../../../../../../resources/images/nicolas.jpg';
import imgPedrin from '../../../../../../resources/images/pedrin.jpeg';
import imgChurras from '../../../../../../resources/images/churras.jpeg';
import imgYuri from '../../../../../../resources/images/yuri.jpeg';

const Card = (props) => {

  const [ name ] = useState(props.name);
  const [ title, setTitle ] = useState('');
  const [ office, setOffice ] = useState('');
  const [ srcImg, setSrcImg ] = useState('');
  const [ officeColor, setOfficeColor ] = useState('');
  
  useEffect(()=>{
    switch(name){
      case 'flavio':
        setSrcImg(imgFlavio);
        setTitle('Flávio Giarola');
        setOffice('Professor Doutor e Orientador');
        setOfficeColor('#fc9d03');
      break;
      case 'gpenido':
        setSrcImg(imgPenido);
        setTitle('Gabriel Penido');
        setOffice('Aluno e Orientando');
        setOfficeColor('#3044c2');
      break;
      case 'nicolas':
        setSrcImg(imgNicolas);
        setTitle('Nicolas Ibraim');
        setOffice('Aluno e Orientando');
        setOfficeColor('#3044c2');
      break;
      case 'pedrin':
        setSrcImg(imgPedrin);
        setTitle('Pedro Martins');
        setOffice('Aluno e Orientando');
        setOfficeColor('#3044c2');
      break;
      case 'churras':
        setSrcImg(imgChurras);
        setTitle('Arthur Lage');
        setOffice('Aluno e Orientando');
        setOfficeColor('#3044c2');
      break;
      case 'yuri':
        setSrcImg(imgYuri);
        setTitle('Yuri Farnesio');
        setOffice('Aluno e Orientando');
        setOfficeColor('#3044c2');
      break;
    }
  }, [])

  return (
    <Container srcImg={ srcImg } officeColor={ officeColor }>
      <div className="profile"></div>
      <div>
        <h1>{ title }</h1>
      </div>
      <span>{ office }</span>
    </Container>
  );
}

export default Card

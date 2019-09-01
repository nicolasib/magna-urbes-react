import React, { Component } from 'react';

import { Container } from './styles';

import api from '../../services/api';

import { MdClose } from 'react-icons/md';

export default class Map extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentCentury: '',
      currentCountry: {},

      centuryList: [],
      countryList: []
    }
  }

  async listCenturies(){
    const centuriesVector = await api.post('admin/consultCentury', { query: 'onlyNumber' });

    this.setState({ centuryList: centuriesVector.data });
    this.setState({ currentCentury: this.state.centuryList[0] });
  }
  async componentDidMount(){
    await this.listCenturies();

    api.post('admin/consultCentury', { query: 'all', value: this.state.currentCentury }).then(res => {
      const allRegisters = res.data;
      const countries = [];

      allRegisters.forEach(element => {
        countries.push(element.country);
      });
      return countries;
    }).then(countries => {
      this.setState({ countryList: countries });

      this.state.countryList.forEach(element => {
        let countryElement = document.querySelectorAll(`#${element.name}`);
      
        if(countryElement.length > 0){
          countryElement[0].classList.add("haveContent");
          
          countryElement[0].addEventListener('click', this.handleCountry.bind(this));
        }else{
          let activeCountries = document.querySelectorAll(".haveContent");
      
          if(activeCountries.length > 0){
            this.clear();            
          }
        }
      });
    });
  }

  handleCountry(e){
    const countryName = e.target.id;
    const currentCountryObj = this.state.countryList.find(element => {
      return ( element.name === countryName );
    });
    const modal = document.getElementById('modal');

    console.log(window.scrollY);

    this.setState({ currentCountry: currentCountryObj});

    modal.classList.add('modalActive');
    document.querySelector('body').style.overflowY = `hidden`;
    
  }

  clear(){
    // Removendo as classes ativas e removendo eventos de click
    // O clone serve pra retirar os eventos de click
    let clear = document.querySelectorAll(".haveContent");
    clear.forEach(element => {
      element.classList.remove("haveContent");
      let clone = element.cloneNode(true);
      element.parentNode.replaceChild(clone, element);
    });
  }
  
  async handleChangeCentury(event){
    const selectedCentury = event.target.value;
    await this.setState({ currentCentury: selectedCentury });

    api.post('admin/consultCentury', { query: 'all', value: this.state.currentCentury }).then(res => {
      const allRegisters = res.data;
      const countries = [];

      allRegisters.forEach(element => {
        countries.push(element.country);
      });

      return countries;

    }).then(countries => {
      this.setState({ countryList: countries });
      this.clear();

      this.state.countryList.forEach(element => {
        let countryElement = document.querySelectorAll(`#${element.name}`);

        if(countryElement.length > 0){
          countryElement[0].classList.add("haveContent");
          countryElement[0].addEventListener('click', this.handleCountry.bind(this));
        }else{
          let activeCountries = document.querySelectorAll(".haveContent");
          if(activeCountries.length > 0){
            this.clear();
          }
        }
      });
    });
  }

  closeModal(){
    const modal = document.getElementById('modal');
    modal.classList.remove('modalActive')
    document.querySelector('body').style.overflowY = "scroll";
  }

  render() {
    return (
      <Container window={window.innerHeight} scrollOffset={window.scrollY}>
        <nav>
          <span>Selecione seu século: </span>
          <select onChange={ this.handleChangeCentury.bind(this) }>
            {
              this.state.centuryList.map((element, index) => {
                return (
                  <option key={ index } value={ element }>{ element }</option>
                );
              })
            }
          </select>
        </nav>
        <div id="modal">
          <div className="modalCard">
            <MdClose className="closeBtn" onClick={ this.closeModal } />
            <h1>{ this.state.currentCountry.name }</h1>
            <ul>
              { this.state.currentCountry.cities 
                && this.state.currentCountry.cities.map((element, index) => {
                  return(
                    <li key={index}>
                      <strong>{ element.name }</strong>
                      <span>{ element.population }</span>
                    </li>
                  )
                }) }
            </ul>
          </div>
        </div>
        <section>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 978.18 695.75">
            <g id="Paises">
              <path id="Sudao" d="M786.63,720.47s-14.74-2.46-17.19,0-6.14,9.82-13.51,9.82-9.83,2.46-11,2.46-3.69-3.68-4.92-3.68-2.45,2.45-4.91,1.22-3.68,1.23-4.91,1.23-9.83-12.28-12.28-12.28-1.23,2.46-4.92,2.46-4.91-1.23-7.37,0-4.91,1.22-7.36-2.46-6.15-8.6-7.37-12.28-9.83-8.6-11.06-11.05a6.59,6.59,0,0,0-3.68-7.37c-4.91-2.46-9.83-6.14-11.05-8.6s1.22-7.37-3.69-7.37-14.74-7.37-14.74-9.82,4.92-8.6,1.23-12.29S636.8,640.64,638,637s0-7.37-2.46-11.05-1.23-11-1.23-11-6.14-1.23-6.14,1.23c-1.23-6.15,1.23-17.2,3.69-23.34s3.68-16,11.05-16h8.6l-2.46-47.89v-7.37h11l-1.23-24.57h90.89s3.68,4.92,7.37,3.69,1.84-4.3,4.3-5.53,2.45,1.23,4.91-1.23,8-10.44,8-10.44,12.28,7.37,16,18.43,2.45,31.93,7.37,35.61S814.88,547.3,810,551s-14.74,6.14-16,11.06-4.91,29.47-3.68,34.38-1.23,14.74-8.6,24.57-4.91,8.59-6.14,13.51-3.69,2.45-6.14,7.37-2.46,27-2.46,27-2.45,6.14-7.37,1.22-7.37,8.6-3.68,8.6,7.37,1.23,11.05,8.6,4.91,1.23,8.6,11.05,6.14,11.06,8.6,11.06S790.32,720.47,786.63,720.47Z" transform="translate(-193.59 -37)"><title>Sudão</title></path>
              <path id="Libia" d="M653.38,407.9l4.91,111.77h-11v8.59l-89.66-49.12s-8.6,6.14-11.05,6.14-11-7.37-11-7.37l-23.34-1.23s-4.91-9.83-7.37-11.05-8.6-1.23-9.82-1.23S490,459.49,490,457s-2.45-8.6-6.14-11,1.23-6.15,2.46-7.37,1.23-29.48,0-34.39-8.6-9.83-1.23-14.74,4.91-8.6,4.91-12.28,7.37-8.6,9.83-11.05,3.68-2.46,3.68-11.06c8.6,4.91,14.44,3,19.65,1.23,3.69-1.23,23.34,9.83,23.34,14.74,0,6.26,9.82,8.6,13.51,8.6s16,1.22,20.88,8.59,14.73,1.23,16-4.91,0-7.37-1.23-9.83,6.15-18.42,17.2-16,14.74,1.23,16,4.91,3.69,4.91,7.37,4.91,3.69,2.46,6.14,2.46,9.83,0,9.83,2.46-4.91,0-3.68,6.14,1.22,11.05,0,12.28-2.46,4.91,0,9.82A30.05,30.05,0,0,0,653.38,407.9Z" transform="translate(-193.59 -37)"><title>Líbia</title></path>
              <path id="Egito" d="M750.4,377.2s7.37,19.65,9.83,24.56c-1.23,4.91-2.46,17.2-3.69,20.88s-7.37-3.68-9.82-7.37-3.69-2.45-3.69-3.68,0-4.92-1.22-6.14-3.69-3.69-3.69-4.92-2.46-7.36-3.68-3.68,1.22,7.37,2.45,7.37,0,6.14,1.23,7.37,7.37,7.37,8.6,9.82,6.14,13.51,7.37,17.2,9.82,20.88,13.51,24.56S775,473,776.19,473h-2.45s-1.23,7.36,0,8.59-8.6,11.06-8.6,11.06-6.14,0-6.14,2.45-1.23,3.69-3.69,3.69c-1.22,0-4.91-3.69-4.91-3.69H659.52l-3.69-88.43s-7.36-7.36-6.14-12.28,2.46-3.68,2.46-7.37-3.68-9.82-1.23-11,9.83-1.23,13.51-1.23,20.88,4.92,27,7.37,8.6,1.23,13.51-2.45,13.51-4.92,18.42-3.69,11.06,6.14,16,6.14S750.4,377.2,750.4,377.2Z" transform="translate(-193.59 -37)"><title>Egíto</title></path>
              <path id="Argelia" d="M510.91,477.91l-65.09,50.35L420,535.63s-3.69,0-3.69-3.68,3.69-8.6-1.22-9.83-12.29-3.68-14.74-6.14-6.14-3.68-6.14-6.14a6.75,6.75,0,0,0-3.69-6.14C388.1,502.47,288.62,430,288.62,430V409.13s6.14-6.14,9.82-6.14,1.23,0,3.69-2.46,3.68,0,7.36-1.22,2.46-2.46,7.37-3.69,6.14-1.23,8.6-4.91,8.6-6.14,9.83-6.14,3.68-3.69,6.14-3.69,3.68-2.45,1.22-2.45-3.68-4.92-1.22-6.14,6.14-1.23,7.37-1.23a4.29,4.29,0,0,0,2.45-1.23v-2.46h3.69v-1.22h14.73s3.69-6.15,0-7.37S366,351.41,366,346.5s0-13.51-6.14-17.2H366s4.91-7.37,8.6-8.6,6.14,1.23,8.59-2.45,13.51-8.6,22.11-8.6,8.6-3.68,8.6-3.68,0,1.22,2.45,1.22a12.72,12.72,0,0,1,4.92,1.23s1.22-3.68,6.14-3.68,7.37,3.68,9.82,3.68,1.23,1.23,1.23,1.23a36.08,36.08,0,0,1,7.37-3.68c3.68-1.23,3.68-3.69,3.68-3.69S452,306,454.42,306s6.14-3.69,6.14-3.69,1.23,3.69,4.91,3.69h7.37s-3.69,2.45-3.69,6.14,2.46,18.42,0,20.88S459.33,344,459.33,344s1.23,9.82,3.68,11,4.92,2.46,4.92,6.14,6.14,6.14,8.59,7.37,4.92,20.88,4.92,20.88-1.93,5.71,0,8.6c2.45,3.68,3.68,11.05,3.68,13.51s1.23,23.33,0,25.79-4.91,3.68-3.68,7.37,6.14,6.14,6.14,8.59,2.45,12.29,6.14,12.29S504.77,464.4,510.91,477.91Z" transform="translate(-193.59 -37)"><title>Argelia</title></path>
              <path id="Tunisia" d="M502.31,353.86A13.19,13.19,0,0,1,495,368.6c-7.93,4-4.92,12.28-6.14,14.74s-6.15,6.14-6.15,6.14-2.45-20.88-4.91-22.11-8.62-2.45-8.6-6.14a8.13,8.13,0,0,0-4.91-7.37c-2.95-1.22-3.83-9.75-3.68-9.82s9.28-10,9.82-11.05c1.65-3.32.07-11.41,0-16-.06-3.89-1.88-7.64,4.92-11,4.9-2.47,8.59-7.37,12.28-4.92s2.45,8.6,4.91,7.37,4.91-4.91,6.14-3.68,0,3.68-3.68,7.37-1.23,7.37,1.22,8.59,7.37,8.6,0,13.51-12.28,11.06-6.14,13.51l6.14,2.46s0-2.46,1.23-1.23,1.23,3.69,1.23,3.69A5.4,5.4,0,0,0,502.31,353.86Z" transform="translate(-193.59 -37)"><title>Tunísia</title></path>
              <path id="Marrocos" d="M240.72,422.64h46.67V409.13s6.14-7.37,8.59-7.37h3.69s2.46-3.68,4.91-3.68h4.91s4.92-3.69,7.37-3.69,4.92-1.22,7.37-3.68,4.91-4.91,7.37-6.14,3.69-2.46,6.14-3.69,3.69-1.22,2.46-2.45-2.46-6.14,0-7.37,8.6-1.23,9.82-2.46-1.22-3.68,2.46-3.68h16s3.68-2.46,0-4.92-3.69-12.28-3.69-14.73-1.23-13.51-7.37-16h-4.91s-1.23-3.68-2.46-3.68,0,2.45-1.22,2.45H337.74s0,1.23-2.45,1.23-8.6-9.82-11.06-9.82-3.68,2.45-6.14,7.36-4.91,12.29-7.37,14.74c-3.68,3.69-6.14,7.37-11.05,8.6s-11.05,2.46-14.74,11.05-3.68,9.83-7.37,14.74,0,13.51,0,16A18.78,18.78,0,0,1,269,406.67c-7.37,4.92-13.51,11.06-17.2,12.29S242,419,240.72,422.64Z" transform="translate(-193.59 -37)"><title>Marrocos</title></path>
              <path id="SaaraOcidental" d="M287.39,423.87v19.65H251.77v33.16s-13.51,0-13.51,8.6v19.65H197.73s-2.45,3.68-3.68,3.68,0-12.28,3.68-16,7.37-7.37,8.6-12.29,7.37-13.51,9.82-16,4.92-8.6,6.15-13.51,3.68-9.83,8.59-12.28,6.14-14.74,8.6-14.74Z" transform="translate(-193.59 -37)"><title>Saara Ocidental</title></path>
              <path id="Israel" d="M751.63,377.2c-.13,2.46,9.2,24.57,9.83,24.56,1.34,0-.75-14.74,0-16,.9-1.49,2.45-18.43,2.45-23.34s0-7.37-4.91-7.37c-3.88,0-2.46,16-3.69,18.42S751.82,373.73,751.63,377.2Z" transform="translate(-193.59 -37)"><title>Israel</title></path>
              <path id="Libano" d="M767.6,333c-1.23,1.22-9.83,19.65-9.83,20.87,2.46,0,4.91,1.23,6.14,0s2.46-6.14,6.14-9.82,4.92-4.91,2.46-8.6S768.82,331.76,767.6,333Z" transform="translate(-193.59 -37)"><title>Líbano</title></path>
              <path id="Jordania" d="M765.14,358.78s7.37,7.37,11.05,6.14,22.11-13.51,22.11-13.51,3.68,11,4.91,13.51-1.23,3.68-9.82,6.14-13.51,3.68-13.51,3.68,16,11.06,13.51,12.28-7.37,7.37-7.37,8.6-4.91-3.68-6.14,0-2.46,8.6-9.83,8.6-7.37-1.23-7.37-1.23,0-14.74,1.23-17.19S765.14,362.46,765.14,358.78Z" transform="translate(-193.59 -37)"><title>Jordânia</title></path>
              <path id="ArabiaSaudita" d="M762.68,405.45s11.06,1.22,12.29,0,6.14-6.14,6.14-8.6,3.68,0,3.68,0,2.46,1.23,2.46,0a9.35,9.35,0,0,1,2.45-4.91c1.23-1.23,3.69-3.69,4.92-3.69s1.22-2.45,0-3.68-7.37-7.37-11.06-8.6c3.69-2.46,18.42-6.14,19.65-7.37l2.46-2.45s13.51,2.45,17.19,4.91,6.14,7.37,14.74,9.82,11,8.6,11,8.6H856v8.6s9.83,7.37,16,7.37h18.42s6.14,0,11.06,7.37a51.69,51.69,0,0,0,8.59,1.22s2.46,3.69,11.06,13.51,13.51,14.74,11,18.43,3.68,6.14,3.68,6.14,3.69,11.05,7.37,12.28,6.14,1.23,9.83,7.37,7.37,12.28,12.28,13.51S993.58,489,993.58,489l4.91,8.6-6.14,24.56s-25.79,13.51-40.53,16-30.7,1.23-35.62,12.28S909.94,564,903.92,559c-3.17-2.67-1.8-3.24-16-3.69-5.07-.16-13.51,2.46-18.43,4.91-4.39,2.2-9.82,8.6-9.82,8.6s-2.46-11-7.37-14.74-13.51-14.73-13.51-17.19,1.23-6.14-7.37-13.51-13.51-8.6-14.74-12.28-2.45-22.11-6.14-28.25-6.14-14.74-17.19-16c-2.46-7.36-2.46-12.28-7.37-17.19s-16-29.48-18.42-29.48-2.46-2.45-6.14-2.45C761.46,414,761.46,405.45,762.68,405.45Z" transform="translate(-193.59 -37)"><title>Arábia Saudíta</title></path>
              <path id="Iemen" d="M861.35,569.05a3.28,3.28,0,0,0-1.77,2.75c-.18,3.47-.2,11.37,2.58,17.87,3.69,8.6,1.23,18.42,4.92,22.11s9.82,7.37,17.19,4.91,7.37-9.83,14.74-9.83,17.19-2.45,18.42-6.14c6.14-1.22,9.83,1.23,11.05-1.22s0-6.15,14.74-11.06,13.51-4.91,13.51-4.91,3.69-3.69,7.37-3.69,3.69-2.45,2.46-4.91,7.37-9.82,7.37-9.82l-12.29-28.25s-4.91,3.68-27,4.91a22.34,22.34,0,0,0-18.43,12.28c-3.68,7.37-6.14,13.51-12.28,7.37-5.24-5.24-15-5.11-21.51-4.2a22.43,22.43,0,0,0-5.74,1.63c-4.9,2.11-8.92,4.35-12,7.48A14.82,14.82,0,0,1,861.35,569.05Z" transform="translate(-193.59 -37)"><title>Iémen</title></path>
              <path id="Oma" d="M962.87,536.86l12.28,28.25s7.37-2.46,9.83-3.69,6.14-2.45,7.37-1.23,4.91,1.23,6.14-2.45,0-7.37,6.14-8.6,7.37-2.46,7.37-2.46v-6.14s1.23-4.91,4.91-4.91a26.7,26.7,0,0,0,7.37-1.23V532a1.2,1.2,0,0,1-1.23-1.23c0-1.23,0-11.05,2.46-13.51s1.23,0,4.91-1.23,13.51-20.88,13.51-23.33-4.91-3.69-6.14-4.92-4.91-11.05-16-13.51-18.42-12.28-19.65-13.51-6.14,0-6.14,0,6.14,11.06,3.69,11.06H996l-1.22,16,4.91,9.83-6.14,25.79S971.47,536.86,962.87,536.86Z" transform="translate(-193.59 -37)"><title>Omã</title></path>
              <path id="EmiradosArabes" d="M954.28,471.77s6.14,1.23,7.36-1.23,4.92-1.23,7.37-1.23,6.14,2.46,11.06-1.23,7.37-11.05,11-14.74a53.84,53.84,0,0,0,6.14-7.36s3.69,9.82,3.69,12.28v1.23s-4.92,0-6.14,1.22l3.68,7.37s1.23,2.46-1.23,2.46h-2.45l-1.23,17.19s-25.79-2.45-29.48-4.91-9.82-11.05-9.82-11.05" transform="translate(-193.59 -37)"><title>Emirados Árabes</title></path>
              <path id="Catar" d="M943.22,443.52s-2.45,7.37-2.45,9.82,0,7.37,1.22,8.6c.87.87,6.15,4.91,6.15,0,0-2.45-2.46-8.6-1.23-9.82s-1.23-8.6-2.46-8.6S943.22,442.29,943.22,443.52Z" transform="translate(-193.59 -37)"><title>Catar</title></path>
              <path id="Ira" d="M1059.9,455.8s-9.83,1.23-12.28-2.46c-4.92,0-16,0-18.43-1.22s-16-2.46-16-2.46-6.14-17.19-12.28-17.19-16,6.14-20.88,6.14-2.46-2.46-7.37-2.46-9.83-3.68-13.51-6.14-8.6-6.14-13.51-7.37-22.11-30.7-22.11-30.7-2.45,4.91-6.14,1.23-6.14-11.06-7.37-6.15-2.45,4.92-2.45,4.92-4.92-3.69-6.14-7.37-3.69-3.69-3.69-3.69v-8.59s-2.46-8.6-6.14-9.83-16-7.37-16-8.6-2.45-6.14-6.14-7.36-1.22-9.83,0-12.29,4.92-6.14,4.92-8.59a43.31,43.31,0,0,0-1.23-7.37h-4.91s-2.46-1.23-6.15-6.14-7.36-9.83-7.36-13.51-6.15-4.92-6.15-6.14-1.22-11.06-2.45-14.74-1.23-4.91,0-6.14l2.45-2.46s9.83,11.05,13.51,11.05h8.6s3.69-8.59,7.37-8.59,11,1.23,7.37,8.59c3.68,3.69,4.91,3.69,4.91,3.69l4.91,2.46s3.69,13.51,13.51,13.51h3.69s12.28,11.05,19.65,9.82,9.82-4.91,13.51-4.91,8.6,3.68,8.6-1.23-3.69-4.91-3.69-4.91h6.14l8.6-8.6h9.82v-2.46h7.37s2.46,4.92,4.92,4.92,12.28,3.68,12.28,3.68h7.37s4.91,7.37,7.37,7.37,9.82,6.14,9.82,6.14h6.14a17,17,0,0,1,2.46,8.6c0,4.91,2.45,19.65-1.23,22.1s-2.46,4.92,0,6.15l2.46,1.22s-2.46,7.37,0,11.06,1.22,9.82,3.68,12.28,3.69,3.68,6.14,3.68,8.6,6.14,4.91,11.06-4.91,12.28-4.91,12.28,7.37,6.14,8.6,9.82,4.91,6.14,9.82,7.37S1071,430,1071,430h2.46s6.14,3.68-4.92,8.6S1059.9,455.8,1059.9,455.8Z" transform="translate(-193.59 -37)"><title>Irã</title></path>
              <path id="Afeganistao" d="M1034.11,321.93s2.45,12.28,0,16-3.69,4.91-3.69,6.14,6.14,2.46,6.14,2.46-3.68,4.91-2.45,8.59,3.68,7.37,3.68,9.83,1.23,6.14,3.69,7.37,6.14,1.22,7.36,3.68,4.92,4.91,1.23,11a56.54,56.54,0,0,0-4.91,9.83s8.6,1.23,13.51,3.68,4.91,0,4.91,0h13.51l1.23,1.23c1.23,1.23,2.46-1.23,2.46-1.23l12.28-1.22a9.37,9.37,0,0,1,6.14-2.46h2.45v-8.6s-2.45-4.91,0-7.37l4.92-4.91a2.41,2.41,0,0,0,2.45,2.46c2.46,0,7.37-1.23,6.14-2.46s-1.22-2.46,1.23-3.68,7.37-1.23,8.6,0,2.46,2.45,3.68-1.23-3.68-2.46-1.22-8.6,2.45-7.37,6.14-8.6,3.68-3.68,0-7.36-2.46-3.69,1.22-3.69,7.37,1.23,8.6-2.46-2.45-2.45-2.45-3.68,2.45-4.91,3.68-6.14,0-8.6-3.68-11-3.69-3.69,1.22-7.37,9.83-6.14,17.2-6.14,8.6,0,11-1.23,1.23-6.14-1.23-6.14-7.37,4.91-8.59,2.45-3.69-2.45-11.06,2.46-8.59,6.14-8.59,6.14a14.22,14.22,0,0,1-4.92-11c0-7.37-4.91-6.14-4.91-7.37s1.23-4.91-2.46-4.91-7.36,2.45-6.14,8.59-3.68,2.46-3.68,2.46-4.91-1.23-3.69,2.46,0,3.68-2.45,2.45-7.37,0-8.6,1.23-7.37-2.46-7.37-2.46h-16s-2.46-2.45-4.92-2.45-1.22,3.68-2.45,3.68h-6.14v11.05s-8.6,6.15-13.51,6.15c-1.23,0,1.22,6.14,0,6.14s-3.69,2.45-7.37,1.22-2.46-2.45-4.91-2.45S1035.33,324.39,1034.11,321.93Z" transform="translate(-193.59 -37)"><title>Afeganistão</title></path>
              <path id="Kuwait" d="M902.69,394.39s6.14,4.92,4.92,4.92S899,403,900.24,403s6.14,2.46,7.37,6.14l1.22,3.69s-4.91,0-6.14-1.23-3.68-4.92-8.59-6.14-3.69-1.23-3.69-1.23,7.37-13.51,8.6-12.28A17.52,17.52,0,0,0,902.69,394.39Z" transform="translate(-193.59 -37)"><title>Kuwait</title></path>
              <path id="Iraque" d="M799.53,351.41l4.91,13.51s16,1.23,19.65,4.91,8.6,8.6,13.51,9.83,9.83,3.68,11,6.14l1.23,2.45h7.37v8.6s9.83,7.37,13.51,7.37h18.42s5.43-10.34,7.37-12.28a2.31,2.31,0,0,1,3.69,0c1.23,1.23,4.91,1.23,4.91,0s-4.91-4.92-4.91-6.14-1.23-3.69-2.46-3.69h-1.23v-9.82s-1.23-6.14-6.14-8.6-12.28-4.91-14.74-7.37-2.45-4.91-4.91-7.37-4.91-2.45-4.91-4.91,0-7.37,2.46-9.83a13.28,13.28,0,0,0,3.68-8.59v-6.14h-3.68s-7.37-6.15-9.83-9.83a34.27,34.27,0,0,1-3.68-7.37s-4.92,1.23-6.15-2.45-1.22,1.22-6.14,1.22-4.91-3.68-6.14-3.68-8.59,11.05-11,12.28-4.91,0-4.91,8.6,4.91,17.19,0,19.65S799.53,350.18,799.53,351.41Z" transform="translate(-193.59 -37)"><title>Iraque</title></path>
              <path id="Turquia" d="M847.43,267.89s-6.14-6.14-9.83-6.14,0-6.14-3.68-8.59-7.37-8.6-11.06-7.37-3.68,2.45-3.68,2.45-3.69-3.68-11,1.23-12.29,4.91-14.74,3.69-11.06,1.22-13.51,1.22-6.14-2.45-7.37-2.45-2.46,2.45-2.46,2.45-2.45-3.68-4.91-3.68-8.6-1.23-8.6-3.69-4.91-1.22-4.91-1.22-6.14-2.46-6.14-4.92-4.91,0-4.91,0-19.65-3.68-31.94,8.6c-3.68,3.69-4.91,3.69-7.36,3.69s-17.2-1.23-17.2-1.23a13.32,13.32,0,0,0,7.37,4.91c-7.37,1.23-9.82,1.23-7.37,2.46-2.45,1.22,1.23,2.45-6.14,2.45s-4.91-4.91-6.14-3.68,0,3.68-2.46,3.68-12.28-1.23-13.51,4.92,0,6.14,0,6.14h7.37s-1.22,4.91,0,4.91,3.69,3.68,2.46,3.68-3.68,2.46-1.23,3.69a9.52,9.52,0,0,0,3.69,1.23,6,6,0,0,1-4.92,0c-2.45-1.23-3.68-6.15-3.68,1.22,0,3.69,8.6,2.46,8.6,3.69s2.45,2.45,0,3.68,6.14,1.23,3.68,2.46,3.68,1.23,1.23,2.46,2.45,1.22,0,3.68,9.82-2.46,9.82,0-9.82,3.68-8.59,4.91,11-3.68,13.51-1.23,4.91,7.37,11.05,7.37c9.82,0,4.91-17.19,13.51-8.59,5.83,5.82,12.28,4.91,17.19,9.82s16-9.82,19.65-9.82,4.92,4.91,7.37,4.91,8.6-7.37,8.6-3.69-3.68,6.14-1.23,11.06,4.91-4.92,7.37-4.92-4.91-3.68-2.46-6.14,7.37,1.23,9.83,1.23,8.6-4.91,11.05-3.68,2.46,4.91,12.28,2.45,8.6-4.91,14.74-4.91,8.6-2.45,11.06-2.45a5.4,5.4,0,0,1,3.68,1.22s3.68-6.14,4.91-6.14,3.69,4.92,6.14,4.92,4.92-3.69,6.14-3.69,1.23,4.91,2.46,4.91,3.69-3.68,1.23-4.91-6.14-2.46-6.14-3.68S845,277.72,842.51,274s4.92-6.14,4.92-6.14" transform="translate(-193.59 -37)"><title>Turquia</title></path>
              <path id="Siria" d="M772.51,314.56a3.81,3.81,0,0,0-2.46,1.23c-1.23,1.23-2.45,4.91-3.68,4.91s-3.69,2.46-2.46,3.69,2.46,8.6,2.46,8.6,2.45-3.69,3.68-2.46,6.14,4.91,4.92,8.6-4.92,6.14-6.15,8.59-3.68,6.14-3.68,7.37a4.52,4.52,0,0,0,1.23,3.69c1.23,1.22,7.37,4.91,8.6,4.91s43-25.79,44.21-27,2.46-3.68,1.23-7.37-2.46-14.74-1.23-17.19,8.6-7.37,9.82-8.6-1.22-2.46-6.14,0-3.68,0-8.59,1.23-8.6,3.68-12.29,4.91-8.59,0-11.05-1.23-6.14,0-8.6,1.23-8.59-2.46-9.82-1.23-2.46,1.23-1.23,2.46S773.74,314.56,772.51,314.56Z" transform="translate(-193.59 -37)"><title>Síria</title></path>
              <path id="Ucrania" d="M730.75,135.25s2.46-2.45,4.91-1.23,3.69,2.46,6.15,2.46,4.91-6.14,8.59-1.23,4.91,4.92,6.14,4.92,4.92,0,7.37,1.22,6.14,0,9.83,3.69,4.91,6.14,2.45,9.82,1.23,6.14,1.23,6.14V166h-6.14s-2.46-2.46-3.68,0-4.92,4.91-4.92,6.14,3.69,1.23,2.46,2.45-14.74,6.14-19.65,7.37-7.37,6.14-9.83,6.14-8.59,2.46-6.14,4.92,7.37,2.45,7.37,3.68,1.23,2.46,3.69,2.46,2.45-2.46,4.91-2.46,6.14,0,6.14,2.46S748,204,745.49,202.8s-3.68-2.46-4.91,0-7.37,1.23-11.06,6.14-7.37-1.23-7.37-3.68,0-3.69-3.68-4.92-6.14-2.45-7.37-2.45,1.23-4.91,6.14-6.14,8.6-2.46,7.37-3.69-12.28,1.23-13.51,1.23-4.91-2.46-7.37-3.68,3.69-8.6-4.91-4.92S687.77,191.75,685.31,193s-4.91,3.68-9.83,4.91-8.59,1.23-7.36-1.23,6.14-11,6.14-12.28,9.82,1.23,9.82,0-1.23-6.14-4.91-7.37-2.46-3.68-4.91-4.91-2.46-4.92-2.46-7.37-8.6-1.23-11-2.46-6.14-3.68-11.06-2.45-8.59,4.91-11.05,4.91-6.14,2.45-8.6,2.45-1.23-2.45-3.68-2.45H607.94c-1.23,0-6.14-4.91-6.14-6.14s1.22-7.37,3.68-7.37-1.23-1.23-1.23-2.46,3.69-8.59,8.6-11,4.91-8.6,2.46-9.83-4.92-4.91-4.92-7.37,1.23,2.46,8.6-3.68,28.25,6.14,30.7,6.14,6.14-3.68,8.6-2.46,2.46,4.92,3.69,3.69,0-2.46,4.91-1.23,8.59-1.23,11.05,1.23-1.23-9.83,3.69-9.83,8.59,1.23,11,0,2.46-3.68,7.37-3.68,9.82,1.23,13.51,4.91-2.46,4.91,0,7.37,4.91,1.23,9.82,2.46,4.92,9.82,6.14,9.82Z" transform="translate(-193.59 -37)"><title>Ucrânia</title></path>
              <path id="Bielorussia" d="M610.39,118.06s2.46,1.23,6.14-1.23,7.37-3.68,12.28-2.46,18.43,7.37,20.88,7.37,4.92-2.45,7.37-2.45,3.69,3.68,4.92,2.45,2.45,0,4.91,0,8.59-1.23,9.82,0,1.23,0,1.23-3.68,2.46-4.91,4.91-4.91h7.37s-7.37-9.83-7.37-12.29,3.69,1.23,6.14,1.23,9.83-3.68,4.92-7.37S674.26,91,674.26,80,668.12,67.7,663.2,68.93s-3.68,0-4.91-1.23-9.82-4.91-13.51-2.45-2.46,4.91-4.91,4.91-2.46-1.23-3.69-1.23-7.37,3.69-4.91,4.91,2.46,2.46-1.23,3.69-4.91,6.14-4.91,7.37,3.68,2.45,1.23,3.68-2.46-1.23-4.91,0-6.14,3.69-14.74,3.69c1.23,3.68,7.37,12.28,2.45,16s-6.14,3.69-4.91,3.69S610.39,118.06,610.39,118.06Z" transform="translate(-193.59 -37)"><title>Bielorússia</title></path>
              <path id="Polonia" d="M601.8,88.58s7.36,9.83,7.36,13.51,0,4.91-7.36,9.83c4.91,3.68,7.36,4.91,7.36,7.37s1.23,7.37,3.69,8.59,3.68,4.92-1.23,8.6c-4.17,3.13-8.6,7.25-8.6,13.51,0,3.68-1.22,0-4.91-1.23s-4.91-1.23-9.82-1.23-7.37,2.46-9.83,2.46-2.46-3.68-7.37-3.68-9.82-1.23-12.28-4.92S549,134,546.53,136.48s-4.91,0-6.14-2.46-7.37-4.91-11.06-6.14-7.36-7.37-7.36-9.82,1.22-9.83-2.46-12.28,0-3.69,0-4.92-3.69-3.68-1.23-6.14,9.83-7.37,14.74-7.37,9.82-6.14,13.51-6.14,8.6,6.14,13.51,6.14,7.37-2.45,12.28-1.22S592,88.58,593.2,87.35,599.34,86.13,601.8,88.58Z" transform="translate(-193.59 -37)"><title>Polônia</title></path>
              <path id="Romenia" d="M607.94,167.18s17.19-1.22,18.42,0a4.5,4.5,0,0,0,3.68,1.23c1.23,0,8.6-2.45,9.83-2.45s6.14-3.69,7.37-3.69,7.37,7.37,9.82,11.06,8.6,11,8.6,16,1.23,4.91,1.23,7.37,0,3.68,1.23,3.68,12.28-1.22,13.51-2.45,1.22,7.37-2.46,8.6-7.37,3.68-6.14,7.36,0,7.37-4.91,3.69-13.55-6.17-18.43-1.23-29.74,3.29-33.16,1.23c-3-1.8-7.37-7.37-6.14-7.37s2.46-3.68,0-3.68-4.91,2.45-8.59-1.23-1.23-6.14-3.69-6.14-3.68-3.69-6.14-6.14-6.14-3.69-4.91-4.92,4.91-1.23,7.37-4.91,4.91-12.28,7.37-13.51S604.25,167.18,607.94,167.18Z" transform="translate(-193.59 -37)"><title>Romênia</title></path>
              <path id="Bulgaria" d="M611.62,213.85s1.23,4.92,11,6.15,22.11,1.22,24.57,0,6.14-4.92,9.82-4.92,9.83,4.92,12.28,4.92,6.14,0,4.92,1.22-9.83,6.14-8.6,9.83,8.6,8.6,4.91,9.82-6.14,0-8.59-1.22-2.46,0-6.15,2.45-3.68,8.6-11.05,7.37S638.64,244.56,630,247s-9.82,1.23-11-1.22-6.81-7.91-6.14-12.29,5.2-7.79,1.23-9.82C609.18,221.18,609.16,213.85,611.62,213.85Z" transform="translate(-193.59 -37)"><title>Bulgária</title></path>
              <path id="Alemanha" d="M517.05,94.72s-1.23,2.46,0,3.69,0,3.68-1.23,4.91,1.23,1.23,2.46,3.68,3.69,4.92,2.46,9.83,6.14,11,4.91,12.28-3.68-2.45-4.91-2.45-11.09,7.27-14.74,8.59c-3.13,1.13-4.23,2.93-6.14,1.23-.42-.37-2.51.79-1.23,2.46,2.36,3.05,2.7,4.86,6.14,7.37s14.74,9.82,12.28,11.05-8.59,3.68-8.59,7.37,3.68,6.14,1.22,6.14-2.45-3.69-6.14-2.46-7.37,3.69-9.82,3.69-3.69-3.69-6.14-2.46-2.46,6.14-4.92,3.69-2.45-3.69-4.91-2.46-4.91-1.23-8.6-1.23-11,2.46-12.28,0a13.53,13.53,0,0,1,0-9.82c1.23-2.46,7.37-6.15,3.69-7.37s-14.74-2.46-16-6.14-2.45-6.14-2.45-7.37,3.68-3.69,1.22-4.92-4.91-4.91-3.68-7.36,0-9.83,1.23-9.83,4.91,0,7.37-2.46,0-3.68-1.23-4.91,0-2.46,1.23-4.91,0-9.83,3.68-9.83,14.74,6.14,13.51,4.92-2.46-4.92-1.23-6.14,3.69-1.23,2.46-3.69,1.23-3.68,0-4.91-4.91-3.69-2.46-3.69,11.06,0,11.06,2.46,0,3.68,2.45,3.68,8.6,0,7.37,1.23-2.46,4.92,0,3.69,8.6-1.23,9.83-2.46,3.68-3.68,7.36-2.46S515.82,92.27,517.05,94.72Z" transform="translate(-193.59 -37)"><title>Alemanha</title></path>
              <path id="Italia" d="M449.5,191.75s11.06,1.23,12.29-1.23,3.68-6.14,6.14-2.46,4.91,4.92,4.91,2.46,2.46-7.37,3.68-4.91,4.92,2.45,6.14,1.22,0-3.68,0-3.68h3.69v-2.46h4.91s3.69-4.91,8.6-3.68,13.51,7.37,16,7.37-1.22,7.37,1.23,8.6-9.82,2.45-11,6.14-2.46,9.82,0,12.28,16,7.37,17.19,12.28,4.92,12.28,8.6,14.74,3.69,4.91,7.37,4.91,9.82-3.68,8.6,0-2.46,4.91,2.45,6.14,19.65,7.37,22.11,11,1.23,9.83-1.23,7.37-11.05-11.05-14.74-6.14-1.22,8.6,1.23,11.06a5.92,5.92,0,0,1,0,8.59c-2.45,2.46-6.14,11.06-8.6,11.06s-1.22-3.69-2.45-3.69-4.91,7.37-4.91,8.6,2.45,4.91,1.22,7.37-2.45,6.14-7.36,2.45-12.29-8.59-16-9.82-7.37-2.46-6.14-4.91,4.91-2.46,6.14-2.46,2.46-2.46,4.91,0,8.6,2.46,11.06,1.23,6.14-1.23,7.36-2.46a9.3,9.3,0,0,1,4.92-2.45c1.22,0,0-4.92,2.45-4.92s0-6.14-2.45-9.82-1.23-7.37-6.14-6.14-1.23-6.14-6.14-7.37-11.06-7.37-11.06-7.37l-8.6-1.23s-13.51-12.28-16-13.51-11.05-7.37-12.28-13.51-1.23-6.14-8.6-9.82-9.83-3.69-12.28,0-7.37,4.91-7.37,4.91v-3.69h-6.14s-3.69-6.14-2.46-9.82,3.69-3.69,2.46-6.14S448.28,194.2,449.5,191.75Z" transform="translate(-193.59 -37)"><title>Itália</title></path>
              <path id="Franca" d="M407.75,127.88s1.23,3.69,3.68,3.69,4.91,2.45,7.37,3.68,4.91,6.14,6.14,6.14,3.69-3.68,4.91-2.45,3.69,7.37,6.14,7.37h4.92a17.29,17.29,0,0,0,6.14,3.68c3.68,1.23,14.74,2.46,11.05,6.14s-4.91,11.05-2.46,14.74-4.91-2.46-9.82,7.37-4.91,11-2.46,9.82,7.37-5.06,7.37,0c0,1.23,1.23,2.61-1.23,2.46-1.72-.11-2.75,3.55-1.22,4.91,2,1.83,5.29,4.14,2.45,6.14-1.33.94-2.46,7,0,11.06a8.67,8.67,0,0,0,2.46,2.45h4.91v2.46s-8.6,9.82-13.51,9.82-12.28-6.14-19.65-4.91-12.28,4.91-11.05,9.83,1.23,4.91-6.14,4.91-13.51-6.14-17.2-6.14-7.37,4.91-23.33-4.91c3.68-12.29,6.14-13.51,6.14-20.88s-1.23-8.6,2.45-4.92,0-4.91-2.45-6.14,1.23-1.22,0-4.91-6.14-1.23-8.6-6.14-2.45-6.14,0-7.37-4.91-2.45-11.05-4.91S342.65,168.41,339,166s2.46-1.23,1.23-2.46-8.6-3.68,0-6.14,13.51-2.46,17.19,0,9.83,1.23,11.06,0-2.46-8.6-3.69-9.83,2.46-6.14,6.14-2.45,7.37,4.91,12.28,3.68,0-2.45,2.46-3.68,13.51-4.91,13.51-6.14-3.68-8.6,0-9.83S405.29,126.66,407.75,127.88Z" transform="translate(-193.59 -37)"><title>França</title></path>
              <path id="Suica" d="M454.42,173.33s-2.46,0-4.92,3.68-7.36,9.82-4.91,8.6,6.14-2.46,6.14-1.23,1.23,6.14,2.46,6.14,7.37,1.23,7.37,0,3.68-7.37,6.14-6.14,4.91,6.14,4.91,4.91,1.23-6.14,3.69-6.14,3.68,2.46,4.91,2.46,2.09-1.59,1.23-2.46h0l-1.23-1.23h4.91v-2.45L479,178.24s-2.46,1.23-2.46-2.46-1.22-3.68-3.68-3.68-1.23-1.23-3.69-1.23-8.59,1.23-9.82,1.23S456.87,173.33,454.42,173.33Z" transform="translate(-193.59 -37)"><title>Suíça</title></path>
              <path id="Austria" d="M481.44,173.33c-1.23-1.23-3.69-1.23-3.69,1.22s0,1.23,2.46,2.46a12.19,12.19,0,0,0,4.91,1.23l1.23,1.23h4.91s3.69-3.69,7.37-3.69,18.42,8.6,18.42,8.6h11.06s2.45-3.69,4.91-3.69,6.14,2.46,8.6,0,4.91-6.14,4.91-7.36-2.46-4.92,0-4.92h4.91v-3.68s-3.68-6.14-3.68-7.37v-1.23h-7.37s-1.23-2.46-4.91-2.46-6.15,2.46-8.6,3.69a9.29,9.29,0,0,1-4.91,1.23c-1.23,0-4.92,0-7.37,1.23s-6.14,3.68-4.92,6.14,2.46,6.14,1.23,6.14-4.91-2.46-6.14-2.46-7.37,3.69-9.82,3.69-4.92-2.46-6.14-2.46-2.46,3.68-3.69,3.68a4.51,4.51,0,0,1-3.68-1.22" transform="translate(-193.59 -37)"><title>Áustria</title></path>
              <path id="ReinoUnido" d="M327.92,140.17s3.68,1.22,4.91,0,3.68-4.92,7.37-4.92,3.68,2.46,4.91,2.46,2.46-6.14,6.14-6.14,4.91,2.45,8.6,2.45,7.37-4.91,11-4.91,3.69,2.46,11.06,1.23,14.73-2.46,14.73-4.91-6.14,0-7.37-2.46,7.37-7.37,8.6-8.6,2.46-9.82-2.45-9.82-11.06,3.68-12.29,2.45,1.23-2.45,2.46-3.68,1.23-4.91-1.23-4.91S382,96,383.18,96s-3.68-8.6-7.37-11-3.68,1.23-4.91-1.23l-2.45-4.91-1.23-6.14s-6.14-4.92-9.83-4.92-8.59,0-4.91-2.45S356.16,64,357.39,64s-3.68-1.23,0-3.69,8.6-11,7.37-12.28-16,0-16,0-6.15,2.46-3.69-1.22,9.83-9.83,8.6-9.83h-16s-4.91,4.91-4.91,6.14,1.23,2.46-1.23,2.46-2.46,2.45-1.23,3.68-1.23-1.23-1.23,0,3.69,1.23,2.46,3.69-7.37,6.14-7.37,9.82,7.37-4.91,8.6-3.68-2.46,6.14-2.46,8.59-3.68,8.6-2.45,8.6,4.91-4.91,4.91-3.68,2.46,0,1.23-1.23,0-3.69,1.23-3.69,2.45,2.46,2.45,3.69,0,4.91-1.23,6.14-2.45,4.91,0,4.91S345.11,80,347.57,80s6.14,0,4.91,1.22-6.14,2.46-3.68,6.14,7.36,0,6.14,3.69-2.46,6.14-1.23,7.37,0,2.45-2.46,2.45-6.14,1.23-7.37,1.23-4.91,2.46-4.91,3.69,4.91-2.46,4.91,1.22,0,4.92-3.68,7.37-9.83,4.92-6.14,6.14,4.91-3.68,6.14-1.22,2.45,1.22,3.68,1.22,3.69-1.22,3.69,1.23,9.82-3.68,9.82-2.45-3.68,7.37-8.59,7.37h-4.92S330.37,135.25,327.92,140.17Z" transform="translate(-193.59 -37)"><title>Reino Únido</title></path>
              <path id="Irlanda" d="M292.3,121.74s11.05-4.91,16-6.14,4.91-2.45,4.91-2.45h7.37s-1.23-4.92,1.23-6.15,0-13.5,1.22-14.73-2.45-8.6-7.36-4.92-4.92,4.92-7.37,1.23,0-3.68,1.22-4.91,1.23-8.6-2.45-6.14-8.6,6.14-6.14,6.14,6.14,0,3.68,2.46-4.91,3.68-7.37,3.68-6.14-4.91-8.59,1.23,6.14,1.23,1.22,4.91,0,4.91,2.46,4.91,7.37-1.22,3.68,1.23-8.59,7.37-6.14,7.37,4.92-2.46,7.37-2.46,2.46,1.23,0,2.46-8.59,2.46-11,4.91-1.23,4.92-2.46,4.92,1.23,0,4.92,1.22S287.39,121.74,292.3,121.74Z" transform="translate(-193.59 -37)"><title>Irlanda</title></path>
              <path id="Espanha" d="M363.53,224.91s12.28,8.59,17.2,9.82,9.82-2.45,12.28-1.23,9.82,6.15,14.74,6.15,8.59-2.46,7.37,1.22-9.83,8.6-16,11.06-7.37,4.91-12.28,11.05-11.06,13.51-7.37,16,6.14,1.22,1.23,6.14-4.92,11.05-7.37,12.28-6.14,0-8.6,4.91-3.68,6.14-14.74,6.14-11,0-14.73,2.46-7.37,4.91-11.06,4.91-9.82-13.51-12.28-13.51a43.31,43.31,0,0,1-7.37-1.23s-3.68-3.68,0-6.14,8.6-2.45,3.69-7.37,0-7.37,1.22-8.59-6.14-6.14-2.45-8.6,6.14-1.23,4.91-6.14,1.23-11,3.69-12.28,4.91-9.83-1.23-11.06-4.92,1.23-11.06,1.23-2.45-2.45-4.91-2.45-6.14,4.91-6.14,2.45,3.68-6.14,0-9.82-2.46-6.14,2.46-7.37,6.14-6.14,8.59-6.14,6.14,3.68,12.29,3.68,8.59-3.68,13.5-1.23,16,1.23,22.11,2.46,6.14-1.23,12.28,1.23" transform="translate(-193.59 -37)"><title>Espanha</title></path>
              <path id="Portugal" d="M292.3,244.56l4.91-2.46s1.23-1.23,1.23,0,0,1.23,3.69,1.23,8.59-2.46,11.05-1.23,6.14,4.91,2.46,7.37-4.92,6.14-6.15,9.83,2.46,7.37,0,8.59-7.36,2.46-4.91,6.14,3.69,3.69,1.23,6.14-1.23,4.92,1.23,7.37,1.23,4.92-2.46,6.14-3.68,6.15-2.45,8.6-6.15,1.23-8.6,1.23-6.14,0-3.69-4.91,3.69-11.06,1.23-12.28-9.82-3.69-6.14-8.6,7.37-12.28,7.37-16S296,248.24,292.3,244.56Z" transform="translate(-193.59 -37)"><title>Portugal</title></path>
              <path id="RepTcheca" d="M520.74,127.88c.6.37-13.49,8.54-16,9.83-1.54.8-4.52-.77-4.91,0-.31.6,1.91,2.6,2.45,3.68,1.23,2.46,9.83,7.37,13.51,11.06s3.69,6.14,7.37,4.91,7.37-4.91,12.29-4.91,6.14,2.45,6.14,2.45h6.14a27.74,27.74,0,0,0,4.91,1.23c1.23,0,7.37-4.91,8.6-7.37s1.22-2.45-2.46-4.91-4.91-6.14-7.37-6.14-4.91,2.46-8.6,1.23-3.68-4.92-6.14-6.14-7.37-3.69-8.59-3.69-1.23,3.69-2.46,2.46A29.13,29.13,0,0,0,520.74,127.88Z" transform="translate(-193.59 -37)"><title>República Tcheca</title></path>
              <path id="Hungria" d="M552.67,166v3.68H549c-1.22,0-2.45,1.23-1.22,2.46s-3.69,7.37-2.46,8.59,16,12.29,18.42,12.29,12.28-4.92,16-4.92a23.23,23.23,0,0,0,9.82-2.45,14.77,14.77,0,0,0,6.14-6.14c1.23-2.46,2.46-9.83,4.92-11.06a56.23,56.23,0,0,1,6.14-2.45s-4.91-3.69-6.14-4.92-2.46,0-3.69-1.22-8.59-1.23-11,0-6.14,3.68-8.6,3.68-9.82,1.23-11.05,3.68-3.69,3.69-6.14,2.46S557.58,166,552.67,166Z" transform="translate(-193.59 -37)"><title>Hungria</title></path>
              <path id="Eslovaquia" d="M549,157.36s2.46,6.14,4.92,7.37,4.91,2.45,6.14,3.68,4.91,0,6.14-2.45,8.6-3.69,11.05-3.69,7.37-4.91,12.28-4.91,9.83,2.46,11.06,2.46-1.23-3.69,0-4.92,0-3.68-4.92-4.91-11,0-14.73,1.23-4.92-2.46-7.37-2.46-7.37-2.45-11.06,1.23-6.14,7.37-8.59,7.37Z" transform="translate(-193.59 -37)"><title>Eslováquia</title></path>
              <path id="Moldavia" d="M648.47,161s16,17.2,17.19,22.11,2.46,11,2.46,11,2.45-11,4.91-11,7.37-1.23,8.6,0,1.22-1.23,0-2.46-4.92-2.45-6.15-3.68,0-1.23-1.22-2.46-3.69-3.68-3.69-6.14,0-3.68-2.45-3.68-9.83-1.23-11.06-2.46S653.38,159.82,648.47,161Z" transform="translate(-193.59 -37)"><title>Moldávia</title></path>
              <path id="Grecia" d="M654.61,243.33s0,7.37-8.6,7.37-7.37-2.46-9.83-2.46-8.59,1.23-12.28,1.23-6.14,0-7.37,1.23l-1.22,1.23h-4.92a9.21,9.21,0,0,0-3.68,3.68h-6.14v4.91s-9.83,8.6-7.37,11.06,6.14,6.14,7.37,6.14,2.45,2.45,1.23,3.68,1.22,6.14,2.45,6.14,9.83-2.45,14.74,0,8.6,4.92,6.14,4.92S619,290,616.53,290s-11-3.68-11,2.46,7.37,6.14,6.14,8.59,0,7.37,1.23,6.14,2.46-3.68,3.68-1.22,2.46,4.91,3.69,4.91,1.23-6.14,2.45-3.69,2.46,6.14,3.69,3.69-7.37-11.05-4.91-12.28,3.68,2.45,6.14,2.45-3.69-4.91-2.46-6.14,2.46-2.45,4.91-2.45,4.92,4.91,4.92,3.68c0-.54.9-2.77-2.46-6.14-4.27-4.28-12.93-10.05-12.28-9.83,1,.37,18.12,12.93,19.65,12.29,1.13-.48,0-6.14-3.69-8.6s-4.91-1.23-9.82-6.14-11.05-13.51-9.83-16,4.92-2.45,7.37,1.23,7.37,0,6.14-2.46,0-2.45,3.69-4.91,11-1.23,12.28-1.23,6.14,2.46,7.37,2.46S658.29,245.79,654.61,243.33Z" transform="translate(-193.59 -37)"><title>Grécia</title></path>
              <path id="Belgica" d="M413.89,124.2s7.37,2.46,9.82,1.23,2.46-3.69,7.37-1.23,4.91,1.23,4.91,1.23v4.91l3.69,2.46c3.68,2.45,2.46,4.91,1.23,4.91s-3.69,4.91-3.69,6.14-2.45,1.23-3.68-1.23-2.46-4.91-4.91-4.91c-1.23,0-3.69,2.46-4.92,1.23s-2.45-3.69-4.91-4.92-3.68-3.68-4.91-3.68-3.69-1.23-3.69-2.46A3.93,3.93,0,0,1,413.89,124.2Z" transform="translate(-193.59 -37)"><title>Bélgica</title></path>
              <path id="Holanda" d="M447.05,98.41h-9.83s-3.68,3.68-2.45,6.14,1.22,8.6,0,8.6-6.14-1.23-4.92-3.69,1.23-6.14-2.45,0-4.92,8.6-3.69,8.6,9.83-1.23,6.14,0-7.37,4.91-6.14,4.91,2.46-2.46,4.92-1.23,3.68,2.46,6.14,2.46h2.45v4.91h1.23v-2.45a13,13,0,0,0,0-7.37c-1.23-3.69,1.23-3.69,3.69-3.69s7.36-1.23,3.68-4.91,0-4.91,1.23-6.14S447.05,98.41,447.05,98.41Z" transform="translate(-193.59 -37)"><title>Holanda</title></path>
              <path id="Macedonia" d="M607.43,236.15a14.15,14.15,0,0,0-9.35,2c-1.91,1.22-3.65,2.93-3.65,5.14,0,4.91,3.68,11,7.37,11s6.14-3.68,8.59-3.68h4.92s1.22-2.46,2.45-2.46,0-1.23-2.45-4.91-2.46-6.14-4.92-6.14C608.54,237.19,610.17,236.49,607.43,236.15Z" transform="translate(-193.59 -37)"><title>Macedônia</title></path>
              <path id="Servia" d="M572.32,191.75s3.68,9.82,6.14,13.51-6.14,3.68-1.23,6.14,6.14,3.68,3.69,3.68,3.68,3.69,1.22,3.69-6.14-1.23,0,3.68,9.83,4.91,7.37,7.37-2.45,4.91,0,6.14,4.92,4.91,4.92,3.69,6.14-4.92,8.59-4.92a69.11,69.11,0,0,1,8.6,1.23,16.42,16.42,0,0,1,1.23-6.14c1.23-2.46,2.46-2.46,0-4.91a13.26,13.26,0,0,1-3.69-8.6,5.34,5.34,0,0,1,1.23-3.68s-2.45-1.23-1.23-2.46,2.46-3.68-1.22-2.46-3.69,0-6.14-1.22-3.69-6.15-4.92-6.15-6.14-8.59-9.82-9.82-7.37-2.46-14.74,1.23" transform="translate(-193.59 -37)"><title>Sérvia</title></path>
              <path id="Albania" d="M585.83,233.5l3.68,3.69,3.69,3.68S592,247,594.43,250.7a14.68,14.68,0,0,0,4.91,4.91v4.91s-6.14,4.92-7.37,7.37-8.6-3.68-8.6-7.37,1.23-8.59,1.23-11-1.23-6.14-2.46-7.37S583.37,232.28,585.83,233.5Z" transform="translate(-193.59 -37)"><title>Albânia</title></path>
              <path id="Montenegro" d="M578.46,221.22s8.6,7.37,9.83,7.37,0,1.23-1.23,2.46a1.69,1.69,0,0,0,0,2.45s-1.23-2.45-2.46-1.22-3.68,4.91-3.68,7.37-2.46,0-4.92-2.46-4.91-3.69-3.68-8.6S576,220,578.46,221.22Z" transform="translate(-193.59 -37)"><title>Montenegro</title></path>
              <path id="Bosnia" aria-label="Bosnia" d="M571.09,233.5c0-1.22-17.19-12.28-23.33-22.1s-8.6-9.83-6.14-12.28,6.14,4.91,6.14,3.68-1.23-3.68,3.68-3.68,8.6,2.45,11,2.45,4.92-1.23,8.6,1.23,6.14,1.23,6.14,2.46,0,2.45-2.45,3.68,2.45,3.69,2.45,3.69,3.69,1.22,2.46,1.22,0,2.46,1.23,3.69-2.46-1.23-2.46,0-1.23,1.23,0,2.46c-3.68,0-6.14,4.91-6.14,4.91Z" transform="translate(-193.59 -37)"><title>Bósnia</title></path>
              <path id="Croacia" d="M563.72,229.82s-11.05-7.37-14.74-7.37-13.5-8.6-12.28-9.82-2.45-2.46-3.68-6.14-3.69-9.83-7.37-4.92-6.14,2.46-6.14-1.23,1.23-3.68,1.23-3.68,2.45,2.46,4.91,1.23,3.68-4.91,4.91-2.46,1.23,2.46,3.69,2.46,2.45-3.69,3.68-3.69,3.69,0,1.23-3.68,0-2.46,2.46-3.69,1.22-6.14,6.14-2.45,11,9.82,13.51,9.82,9.82-1.22,9.82-1.22,3.69,8.59,4.91,9.82-2.45,1.23-3.68,0-2.46-2.46-6.14-2.46a21,21,0,0,1-8.6-1.22c-3.68-1.23-8.6-1.23-9.82,0l-1.23,1.22s-1.23-3.68-3.69-2.45-3.68,1.23-3.68,2.45,3.68,6.15,4.91,7.37,4.91,9.83,11.06,14.74S563.72,229.82,563.72,229.82Z" transform="translate(-193.59 -37)"><title>Croácia</title></path>
              <path id="Eslovenia" d="M518.28,185.61a27.74,27.74,0,0,0-1.23,4.91c0,1.23,1.23,1.23,2.46,2.46s1.23,3.68,2.46,3.68,1.22,1.23,3.68,0,2.46-3.68,3.68-3.68,2.46,3.68,3.69,3.68,2.46-1.23,3.68-2.46,2.46,0,2.46-1.22-3.68-4.92-2.46-4.92a9.38,9.38,0,0,0,4.92-2.45c1.22-1.23,2.45-3.69,1.22-3.69s-4.91,1.23-6.14,1.23-2.45-1.23-3.68-1.23-2.46,3.69-3.69,3.69Z" transform="translate(-193.59 -37)"><title>Eslovênia</title></path>
            </g>
          </svg>
        </section>
      </Container>
    );
  }
}

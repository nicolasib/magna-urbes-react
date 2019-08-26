import React, { Component } from 'react';

import { Container } from './styles';

import  api from '../../../../services/api';

import InputCity from '../InputCity';

export default class FormBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            century: '',
            country: '',
            name: '',
            population: undefined,
            citiesData: []
        };
    }

    handleCentury(event){   
        const inputValue = event.target.value;

        this.setState({ century: inputValue });
    }

    handleCountry(event){
        const inputValue = event.target.value;

        this.setState({ country: inputValue });
    }

    pushVector(){
        const name = this.state.name;
        const population = this.state.population;

        const object = { name: name, population: population };

        const auxVector = this.state.citiesData;

        auxVector.push(object);

        this.setState({ citiesData: auxVector });
    }

    handleCity(event){
        const inputValue = event.target.value;
        this.setState({ name: inputValue });

        if(this.state.name !== '' && this.state.population !== undefined && this.state.population > 0){
            this.pushVector();
        }
    }

    handlePopulation(event){
        const inputValue = event.target.value;
        this.setState({ population: inputValue });

        if(this.state.name !== '' && this.state.population !== undefined && this.state.population > 0){
            this.pushVector();
        }
    }

    handleSubmit(event){
        event.preventDefault();

        if(this.state.century === '') return window.alert('O campo de século é obrigatório!');
        if(this.state.country === '') return window.alert('O campo de país é obrigatório!');
        if(this.state.citiesData.length <= 0) return window.alert('É necessário ao menos uma cidade preenchida!');

        const citiesVector = this.state.citiesData;

        const data = {
            number: this.state.century,
            country: {
                name: this.state.country,
                cities: citiesVector
            }
        };

        try{
            api.post('admin/registerCentury', data).then(res => {
                if(res.data.error) return window.alert('Erro ao inserir no banco de dados!');

                this.props.history.push('/posRegister');
                
            })
        }catch(error){
            window.alert('Erro ao inserir no banco de dados!');
        }
    }

    render() {
        return (
            <Container>
                <form>
                    <input 
                        type="text"
                        placeholder="Século a ser registrado"
                        name="century"
                        value={this.state.century}
                        onChange={this.handleCentury.bind(this)}
                    />
                    <input
                        type="text"
                        placeholder="País a ser registrado neste século"
                        name="country"
                        value={this.state.country}
                        onChange={this.handleCountry.bind(this)}
                    />
                    <div>
                        <input 
                            type="text"
                            placeholder={`Nome da cidade`}
                            name={`City1`}
                            value={this.state.name}
                            onChange={this.handleCity.bind(this)}
                        />
                        <input
                            type="number"
                            placeholder="População"
                            name={`Pop1`}
                            value={this.state.population}
                            onKeyUp={() => { setInterval(this.handlePopulation.bind(this), 1500 )}}
                        />
                    </div>
                    <button onClick={this.handleSubmit.bind(this)}>Adicionar</button>
                </form>
            </Container>
        );
    }
}

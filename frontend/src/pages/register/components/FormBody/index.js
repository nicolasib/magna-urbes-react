import React, { Component } from 'react';

import { Container } from './styles';

import Axios from 'axios';

import InputCity from '../InputCity';

export default class FormBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            cities: ['0'],

            century: '',
            countryName: '',

            city1: null,
            city2: null,
            city3: null,
            city4: null,
            city5: null,
            city6: null,
            city7: null,
            city8: null,
            city9: null,
            city10: null,
            buttonTitle: `Adicionar cidade`
        };
    }

    addNewCity() {
        const aux = this.state.cities;
        let countAux = this.state.count + 1;

        if (countAux >= 9) {
            this.setState({ buttonTitle: 'Limite atingido' });
        }
        if (countAux >= 10) return;

        aux.push(countAux);

        this.setState({ cities: aux, count: countAux });
    }

    removeCity() {
        const aux = this.state.cities;
        let countAux = this.state.count - 1;
        let cityIndex = this.state.count;
        let city = `city${++cityIndex}`;

        aux.pop();

        this.setState({ cities: aux, count: countAux, [city]: null, buttonTitle: 'Adicionar cidade' });
    }

    handleCenturyChange(event) {
        this.setState({ century: event.target.value });
    }

    handleCountryChange(event) {
        this.setState({ countryName: event.target.value });
    }

    handleCityChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        const citiesArray = [];

        if (this.state.city1 != null) {
            citiesArray.push(this.state.city1);
        }
        if (this.state.city2 != null) {
            citiesArray.push(this.state.city2);
        }
        if (this.state.city3 != null) {
            citiesArray.push(this.state.city3);
        }
        if (this.state.city4 != null) {
            citiesArray.push(this.state.city4);
        }
        if (this.state.city5 != null) {
            citiesArray.push(this.state.city5);
        }
        if (this.state.city6 != null) {
            citiesArray.push(this.state.city6);
        }
        if (this.state.city7 != null) {
            citiesArray.push(this.state.city7);
        }
        if (this.state.city8 != null) {
            citiesArray.push(this.state.city8);
        }
        if (this.state.city9 != null) {
            citiesArray.push(this.state.city9);
        }
        if (this.state.city10 != null) {
            citiesArray.push(this.state.city10);
        }

        const req = {
            number: this.state.century,
            country: {
                name: this.state.countryName,
                cities: citiesArray
            }
        };

        Axios.post('http://localhost:8000/admin/registerCentury', req)
            .then(res => {
                window.alert(`Inserido com sucesso!`);
            })
            .catch(error => {
                window.alert(`Deu erro.`);
            });
    }

    render() {
        return (
            <Container>
                <form>
                    <span>Informações sobre o século</span>
                    <input type="text" placeholder="Século" onChange={this.handleCenturyChange.bind(this)} />
                    <span>Informações sobre o país</span>
                    <input type="text" placeholder="País" onChange={this.handleCountryChange.bind(this)} />
                    {this.state.cities.map((item, index) => {
                        if (++index > this.state.count && this.state.count != 0) {
                            return (
                                <InputCity
                                    key={index}
                                    remove={this.removeCity.bind(this)}
                                    count={index}
                                    lst="1"
                                    catchValue={this.handleCityChange.bind(this)}
                                />
                            );
                        } else {
                            return (
                                <InputCity key={index} count={index} catchValue={this.handleCityChange.bind(this)} />
                            );
                        }
                    })}
                    <button
                        onClick={e => {
                            e.preventDefault();
                            return this.addNewCity();
                        }}
                    >
                        {this.state.buttonTitle}
                    </button>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            return this.handleSubmit();
                        }}
                    >
                        Enviar
                    </button>
                </form>
            </Container>
        );
    }
}

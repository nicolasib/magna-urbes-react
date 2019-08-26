import React, { Component } from 'react';

import { Container } from './styles';

export default class InputCidade extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            population: undefined
        }
    }
    
    handleCity(event){
        const  inputValue = event.target.value;

        this.setState({ name: inputValue });
    
        this.props.handleCities(this.state);
    }

    handlePopulation(event){
        const inputValue = event.target.value;
        const data = this.state;
        this.setState({ population: inputValue });
        this.props.handleCities( data );
    }

    render() {
        return (
            <Container>
                <input 
                    type="text"
                    placeholder={`Nome da ${this.props.count} cidade`}
                    name={`City${this.props.count}`}
                    value={this.state.name}
                    onChange={this.handleCity.bind(this)}
                />
                <input 
                    type="number"
                    placeholder="População"
                    name={`Pop${this.props.count}`}
                    value={this.state.population}
                    onChange={this.handlePopulation.bind(this)}
                />
            </Container>
        );
    }
}

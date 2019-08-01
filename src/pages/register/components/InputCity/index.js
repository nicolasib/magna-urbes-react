import React, { Component } from 'react';

import { Container } from './styles';

import { MdClose } from 'react-icons/md';

export default class InputCidade extends Component {
    render() {
        return (
            <Container>
                <input
                    type="text"
                    id={this.props.count}
                    placeholder={`Cidade ${this.props.count}`}
                    onChange={this.props.catchValue}
                    name={`city${this.props.count}`}
                />
                {this.props.lst && (
                    <MdClose color="#f00" name={`city${this.props.count}`} onClick={this.props.remove} />
                )}
            </Container>
        );
    }
}

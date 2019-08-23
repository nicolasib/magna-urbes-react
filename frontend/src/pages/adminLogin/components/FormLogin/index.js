import React, { Component } from 'react';

import { Container } from './styles';

import api from '../../../../services/api';

export default class FormLogin extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: '',
            pass: '',
            errorText: ''
        }
    }

    handleUser(event){
        const value = event.target.value;
        this.setState({user: value});
    }

    handlePass(event){
        const  value = event.target.value;
        this.setState({pass: value});
    }

    handleSubmit(event){
        event.preventDefault();
        const user = this.state.user;
        const pass = this.state.pass;
        
        api.post('admin/loginAdmin', {user, pass}).then(res => {
            if(!res.data.error){
                const id = res.data._id;
                this.props.history.push(`/register?id=${id}`);
            }else{
                this.setState({errorText: 'Erro! Tente novamente!'});
            }

                                    
        });
    }

    render() {
        return (
            <Container>
                <form>
                    <input 
                        placeholder="Usuário" 
                        type="text" 
                        name="user"
                        onChange={this.handleUser.bind(this)}
                    />
                    <input 
                        placeholder="Senha" 
                        type="password" 
                        name="pass"
                        onChange={this.handlePass.bind(this)}
                    />
                    <button onClick={this.handleSubmit.bind(this)}>Enviar</button>
                    <span>{this.state.errorText}</span>
                </form>
            </Container>
        );
  }
}

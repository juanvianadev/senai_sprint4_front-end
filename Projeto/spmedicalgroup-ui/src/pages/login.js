import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from '../../services/auth';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : '',
            erroMensagem : '',
            isLoading : false
        }
    };
render(){
    return(
<section>
    <div>
        <input
            // E-mail
            type="text"
            name="email"
            // Define que o input email recebe o valor do state email
            value={this.state.email}
            // Faz a chamada para a função que atualiza o state, conforme o usuário altera o valor do input
            onChange={this.atualizaStateCampo}
            placeholder="username"/>
        </div>
    </section>
    )
};
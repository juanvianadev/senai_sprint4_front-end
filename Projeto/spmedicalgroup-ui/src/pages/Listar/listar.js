import { Component } from 'react';
import ReactDom from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

class Listar extends Component{
    s
    constructor(props){
        super(props);
        this.state = {
            listarConculta : [],
            titulo : ''
        }
    }
    buscarLista = () => {
        console.log('Agora vamos fazer a chamada para a API')
    }

    componentDidMount(){
        this.buscarLista();
    }

    render(){
        return(
            <section>
                <h2>Lista de Consultas</h2>
                <thead>
                    <th>#</th>
                    <th>Título</th>
                </thead>

                <tbody>
                    {
                        this.state.listarConculta.map(() =>{
                            return(
                                <tr>
                                    <td>1</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </section>
        );
    }
}

export default Listar; 
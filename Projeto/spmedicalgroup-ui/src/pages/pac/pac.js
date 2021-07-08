import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'

// import '../../assets/css/style.css'


export default function ConsultaPaciente(){

    // setStates para a listagem das consultas
    const [ listaConsultas, setConsulta ] = useState( [] )   
    

    // buscar consultas do usuário (paciente)
    function getConsultas(){
        axios.get('http://localhost:5000/api/consulta/minhas', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        
        .then(resposta => {
            if (resposta.status === 200) {
                
                setConsulta(resposta.data)
            }
        })   
        .catch(erro => console.log(erro));
    }       
    
    // funções para ciclos de vida 
    useEffect( getConsultas, [] )  
   

    return(     

        <div>
            
            <header>            
                <h1 className="titulo">Paciente - Histórico de Consultas <br/> 
                    <Link to='/Login' className="material-icons">Sair</Link>
                </h1>
            </header>
    
            <section>
    
                <h2 className="sub-titulo">Histórico de Consultas</h2>
    
                <table>
                    
                    <thead>
    
                            <tr>
                                <th>Paciente</th>
                                <th>Médico</th>
                                <th>Especialidade</th>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Status</th>
                                <th>Atendimento</th>                 
                            </tr>
                            
                    </thead>
    
    
                    <tbody>                   
                        {
                            listaConsultas.map((consulta) => {
                                return(
                                    <tr key={consulta.idConsulta}> 
                                        <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                        <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                                        <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.descricaoEspecialidade}</td>
                                        <td>{new Date(consulta.dataConsulta).toLocaleDateString()}</td>
                                        <td>{consulta.horarioConsulta}</td>
                                        <td>{consulta.idStatusConsultaNavigation.descricaoStatusConsulta}</td>
                                        <td>{consulta.descricaoAtendimento}</td>
                                    </tr>
                                )
                            })
                        }                          
                    </tbody>
    
                </table>
    
            </section>
    
        </div>
    
    )
}
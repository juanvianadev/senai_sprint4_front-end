import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

// import '../../assets/css/style.css';

export default function Adm() {


    // states para o cadastro das consultas
    const [idPaciente, setIdPaciente] = useState(0)

    const [idMedico, setIdMedico] = useState(0)

    const [idStatusConsulta, setIdStatusConsulta] = useState(0)

    const [dataConsulta, setDataConsulta] = useState(new Date())

    const [horarioConsulta, setHorarioConsulta] = useState('')

    const [isLoading, setIsLoading] = useState(false)


    // setStates para a listagem das consultas
    const [listaConsultas, setListaConsultas] = useState([])

    const [listaMedicos, setListaMedicos] = useState([])

    const [listaPacientes, setListaPacientes] = useState([])


    //funções

    // buscar todas consultas cadastradas
    function getConsultas() {
        axios.get('http://localhost:5000/api/consulta', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {

                    setListaConsultas(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    // buscar médico
    function getMedicos() {
        axios.get('http://localhost:5000/api/medico', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {

                    setListaMedicos(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    // buscar paciente
    function getPacientes() {
        axios.get('http://localhost:5000/api/paciente', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {

                    setListaPacientes(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    // cadastrar consultas
    function postConsultas(event) {

        event.preventDefault()

        setIsLoading(true)

        axios.post('http://localhost:5000/api/consulta', {

            idPaciente: idPaciente,
            idMedico: idMedico,
            dataConsulta: new Date(dataConsulta),
            horarioConsulta: horarioConsulta,
            idStatusConsulta: idStatusConsulta,
            descricaoAtendimento: ' - - - - N/A - - - - '

        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {

                if (resposta.status === 201) {

                    console.log('Consulta cadastrada!')

                    setIsLoading(false)

                    getConsultas();
                }
            })

            .catch(erro => {
                console.log(erro)
                setIsLoading(false)
            })

    };

    // funções para ciclos de vida 
    useEffect(getConsultas, [])

    useEffect(getMedicos, [])

    useEffect(getPacientes, [])


    return (

        <div className="pg-adm">

            <header>
                <h1 className="titulo">Adiministrador - Gerenciamento de Consultas <br />
                    <Link to='/Login' >Sair</Link>
                </h1>
            </header>


            <div className="conteudo-adm">

                <section className="cadastro">

                    <h2 className="sub-titulo">Cadastro de Consultas</h2>

                    <form id="cadastro-consulta" onSubmit={postConsultas}>

                        <div className="campos">

                            <p>Paciente</p>

                            <select

                                name="idPaciente"
                                value={idPaciente}
                                onChange={(event) => setIdPaciente(event.target.value)}
                            >
                                <option value="0">Paciente</option>

                                {
                                    listaPacientes.map(paciente => {
                                        return (
                                            <option key={paciente.idPaciente} value={paciente.idPaciente}>
                                                {paciente.nomePaciente}
                                            </option>
                                        )
                                    })
                                }

                            </select>

                        </div>

                        <div className="campos">

                            <p>Médico</p>

                            <select

                                name="idMedico"
                                value={idMedico}
                                onChange={(event) => setIdMedico(event.target.value)}
                            >
                                <option value="0">Médico</option>

                                {
                                    listaMedicos.map(medico => {
                                        return (
                                            <option
                                                key={medico.idMedico}
                                                value={medico.idMedico}>
                                                {medico.nomeMedico} - {medico.idEspecialidadeNavigation.descricaoEspecialidade}
                                            </option>
                                        )
                                    })
                                }

                            </select>

                        </div>

                        <div className="campos">

                            <p>Data</p>

                            <input

                                type="date"
                                name="dataConsulta"
                                value={dataConsulta}
                                onChange={(event) => setDataConsulta(event.target.value)}
                                placeholder="Data Consulta"

                            />

                        </div>

                        <div className="campos">

                            <p>Horário</p>

                            <input

                                type="time"
                                name="horarioConsulta"
                                value={horarioConsulta}
                                onChange={(event) => setHorarioConsulta(event.target.value)}
                                placeholder="Horário"

                            />

                        </div>

                        <div className="campos">

                            <p>Status</p>

                            <select
                                name="idStatusConsulta"
                                value={idStatusConsulta}
                                onChange={(event) => setIdStatusConsulta(event.target.value)}

                            >
                                <option value="1">Agendado</option>
                                <option value="2">Cancelado</option>
                                <option value="3">Realizado</option>

                            </select>

                        </div>

                        <div id="btn-cadastrar">
                            {
                                isLoading === true &&
                                <button id="btn-adm" type="submit" disabled>
                                    Loading...
                                </button>
                            }



                            {
                                isLoading === false &&
                                <button id="btn-salvar-consultas" className="material-icons" type="submit">
                                    check
                                </button>
                            }
                        </div>




                    </form>

                </section>

                <hr />

                <section id="historico-consulta">

                    <h2 className="sub-titulo">Histórico de Consultas </h2>

                    <table id="adm-list">

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
                                    return (
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
        </div>

    )
}

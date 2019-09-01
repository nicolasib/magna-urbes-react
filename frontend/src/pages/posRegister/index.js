import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import api from '../../services/api';

const PosRegister = () => {

    const [ bdData, setBdData ] = useState({});
    const [ country, setCountry ] = useState({});
    
    function reqBd( setBdData, setCountry ){
        api.post('admin/consultCentury', { query: 'last' }).then( res => {
            const requisition = res.data[0];
            setBdData(requisition);
            let data = res.data[0].country;
            setCountry(data);
        });
    }

    useEffect(()=>{
        reqBd(setBdData, setCountry);
    }, []);

  return (
    <Container>
        <strong>Registro adicionado com sucesso!</strong>
        <table>
            <thead>
                <tr>
                    <th>Século</th>
                    <th>País</th>
                    <th>Cidades</th>
                    <th>População</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{bdData.number}</td>
                    <td>{country.name}</td>
                    <td>{country.cities && country.cities.map((value, index) => {
                        return (
                            <div key={index}> { value.name } </div>
                        )
                    })}</td>
                    <td>{country.cities && country.cities.map((value, index) => {
                        return (
                            <div key={index}> { value.population } </div>
                        )
                    })}</td>
                </tr>
            </tbody>
        </table>

    </Container>
  );
}

export default PosRegister;
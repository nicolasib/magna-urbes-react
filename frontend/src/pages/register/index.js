import React from 'react';
import { useEffect } from 'react';

import api from '../../services/api';

import Header from '../global/Header';
import FormBody from './components/FormBody';

export default function Register ({ history }) {

    useEffect(() => {
        async function action() {
            const url = window.location.href;

            const userIndex = url.lastIndexOf('=');
            
            if(userIndex === -1) return history.push('/adminLogin');

            const user = url.slice(userIndex + 1);

            const req = await api.post('admin/validateUser', { user }).then(res => {
                if(!res.data.error){
                    return res.data
                }else{
                    return 0;
                }
            });

            if(req === 0) return history.push('/adminLogin');

            const idExists = url.indexOf(req._id);

            if(idExists === -1) return history.push('/adminLogin');
        }

        action();
    },[]);

    return (
        <>
            <Header/>
            <FormBody/>
        </>
    );
}

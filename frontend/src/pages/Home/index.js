import React, { Component } from 'react';

import MainSection from './components/MainSection';
import BoutSection from './components/BoutSection';

import animatedScrollTo from 'animated-scroll-to';

export default class Home extends Component {  
    
    constructor(props){
        super(props);
        this.state = {
            boutSection: document.querySelector('#bout')
        }
    }

    render() {
        return (
            <>
                <MainSection handleScroll={ animatedScrollTo } goTo={ BoutSection }/>
                <BoutSection id="bout"/>
            </>
        );
    }
}

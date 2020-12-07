import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InfiniteDeck from './infiniteDeck.jsx'
import StockPage from './stockPage.jsx'

export default class ExploreFeed extends Component{
    constructor(props){
        super(props);
        this.state = {currentDisp: "default"}
        this.goToProfile = this.goToProfile.bind(this)
    }

    goToProfile(stock){
        this.setState({currentDisp: stock})
    }

    render(){
    return (
        (this.state.currentDisp == "default") ?
                <InfiniteDeck onCardClick={this.goToProfile}/> : <StockPage stock={this.state.currentDisp}/>
        )
    }
}

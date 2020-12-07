import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './card.jsx';

export default class InfiniteDeck extends Component{
    constructor(props){
        super(props);
    }

    render(){
    return (
        <div style={deckStyle.deckDiv}>
            <Card heading={"Sample Stock Page"}
                text={"This is a sample stock page."}
                redirect={this.goToPage}
                onCardClick={this.props.onCardClick}/>
            <Card heading={"Sample Stock Page 2"}
                text={"This is a second sample stock page."}
                redirect={this.goToPage}
                onCardClick={this.props.onCardClick}/>
            <Card heading={"Sample Stock Page 3"}
                text={"This is a third sample stock page."}
                redirect={this.goToPage}
                onCardClick={this.props.onCardClick}/>
            <Card heading={"Stock Prattle Team"}
                text={"Explore is coming soon!"}
                redirect={this.goToPage}
                onCardClick={this.props.onCardClick}/>
        </div>
        )
    }
}

const deckStyle= { deckDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        padding: "20px",
        gap: "45px",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "rgba(229, 229, 229, 0.6)",
        overflow: "scroll",
        margin: "10px",
        borderRadius: "10px"
    }
}

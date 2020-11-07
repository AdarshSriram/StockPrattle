import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Watchlist extends Component{
    constructor(props){
        super(props);
    }

    render(){
    return (
        <div style={watchlistStyle.mainDiv}>
            <p style={watchlistStyle.headingText}>Watchlist</p>
        </div>
        )
    }
}

const watchlistStyle= { mainDiv: {
        height: "100%",
        width: "300px",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        boxSizing: "border-box",
        background: "none",
        border: "1px solid #00B140",
        borderRadius: "15px",
        marginRight: "10px"
    }, headingText:{
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "24px",
        textDecoration: "underline",
        margin: "0px"
    }
}

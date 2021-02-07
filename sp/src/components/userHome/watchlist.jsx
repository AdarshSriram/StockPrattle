import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {getWatchList} from '../../firebase_functions.js';
import { getStocksData } from './stock_functions.js';

export default class Watchlist extends Component{
    constructor(props){
        super(props);
        this.state = {ls:[]}
    }

    componentDidMount(){
        getWatchList().then(res=>{
            getStocksData(res).then(
                restwo=>{
                    if (!restwo) this.setState({ls: []}, this.componentDidMount)
                    else this.setState({ls: restwo})
                })
        })
    }

    render(){
    return (
        <div style={watchlistStyle.mainDiv}>
            <p style={watchlistStyle.headingText}>Followed Stocks</p>
            {this.state.ls.map((i, index) =>
                <p key={index} style={watchlistStyle.instrumentIdentifier}>{i.INSTRUMENTIDENTIFIER}<p style={{color: (index%2==0) ? '#00B140':"#E21010", margin: 0}}>{i.OPEN}</p></p>
            )}
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
    }, instrumentIdentifier: {
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        display: "flex",
        flexDirection: "row",
        gap: "10px"
    }
}

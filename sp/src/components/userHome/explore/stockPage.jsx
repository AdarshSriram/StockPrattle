import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StockGraph from './stockGraph.jsx';
import UserFeed from '../userFeed.jsx';

export default class StockPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
    return (
        <div style={stockStyle.centerDiv}>
            <div style={stockStyle.topDiv}>
                <StockGraph />
                <div style={stockStyle.stockDetails}>
                    <p style = {stockStyle.text}><b>Previous Close:</b> $$$</p>
                    <p style = {stockStyle.text}><b>Open:</b> $$$</p>
                    <p style = {stockStyle.text}><b>Low:</b> $$$</p>
                    <p style = {stockStyle.text}><b>High:</b> $$$</p>
                    <p style = {stockStyle.text}><b>Volume:</b> $$$</p>
                    <p style = {stockStyle.text}><b>SP Predictor:</b> $$$</p>
                </div>
            </div>
            <UserFeed user={null}/>
        </div>
        )
    }
}

const stockStyle= { centerDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        overflow: "scroll",
        margin: "10px",
        background: "none",
        borderRadius: "10px"
    }, topDiv: {
        height: "300px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "thin solid lightGray",
        boxSizing: "border-box",
        background: "#FFFFFF",
        borderRadius: "10px"
        // overflow: "scroll"
    }, bottomDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        // overflow: "scroll"
    }, stockDetails: {
        height: "100%",
        width: "200px",
        display: "flex",
        padding: "15px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "15px",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        // overflow: "scroll"
    }, text:{
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        // fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        borderRadius: "10px"
    }
}

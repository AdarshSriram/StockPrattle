import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StockGraph from './stockGraph.jsx';

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
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <div style={stockStyle.bottomDiv}>
            </div>
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
        background: "rgba(229, 229, 229, 0.6)",
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        // overflow: "scroll"
    }
}

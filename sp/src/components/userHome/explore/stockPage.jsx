import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StockGraph from './stockGraph.jsx';
import UserFeed from '../userFeed.jsx';

export default class StockPage extends Component{
    constructor(props){
        super(props);
        this.state = {following: props.following}
        this.followMouseIn = this.followMouseIn.bind(this)
        this.followMouseOut = this.followMouseOut.bind(this)
        this.followUnfollow = this.followUnfollow.bind(this)
    }

    followMouseIn(but) {
        if (this.state.following) {
            but.target.style.background = "#00B140";
            but.target.style.color = "#FFFFFF";
        } else {
            but.target.style.background = "#009435";
        }
    }

    followMouseOut(but) {
        if (this.state.following) {
            but.target.style.background = "#FFFFFF";
            but.target.style.color = "#00B140";
        } else {
            but.target.style.background = "#00B140";
        }
    }

    followUnfollow() {
        this.setState({ following: !this.state.following })
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
                    <button style={{
                        background: (this.state.following) ? "#FFFFFF" : "#00B140",
                        width: "80px",
                        height: "35px",
                        borderRadius: "15px",
                        border: (this.state.following) ? "1px dashed #00B140" : "0px dashed #FFFFFF",
                        color: (this.state.following) ? "#00B140" : "#FFFFFF",
                        fontFamily: "Dosis",
                        fontStyle: "normal",
                        fontWeight: "bold",
                        fontSize: "18px",
                        outline: "none",
                        cursor: "pointer"
                    }} onClick={this.followUnfollow}
                        onMouseOver={this.followMouseIn} onMouseLeave={this.followMouseOut}>{(this.state.following) ? "Unfollow" : "Follow"}</button>
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
        alignItems: "center",
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

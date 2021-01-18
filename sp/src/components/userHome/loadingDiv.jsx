import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class LoadingScreen extends Component{
    constructor(props){
        super(props);
        this.state = {intervalID: null}
    }

    componentDidMount(){
        const id = setInterval(this.flicker, 500)
        this.setState({intervalID: id})
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalID)
    }

    flicker(){
        var img = document.getElementById("loadingImage")
        if (img==null){return}
        if(img.style.visibility == 'hidden'){
            img.style.visibility = 'visible';
        }else{
            img.style.visibility = 'hidden';
        }
    }

    render(){
        return (
            <div style={loadingStyle.centerDiv}>
                <img id="loadingImage" src={require("../../images/LogoGreen.png")} alt="Stock Prattle Logo" style={{
                    height: "133.75px",
                    width: "138.75px"}}/>
            </div>
        )
    }
}

const loadingStyle = {centerDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "rgba(229, 229, 229, 0.3)",
        overflow: "scroll",
        margin: "10px",
        borderRadius: "10px"
    }
}

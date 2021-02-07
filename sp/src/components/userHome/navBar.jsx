import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {bellSvg, settingsSvg} from './svgs.jsx';
import Ticker from 'react-ticker';
import { getStocksData } from './stock_functions.js';
import { allUsers } from '../../firebase_functions.js'

export default class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {sbItems: [], searchItems: (props.instruments==null) ? [] : props.instruments}
    }

    componentDidMount(){
        if (this.state.sbItems.length == 0){
            getStocksData(null).then(restwo=>{
                if (!restwo) this.setState({sbItems: []}, this.componentDidMount)
                else this.setState({sbItems: restwo})
            })
        }
        allUsers().then(res => this.setState({searchItems: this.state.searchItems.concat(res)}))
    }

    goTo(){
        var elem= document.getElementById("searchBar")
        const search = elem.value
        var found = false
        for (var obj of this.state.searchItems){
            if (search==obj){
                this.props.goTo(obj, true)
                found = found || true
            } else if (search==obj.username){
                this.props.goTo(obj.email, false)
                found = found || true
            } else if (search==obj.fullname){
                this.props.goTo(obj.email, false)
                found = found || true
            }
        }
        elem.value= null
        if (!found){
            alert("No Such Page Exists!")
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.instruments != this.props.instruments){
            this.setState({searchItems: this.props.instruments}, this.componentDidMount)
        }
    }

    mouseIn(but){
        but.target.style.background = '#00B140';
        but.target.style.color = '#FFFFFF';
    }

    mouseOut(but){
        but.target.style.background = 'none';
        but.target.style.color = '#00B140';
    }

    render(){
        var optList = []; var item;
        for (var i=0; i<this.state.searchItems.length; i++){
            item = this.state.searchItems[i]
            if (typeof item == 'string' || item instanceof String){
                optList.push(<option id={i} value={item}/>)
            } else {
                optList.push(<option id={i} value={item.username}/>)
                optList.push(<option id={i.email} value={item.fullname}/>)
            }
        }
    return (
        <div id="header" style={navBarStyle.header}>
        <div id="logoDiv" style={navBarStyle.logoDiv}>
            <img src={require("../../images/LogoGreen.png")} alt="Stock Prattle Logo" style={navBarStyle.logo}/>
        </div>
        <div id="headerFunction" style={navBarStyle.headerFunction}>
            <div id="otherHeaderStuff" style={navBarStyle.otherHeaderStuff}>
                <div id="searchDiv" style={navBarStyle.searchDiv}>
                    <form style={navBarStyle.searchBar} onSubmit={(event) => {
                            event.preventDefault();
                            this.goTo();
                        }}>
                        <input id="searchBar" type="search" list="searchItems" placeholder = "Search People or Stocks" style={navBarStyle.searchInput}/>
                            <datalist id= "searchItems">
                                {optList}
                            </datalist>
                        <input id="searchSubmit" type="submit" value="➥"  style={navBarStyle.goButton}
                        onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}/>
                    </form>
                </div>
                <button style={navBarStyle.button}>
                    {bellSvg}
                </button>
                <button style={navBarStyle.button}>
                    {settingsSvg}
                </button>
                <button id="accountButton" style={navBarStyle.button} onMouseOver={this.mouseIn}
                onMouseLeave={this.mouseOut} onClick={this.accountClick}>Help</button>
                <button id="accountButton" style={navBarStyle.button} onMouseOver={this.mouseIn}
                onMouseLeave={this.mouseOut} onClick={this.accountClick}>Contact Us</button>
                <div id="dropDown"/>
            </div>
        <marquee style={navBarStyle.stockTicker}>
        <div id="stockBar" style={navBarStyle.stockBar}>
            {this.state.sbItems.map((i, index) => (
                <p key={index} style={navBarStyle.sbTitle}>{i.INSTRUMENTIDENTIFIER}<p style={{color: (index%2==0) ? '#00B140':"#E21010", margin: 0}}>{i.OPEN}</p></p>
            ))}
        </div>
        </marquee>
        </div>
        </div>
        )
    }
}

const navBarStyle= { header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "140px",
        boxSizing: "border-box",
        background: "none",
        overflow: "none",
        // border: "thick solid black",
    }, headerFunction: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        height: "100%",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        marginRight: "10px",
        overflow: "hidden"
    }, stockTicker: {
        height: "50px",
        marginBottom: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "20px",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "rgba(229, 229, 229, 0.6)",
        borderRadius: "20px",
        overflow: "scroll"
    }, stockBar: {
        height: "50px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "20px",
        // border: "thick solid black",
        boxSizing: "border-box",
        backgroundColor: "none",
        borderRadius: "20px",
    }, otherHeaderStuff: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    },searchDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    }, logoDiv: {
        height: "150px",
        width: "190px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    },logo: {
        height: "133.75px",
        width: "138.75px"
    }, searchBar:{
        width: "80%",
        height: "40px",
        // paddingLeft: "10px",
        background: "rgba(0, 177, 64, 0.05)",
        border: "1px solid #00B140",
        boxSizing: "border-box",
        borderRadius: "50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
        // margin: "0px"
    }, searchInput: {
        width: "90%",
        height: "100%",
        background: "none",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        textAlign: "center",
        outline: "none",
        borderRadius: "25px 0 0 25px",
        borderWidth: "0px"
    }, button: {
        background: "none",
        width: "130px",
        height: "45px",
        marginRight: "30px",
        borderRadius: "30px",
        borderWidth: "0px",
        color: "#00B140",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        cursor: "pointer",
        // border: "thick solid black",
    }, sbTitle: {
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        display: "flex",
        flexDirection: "row",
        gap: "10px"
    }, goButton: {
        background: "none",
        width: "10%",
        height: "100%",
        borderRadius: "0 25px 25px 0",
        border: "none",
        color: "#00B140",
        fontStyle: "normal",
        fontSize: "30px",
        outline: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}

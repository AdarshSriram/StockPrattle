import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './card.jsx';
import { getSnapshot } from '../stock_functions.js';
import LoadingScreen from "../loadingDiv.jsx"

export default class InfiniteDeck extends Component{
    constructor(props){
        super(props);
        this.state = {data: null, items: null}
        this.checkAndFetch = this.checkAndFetch.bind(this)
    }

    componentDidMount(event){
        getSnapshot().then(res => {
            if (res == null) this.setState({data: [], items: [], over: true})
            else if (res.length < 10) this.setState({data: res, items: res, over: true})
            else this.setState({data: res, items: res.slice(0, 10), over: false})
        })
    }

    checkAndFetch(event){
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            var i = this.state.items.length - 1
            if (i + 10 >= this.state.data.length) this.setState({ items: this.state.data, over: true })
            else this.setState({ items: this.state.items.concat(this.state.data.slice(i, i + 10)) })
        }
    }

    render(){
        console.log("rendering")
        console.log(this.state.items)
        if (this.state.items==null) return (<LoadingScreen/>)
        var ls = []
        for (var ind =0;  ind<this.state.items.length-4; ind+=4){
            ls.push(
                <div name="pack" id={ind} style={deckStyle.packDiv}>
                    <Card item={this.state.items[ind]} onCardClick={this.props.onCardClick}/>
                    <Card item={this.state.items[ind+1]} onCardClick={this.props.onCardClick}/>
                    <Card item={this.state.items[ind+2]} onCardClick={this.props.onCardClick}/>
                    <Card item={this.state.items[ind+3]} onCardClick={this.props.onCardClick}/>
                </div>
            )
        }
        var subls = []
        for (var subind =ind;  subind<this.state.items.length; subind++){
            subls.push(
                <Card item={this.state.items[subind]} onCardClick={this.props.onCardClick}/>
            )
        }
        ls.push(
            <div name="pack" id={ind} style={deckStyle.packDiv}>
                {subls}
            </div>
        )
        return (
            <div style={deckStyle.deckDiv} onScroll={this.checkAndFetch}>
                {ls}
                <p style={deckStyle.loading}>{(this.state.over) ? "You have reached the end of your explore!" : "Loading..."}</p>
            </div>
        )
    }
}

const deckStyle= { deckDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "rgba(229, 229, 229, 0.3)",
        overflowY: "scroll",
        overflowX: "hidden",
        margin: "10px",
        borderRadius: "10px"
    }, packDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        gap: "45px",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        margin: "10px",
        borderRadius: "10px"
    }, loading: {
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        // fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        borderRadius: "10px"
    }
}

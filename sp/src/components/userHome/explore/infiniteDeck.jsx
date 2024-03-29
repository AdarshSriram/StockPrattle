import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './card.jsx';
import { getSnapshot2, getSnapshot } from '../stock_functions.js';
import LoadingScreen from "../loadingDiv.jsx"

export default class InfiniteDeck extends Component {
    constructor(props) {
        super(props);
        this.state = { data: this.props.snap, items: null }
        this.checkAndFetch = this.checkAndFetch.bind(this)
    }

    componentDidMount(event) {
        if (this.state.data!=null){
            if (this.state.data.length < 12) this.setState({items: this.state.data, over: true })
            else this.setState({items: this.state.data.slice(0, 12), over: false })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.snap != this.props.snap) this.setState({data: this.props.snap}, this.componentDidMount)
    }

    checkAndFetch(event) {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop < element.clientHeight + 1 &&
            element.scrollHeight - element.scrollTop > element.clientHeight - 1) {
            var i = this.state.items.length - 1
            if (i + 12 >= this.state.data.length) this.setState({ items: this.state.data, over: true })
            else this.setState({ items: this.state.items.concat(this.state.data.slice(i, i + 12)) })
        }
    }

    render() {
        if (this.state.items == null) return (<LoadingScreen />)
        var ls = []
        for (var ind = 0; ind < this.state.items.length - 4; ind += 4) {
            ls.push(
                <div name="pack" id={ind} style={deckStyle.packDiv}>
                    <Card item={this.state.items[ind]} onCardClick={this.props.onCardClick} />
                    <Card item={this.state.items[ind + 1]} onCardClick={this.props.onCardClick} />
                    <Card item={this.state.items[ind + 2]} onCardClick={this.props.onCardClick} />
                    <Card item={this.state.items[ind + 3]} onCardClick={this.props.onCardClick} />
                </div>
            )
        }
        var subls = []
        for (var subind = ind; subind < this.state.items.length; subind++) {
            subls.push(
                <Card item={this.state.items[subind]} onCardClick={this.props.onCardClick} />
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

const deckStyle = {
    deckDiv: {
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

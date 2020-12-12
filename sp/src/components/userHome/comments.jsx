import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CommentScroll extends Component {
    constructor(props){
        super(props);
        var toadd = []; var i = 0;
        while (i<5){
            toadd.push(({user: "@username", text: "Fake comment text!"}));
            i++;
        }
        this.state = {items: toadd}
        this.checkAndFetch = this.checkAndFetch.bind(this)
    }

    checkAndFetch(event){
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight){
            setTimeout(() => {

            var toadd = []; var i = 0;
            while (i<5){
                toadd.push(({user: "@username", text: "Fake comment text!"}));
                i++;
            }
            this.setState({items: this.state.items.concat(toadd)})
        }, 2000);
        }
    }

    render(){
    return (
        <div id="usedFeedDiv" style={commentsStyle.centerDiv} onScroll={this.checkAndFetch}>
            {this.state.items.map((i, index) => (
                <div key={index} style={commentsStyle.comment}>
                    <p style={commentsStyle.usernameText}>{i.user}</p>
                    <p style={commentsStyle.text}>{i.text}</p>
                </div>
            ))}
            <p style={commentsStyle.loading}>Loading...</p>
        </div>
        )
    }
}

const commentsStyle= { centerDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "10px 0 10px 10px",
        gap: "10px",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: "0 10px 10px 0"
    }, loading: {
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        // fontWeight: "bold",
        fontSize: "10px",
        outline: "none",
        borderRadius: "10px"
    }, usernameText: {
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        // fontWeight: "bold",
        color: "#00B140",
        fontSize: "12px",
        outline: "none",
        borderRadius: "10px"
    }, text: {
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        // fontWeight: "bold",
        fontSize: "14px",
        outline: "none",
        borderRadius: "10px"
    }, comment: {
        height: "100%",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "5px",
        background: "rgba(0, 177, 64, 0.1)",
        borderRadius: "10px"
        // border: "thick solid black",
    }
}

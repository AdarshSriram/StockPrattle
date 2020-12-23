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
        this.state = {items: toadd, id: Math.random()}
        this.checkAndFetch = this.checkAndFetch.bind(this)
    }

    componentDidMount(){
        const elem = document.getElementById(this.state.id)
        elem.style.height = ""+elem.parentElement.offsetHeight+"px"
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
        <div id={this.state.id} style={commentsStyle.centerDiv} onScroll={this.checkAndFetch}>
            <div style={commentsStyle.comment}>
                <div style={commentsStyle.commentBody}>
                    <p style={commentsStyle.usernameText}>{"@currentUserName"}</p>
                    <input style={commentsStyle.commentInput} type="text" placeholder="Add Comment"/>
                </div>
                <div style={commentsStyle.whiteDiv}/>
            </div>
            {this.state.items.map((i, index) => (
                <div key={index} style={commentsStyle.comment}>
                    <div style={commentsStyle.commentBody}>
                        <p style={commentsStyle.usernameText}>{i.user}</p>
                        <p style={commentsStyle.text}>{i.text}</p>
                    </div>
                    <div style={commentsStyle.whiteDiv}/>
                </div>
            ))}
            <p style={commentsStyle.loading}>Loading...</p>
        </div>
        )
    }
}

const commentsStyle= { centerDiv: {
        height: "0px",
        width: "100%",
        maxHeight: "100%",
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
    }, commentInput: {
        width: "90%",
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        borderWidth: "0px",
        borderRadius: "5px",
        // fontWeight: "bold",
        fontSize: "14px",
        outline: "none",
        borderRadius: "10px"
    }, comment: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        background: "rgba(0, 177, 64, 0.1)",
        borderRadius: "10px"
        // border: "thick solid black",
    }, commentBody: {
        height: "100%",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "none",
        borderRadius: "10px",
        // border: "thin solid black",
    }, whiteDiv: {
        height: "100%",
        width: "10%",
        background: "#FFFFFF",
        borderRadius: "20px 0 0 20px",
        // border: "thin solid black",
    }
}

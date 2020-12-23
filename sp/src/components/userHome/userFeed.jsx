import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Post from "./post.jsx";
import NewPostPopUp from "./newPost.jsx";


export default class UserFeed extends Component {
    constructor(props) {
        super(props);
        if (this.props.data == null){
            this.state = {items: [], over: true}
        } else if (this.props.data.length < 10){
            this.state = {items: this.props.data, over: true}
        } else {
            this.state = {items: this.props.data.slice(0, 10), over: false}
        }
        this.checkAndFetch = this.checkAndFetch.bind(this)
    }

    checkAndFetch(event) {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            var i = this.state.items.length - 1
            if (i+10 >= this.props.data.length){
                this.setState({items: this.props.data, over: true})
            } else {
                this.setState({items: this.state.items.concat(this.props.data.slice(i, i+10))})
            }
        }
    }

    render() {
        return (
            <div id="usedFeedDiv" style={userFeedStyle.centerDiv} onScroll={this.checkAndFetch}>
                {this.state.items.map((i, index) => (<Post key={index} user={i.username} text={i.text} propic={i.propic}/>))}
                <p style={userFeedStyle.loading}>{(this.state.over) ? "You have reached the end of your feed!" : "Loading..."}</p>
            </div>
        )
    }
}

const userFeedStyle = {
    centerDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "10px",
        padding: "10px 0px 10px 0px",
        gap: "20px",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "rgba(229, 229, 229, 0.3)",
        overflow: "scroll",
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

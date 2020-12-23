import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Post from "./post.jsx";
import NewPostPopUp from "./newPost.jsx"

function buttonPress(type = null) {
    var elem = document.getElementById("popUpContainer");
    ReactDOM.render(<NewPostPopUp type={type} />, elem);
    document.getElementById("wholeScreen").addEventListener('click', reversePress);
    document.getElementById("body").style.filter = "blur(4px)";
    document.getElementById("header").style.filter = "blur(4px)";
}

function reversePress(event) {
    const exclusions = ["stockInput", "popUpBox", "popUpForm",
        "submitButton", "postText"];
    if (exclusions.includes(event.target.id)) { return; }
    ReactDOM.unmountComponentAtNode(document.getElementById("popUpContainer"))
    document.getElementById("wholeScreen").removeEventListener('click', reversePress);
    document.getElementById("body").style.filter = "none";
    document.getElementById("header").style.filter = "none";
}

export default class UserFeed extends Component{
    constructor(props){
        super(props);
        var toadd = []; var i = 0;
        while (i<5){
            toadd.push(({user: "@username", text: "Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text."}));
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
                toadd.push(({user: "@username", text: "Fake post text."}));
                i++;
            }
            this.setState({items: this.state.items.concat(toadd)})
        }, 2000);
        }
    }

    mouseIn(event){
        event.target.style.backgroundColor = "#00B140"
        event.target.style.color = "#FFFFFF"
    }

    mouseOut(event){
        event.target.style.backgroundColor = "#FFFFFF"
        event.target.style.color = "#00B140"
    }

    render(){
    return (
        <div id="usedFeedDiv" style={userFeedStyle.centerDiv} onScroll={this.checkAndFetch}>
            <div style={userFeedStyle.topDiv}>
                <button style={userFeedStyle.newPostButton} onMouseOver={this.mouseIn}
                    onMouseLeave={this.mouseOut} onClick={(event) => { buttonPress("Login") }}>+</button>
            </div>
            {this.state.items.map((i, index) => (<Post key={index} user={i.username} text={i.text}/>))}
            <p style={userFeedStyle.loading}>Loading...</p>
        </div>
        )
    }
}

const userFeedStyle= { centerDiv: {
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
    }, topDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        overflow: "none",
        borderRadius: "10px"
    }, newPostButton: {
        background: "#FFFFFF",
        width: "40px",
        height: "40px",
        marginRight: "10px",
        borderRadius: "25px",
        border: "1px dashed #00B140",
        color: "#00B140",
        fontFamily: "Arial",
        fontStyle: "normal",
        fontWeight: "600px",
        fontSize: "30px",
        outline: "none",
        cursor: "pointer"
    }
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {thumbsupSvg, replySvg} from './svgs.jsx';

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
        this.comment = this.comment.bind(this)
    }

    componentDidMount(){
        const elem = document.getElementById(this.props.postId+"comments")
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

    comment(text){
        this.setState({items: [{user: "@currentUser", text: text}].concat(this.state.items)})
    }

    render(){
    return (
        <div id={this.props.postId+"comments"} style={commentsStyle.centerDiv} onScroll={this.checkAndFetch}>
            <Comment user={"@currentUser"} postComm={this.comment} id={Math.random()}/>
            {this.state.items.map((i, index) => (
                <Comment user={i.user} text={i.text} id={Math.random()} liked={false}/>
            ))}
            <p style={commentsStyle.loading}>Loading...</p>
        </div>
        )
    }
}

class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {liked: props.liked}
        this.like = this.like.bind(this)
        this.comment = this.comment.bind(this)
        this.mouseIn = this.mouseIn.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }

    like(){
        if (this.state.liked){
            document.getElementById(this.props.id).style.fill = "black"
        } else {
            document.getElementById(this.props.id).style.fill = "#00B140"
        }
        this.setState({liked: !this.state.liked})
    }

    comment(){
        const elem = document.getElementById(this.props.id+"inp")
        this.props.postComm(elem.value)
        elem.value = null
    }

    mouseIn(){
        document.getElementById(this.props.id).style.fill = "#00B140"
    }

    mouseOut(){
        document.getElementById(this.props.id).style.fill = "black"
    }

    render(){
        if (this.props.postComm != null){
            return (
            <div style={commentsStyle.comment}>
                <div style={commentsStyle.commentBody}>
                    <p style={commentsStyle.usernameText}>{this.props.user}</p>
                    <input id={this.props.id+"inp"} style={commentsStyle.commentInput} type="text" placeholder="Add Comment"/>
                </div>
                <button style={commentsStyle.rightButton} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut}
                    onClick={this.comment}>{replySvg(this.props.id)}</button>
            </div>
        )} else {
            return (
            <div style={commentsStyle.comment}>
                <div style={commentsStyle.commentBody}>
                    <p style={commentsStyle.usernameText}>{this.props.user}</p>
                    <p style={commentsStyle.text}>{this.props.text}</p>
                </div>
                <button style={commentsStyle.rightButton} onClick={this.like}>
                    {thumbsupSvg(this.props.id)}</button>
            </div>)
        }
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
    }, rightButton: {
        height: "100%",
        width: "20%",
        background: "#FFFFFF",
        borderRadius: "20px 0 0 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: "0px",
        outline: "none",
        cursor: "pointer"
        // border: "thin solid black",
    }
}

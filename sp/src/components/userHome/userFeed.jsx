import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Post from "./post.jsx";
import LoadingScreen from "./loadingDiv.jsx"
import NewPostPopUp from './newPost.jsx'
import {getMainFeed, getFollowingFeed, getUserPosts, addPost, getStockPosts} from '../../firebase_functions.js'

function buttonPress(type = null) {
    var elem = document.getElementById("popUpContainer");
    ReactDOM.render(<NewPostPopUp addPost={type}/>, elem);
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

export default class UserFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {type: (props.type==null) ? "default" : props.type, instruments: props.instruments}
        this.checkAndFetch = this.checkAndFetch.bind(this)
        this.addPostFront = this.addPostFront.bind(this)
    }

    componentDidMount(){
        if (this.state.type=="default"){
            getMainFeed().then(res => {
                if (res == null) {
                    this.setState({data: [], items: [], over: true})
                    return
                }
                res = res.flat()
                if (res.length < 10) this.setState({data: res, items: res, over: true})
                else this.setState({data: res, items: res.slice(0, 10), over: false})
            })
        } else if (this.state.type=="personal"){
            getUserPosts().then(res => {
                if (res == null) {
                    this.setState({data: [], items: [], over: true})
                }
                res = res.flat()
                if (res.length < 10) this.setState({data: res, items: res, over: true})
                else this.setState({data: res.flat, items: res.slice(0, 10), over: false})
            })
        } else if (this.state.type=="stock"){
            getStockPosts(this.props.stock).then(res => {
                if (res == null) {
                    this.setState({data: [], items: [], over: true})
                    return
                }
                res = res.flat()
                if (res.length < 10) this.setState({data: res, items: res, over: true})
                else this.setState({data: res, items: res.slice(0, 10), over: false})
            })
        }
    }

    mouseIn(event) {
        event.target.style.backgroundColor = "#00B140"
        event.target.style.color = "#FFFFFF"
    }

    mouseOut(event) {
        event.target.style.backgroundColor = "#FFFFFF"
        event.target.style.color = "#00B140"
    }

    checkAndFetch(event) {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            var i = this.state.items.length - 1
            if (i + 10 >= this.state.data.length) {
                this.setState({ items: this.state.data, over: true })
            } else {
                this.setState({ items: this.state.items.concat(this.state.data.slice(i, i + 10)) })
            }
        }
    }

    addPostFront(params) {
        if (params[0] && params[1]) {
            const time = Date.now()
            addPost(params).then((res) => {
                document.getElementById("wholeScreen").click()
            }).catch((error) => console.log(error))
        }
        else {
            alert("Associated stocks and post text caannot be empty")
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.type != this.props.type || prevProps.instruments != this.props.instruments){
            this.setState({instruments: this.props.instruments}, this.componentDidMount)
        }
    }

    render() {
        if (this.state.items==null) return <LoadingScreen/>
        return (
            <div id="usedFeedDiv" style={userFeedStyle.centerDiv} onScroll={this.checkAndFetch}>
                {(this.state.type=="default") ? (
                    <div style={userFeedStyle.topDiv}>
                    <button style={userFeedStyle.newPostButton} onMouseOver={this.mouseIn}
                        onMouseLeave={this.mouseOut} onClick={(event) => buttonPress(this.addPostFront, this.state.instruments)}>+</button>
                    </div>) : null}
                {this.state.items.map((i, index) => (<Post curuser = {this.props.user} key={index} user={i.username} text={i.text} propic={i.propic} id={i.id}/>))}
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
    }, topDiv: {
        height: "40px",
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
    }
}

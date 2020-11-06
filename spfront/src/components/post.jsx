import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {smallnopicSvg, thumbsupSvg, sendSvg, replySvg, shareSvg} from './svgs.jsx';
import { getPhoto } from '../firebase_functions'

export default class Post extends Component{
    constructor(props){
        super(props);
        console.log(props.user)
        this.state = { user: props.user, image: null }
        this.setStateImage = this.setStateImage.bind(this)
    }

    async setStateImage() {
        await getPhoto(this.state.user.email).then((url) => {
            this.setState({ image: url })
            console.log(`url is ${url}`)
        }).catch((error) => console.log(error))
    }

    componentDidMount() {
        if (this.state.user != null){
            this.setStateImage();
        }
    }

    render(){
        var error = false;
        var disp = <img src={this.state.image} alt="Profile Pic" onError={() => error = true} style={postStyle.image} />
        if (this.state.image == null || error) {
            disp = <img src={require("./LogoGreen.jpeg")} alt="Stock Prattle Green" style={postStyle.image}/>
            console.log("url is none")
        }
    return (
        <div style={postStyle.mainDiv}>
            <div style={postStyle.postDiv}>
                <div style={postStyle.topBar}>
                    <div style={postStyle.imageDiv}>
                        {disp}
                    </div>
                    <p style={postStyle.textStyle}>
                        {this.props.user==null ? "@stockprattle": this.props.user.username}
                    </p>
                </div>
                <div style={postStyle.contentDiv}>
                    <p style={postStyle.textStyle}>{this.props.text}</p>
                </div>
                <div style={postStyle.bottomBar}>
                    {thumbsupSvg}
                    {sendSvg}
                    {replySvg}
                    {shareSvg}
                </div>
            </div>
            <div style={postStyle.commentsDiv} />
        </div>
        )
    }
}

const postStyle= {mainDiv: {
        width: "90%",
        backgroundColor: "#FFFFFF",
        border: "2px solid rgba(0, 0, 0, 0.25)",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "row",
        overflow: "none",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px"
    }, postDiv: {
        width: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "thin solid lightGray",
        borderWidth: "0 1px 0 0",
        boxSizing: "border-box",
        background: "none",
        overflow: "none",
        padding: "0 0 0 10px"
    }, commentsDiv: {
        width: "30%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        overflow: "scroll"
    }, topBar: {
        width: "100%",
        height: "60px",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "thin solid lightGray",
        borderWidth: "0 0 1px 0",
        boxSizing: "border-box",
        background: "none",
        overflow: "none"
    }, contentDiv: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "thin solid lightGray",
        borderWidth: "0 0 1px 0",
        boxSizing: "border-box",
        background: "none",
        overflow: "none"
    }, textStyle: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "600px",
        fontSize: "18px",
        outline: "none",
        borderRadius: "10px"
    }, bottomBar: {
        width: "100%",
        height: "50px",
        display: "flex",
        gap: "10px",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "thin solid lightGray",
        borderWidth: "1px 0 0 0",
        boxSizing: "border-box",
        background: "none",
        overflow: "none"
    }, image: {
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "0px"
    }, imageDiv: {
        width: "48px",
        height: "48px",
        borderRadius: "24px",
        background: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        border: "thin solid lightGray",
        // marginLeft: "10px",
        overflow: "hidden"
    }
}

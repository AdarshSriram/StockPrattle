import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { smallnopicSvg, thumbsupSvg, sendSvg, replySvg, shareSvg } from './svgs.jsx';
import { getPhoto, likeUnlikePost, hasUserLiked} from '../../firebase_functions';
import CommentScroll from './comments.jsx';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = { user: props.user, liked: false, id: props.id}
        // this.componentDidMount = this.componentDidMount.bind(this)
        this.like = this.like.bind(this)
    }

    componentDidMount() {
        hasUserLiked(this.state.id).then(res => {
            if (res) {
                document.getElementById(this.state.id + "like").style.fill = "#00B140"
                this.setState({liked:true})
            }
        })
    }

    componentDidUpdate(prevProps){
        if (this.props.id != this.state.id){
            this.setState({id: this.props.id})
        }
    }

    like() {
        if (this.state.liked) {
            document.getElementById(this.state.id + "like").style.fill = "black"
            likeUnlikePost(this.state.id, false).then(() => console.log("post unliked"))
        } else {
            document.getElementById(this.state.id + "like").style.fill = "#00B140"
            likeUnlikePost(this.state.id, true).then(() => console.log("post liked"))
        }
        this.setState({ liked: !this.state.liked })
    }

    render() {
        var error = false; var disp;
        disp = <img src={this.props.propic} alt="Profile Pic" onError={() => error = true} style={postStyle.image} />
        if ([null, ""].includes(this.props.propic) || error) {
            disp = smallnopicSvg;
        }
        return (
            <div id={this.state.id} style={postStyle.mainDiv}>
                <div style={postStyle.postDiv}>
                    <div style={postStyle.topBar}>
                        <div style={postStyle.imageDiv}>
                            {disp}
                        </div>
                        <p style={postStyle.textStyle}>
                            {this.props.user == null ? "@stockprattle" : "@" + this.props.user}
                        </p>
                    </div>
                    <div style={postStyle.contentDiv}>
                        <p style={postStyle.textStyle}>{this.props.text}</p>
                    </div>
                    <div style={postStyle.bottomBar}>
                        <button style={postStyle.bottomButton} onClick={this.like}>
                            {thumbsupSvg(this.state.id + "like")}</button>
                        <button style={postStyle.bottomButton} hidden>{sendSvg}</button>
                        <button style={postStyle.bottomButton} hidden>
                            {replySvg(this.state.id + "comment")}</button>
                        <button style={postStyle.bottomButton} hidden>{shareSvg}</button>
                    </div>
                </div>
                <CommentScroll user={this.props.curuser} postId={this.state.id} />
            </div>
        )
    }
}

const postStyle = {
    mainDiv: {
        width: "80%",
        backgroundColor: "#FFFFFF",
        border: "0px solid rgba(0, 0, 0, 0.25)",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "row",
        overflow: "none",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px"
    }, postDiv: {
        width: "70%",
        minWidth: "70%",
        height: "100%",
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
    }, topBar: {
        width: "100%",
        height: "50px",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "thin solid lightGray",
        borderWidth: "0 0 1px 0",
        boxSizing: "border-box",
        background: "none",
        overflow: "none",
    }, contentDiv: {
        width: "100%",
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
        borderRadius: "10px",
        margin: "20px 0 20px 0"
    }, bottomBar: {
        width: "100%",
        height: "40px",
        display: "flex",
        gap: "20px",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "thin solid lightGray",
        borderWidth: "0 0 0 0",
        boxSizing: "border-box",
        background: "none",
        overflow: "none"
    }, image: {
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "0px"
    }, imageDiv: {
        width: "40px",
        height: "40px",
        borderRadius: "24px",
        background: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        border: "thin solid lightGray",
        // marginLeft: "10px",
        overflow: "hidden"
    }, bottomButton: {
        height: "100%",
        outline: "none",
        cursor: "pointer",
        background: "none",
        borderWidth: "0px"
    }
}

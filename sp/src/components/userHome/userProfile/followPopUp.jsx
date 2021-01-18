import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getPhoto, getUname } from '../../../firebase_functions';
import { smallnopicSvg} from '../svgs.jsx';

export default class FollowPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {data:props.data}
    }

    render() {
        return (
            <div style={followPopUpStyle.wholeScreen}>
                <div id="popUpBox" style={followPopUpStyle.popUpBox}>
                    {this.state.data.map(item => <ListDisplay email={item}/>)}
                </div>
            </div>
        )
    }
}

class ListDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {email:props.email, img:null, username:null}
    }

    componentDidMount(){
        console.log(this.state.email)
        getPhoto(this.state.email).then(res=>{
            getUname(this.state.email).then(restwo=>{
                this.setState({username: restwo, img: res})
            })
        })
    }

    render() {
        var error = false; var disp;
        disp = <img name="listProPic" src={this.state.img} alt="Profile Pic" onError={() => error = true} style={followPopUpStyle.image} />
        if ([null, ""].includes(this.state.img) || error) {
            disp = smallnopicSvg;
        }
        return (
            <div name="listDiv" style={followPopUpStyle.listItem}>
                <div name="listImageDiv" style={followPopUpStyle.imageDiv}>
                    {disp}
                </div>
                <p name="listUsername" style={followPopUpStyle.textStyle}>
                    {(this.state.username==null) ? "" : "@"+this.state.username}
                </p>
            </div>
        )
    }
}

const followPopUpStyle = {
    wholeScreen: {
        position: "absolute",
        display: "flex",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }, popUpBox: {
        width: "500px",
        height: "600px",
        backgroundColor: "#FFFFFF",
        border: "0px solid rgba(0, 0, 0, 0.25)",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "0px"
    }, listItem: {
        width: "90%",
        height: "50px",
        display: "flex",
        flexDirection: "row",
        marginTop: "5px",
        gap: "20px",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "thin solid lightGray",
        borderWidth: "1px",
        borderRadius: "5px",
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
        marginLeft: "5px",
        overflow: "hidden"
    }, textStyle: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "600px",
        fontSize: "18px",
        outline: "none",
        borderRadius: "10px",
        margin: "20px 0 20px 0"
    }
}

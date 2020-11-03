import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {penSvg, nopicSvg} from '../svgs.jsx';
import {uploadPhoto, getPhoto} from '../../firebase_functions'

export default class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {user: props.user, image: null}
        this.setStateImage = this.setStateImage.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    async setStateImage(){
        await getPhoto(this.state.user.email).then((url) => {
            this.setState({image: url})
        }).catch((error)=> console.log(error))
    }

    async handleUpload(){
        const photo = document.getElementById('fileInput').files[0]
        if (photo != null){
            await uploadPhoto(this.state.user.email, photo).then((snap) => {console.log('Pic Upload Successful'); this.setStateImage();})
            .catch((err) => console.log(err))
        }
    }

    componentDidMount(){
        document.getElementById("fileInput").onchange = this.handleUpload
    }

    beginEdit(input) {
        document.getElementById('fileInput').click()
    }

    handleIn(event) {
        const elem = document.getElementById("ProfilePicEdit")
        elem.style.visibility = "visible"
    }

    handleOut(event) {
        const elem = document.getElementById("ProfilePicEdit")
        elem.style.visibility = "hidden"
    }

    editIn(event) {
        event.target.style.background = "lightGray"
    }

    editOut(event) {
        event.target.style.background = "#FFFFFF"
    }

    render() {
        var error = false;
        var disp = <img src={this.state.image} alt="Profile Pic" onError={()=>error=true} style={propicStyle.image} />
        if (this.state.image == null || error){
            disp = nopicSvg
        }
        return (
            <div style={propicStyle.mainDiv} onMouseOver={this.handleIn} onMouseLeave={this.handleOut}>
                <div style={propicStyle.imageDiv}>
                    {disp}
                </div>
                <button id="ProfilePicEdit" style={propicStyle.editButton} onClick={this.beginEdit}
                    onMouseOver={this.editIn} onMouseLeave={this.editOut}>
                    <input id="fileInput" type="file" accept='image/*' style={{display: "none"}}/>
                    {penSvg}
                </button>
            </div>
        )
    }
}

const propicStyle = {
    mainDiv: {
        width: "200px",
        height: "100%",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        // overflow: "scroll"
    }, editButton: {
        visibility: "hidden",
        background: "#FFFFFF",
        borderWidth: "0px",
        outline: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }, imageDiv: {
        width:"150px",
        height:"150px",
        borderRadius: "75px",
        background: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        border: "thin solid lightGray",
        marginLeft: "10px",
        overflow: "hidden"
    }, image: {
        maxWidth:"100%",
        maxHeight:"100%",
        margin: "0px"
    }
}

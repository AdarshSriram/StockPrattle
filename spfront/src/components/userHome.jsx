import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link, useHistory} from "react-router-dom";
import PopUp from './popUp.jsx';
import NavBar from './navBar.jsx';
import UserFeed from './userFeed.jsx';
import MessageBox from './messageBox.jsx';
import UserProfile from './userProfile/userProfile.jsx';
import ExplorePage from './explorePage.jsx';
import Watchlist from './watchlist.jsx';
import LeftMenu from './leftMenu.jsx';

export default class UserPage extends Component{
    constructor(props){
        super(props);
        this.state = {current: null}
        this.profileButtonClick = this.profileButtonClick.bind(this);
        this.feedButtonClick = this.feedButtonClick.bind(this);
        this.messagesButtonClick = this.messagesButtonClick.bind(this);
        this.exploreButtonClick = this.exploreButtonClick.bind(this);
    }

    componentDidMount(){
        console.log("trace")
        const but = document.getElementById("feedButton");
        but.style.background = '#00B140';
        but.style.color = '#FFFFFF';
        this.setState({current: "feed"});
    }

    profileButtonClick(){
        var ids= ["feedButton","exploreButton","messagesButton"]
        var but;
        for (var id of ids){
            but = document.getElementById(id);
            but.style.background = 'none';
            but.style.color = '#00B140';
        }
        but = document.getElementById("profileButton");
        but.style.background = '#00B140';
        but.style.color = '#FFFFFF';
        this.setState({current: "profile"});
    }

    exploreButtonClick(){
        var ids= ["feedButton","profileButton","messagesButton"]
        var but;
        for (var id of ids){
            but = document.getElementById(id);
            but.style.background = 'none';
            but.style.color = '#00B140';
        }
        but = document.getElementById("exploreButton");
        but.style.background = '#00B140';
        but.style.color = '#FFFFFF';
        this.setState({current: "explore"});
    }

    feedButtonClick(){
        var ids= ["profileButton","exploreButton","messagesButton"]
        var but;
        for (var id of ids){
            but = document.getElementById(id);
            but.style.background = 'none';
            but.style.color = '#00B140';
        }
        but = document.getElementById("feedButton");
        but.style.background = '#00B140';
        but.style.color = '#FFFFFF';
        this.setState({current: "feed"});
    }

    messagesButtonClick(){
        var ids= ["profileButton","exploreButton","feedButton"]
        var but;
        for (var id of ids){
            but = document.getElementById(id);
            but.style.background = 'none';
            but.style.color = '#00B140';
        }
        but = document.getElementById("messagesButton");
        but.style.background = '#00B140';
        but.style.color = '#FFFFFF';
        this.setState({current: "messages"});
    }

    render(){
        var item;
        if (this.state.current=="profile"){
            item= <UserProfile />
        } else if (this.state.current=="explore"){
            item= <ExplorePage />
        } else if (this.state.current=="messages"){
            item= <MessageBox />
        } else {
            item= <UserFeed />
        }
        return (
        <div id="wholeScreen" style={userHomeStyle.mainDiv}>
            <NavBar />
            <div id="body" style={userHomeStyle.body}>
                <LeftMenu history={this.props.history} pageState={this.state.current}
                buttonClickFunctions={[this.profileButtonClick, this.feedButtonClick,
                    this.exploreButtonClick, this.messagesButtonClick]}/>
                {item}
                <Watchlist />
            </div>
        <div id="popUpContainer" style={{top:"100%", left:"100%"}}/>
        </div>
        );
    }
}

const userHomeStyle = { mainDiv:{
        width:"100vw",
        height:"100vh",
        overflow: "none",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }, body: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    }
}

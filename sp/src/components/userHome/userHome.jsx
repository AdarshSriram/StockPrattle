import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from "react-router-dom";
import PopUp from '../popUp.jsx';
import NavBar from './navBar.jsx';
import Feed from './feed.jsx';
import MessageBox from './messages/messageBox.jsx';
import UserProfile from './userProfile/userProfile.jsx';
import ExplorePage from './explore/explorePage.jsx';
import Watchlist from './watchlist.jsx';
import LeftMenu from './leftMenu.jsx';
import { getCurrentUserInfo, setCurrentUserInfo, get_follower_posts, getFollowing, allUsers, setUserExtSignup } from '../../firebase_functions.js'
import { getSnapshot, getInstruments } from './stock_functions.js'

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = { current: "feed", user: null, goTo: "default", mainFeedData: null, following: null, allUsers: null }
        this.profileButtonClick = this.profileButtonClick.bind(this);
        this.feedButtonClick = this.feedButtonClick.bind(this);
        this.messagesButtonClick = this.messagesButtonClick.bind(this);
        this.exploreButtonClick = this.exploreButtonClick.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.setStateUser = this.setStateUser.bind(this)
        this.goTo = this.goTo.bind(this)
        this.setData = this.setData.bind(this)
    }

    componentDidMount() {
        const but = document.getElementById("feedButton");
        but.style.background = '#00B140';
        but.style.color = '#FFFFFF';
        this.setStateUser();
        this.setData();
    }

    setData() {
        get_follower_posts().then((res) => {
            getFollowing().then((restwo) => {
                allUsers().then((resthree) => {
                    var data = require('./stock_sample_data/GetExchangeSnapshot_1Min_JSON/GetExchangeSnapshot_1Min_JSON.json')
                    this.setState({
                        mainFeedData: res.flat(), following: restwo, allUsers: resthree, marketSnapshot: getSnapshot(data), instruments: getInstruments(data)
                    })
                })
            })
        })
    }

    setStateUser() {
        getCurrentUserInfo().then((doc) => {
            if (!doc.exists) {
                console.log('No user found')
            } else {
                var user = doc.data()
                if (user.passwordChange) {
                    var elem = document.getElementById("popUpContainer");
                    ReactDOM.render(<PopUp type={"Set Password"} user={user} func={this.updateUserInfo} />, elem);
                    document.getElementById("header").style.filter = "blur(4px)";
                    document.getElementById("body").style.filter = "blur(4px)";
                    console.log(doc.data())
                }
                this.setState({ user: user })
            }
        }).catch((err) => console.log(err))
    }

    updateUserInfo(obj) {
        try {
            setCurrentUserInfo(obj).then((res) => this.setStateUser())
                .catch((err) => alert("Details couldn't be updated!"))
        } catch {
            this.setStateUser();
        }
    }

    goTo(id) {
        this.exploreButtonClick(null, id)
    }

    profileButtonClick() {
        var ids = ["feedButton", "exploreButton", "messagesButton"]
        var but;
        for (var id of ids) {
            but = document.getElementById(id);
            but.style.background = 'none';
            but.style.color = '#00B140';
        }
        but = document.getElementById("profileButton");
        but.style.background = '#00B140';
        but.style.color = '#FFFFFF';
        this.setState({ current: "profile" });
    }

    exploreButtonClick(event, goTo = "default") {
        var ids = ["feedButton", "profileButton", "messagesButton"]
        var but;
        for (var id of ids) {
            but = document.getElementById(id);
            but.style.background = 'none';
            but.style.color = '#00B140';
        }
        but = document.getElementById("exploreButton");
        but.style.background = '#00B140';
        but.style.color = '#FFFFFF';
        this.setState({ current: "explore", goTo: goTo });
    }

    feedButtonClick() {
        var ids = ["profileButton", "exploreButton", "messagesButton"]
        var but;
        for (var id of ids) {
            but = document.getElementById(id);
            but.style.background = 'none';
            but.style.color = '#00B140';
        }
        but = document.getElementById("feedButton");
        but.style.background = '#00B140';
        but.style.color = '#FFFFFF';
        this.setState({ current: "feed" });
    }

    messagesButtonClick() {
        var ids = ["profileButton", "exploreButton", "feedButton"]
        var but;
        for (var id of ids) {
            but = document.getElementById(id);
            but.style.background = 'none';
            but.style.color = '#00B140';
        }
        but = document.getElementById("messagesButton");
        but.style.background = '#00B140';
        but.style.color = '#FFFFFF';
        this.setState({ current: "messages" });
    }

    render() {
        var item;
        if (this.state.current == "profile") {
            item = <UserProfile user={this.state.user} setUser={this.updateUserInfo} following={this.state.following} />
        } else if (this.state.current == "explore") {
            item = <ExplorePage display={this.state.goTo} following={this.state.following} marketSnapshot={this.state.marketSnapshot} />
        } else if (this.state.current == "messages") {
            item = <MessageBox />
        } else {
            item = <Feed user={this.state.user} data={this.state.mainFeedData} instruments={this.state.instruments} />
        }
        return (
            <div id="wholeScreen" style={userHomeStyle.mainDiv}>
                <NavBar goTo={this.goTo} allUsers={this.state.allUsers} marketSnapshot={this.state.marketSnapshot} />
                <div id="body" style={userHomeStyle.body}>
                    <LeftMenu history={this.props.history} pageState={this.state.current}
                        buttonClickFunctions={[this.profileButtonClick, this.feedButtonClick,
                        this.exploreButtonClick, this.messagesButtonClick]} />
                    {item}
                    <Watchlist />
                </div>
                <div id="popUpContainer" style={{ top: "100%", left: "100%" }} />
            </div>
        );
    }
}

const userHomeStyle = {
    mainDiv: {
        width: "100vw",
        height: "100vh",
        overflow: "none",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "none"
    }, body: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        marginBottom: "10px",
        overflow: "hidden"
    }
}

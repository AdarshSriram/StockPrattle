import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from "react-router-dom";
import LandingPage from './components/landingPage.jsx';
import UserPage from './components/userHome/userHome.jsx';
import fire from './utils/config.js';
import { createProfile } from './firebase_functions.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null, type: 'landing', allowedUsers: [ "ic246@cornell.edu", "ac2447@cornell.edu", "adarshsriram10@gmail.com", "alakhotia@college.harvard.edu", "as4532@georgetown.edu"] };
        this.authListener = this.authListener.bind(this);
        this.createProfile = this.createProfile.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    createProfile() {
        createProfile().then(res => {
            if (res) {
                window.location.href = window.location.href.substring(0, window.location.href.indexOf("/", 9))
                this.setState({ user: res, type: 'user' })
            } else {
                window.location.href = window.location.href.substring(0, window.location.href.indexOf("/", 9))
                this.setState({ user: null, type: 'landing' });
            }
        })
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                if (fire.auth().isSignInWithEmailLink(window.location.href)) {
                    this.setState({ user: user, type: 'verification' }, this.createProfile);
                } else this.setState({ user: user, type: 'user' })
            } else {
                if (fire.auth().isSignInWithEmailLink(window.location.href)) {
                    window.location.href = window.location.href.substring(0, window.location.href.indexOf("/", 9))
                }
                this.setState({ user: null, type: 'landing' });
            }
        });
    }

    logOut() {
        if (window.confirm("Are you sure you want to log out?")) {
            fire.auth().signOut();
        }
    }

    mouseIn(e){
        e.target.style.color = "#00B140"
        e.target.style.background = "gray"
    }

    mouseOut(e){
        e.target.style.color = "gray"
        e.target.style.background = "#FFFFFF"
    }

    render() {
        if (this.state.type == 'landing') {
            return <LandingPage />
        } else if (this.state.type == 'user') {
            var cmp = <UserPage />
            if (!this.state.allowedUsers.includes(this.state.user.email)) cmp = <div style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontFamily: "Dosis",
                color: "#FFFFFF",
                fontWeight: "600px",
                fontSize: "70px",
                background: "#00B140",
                gap: "10px"
            }}>
            Thank you for pre-registering for Stock Prattle, you will hear from us soon!
            <button style={{
                marginTop: "5px",
                background: "#FFFFFF",
                width: "100px",
                height: "45px",
                borderRadius: "30px",
                borderWidth: "0px",
                color: "gray",
                fontFamily: "Dosis",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "18px",
                outline: "none",
                cursor: "pointer"}} onMouseOver={this.mouseIn} onMouseLeave={this.mouseOut} onClick={this.logOut}>Log Out</button>
            </div>
            return (this.state.user.emailVerified) ? cmp : <LandingPage />
        } else if (this.state.type == 'verification') {
            return <div style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Dosis",
                color: "#FFFFFF",
                fontWeight: "600px",
                fontSize: "70px",
                background: "#00B140"
            }}>Verifying...</div>
        }
    }
}
export default App;
//
//   return (
//     <HashRouter>
//         <div>
//             <Switch>
//                 <Route path={"/userPage"} exact component={UserPage} />
//                 <Route path={""} exact component={LandingPage}/>
//             </Switch>
//         </div>
//     </HashRouter>
//   );
// }

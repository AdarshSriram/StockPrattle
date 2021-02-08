import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from "react-router-dom";
import LandingPage from './components/landingPage.jsx';
import UserPage from './components/userHome/userHome.jsx';
import fire from './utils/config.js';
import {createProfile} from './firebase_functions.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: null, type: 'landing', allowedUsers: ["ac2447@cornell.edu"]};
        this.authListener = this.authListener.bind(this);
        this.createProfile = this.createProfile.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    createProfile(){
        createProfile().then(res=>{
            if (res) {
                window.location.href = window.location.href.substring(0, window.location.href.indexOf("/", 9))
                this.setState({user: res, type: 'user'})
            } else {
                window.location.href = window.location.href.substring(0, window.location.href.indexOf("/", 9))
                this.setState({user: null, type: 'landing'});
            }
        })
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                if (fire.auth().isSignInWithEmailLink(window.location.href)){
                    this.setState({user: user, type: 'verification'}, this.createProfile);
                } else this.setState({user: user, type: 'user'})
            } else {
                if (fire.auth().isSignInWithEmailLink(window.location.href)){
                    window.location.href = window.location.href.substring(0, window.location.href.indexOf("/", 9))
                }
                this.setState({user: null, type: 'landing'});
            }
        });
    }

    render() {
        if (this.state.type=='landing'){
            return <LandingPage/>
        } else if (this.state.type=='user'){
            var cmp = <UserPage />
            if (!this.state.allowedUsers.includes(this.state.user.email)) cmp = <div style={{width: "100vw",
                                height: "100vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontFamily: "Dosis",
                                color: "#FFFFFF",
                                fontWeight: "600px",
                                fontSize: "70px",
                                background: "#00B140"}}>Thank you for pre-registering for Stock Prattle!</div>
            return (this.state.user.emailVerified) ? cmp : <LandingPage/>
        } else if (this.state.type=='verification'){
            return <div style={{width: "100vw",
                                height: "100vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontFamily: "Dosis",
                                color: "#FFFFFF",
                                fontWeight: "600px",
                                fontSize: "70px",
                                background: "#00B140"}}>Verifying...</div>
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

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from "react-router-dom";
import LandingPage from './components/landingPage.jsx';
import UserPage from './components/userHome.jsx';
import fire from './utils/config.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: null};
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user});
                localStorage.setItem('user', user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem('user');
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.user ? <UserPage /> : <LandingPage/>}
            </div>
        )
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

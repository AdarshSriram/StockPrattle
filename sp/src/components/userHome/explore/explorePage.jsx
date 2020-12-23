import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InfiniteDeck from './infiniteDeck.jsx'
import StockPage from './stockPage.jsx'
import UserProfile from '../userProfile/userProfile.jsx';
import {getUserInfo} from '../../../firebase_functions.js'

export default class ExploreFeed extends Component{
    constructor(props){
        super(props);
        this.state = {currentDisp: props.display, type: "loading"}
        this.goToProfile = this.goToProfile.bind(this)
    }

    goToProfile(stock){
        this.setState({currentDisp: stock, type: "stock"})
    }

    componentDidMount(){
        if (this.state.currentDisp != "default"){
        getUserInfo(this.state.currentDisp).then((doc)=>{
            if (!doc.exists){
                alert("Invalid user.")
                return
            } else {
                const user = doc.data()
                this.setState({currentDisp: user, type: "user"})
            }
        })
    }}

    componentDidUpdate(prevProps) {
        if (this.props.display !== prevProps.display){
            this.setState({currentDisp: this.props.display},
                this.componentDidMount
            )
        }
    }

    render(){
        if (this.state.currentDisp == "default"){
            return <InfiniteDeck onCardClick={this.goToProfile}/>
        } else if (this.state.loading){
            return (
                <div style={explorePageStyle.centerDiv}>
                    <p>Loading...</p>
                </div>
            )
        } else {
            return this.state.type == "user" ?  <UserProfile user={this.state.currentDisp} following={this.props.following}/> : <StockPage stock={this.state.currentDisp}/>
        }
    }
}

const explorePageStyle = {centerDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "rgba(229, 229, 229, 0.3)",
        overflow: "scroll",
        margin: "10px",
        borderRadius: "10px"
    }
}

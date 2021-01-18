import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InfiniteDeck from './infiniteDeck.jsx'
import StockPage from './stockPage.jsx'
import UserProfile from '../userProfile/userProfile.jsx';
import LoadingScreen from '../loadingDiv.jsx';
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
            if (this.props.isStock){
                this.goToProfile(this.state.currentDisp)
            } else {
                getUserInfo(this.state.currentDisp).then((doc)=>{
                    if (!doc.exists){
                        this.setState({currentDisp: "default"})
                        alert("Invalid user.")
                        return
                    }
                    if (doc.data().email==this.props.user.email) this.props.goToProfile()
                    else this.setState({currentDisp: doc.data(), type: "user"})
                })
            }
        } else {
            this.setState({type: "default"})
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.display !== prevProps.display){
            this.setState({currentDisp: this.props.display},
                this.componentDidMount
            )
        }
    }

    render(){
        if (this.state.type=="loading") return <LoadingScreen />
        if (this.state.currentDisp == "default") return (<InfiniteDeck onCardClick={this.goToProfile}/>)

        return (this.state.type == "user") ?  <UserProfile user={this.state.currentDisp}/> : <StockPage user={this.props.user} stock={this.state.currentDisp}/>
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

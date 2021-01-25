import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire from '../../utils/config.js';
import { getHeadlines } from './news.js'

export default class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {news: [], newsIndex: -1}
        this.logOut = this.logOut.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.newsClick = this.newsClick.bind(this);
        this.prevNews = this.prevNews.bind(this);
        this.nextNews = this.nextNews.bind(this);
    }

    componentDidMount(){
        getHeadlines().then(res=>this.setState({news: res, newsIndex: 0}))
    }

    mouseIn(but) {
        but.target.style.background = '#00B140';
        but.target.style.color = '#FFFFFF';
    }

    mouseOut(but) {
        if (!but.target.id.includes(this.props.pageState)) {
            but.target.style.background = 'none';
            but.target.style.color = '#00B140';
        }
    }

    newsMouseOver() {
        document.getElementById("newsTitle").style.textDecoration = "underline"
    }

    newsMouseOut() {
        document.getElementById("newsTitle").style.textDecoration = "none"
    }

    newsClick(event){
        if (!event.target.id.includes("newsButton")){
            window.location.href = this.state.news[this.state.newsIndex].url
        }
    }

    prevNews(){
        var idx = this.state.newsIndex-1
        if (idx<0) idx += this.state.news.length
        this.setState({newsIndex: idx})
    }

    nextNews(){
        this.setState({newsIndex: (this.state.newsIndex+1)%this.state.news.length})
    }


    logOut() {
        if (window.confirm("Are you sure you want to log out?")) {
            fire.auth().signOut();
        }
    }

    render() {
        return (
            <div style={leftMenuStyle.mainDiv}>
                <div style={leftMenuStyle.buttonDiv}>
                    <button id="profileButton" style={leftMenuStyle.button} onMouseOver={this.mouseIn}
                        onMouseLeave={this.mouseOut} onClick={this.props.buttonClickFunctions[0]}>Profile</button>
                    <button id="feedButton" style={leftMenuStyle.button} onMouseOver={this.mouseIn}
                        onMouseLeave={this.mouseOut} onClick={this.props.buttonClickFunctions[1]}>Feed</button>
                    <button id="exploreButton" style={leftMenuStyle.button} onMouseOver={this.mouseIn}
                        onMouseLeave={this.mouseOut} onClick={this.props.buttonClickFunctions[2]}>Explore</button>
                    <button id="messagesButton" style={leftMenuStyle.button} onMouseOver={this.mouseIn}
                        onMouseLeave={this.mouseOut} onClick={this.props.buttonClickFunctions[3]}>Messages</button>
                </div>
                <div style={leftMenuStyle.newsDiv}>
                    <p style={leftMenuStyle.newsText}>Top News</p>
                    {(this.state.newsIndex<0) ? null :
                        <div onMouseOver={this.newsMouseOver} onMouseLeave={this.newsMouseOut} onClick={this.newsClick} style={leftMenuStyle.newsCard}>
                            <p id="newsTitle" style={leftMenuStyle.headline}>{(this.state.news[this.state.newsIndex]) ? this.state.news[this.state.newsIndex].title : null}</p>
                            <p style={leftMenuStyle.description}>{(this.state.news[this.state.newsIndex]) ? this.state.news[this.state.newsIndex].desc : null}</p>
                        </div>
                    }
                    {(this.state.newsIndex<0) ? null  : <div style={leftMenuStyle.newsButtonDiv}>
                    <button onMouseOver={this.mouseIn}
                        onMouseLeave={this.mouseOut} onClick={this.prevNews}
                        id="newsButtonLeft" style={leftMenuStyle.newsButton}>ᐊ</button>
                    <button onMouseOver={this.mouseIn}
                        onMouseLeave={this.mouseOut} onClick={this.nextNews}
                        id="newsButtonRight" style={leftMenuStyle.newsButton}>ᐅ</button>
                        </div>
                    }
                </div>
                <button style={leftMenuStyle.logOutButton} onClick={this.logOut}>Log Out</button>
            </div>
        )
    }
}

const leftMenuStyle = {
    mainDiv: {
        height: "100%",
        width: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        marginLeft: "10px",
    }, buttonDiv: {
        width: "100%",
        height: "100%",
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //border: "thick solid black",
        boxSizing: "border-box",
        background: "none"
    }, newsDiv: {
        width: "100%",
        height: "100%",
        display: "flex",
        gap: "5px",
        overflow: "scroll",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        boxSizing: "border-box",
        background: "none",
        border: "1px solid rgba(0, 177, 64, 0.6)",
        borderRadius: "10px"
    }, button: {
        background: "none",
        width: "100px",
        height: "45px",
        borderRadius: "30px",
        borderWidth: "0px",
        color: "#00B140",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        cursor: "pointer"
    }, logOutButton: {
        marginTop: "5px",
        background: "none",
        width: "100px",
        height: "45px",
        borderRadius: "30px",
        borderWidth: "0px",
        color: "gray",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "15px",
        outline: "none",
        cursor: "pointer"
    }, newsText: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        textDecoration: "underline",
        margin: "0px"
    }, newsCard: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        padding: "3px",
        gap: "10px",
        textAlign: "center",
        cursor: "pointer",
        overflow: "scroll"
    }, headline: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        textDecoration: "none",
        margin: "0px",
    }, description: {
        fontFamily: "Dosis",
        fontStyle: "normal",
        // fontWeight: "bold",
        fontSize: "12px",
        textDecoration: "none",
        margin: "0px"
    }, newsButtonDiv: {
        width: "100%",
        height: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        gap: "5px",
        marginBottom: "2px"
    }, newsButton: {
        height: "20px",
        width: "20px",
        border: "none",
        borderRadius: "20px",
        background: 'none',
        color: "#00B140",
        outline: "none",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}

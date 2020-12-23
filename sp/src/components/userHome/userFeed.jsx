import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Post from "./post.jsx";
import NewPostPopUp from "./newPost.jsx"

export default class UserFeed extends Component {
    constructor(props) {
        super(props);
        var toadd = []; var i = 0;
        while (i < 5) {
            toadd.push(({ user: "@username", text: "Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text.Fake post text." }));
            i++;
        }
        this.state = { items: toadd }
        this.checkAndFetch = this.checkAndFetch.bind(this)
    }

    checkAndFetch(event) {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            setTimeout(() => {

                var toadd = []; var i = 0;
                while (i < 5) {
                    toadd.push(({ user: "@username", text: "Fake post text." }));
                    i++;
                }
                this.setState({ items: this.state.items.concat(toadd) })
            }, 2000);
        }
    }

    render() {
        return (
            <div id="usedFeedDiv" style={userFeedStyle.centerDiv} onScroll={this.checkAndFetch}>
                {this.state.items.map((i, index) => (<Post key={index} user={i.username} text={i.text} />))}
                <p style={userFeedStyle.loading}>Loading...</p>
            </div>
        )
    }
}

const userFeedStyle = {
    centerDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "10px",
        padding: "10px 0px 10px 0px",
        gap: "20px",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "rgba(229, 229, 229, 0.3)",
        overflow: "scroll",
        borderRadius: "10px"
    }, loading: {
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        // fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        borderRadius: "10px"
    }
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {getWatchList} from '../../firebase_functions.js';

export default class Watchlist extends Component{
    constructor(props){
        super(props);
        this.state = {ls:[], watchlist: []}
        this.filter = this.filter.bind(this)
    }

    componentDidMount(){
        getWatchList().then(res=>this.setState({watchlist: []}), this.filter)
    }

    componentDidUpdate(prevProps){
        if (prevProps.snap != this.props.snap){
            this.filter()
        }
    }

    filter(){
        if (this.props.snap) {
            var res = []; var idx;
            for (var i of this.state.watchlist){
                for (var s of this.props.snap){
                    idx = s.INSTRUMENTIDENTIFIER.indexOf(".")
                    if (idx!=-1){
                        if (i==s.INSTRUMENTIDENTIFIER.substring(0, idx)){
                            res.push(s)
                            break
                        }
                    } else if (i==s.INSTRUMENTIDENTIFIER) {
                        res.push(s)
                        break
                    }
                }
            }
            this.setState({ls: res})
        }
    }

    render(){
    return (
        <div style={watchlistStyle.mainDiv}>
            <p style={watchlistStyle.headingText}>Followed Stocks</p>
            {this.state.ls.map((i, index) =>
                <p key={index} style={watchlistStyle.instrumentIdentifier}>{i.INSTRUMENTIDENTIFIER}<p style={{color: (i.INCR==0) ? "#F09000" : (i.INCR > 0) ? "#00B140" : "#E21010"}}>{i.OPEN}</p></p>
            )}
        </div>
        )
    }
}

const watchlistStyle= { mainDiv: {
        height: "100%",
        width: "300px",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        boxSizing: "border-box",
        background: "none",
        border: "1px solid #00B140",
        borderRadius: "15px",
        marginRight: "10px"
    }, headingText:{
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "24px",
        textDecoration: "underline",
        margin: "0px"
    }, instrumentIdentifier: {
        margin: "0px",
        fontFamily: "Dosis",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        outline: "none",
        display: "flex",
        flexDirection: "row",
        gap: "10px"
    }
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './card.jsx';

export default class InfiniteDeck extends Component{
    constructor(props){
        super(props);
        var i = 1; var toadd = [{
            h1: "Stock Prattle Team", t1: "Find out about us!",
            h2: "Sample Stock Page 1", t2: "This is the 1st sample stock page.",
            h3: "Sample Stock Page 2", t3: "This is the 2nd sample stock page.",
            h4: "Sample Stock Page 3", t4: "This is the 3rd sample stock page."
        }];
        var cardCount = 4
        while (i<2){
            cardCount+=4
            toadd.push(({
                h1: "Sample Stock Page "+(cardCount-4), t1: "This is the "+(cardCount-4)+"th sample stock page.",
                h2: "Sample Stock Page "+(cardCount-3), t2: "This is the "+(cardCount-3)+"th sample stock page.",
                h3: "Sample Stock Page "+(cardCount-2), t3: "This is the "+(cardCount-2)+"th sample stock page.",
                h4: "Sample Stock Page "+(cardCount-1), t4: "This is the "+(cardCount-1)+"th sample stock page.",
            }));
            i++;
        }
        this.state = {items: toadd, cardCount: cardCount}
        this.checkAndFetch = this.checkAndFetch.bind(this)
    }

    checkAndFetch(event){
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight){
            setTimeout(() => {
            var cardCount = this.state.cardCount
            var toadd = []; var i = 0;
            while (i<2){
                cardCount+=4
                toadd.push(({
                    h1: "Sample Stock Page "+(cardCount-4), t1: "This is the "+(cardCount-4)+"th sample stock page.",
                    h2: "Sample Stock Page "+(cardCount-3), t2: "This is the "+(cardCount-3)+"th sample stock page.",
                    h3: "Sample Stock Page "+(cardCount-2), t3: "This is the "+(cardCount-2)+"th sample stock page.",
                    h4: "Sample Stock Page "+(cardCount-1), t4: "This is the "+(cardCount-1)+"th sample stock page.",
                }));
                i++;
            }
            this.setState({items: this.state.items.concat(toadd), cardCount: cardCount})
        }, 2000);
        }
    }

    render(){
    return (
        <div style={deckStyle.deckDiv} onScroll={this.checkAndFetch}>
            {this.state.items.map((i, index) => (
                <div style={deckStyle.packDiv}>
                    <Card heading={i.h1} text={i.t1} onCardClick={this.props.onCardClick}/>
                    <Card heading={i.h2} text={i.t2} onCardClick={this.props.onCardClick}/>
                    <Card heading={i.h3} text={i.t3} onCardClick={this.props.onCardClick}/>
                    <Card heading={i.h4} text={i.t4} onCardClick={this.props.onCardClick}/>
                </div>
            ))}
            <p style={deckStyle.loading}>Loading...</p>
        </div>
        )
    }
}

const deckStyle= { deckDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "rgba(229, 229, 229, 0.3)",
        overflow: "scroll",
        margin: "10px",
        borderRadius: "10px"
    }, packDiv: {
        height: "100%",
        width: "100%",
        display: "flex",
        gap: "45px",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        // border: "thick solid black",
        boxSizing: "border-box",
        background: "none",
        margin: "10px",
        borderRadius: "10px"
    },
}

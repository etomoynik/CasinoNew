import Home from './Home';
import GameCard from './GameCard';


import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/games';
import ProgressBar from 'react-toolbox';

const styleProfileList = {
    display: "flex",
    justifyContent: "spaceAround",
    flexWrap: "wrap",
};

class Games extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        this.props.fetchGames()
    }

    render() {
        if (!this.props.games) {
            console.log('games not loaded')
            return (<div/>);
        }
        else {
            console.log("games loaded", this.props.games)
            return (
                <Home>
                    <div style={{ display: "flex", justifyContent: "row" }}>
                    {this.props.games.map((game, key) => {
                        return <GameCard
                            game={game}
                            key={key}
                        />
                    }
                    )}
                    </div>
                </Home>
                )
        }
        
    }
}
const mapStateToProps = (state) => ({
    games: state.games.games
});

export default connect(mapStateToProps, actions)(Games);
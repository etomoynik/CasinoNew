import Home from './Home';
import PlayerCard from './PlayerCard';


import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/players';
import ProgressBar from 'react-toolbox';

const styleProfileList = {
    display: "flex",
    justifyContent: "spaceAround",
    flexWrap: "wrap",
};

class Players extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        this.props.fetchPlayers()
    }

    render() {
        if (!this.props.players) {
            console.log('Players not loaded')
            return (<div />);
        }
        else {
            console.log("Players loaded", this.props.players)
            return (
                <Home>
                    <div style={{ display: "flex", justifyContent: "row" }}>
                    {this.props.players.map((player, key) => {
                        return <PlayerCard
                            player={player}
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
    players: state.players.players
});

export default connect(mapStateToProps, actions)(Players);
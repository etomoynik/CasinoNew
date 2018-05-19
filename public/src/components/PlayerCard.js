//  NPM IMPORTS
import React, { Component } from 'react';
import { Slider, Dialog, Input, Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button } from 'react-toolbox';
import moment from 'moment';
import { METHODS } from 'http';
//  INNER IMPORTS

const styleSingleProfile = {
    width: "150px",
    marginTop: "30px",
    marginLeft: "30px",
    display: "flex",
    justifyContent: "row",
};



class PlayerCard extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render() {
        return (
        <Card style={styleSingleProfile}>
            <CardTitle
                title={`${this.props.player.User.name} ${this.props.player.User.surname}`}
            />
            <div style={{ width: "90%",
                            margin: "0 auto" }}>
                <div>Cash: {this.props.player.cash}</div>
                <div>Played times: {this.props.player.games_count}</div>
                <div>Won times: {this.props.player.won_times}</div>
                <div>Spent money: {this.props.player.spent_cash}</div>
                <div>Won money: {this.props.player.won_money}</div>
                <div>{this.props.player.playing? "currently playing": ""} </div>
            </div>

        </Card>
        )
    }
    
};

const mapStateToProps = (state) => ({
    errorMessage: state.auth.error
});

export default connect(mapStateToProps, actions)(PlayerCard)
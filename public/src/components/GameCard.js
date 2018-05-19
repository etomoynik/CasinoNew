//  NPM IMPORTS
import React, { Component } from 'react';
import { Slider, Dialog, Input, Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox';
import { connect } from 'react-redux';
import * as actions from '../actions/games';
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



class GameCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            slider: parseFloat(this.props.game.chance),
        };
    }

    handleSliderChange = (slider, value) => {
        
        this.props.patchGame(this.props.game.id, value)
        this.setState({slider: value})
      };

    handleMouseUp() {
        console.log("mouse up")
    }

    render() {
        return (
        <Card style={styleSingleProfile}>
            <CardTitle
                title={`${this.props.game.name}`}
            />
            <div style={{ width: "90%",
                            margin: "0 auto" }}>
            <div> Spent money: {`${this.props.game.spent_money}`} </div>
            <div> Won money: {`${this.props.game.won_money}`} </div>
            <div> Can win: {`${this.props.game.can_win}`} </div>
            <div> Chances: {`${this.state.slider}`} </div>
            <Slider pinned snaps min={0} max={1} step={0.1} editable value={this.state.slider} onChange={this.handleSliderChange.bind(this, 'slider')} onMouseUp={this.handleMouseUp.bind(this)}/>
            </div>

        </Card>
        )
    }
    
};

const mapStateToProps = (state) => ({
    errorMessage: state.auth.error
});

export default connect(mapStateToProps, actions)(GameCard)
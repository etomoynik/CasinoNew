//  NPM IMPORTS
import React, { Component } from 'react';
import { Slider, Dialog, Input, Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox';
import { connect } from 'react-redux';
import * as actions from '../actions/games';
import { Button } from 'react-toolbox';
import moment from 'moment';
import { METHODS } from 'http';
import GamesMachinesCard from './GamesMachinesCard';
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
            isViewMachinesModalOpen: false,
        };
    }

    handleSliderChange = (slider, value) => {
        
        this.props.patchGame(this.props.game.id, value)
        this.setState({slider: value})
      };

    handleMouseUp() {
        console.log("mouse up")
    }

    switchViewMachinesModal() {

        if(!this.state.isViewMachinesModalOpen) {
            this.props.fetchGameMachines(this.props.game.id);
        }
        this.setState({
            isViewMachinesModalOpen: !this.state.isViewMachinesModalOpen,
        })
    }

    render() {
        let machines_sorted = [];
        let machines_s = []
        
        if (this.props.machines) {
            machines_s = this.props.machines.machines.map(machine => {
                return machine.id - 1;
            })
            for (let i = 0; i < this.props.machines.count; i++) {
                machines_sorted[i] = (machines_s.includes(i))
            }
            console.log(machines_sorted)
        }

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

            <Button label="View machines" onClick={() => this.switchViewMachinesModal()}/>
            <div hidden={!this.state.isViewMachinesModalOpen}>
                {
                    (machines_sorted.length === 0)
                        ? <div> "not loaded" </div>
                        : <div> <GamesMachinesCard postGameMachines={this.props.postGameMachines} gameId= {this.props.game.id} machines_sorted={machines_sorted} id={`game_machines_card${this.props.gameId}`} />  </div>
                }
            </div>
            </div>

        </Card>
        )
    }
    
};

const mapStateToProps = (state) => ({
    errorMessage: state.auth.error,
    machines: state.games.machines,
});

export default connect(mapStateToProps, actions)(GameCard)
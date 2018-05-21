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



class MachineCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            is_working: this.props.machine.is_working
        };
    }

    fixMachine() {
        this.props.fixMachine(this.props.machine.id);
        this.setState({is_working: !this.state.is_working})
        
    }

    render() {
        return (
        <Card style={styleSingleProfile}>
            <CardTitle
                title={`Machine №${this.props.machine.id}`}
            />
            <div style={{ width: "90%",
                            margin: "0 auto" }}>
                <div> Cash {this.props.machine.cash_amount} </div>
                <div> Top cash {this.props.machine.top_cash_amount} </div>
                {!this.state.is_working? (<Button label="fix" onClick={() => this.fixMachine()}/>) : "working"}
            </div>
        </Card>
        )
    }
    
};

const mapStateToProps = (state) => ({
    errorMessage: state.auth.error
});

export default connect(mapStateToProps, actions)(MachineCard)
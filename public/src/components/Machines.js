import Home from './Home';
import MachineCard from './MachineCard';


import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/machines';
import ProgressBar from 'react-toolbox';

const styleProfileList = {
    display: "flex",
    justifyContent: "spaceAround",
    flexWrap: "wrap",
};

class Machines extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        console.log(this.props)
        this.props.fetchMachines()
    }

    render() {
        if (!this.props.machines) {
            console.log('machines not loaded')
            return (<div />);
        }
        else {
            console.log("machines loaded", this.props.machines)
            return (
                <Home>
                    <div style={{ display: "flex", justifyContent: "row" }}>
                    {this.props.machines.map((machine, key) => {
                        return <MachineCard
                            machine={machine}
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
    machines: state.machines.machines
});

export default connect(mapStateToProps, actions)(Machines);
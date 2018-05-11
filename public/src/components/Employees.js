import Home from './Home';
import SingleProfile from './SingleProfile';


import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ProgressBar from 'react-toolbox';

const styleProfileList = {
    display: "flex",
    justifyContent: "spaceAround",
    flexWrap: "wrap",
};

class Employees extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        this.props.fetchMessage('employee')
    }

    render() {
        if (!this.props.array) {
            console.log('not loaded')
            return (<div />);
        }
        else {
            console.log("loaded", this.props)
            return (
                <Home style={styleProfileList}>
                    {this.props.array.employee.map((emp, key) => {
                        return <SingleProfile
                            emp={emp}
                            key={key}
                        />
                    }
                    )}
                </Home>
                )
        }
        
    }
}
const mapStateToProps = (state) => ({
    array: state.auth.array
});

export default connect(mapStateToProps, actions)(Employees);
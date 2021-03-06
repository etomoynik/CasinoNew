import Home from './Home';
import SingleProfile from './SingleProfile';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/employees';
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
        console.log(this.props)
        this.props.fetchEmployees();
    }

    render() {
        if (!this.props.employees) {
            console.log('not loaded')
            return (<div />);
        }
        else {
            console.log("loaded", this.props)
            return (
                <Home>
                    <div style={{ display: "flex", justifyContent: "row" }}>
                    {this.props.employees.employee.map((emp, key) => {
                        return <SingleProfile
                            emp={emp}
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
    employees: state.employees.employees
});

export default connect(mapStateToProps, actions)(Employees);
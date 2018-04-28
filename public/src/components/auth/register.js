//  NPM IMPORTS
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {Input, Button, Navigation, Card} from 'react-toolbox'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
//  INNER IMPORTS
import RRbutton from '../RRbutton'

class Register extends Component {
    handleFormSubmit({ email, password, passwordConfirm }) {
        this.props.signupUser({ email, password, password  });
    
    }
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    
    render() {
        return (
            <div style={{ flex: 1, padding: '4rem' }}>
            <div style={{maxWidth: 300, margin: 'auto'}}>
            <Card style={{width: '300px'}}>
                <form style={{width: "50%", margin: 'auto'}} autoComplete="off" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <Input type='text' hint='email' name='email'
                    />
                    <Input type='password' hint='password' name='password'
                    />
                    <Input type='password' hint='confirm password' name='passwordConfirm'
                    />
                </form>
                
                <Navigation type='horizontal'>
                    <Button style={{
                            width: "100%",
                            margin: "0 auto"
                        }}
                        action="submit"
                        label='Register'/>
                </Navigation>
            </Card>
            </div>
            {this.renderAlert()}
            </div>
        )
    }
}

function validate(formProps) {
    const errors = {};
  
    if (formProps.password !== formProps.passwordConfirm) {
      errors.password = 'Passwords must match';
    }
  
    if (!formProps.email) {
      errors.email = 'Please enter an email';
    }
  
    if (!formProps.password) {
      errors.password = 'Please enter an password';
    }
  
    if (!formProps.passwordConfirm) {
      errors.passwordConfirm = 'Please confirm the password';
    }
  
    console.log(errors);
    return errors;
}

Register = reduxForm({
    form: "signup",
    validate
})(Register);

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(Register);

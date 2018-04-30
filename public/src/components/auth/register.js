//  NPM IMPORTS
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Input, Button, Navigation, Card, DatePicker} from 'react-toolbox'
import { reduxForm, Field } from 'redux-form';
//  INNER IMPORTS
import RRbutton from '../RRbutton'
import * as actions from '../../actions';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            date: '',
            name: '',
            surname: '',
        }
    };

    handleChange = (item, value) => {
        this.setState({...this.state, [item]: value});
    };
    handleFormSubmit() {
        this.props.signupUser(this.state.email, this.state.password, this.state.password2, this.state.date, this.state.name, this.state.surname );
    }
    
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div style={{ flex: 1, padding: '4rem' }}>
            <div style={{ maxWidth: 300, margin: 'auto' }}>
            <Card style={{ width: '300px' }}>
                <form style={{ width: "50%", margin: 'auto' }} autoComplete="on" onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                    <Input label='name' type='text' hint='' name='name' autoComplete='name' required 
                        value={this.state.name}
                        onChange={this.handleChange.bind(this, 'name')}
                    />
                    <Input label='surname' type='text' hint='' name='surname' autoComplete='family-name' required 
                        value={this.state.surname}
                        onChange={this.handleChange.bind(this, 'surname')}
                    />
                    <Input label='email' type='email' hint='' name='email' autoComplete='email' required 
                        value={this.state.email}
                        onChange={this.handleChange.bind(this, 'email')}
                    />
                    <Input label='password' type='password' hint='' name='password' required 
                        value={this.state.password}
                        onChange={this.handleChange.bind(this, 'password')}
                    />
                    <Input label='repeat password' type='password' hint='' name='password2' required 
                        value={this.state.password2}
                        onChange={this.handleChange.bind(this, 'password2')}
                    />
                    <DatePicker name='birthdate' label='Birthdate' onChange={this.handleChange.bind(this, 'date')} value={this.state.date} required 
                    />
                    <Navigation type='horizontal'>
                        <Button style={{
                                width: '100%',
                                margin: '0 auto'
                            }}
                            type='submit'
                            label='Register'/>
                    </Navigation>
                </form>
            </Card>
            </div>
            </div>
        )
    }
}

function validate(formProps) {
    const errors = {};
    
    if (!formProps.name) {
        errors.name = 'Please enter a name';
    }

    if (!formProps.surname) {
        errors.surname = 'Please enter a surname';
    }

    if (!formProps.birthdate) {
        errors.birthdate = 'Please enter a surname';
    }

    if (!formProps.email) {
      errors.email = 'Please enter an email';
    }
  
    if (!formProps.password) {
      errors.password = 'Please enter an password';
    }

    if (formProps.password !== formProps.password2) {
        errors.password = 'Passwords are different!';
    }
  
    console.log(errors);
    return errors;
}

Register = reduxForm({
    form: "signup",
    validate,
})(Register);

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(Register);

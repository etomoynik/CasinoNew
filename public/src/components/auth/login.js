//  NPM IMPORTS
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Input, Button, Navigation, Card} from 'react-toolbox';
import { Field, reduxForm } from 'redux-form';

//  INNER IMPORTS
import RRbutton from '../RRbutton'
import * as actions from '../../actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    };

    handleChange = (item, value) => {
        this.setState({...this.state, [item]: value});
    };
    handleFormSubmit( email, password ) {
        this.props.signinUser({ email, password });
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
        if (this.props.authenticated === true) {
            return <Redirect to='/home' />
        }
        const { handleSubmit } = this.props;
        return (
            <div style={{ flex: 1, padding: '4rem' }}>
                <div style={{maxWidth: 300, margin: 'auto'}}>
                    <Card style={{width: '300px'}}>
                        <form style={{width: "50%", margin: 'auto'}} autoComplete="on" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <Input type='text' hint='email' name='email' autoComplete='email'
                                value={this.state.email}
                                onChange={this.handleChange.bind(this, 'email')}
                            />
                            <Input type='password' hint='password' name='password' autoComplete='current-password'
                                value={this.state.password}
                                onChange={this.handleChange.bind(this, 'password')}
                            />
                        </form>

                        <Navigation type='horizontal'>
                            <Button style={{
                                    width: "50%",
                                    margin: "0 auto"
                                }}
                                onClick = {() => this.handleFormSubmit(this.state.email, this.state.password)}
                                label='Login'
                            />
                            <RRbutton style={{
                                    width: "50%",
                                    margin: "0 auto"
                                }}
                                exact to='/register' 
                                label='Register'
                            />
                        </Navigation>
                    </Card>
                </div>
            </div>
        )
    }
}

Login = reduxForm({
    form: 'signin'
})(Login);

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}
  
export default connect(mapStateToProps, actions)(Login);

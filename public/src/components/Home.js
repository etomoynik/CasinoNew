//  NPM IMPORTS
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link as RouterLink, Redirect } from 'react-router-dom'
import {
    AppBar,
    Navigation,
    Link,
    Button,
    Layout,
    NavDrawer
} from 'react-toolbox';
//  INNER IMPORTS
import RRLink from './RRlink';

const styleDrawer = {
    width: "24rem"
}

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            drawerActive: false,
            drawerPinned: false,
            sidebarPinned: false
        };
    }
    

    toggleDrawerActive = () => {
        this.setState({ drawerActive: !this.state.drawerActive });
    };

    toggleDrawerPinned = () => {
        this.setState({ drawerPinned: !this.state.drawerPinned });
    }
    logout = () => {
      this.props.logout();
    }

    employeeViewAccessControl(){
        console.log((this.props.access_level))
        if (this.props.access_level == 1) 
            return <RRLink exact to='/profile' label='Employees'/>
    }

    render() {
        console.log(this.props)
        if (this.props.authenticated === false) {
          return <Redirect to='/login' />
        }
        return (
            <Layout>
                <AppBar title='' leftIcon='menu' onLeftIconClick={this.toggleDrawerActive} fixed={true}>
                    <Navigation type='horizontal'>
                        <RRLink exact to='/logout' label='Logout'/>
                    </Navigation>
                </AppBar>
                <div style={{ flex: 1, padding: '4rem' }}>
                        {this.props.children}
                </div>
                <NavDrawer active={this.state.drawerActive}
                    pinned={this.state.drawerPinned} permanentAt='xxxl'
                    onOverlayClick={ this.toggleDrawerActive }>
                    <Navigation type='vertical'>
                        <RRLink style={{width: "100%"}} exact to='/home' label='Home'/>
                        <RRLink exact to='/profile' label='Profile'/>
                        {this.employeeViewAccessControl()} 
                        <RRLink exact to='/game' label='Game'/>
                        <RRLink exact to='/about' label='About us'/>
                        <RRLink exact to='/machines' label='Machines'/>
                    </Navigation>
                </NavDrawer>
            </Layout>

        );
    }
}
const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  errorMessage: state.auth.error,
  access_level: state.auth.access_level,
  name: state.auth.name,
  surname: state.auth.surname,
});

export default connect(mapStateToProps, actions)(Home);
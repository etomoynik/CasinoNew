//  NPM IMPORTS
import React, { Component } from 'react';
import { Dialog, Input, Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox';
import { connect } from 'react-redux';
import * as actions from '../actions/employees';
import { Button } from 'react-toolbox';
import moment from 'moment';
import { METHODS } from 'http';
//  INNER IMPORTS


const styleSingleProfile = {
    width: "250px",
    marginTop: "30px",
    marginLeft: "30px",
};

const stylePenaltie = {
    width: "300px",
    marginTop: "20px",
    marginLeft: "20px",
    marginRight: "20px",
};



class SingleProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            online: false,
            isViewPenaltieModalOpen: false,
            isMakePenaltieModalOpen: false,
            isChangeSalaryModalOpen: false,
            reason: "",
            amount: "",
            salaryAmount: "",
            dialogActive: false,
        };
    }

    switchViewPenaltieModal() {
        this.setState({
            isViewPenaltieModalOpen: !this.state.isViewPenaltieModalOpen,
        })
    }

    switchMakePenaltieModal() {
        this.setState({
            isMakePenaltieModalOpen: !this.state.isMakePenaltieModalOpen,
        })
    }

    switchChangeSalaryModal() {
        this.setState({
            isChangeSalaryModalOpen: !this.state.isChangeSalaryModalOpen,
        })
    }

    handleDialogToggle() {
        console.log(this)
        this.setState({dialogActive: !this.state.dialogActive});
    }

    viewPenalties() {
        if (!this.state.isViewPenaltieModalOpen)
            this.props.fetchPenalties(this.props.emp.id);
        this.switchViewPenaltieModal();
    };

    makePenaltie() {
        this.switchMakePenaltieModal();
    };
    
    postPenaltie() {
        this.props.postPenalties(this.props.emp.id, this.state.amount, this.state.reason);
    }

    handleChange = (item, value) => {
        this.setState({...this.state, [item]: value});
    };

    deleteEmployee() {
        console.log("delete req")
        this.props.deleteEmployee(this.props.emp.id)
        this.handleDialogToggle.bind(this)
    }

    dialogActions = [
        { label: "Cancel", onClick: this.handleDialogToggle.bind(this) },
        { label: "Delete", onClick: (() => this.deleteEmployee()) }
    ];

    isOnline() {
        if (moment(this.props.emp.last_login).unix() > moment(this.props.emp.last_logout).unix()) {
            console.log(this.props.emp.last_login, this.props.emp.last_logout);
            this.setState({online: true});
        }
        else {
            this.setState({online: false});
        }
    }

    renderAlert() {
        if (this.props.errorMessage) {
          return (
          <div className="alert alert-danger">
              <strong>Oops!</strong> {this.props.errorMessage}
          </div>
          );// TODO показывать только один раз
      }
    }

    componentWillMount(){
        this.isOnline();
    }

    render() {
        return (
            <div>
        <Card style={styleSingleProfile}>
            <h4 style={{ width: "50%",
                            margin: "0 auto" }}>
            {`${this.props.emp.User.name} ${this.props.emp.User.surname}`}
            </h4>
            <div style={{ width: "50%",
                            margin: "0 auto" }}>
                {this.state.online? "online" : "offline"}
            </div>
            
            <div style={{display: "block"}}>
                <div><Button style={{width: "100%"}} label="View penalties" onClick={this.viewPenalties.bind(this)}/></div>
                <div><Button style={{width: "100%"}} label="Make penaltie" onClick={this.makePenaltie.bind(this)}/></div>
                <div><Button style={{width: "100%"}} label="Change salary" onClick={this.switchChangeSalaryModal.bind(this)}/></div>
                <div><Button style={{width: "100%"}} label="Delete" onClick={this.handleDialogToggle.bind(this)}/></div>
            </div>

        </Card>
        <div hidden={!this.state.isViewPenaltieModalOpen}>
            <Card >
                {(this.props.penalties)? this.props.penalties.map((penaltie, key) => {
                    if (penaltie.to_employee_id === this.props.emp.id) // FIX одновременный просмотр у нескольких профилей
                        return (
                            <Card style={stylePenaltie} key={key}>
                                <CardTitle
                                    title={`penaltie №: ${key}`}
                                />
                            <div>
                                reason: {penaltie.reason}
                            </div>
                            <div>
                                amount: {penaltie.amount}
                            </div>
                            <div>
                                date: {moment(penaltie.date_of_issue).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                            </div>
                            <div>
                                by: {penaltie.from_employee_id}
                            </div>
                            </Card>
                        )
                }): <div> loading</div>}
                <Button onClick={() => this.switchViewPenaltieModal()}>
                    Close Menu
                </Button>
            </Card>
        </div>
        <div hidden={!this.state.isMakePenaltieModalOpen}>
            <Card>
                <div id='makePenaltie' style={{width: "50%", margin: 'auto'}}>
                    <section>
                        <Input label='reason' type='text' hint='' name='reason'
                            value={this.state.reason}
                            onChange={this.handleChange.bind(this, 'reason')}
                        />
                        <Input label='amount' type='text' hint='' name='amount'
                            value={this.state.amount}
                            onChange={this.handleChange.bind(this, 'amount')}
                            error={this.renderAlert()}
                        />
                    </section>
                </div>
                <Button style={{
                        width: "50%",
                        margin: "0 auto"
                    }}
                    onClick={() => this.postPenaltie()}
                    label='Make'
                />
                <Button onClick={() => this.switchMakePenaltieModal()}>
                    Close Menu
                </Button>
            </Card>
        </div>
        <div hidden={!this.state.isChangeSalaryModalOpen}>
            <Card>
                <div id='change salary' style={{width: "50%", margin: 'auto'}}>
                    <section>
                        <Input label='amount' type='text' hint='' name='amount'
                            value={this.state.salaryAmount}
                            onChange={this.handleChange.bind(this, 'salaryAmount')}
                            error={this.renderAlert()}
                        />
                    </section>
                </div>
                <Button style={{
                        width: "50%",
                        margin: "0 auto"
                    }}
                    onClick={() => this.changeSalary()}
                    label='Change'
                />
                <Button onClick={() => this.switchChangeSalaryModal()}>
                    Close Menu
                </Button>
            </Card>
        </div>
        <Dialog
          actions={this.dialogActions}
          active={this.state.dialogActive}
          onEscKeyDown={this.handleDialogToggle.bind(this)}
          onOverlayClick={this.handleDialogToggle.bind(this)}
          title='Are you sure?'
        >
            <p>employee {`${this.props.emp.User.name} ${this.props.emp.User.surname}`} will be removed</p>
            {this.renderAlert()}
        </Dialog>
        </div>
        )
    }
    
};

const mapStateToProps = (state) => ({
    penalties: state.employees.penalties,
    errorMessage: state.auth.error
});

export default connect(mapStateToProps, actions)(SingleProfile)
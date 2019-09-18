import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from './Store';
import FormInput from './FormInput';

const mapStateToProps = ({ users }) => ({
  users: users,
});

const mapDispatchToProps = (dispatch) => ({
  addUserDispatch: (value) => {
    dispatch(addUser(value))
  },
});

class Create extends Component {
  state = {
    added: false,
    wrong: false,
  }

  addNewUser(event) {
    event.preventDefault();
    const { addUserDispatch, users } = this.props;
    const { added } = this.state;
    const userLogin = document.getElementById('login').value;
    const userPassword = document.getElementById('password').value;
    const userRole = document.getElementById('role').value;
    const userEmail = document.getElementById('email').value;

    for (let i = 0; i < users.length; i++) {
      console.log(users[i].deleted);
      console.log(users[i].login);
      if(users[i].deleted === false) {
        if (users[i].login !== userLogin) {
          this.setState({
            added: true,
          });
          return null;
        }
      }
      if (users[i].deleted !== false) {
        this.setState({
          added: true,
        });
      }
    }
    if (added === true) {
      addUserDispatch({
        id: users.length,
        login: userLogin,
        password: userPassword,
        role: userRole,
        email: userEmail,
        deleted: false,
      });
    }
  }

  render() {
    const { added, wrong } = this.state;
    return (
      <Fragment>
        {added ? <p>New user added</p> : <p></p>}
        {wrong ? <p>This user name is already reserved!</p> : <p></p>}
        <form onSubmit={(event) => {this.addNewUser(event)}}>
          <FormInput name='login' id='login' label='Login' type='text'/>
          <FormInput name='password' id='password' label='Password' type='password'/>
          <FormInput name='email' id='email' label='Email' type='email'/>
          <FormInput name='role' id='role' label='Role' type='text'/>
          <button>Add</button>
        </form>
        <Link to="/">Back</Link>
      </Fragment>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Create);

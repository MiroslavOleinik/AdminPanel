import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser, logOut } from './Store';
const mapStateToProps = ({ users, currentUser }) => ({
  currentUser: currentUser,
  users: users,
});

const mapDispatchToProps = (dispatch) => ({
  deleteUserDispatch: (value) => {
    dispatch(deleteUser(value))
  },
  logOutDispatch: () => {
    dispatch(logOut())
  },
});

class AdminPage extends Component {
  deleteFlagOn(id) {
    console.log(id);
    this.props.deleteUserDispatch(id);
    this.setState();
  }

  logOut() {
    const { logOutDispatch } = this.props;
    logOutDispatch();
  }

  render() {
    const { currentUser, users } = this.props;
    return (
      <Fragment>
      <button onClick={()=>{this.logOut()}}>Log Out</button>
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Username</td>
              <td>Password</td>
              <td>Email</td>
              <td>Role</td>
              <td>Edit</td>
              <td>User control</td>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, login, password, email, role, deleted }) => {
              if (!deleted) {
                return (
                  <tr key={`${login}${id}`}>
                    <td>{id}</td>
                    <td>{login}</td>
                    <td>{password}</td>
                    <td>{email}</td>
                    <td>{role}</td>
                    <td>
                    </td>
                    <td>{id === currentUser.id ? (<span>Current user</span>) : (<button onClick={() => {this.deleteFlagOn(id)}}>Delete</button>)}</td>
                  </tr>)
              } else {
                return null
              }
            })}
          </tbody>
        </table>
        <Link to="create">Create New</Link>
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);

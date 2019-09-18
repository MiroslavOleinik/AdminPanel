const initialState = {
  loginStatus: true,
  currentUser: {
    id: 0,
    login: 'admin',
    password: 'password',
    role: 'admin',
    email: 'ollmirik@gmail.com',
    deleted: false,
  },
  users: [{
    id: 0,
    login: 'admin',
    password: 'password',
    role: 'admin',
    email: 'ollmirik@gmail.com',
    deleted: false,
  },{
    id: 1,
    login: 'user',
    password: 'password',
    role: 'user',
    email: 'ollmirik@gmail.com',
    deleted: false,
  },]
}

export function logIn(value, login) {
  return {
    type: 'LOG_IN',
    payload: value,
    incommingLogin: login,
  };
}

export function deleteUser(value) {
  return {
    type: 'DELETE_USER',
    payload: value,
  };
}

export function addUser(value) {
  return {
    type: 'ADD_USER',
    payload: value,
  };
}

export function logOut() {
  return {
    type: 'LOG_OUT',
    payload: {
      loginStatus: false,
      currentUser: {},
    }
  };
}

export function adminPanel(state = initialState, action) {
  const { type, payload, incommingLogin } = action;
  let users = [ ...state.users ];
  switch (type) {
    case 'LOG_IN':
      let currentUser;
      users.map((element) => {
        if (element.login === incommingLogin) {
          currentUser = element;
        }
        return null;
      });
      return {
        ...state,
        currentUser: currentUser,
        loginStatus: payload,
      };
    case 'DELETE_USER':
      users.forEach((element) => {
        if (element.id === payload) {
          element.deleted = true;
        }
      });
      return {
        ...state,
        users: users,
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...users, payload],
      };
    case 'LOG_OUT':
      return {
        ...state,
        loginStatus: payload.loginStatus,
        currentUser: payload.currentUser,
      };
    default:
      return state;
  }
}

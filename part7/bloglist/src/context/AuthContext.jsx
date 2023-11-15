import { createContext, useReducer } from 'react';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, dispatch] = useReducer(authReducer, null);
  const setUser = (user) => {
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
  const clearUser = () => {
    dispatch({
      type: 'CLEAR_USER',
    });
  };
  return (
    <AuthContext.Provider value={{ user, setUser, clearUser }}>
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

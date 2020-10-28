import React, { useEffect } from 'react';
import './App.css';
import IMessage from './IMessage';
import {selectUser, login, logout} from './features/counter/counterSlice'
import { useDispatch,useSelector } from 'react-redux';
import Login from "./Login";
import { auth } from './firebase'
function App() {
   const user = useSelector(selectUser)
   const dispatch = useDispatch()
   useEffect(() => {
      auth.onAuthStateChanged(authUser => {
        if(authUser) {
          //user is logged in
          dispatch(login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          }))
        }else {
          //user is loggrd out
          dispatch(logout())
        }
      })
   }, [])

  return (
    <div className="app">
      {user ? (
           <IMessage />) : (
        <Login />
      )}
    </div>
  );
}

export default App;

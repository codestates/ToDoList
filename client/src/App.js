import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import Login from "./component/Login";
import Register from "./component/Register";
import ForgotPage from "./component/ForgotPage";
import {Modal} from "./component/Modal"
function App() {
  const [AccessToken, setAccessToken] = useState("");

  function TokenSave(token) {
    setAccessToken(token);
  }
  return (
    
    <BrowserRouter>
      <Route exact path="/">
        <LandingPage AccessToken={AccessToken} />
        <Modal  />
      </Route>
      <Route exact path="/login">
        <Login TokenSave={TokenSave} />
      </Route>
      <Route exact path='/forgotpage'>
        <ForgotPage />
      </Route>
      
      
        
      <Route exact path="/register" component={Register} />
    </BrowserRouter>
    
  );
}

export default App;

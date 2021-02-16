import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./containers/Payment";
import Home from './containers/Home';
import Offer from './containers/Offer';
import Header from './components/Header'
import Login from './containers/Login';
import Signup from './containers/Signup'
import Cookies from 'js-cookie'
import { useState } from 'react';

function App() {

  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const stripePromise = loadStripe("pk_test_R12MXgm77An40gqpmiTmltIf");
  
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires : 7});
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null)
    }
  }

  return (
    <div className="App">
    <Elements stripe={stripePromise}>
    <Router>
      <Header userToken={userToken} setUser={setUser} />
      <Switch>

        <Route path="/offer/:id">
          <Offer/>
        </Route>

        <Route path="/login">
          <Login setUser={setUser} />
        </Route>

        <Route path="/signup">
          <Signup userToken={userToken} setUser={setUser} setUserToken={setUserToken} />
        </Route>

        <Route path="/payment/:id">
          <Payment userToken={userToken}/>
        </Route>

        <Route path="/">
          <Home/>
        </Route>

      </Switch>
    </Router>


    </Elements>
    
    </div>
    
  );
}

export default App;

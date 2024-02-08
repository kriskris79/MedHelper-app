import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './scss/styles/_app.scss';
import "./scss/styles/_main.scss";
import MedicationList from './components/MedicationList';
import Register from './components/Register';
import Login from './components/Login';
import PasswordlessLogin from './components/PasswordlessLogin';

function App() {
    return (
        <Router>
            <div className="app">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/passwordless-login">Passwordless Login</Link>
                        </li>
                        <li>
                            <Link to="/medications">My Medications</Link>
                        </li>
                    </ul>
                </nav>
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/passwordless-login">
                        <PasswordlessLogin />
                    </Route>
                    <Route path="/medications">
                        <MedicationList />
                    </Route>
                    <Route path="/">
                        <h1>Welcome to the App</h1>
                        {/* Optionally place content shown on the homepage or redirect to another component */}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

// import React from 'react';
// import './scss/styles/_app.scss';
// import "./scss/styles/_main.scss";
// import MedicationList from './components/MedicationList';
//
// function App() {
//     return (
//         <div className="app">
//             <h1 className="title">My Medications List</h1>
//             <MedicationList />
//         </div>
//     );
// }
//
// export default App;

import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './components/Styles.css';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/' exact>
						<Home />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/register'>
						<Register />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;

import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PicMetric from './components/PicMetric';
import Profile from './components/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import './App.css';
import { Grommet } from 'grommet';

const App = () => {
	const theme = {
		global: {
			font: {
				family: 'Segoe UI',
				size: '1.3rem'
			}
		}
	};

	return (
		<Router>
			<Grommet theme={theme}>
				<header className='App'>
					{/* <div>NavBar</div> */}
					<Switch>
						<Route path='/' exact>
							<Home />
						</Route>
						<Route path='/login'>
							{/* <div>NavBar</div> */}
							<Login />
						</Route>
						<Route path='/register'>
							<div>NavBar</div>
							<Register />
						</Route>
						<PrivateRoute path='/picmetric'>
							<div>NavBar</div>
							<PicMetric />
						</PrivateRoute>
						<PrivateRoute path='/profile'>
							{' '}
							<div>NavBar</div>
							<Profile />{' '}
						</PrivateRoute>
					</Switch>
				</header>
			</Grommet>
		</Router>
	);
};

export default App;

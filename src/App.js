import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PicMetric from './components/PicMetric';
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
					</Switch>
				</header>
			</Grommet>
		</Router>
	);
};

export default App;

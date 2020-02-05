import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Home = () => {
	const apiUrl = 'https://bw-pic-metric.herokuapp.com/api';
	const routerHistory = useHistory();
	const [message, setMessage] = useState('');

	const registerUser = () => {
		axios
			.post(apiUrl + '/auth/register', {
				full_name: 'Asher Kobin',
				email: 'asher1@foo.com',
				password: 'tooManySecrets'
			})
			.then(res => setMessage('registerUser OK'))
			.catch(err => {
				setMessage(err.response.data.error.message);
			});
	};

	const loginUser = () => {
		axios
			.post(apiUrl + '/auth/login', {
				email: 'asher1@foo.com',
				password: 'tooManySecrets'
			})
			.then(res => {
				setMessage('loginUser OK');
				localStorage.setItem('USER_TOKEN', res.data.token);
			})
			.catch(err => {
				setMessage(err.response.data.error.message);
			});
	};

	const loginUserBadPwd = () => {
		axios
			.post(apiUrl + '/auth/login', {
				email: 'asher1@foo.com',
				password: 'wrongPwd'
			})
			.then(res => {
				throw new Error('password was bad!!!');
			})
			.catch(err => {
				setMessage(err.response.data.error.message);
			});
	};

	const loginUserBadUser = () => {
		axios
			.post(apiUrl + '/auth/login', {
				email: 'noOneHere@foo.com',
				password: 'wrongPwd'
			})
			.then(res => {
				throw new Error('user was bad!!!');
			})
			.catch(err => {
				setMessage(err.response.data.error.message);
			});
	};

	const deleteToken = () => {
		localStorage.removeItem('USER_TOKEN');
		setMessage('Token Deleted');
	};

	const goToPrivateUrl = () => {
		routerHistory.push('/picmetric');
	};

	const tokenStatus = () => {
		setMessage(
			localStorage.getItem('USER_TOKEN') ? 'Token Exists' : 'No Token'
		);
	};

	return (
		<div>
			<button onClick={registerUser}>Test Register User</button>
			<button onClick={loginUser}>Test Login User</button>
			<button onClick={loginUserBadPwd}>
				Test Login User - Wrong Password
			</button>
			<button onClick={loginUserBadUser}>
				Test Login User - User Doesn't Exist
			</button>
			<button onClick={tokenStatus}>Token Status</button>
			<button onClick={deleteToken}>Delete Token</button>
			<button onClick={goToPrivateUrl}>Go To Private URL</button>
			<div>{message}</div>
		</div>
	);
};

export default Home;

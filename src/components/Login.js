import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Box } from 'grommet';

const Login = () => {
	const { register, handleSubmit, errors } = useForm();
	const [loginError, setLoginError] = useState();
	const baseUrl = 'https://bw-pic-metric.herokuapp.com/api';
	const routerHistory = useHistory();
	const onSubmit = data => {
		axios
			.post(baseUrl + '/auth/login', {
				email: data.email,
				password: data.password
			})
			.then(res => {
				localStorage.setItem('USER_TOKEN', res.data.token);
				routerHistory.push('/picmetric');
			})
			.catch(err => {
				setLoginError('Login Error: ' + err.response.data.error.message);
			});
	};
	console.log(errors);

	return (
		<section className='loginCard'>
			<Box margin='8rem' elevation='xlarge' pad='.5rem' round='.7rem'>
				<Box
					alignContent='center'
					pad='19rem 5rem'
					round='.5rem'
					elevation='xlarge'
				>
						<div>NavBar</div>

						<h1>PicMetric</h1>
<div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<label>Email</label>
							<input
								type='email'
								name='email'
								placeholder=''
								ref={register({ required: true, pattern: /^\S+@\S+$/i })}
							/>
							<ErrorMessage error={errors.email} />

							<label>Password</label>
							<input
								type='password'
								name='password'
								placeholder=''
								ref={register({ required: true })}
							/>
							<ErrorMessage error={errors.password} />

							<input type='submit' value='Sign In' />
							<div>{loginError}</div>
						</form>
						<div>
							{'Not registered? '}
							<span
								style={{
									cursor: 'pointer',
									color: '#e11061',
									textDecoration: 'underline'
								}}
								onClick={e => routerHistory.push('/register')}
							>
								Create an account!
							</span>
							</div>
						</div>
				</Box>
			</Box>
		</section>
	);
};

export default Login;

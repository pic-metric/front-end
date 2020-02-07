import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Box } from 'grommet';
import './Login.css'


const Login = () => {
	const { register, handleSubmit, errors } = useForm();
	const [loginError, setLoginError] = useState();
	const baseUrl = "https://bw-pic-metric.herokuapp.com/api";
	const routerHistory = useHistory();
	const onSubmit = data => {
		axios
    .post(baseUrl + "/auth/login", {
      email: data.email,
      password: data.password
    })
    .then(res => {
			localStorage.setItem("USER_TOKEN", res.data.token);
			localStorage.setItem("USER_ID", res.data.id);
			routerHistory.push("/picmetric");
    })
    .catch(err => {
		setLoginError('Login Error: ' + err.response.data.error.message);
    });
	}
	console.log(errors);

	return (
		<div className='loginCard'>
			<Box
				margin='7rem'
				elevation='xlarge'
				pad='.5rem'
				round='.7rem'
				overflow='hidden'>
			<Box
				alignContent='center'
				pad='18rem 3.3rem 4rem 3.3rem'
				round='.5rem'
				elevation='xlarge'
				overflow='hidden'>
				<div className ='loginNavBar'>NavBar</div>
				<h1 className='loginHeader'>PicMetric</h1>
			<div>
			<form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
				<label>Email</label>
				<input className='loginField'
					type='email'
					name='email'
					placeholder=''
					ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
				<ErrorMessage error={errors.email} />
				<label>Password</label>
				<input className='loginField'
					type='password'
					name='password'
					placeholder=''
					ref={register({ required: true })} />
				<ErrorMessage error={errors.password} />
				<input classname='loginSubmit' type='submit'
				value='Sign In' />
				<div>{loginError}</div>
			</form>
			<div className='registerLink'>
				{ "Not registered? " }
				<span style={{ cursor: "pointer", color: '#e1106199', textDecoration: "underline"}} onClick={ e => routerHistory.push("/register") }>
				Create an account!
        		</span>
			</div>
			</div>
		</Box>
		</Box>
	</div>
	);
};

export default Login;

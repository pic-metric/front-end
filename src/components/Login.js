import React from 'react';
import ErrorMessage from './ErrorMessage';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
	const { register, handleSubmit, errors } = useForm();
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
			routerHistory.push("/picmetric");
    })
    .catch(err => {
      console.log("Login Error: " + err.response.data.error.message); // Michael: surface this in the UI
    });
	}
	console.log(errors);

	return (
		<div>
			<h1>Sign In</h1>

			<form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
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

				<input type='submit' />
			</form>
			<div>
				{ "Not registered? " }
				<span style={{ cursor: "pointer", color: "blue", textDecoration: "underline"}} onClick={ e => routerHistory.push("/register") }>
					Create an account!
        </span>
			</div>
		</div>
	);
};

export default Login;

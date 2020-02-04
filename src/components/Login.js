import React from 'react';
import ErrorMessage from './ErrorMessage';
import { useForm } from 'react-hook-form';

const Login = () => {
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = data => console.log(data);
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
		</div>
	);
};

export default Login;

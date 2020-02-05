import React from 'react';
import ErrorMessage from './ErrorMessage';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
	const {
		errors,
		formState,
		getValues,
		handleSubmit,
		register,
		triggerValidation
	} = useForm();
	const baseUrl = 'https://bw-pic-metric.herokuapp.com/api';
	const routerHistory = useHistory();
	const onSubmit = data => {
		axios
			.post(baseUrl + '/auth/register', {
				full_name: data.firstName + ' ' + data.lastName,
				email: data.email,
				password: data.password
			})
			.then(res => {
				routerHistory.push('/login');
			})
			.catch(err => {
				console.log('Registration Error: ' + err.response.data.error.message); // Michael: surface this in the UI
			});
	};
	console.log(errors);

	const verifyPassword = repeatPassword =>
		repeatPassword === getValues().password || 'Passwords do not match';
	const validatePassword = () => {
		if (formState.isSubmitted) {
			triggerValidation({ name: 'repeatPassword' });
		}
	};

	return (
		<div>
			<h1>Sign Up</h1>

			<form className='registerForm' onSubmit={handleSubmit(onSubmit)}>
				<label>First Name</label>
				<input
					type='text'
					name='firstName'
					placeholder=''
					ref={register({ required: true, minLength: 1, maxLength: 100 })}
				/>
				<ErrorMessage error={errors.firstName} />

				<label>Last Name</label>
				<input
					type='text'
					name='lastName'
					placeholder=''
					ref={register({ required: true, minLength: 1, maxLength: 100 })}
				/>
				<ErrorMessage error={errors.lastName} />

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
					onChange={validatePassword}
				/>
				<ErrorMessage error={errors.password} />

				<label>Verify Password</label>
				<input
					type='password'
					name='repeatPassword'
					placeholder=''
					ref={register({
						required: true,
						validate: verifyPassword
					})}
				/>
				{errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}

				<input type='submit' />
			</form>
		</div>
	);
};

export default Register;

import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Box } from 'grommet';


const Register = () => {
	const {
		errors,
		formState,
		getValues,
		handleSubmit,
		register,
		triggerValidation
	} = useForm();
	const [RegisterError, setRegisterError] = useState();
	const baseUrl = "https://bw-pic-metric.herokuapp.com/api";
	const routerHistory = useHistory();
	const onSubmit = data => {
		axios
			.post(baseUrl + "/auth/register", {
				full_name: data.firstName + " " + data.lastName,
				email: data.email,
				password: data.password })
			.then(res => {
				routerHistory.push("/login");
			})
			.catch(err => {
				setRegisterError(
					'Registration Error: ' + err.response.data.error.message
				);
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
			<h1 classname='newUserRegister'>New User</h1>
			<div className='RegisterCard'>
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
				<div className ='RegisterNavBar'>NavBar</div>
				<h1 className='RegisterHeader'>PicMetric</h1>
			<div>
			<form className='registerForm' onSubmit={handleSubmit(onSubmit)}>
				<label></label>
				<input
					type='text'
					name='firstName'
					placeholder='First Name'
					ref={register({ required: true, minLength: 1, maxLength: 100 })}
				/>
				<ErrorMessage error={errors.firstName} />

				<label></label>
				<input
					type='text'
					name='lastName'
					placeholder='Last Name'
					ref={register({ required: true, minLength: 1, maxLength: 100 })}
				/>
				<ErrorMessage error={errors.lastName} />

				<label></label>
				<input
					type='email'
					name='email'
					placeholder='Email'
					ref={register({ required: true, pattern: /^\S+@\S+$/i })}
				/>
				<ErrorMessage error={errors.email} />

				<label></label>
				<input
					type='password'
					name='password'
					placeholder='Password'
					ref={register({ required: true })}
					onChange={validatePassword}
				/>
				<ErrorMessage error={errors.password} />

				<label></label>
				<input
					type='password'
					name='repeatPassword'
					placeholder='Verify Password'
					ref={register({
						required: true,
						validate: verifyPassword
					})}
				/>
				{errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}

				<input type='submit' className='RegisterButton'
					   value='Sign Up'/>
				<div>{RegisterError}</div>
							</form>
							<div className='loginLink'>
				{ 'Already have an account?' }
				<span style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', fontSize: '1.8rem', color: '#e1106199', textDecoration: 'underline'}} onClick={ e => routerHistory.push('/login') }>
				Sign in here
        		</span>
			</div>
			</div>
		</Box>
		</Box>
	</div>
	</div>
	);
};

export default Register;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import jwt_decode from 'jwt-decode';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUp = () => {
	const [form, setForm] = useState(initialState);
	const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const classes = useStyles();

	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => setShowPassword(!showPassword);

	const switchMode = () => {
		setForm(initialState);
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignup) {
			dispatch(signup(form, navigate));
		} else {
			dispatch(signin(form, navigate));
		}
	};

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={6}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{isSignup ? 'Sign up' : 'Sign in'}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name='firstName'
									label='First Name'
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name='email'
							label='Email Address'
							handleChange={handleChange}
							type='email'
						/>
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								label='Repeat Password'
								handleChange={handleChange}
								type='password'
							/>
						)}
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>
					<GoogleLogin
						theme='filled_blue'
						size='large'
						width='364'
						text={isSignup ? 'signup_with' : 'signin_with'}
						onSuccess={(res) => {
							const decoded = jwt_decode(res.credential);
							const user = {
								_id: decoded.sub,
								_type: 'user',
								name: decoded.name,
								image: decoded.picture,
							};
							const token = res.credential;
							try {
								dispatch({ type: 'AUTH', data: { user, token } });
								navigate('/');
							} catch (error) {
								console.log(error);
							}
						}}
						onError={() => {
							console.log('Login Failed');
						}}
					/>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Button onClick={switchMode} className={classes.button}>
								{isSignup
									? 'Already have an account? Sign in'
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default SignUp;

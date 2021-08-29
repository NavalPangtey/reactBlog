import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
// import jwt from 'jsonwebtoken';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const url = new URLSearchParams(window.location.search);
const token_valid= url.get('token_valid');
const message= url.get('message');
if(token_valid==="True")
	{
		alert(message)
	}
else if(token_valid==="False") {
	alert(message)
}


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

	
	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`login/`, {
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {
				console.log(res);
				localStorage.setItem('access_token', res.data.tokens.access);
				localStorage.setItem('refresh_token', res.data.tokens.refresh);
				localStorage.setItem('username', res.data.username);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				history.push('/');
				console.log(res);
				// console.log(res.data);
				// console.log(jwt_decode(res.data.access))
				// var user_id=jwt_decode(res.data.access).user_id;
				// console.log(user_id)
				window.location.reload();
			})
			.catch((error) =>{
				console.log(error.response.status) // 400
				console.log(error.response.data.password)
				
			    if(error.response.status==401){
				  alert(error.response.data.detail)
				
				   history.push('/login');
			    }
				if(error.response.status==400){

					alert(error.response.data.password)
				   history.push('/login');
			    }
			});
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					{/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/> */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="/forget/" variant="body2">
								Forgot password?
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
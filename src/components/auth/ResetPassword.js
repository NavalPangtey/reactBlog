import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
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
import Forget from './forget';



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
const url = new URLSearchParams(window.location.search);
const token_valid= url.get('token_valid');
const message= url.get('message');
const uidb64= url.get('uidb64');
const token= url.get('token');


export default function SignIn() {
    const history = useHistory();
    const classes = useStyles();
    const initialFormData = Object.freeze({
		uidb64: uidb64,
        token: token,
        password:"",
	});

	const [formData, updateFormData] = useState(initialFormData);

    if(token_valid=== "False")
    {
        // history.push({
		// 	pathname: '/forget/',
		// });
        return(
            
            <Container component="main" maxWidth="xs">
               
			<CssBaseline />
            
			<div className={classes.paper}>
            <Typography component="h1" variant="h4">
					Password Reset ulr is not valid or it is used once , To get Reset ulr enter your email id
				</Typography>
				
                <Forget />
            </div>
            </Container>
        )
        
    }
    else
	{
       

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

    const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance.patch(`password-reset-complete/` , {
			uidb64: formData.uidb64,
            token: formData.token,
            password: formData.password,
		})
        .then((res) => {
				
            console.log(res);
            console.log(res.data);
            if(res.status==200){
                alert(res.data.message);
                history.push('/login');
              }

        });
		
		// window.location.reload();
	};
	



	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Create New Password
				</Typography>
				<form className={classes.form} noValidate>
					
                    	<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="New Password"
						// type="password"
						// id="password"
						// autoComplete="current-password"
						onChange={handleChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Submit
					</Button>
					{/* <Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid> */}
				</form>
			</div>
		</Container>
	);
}}
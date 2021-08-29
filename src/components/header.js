  
import React from 'react';
import logo from './tLogosmall.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

if ( localStorage.getItem('username')){
	var loginusername = localStorage.getItem('username');
	}
	


const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
}));




function Header() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    
	
var loginusertoken =false;
if ( localStorage.getItem("access_token")) {
	loginusertoken = true;
}


const RenderMenu=() =>{
	if(loginusertoken){
		return(
			<>
			  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
			  {loginusername}
      </Button>
	 
      <Menu
        anchorEl={anchorEl}
        keepM keepMounted={false}
        open={Boolean(anchorEl)}
        onClose={handleClose}
		
		PaperProps={{
			style: {
				right: '40%',
				// left:'80%',
				transform: 'translateX(120%) translateY(30%)',
			  }
		}}
      >
        <MenuItem onClick={handleClose}    component="a" href='/admin'>My Posts</MenuItem>
        <MenuItem onClick={handleClose}  component="a" href='/admin/create'>Create Post</MenuItem>
        <MenuItem onClick={handleClose}  component="a" href='/logout'>Logout</MenuItem>
      </Menu>
	
{/* <Button
	href="#"
	color="primary"
	variant="outlined"
	className={classes.link}
	component={NavLink}
	to="/logout"

>
	Logout
</Button>
<Button
	href="#"
	color="primary"
	variant="outlined"
	className={classes.link}
	component={NavLink}
	to="/admin"

>
	Your Posts
</Button>
<Button
	href="#"
	color="primary"
	variant="outlined"
	className={classes.link}
	component={NavLink}
	to="/admin/create"

>
	Create Posts
</Button> 
 <Typography variant="h6" >
				 {loginusername}
        </Typography>
             	 */}


			</>
		)
	}
	else{
		return(
			<>
           <nav>
			<Link
				color="textPrimary"
				href="#"
				className={classes.link}
				component={NavLink}
				to="/register"
				>
				Register
			</Link>
				</nav>
					
			<Button
	            href="#"
	            color="primary"
				variant="outlined"
				className={classes.link}
				component={NavLink}
				to="/login"
			>
			Login
			</Button>
			</>
		)
	}
}


	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						{/* <img src={logo}  alt="logo"   style={{width: 30, height: 30}}/> */}
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							Thoughts
						</Link>
					</Typography>

					<RenderMenu />

				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;
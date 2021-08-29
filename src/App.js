import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts/posts';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	
	main: {
	  marginTop: theme.spacing(8),
	  marginBottom: theme.spacing(2),
	},
	
  }));
function App() {
	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});
	


	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

	const classes = useStyles();
	return (
		<div className="App">
			  <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Thoughts
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Put your thoughts and knowledge out there.'}
         
        </Typography>
        <Typography variant="body1">Latest Posts</Typography>
      </Container>
     
			{/* <h1>Latest Posts</h1> */}
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default App;
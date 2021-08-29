import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/admin/posts';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import jwt_decode from 'jwt-decode';

if ( localStorage.getItem("access_token")) {
	var loginusertoken = localStorage.getItem('access_token');
    var user_id=jwt_decode(loginusertoken).user_id;
}

if ( localStorage.getItem('username')){
var loginusername = localStorage.getItem('username');
}


function Admin() {
	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get().then((res) => {
		
			const allPosts = res.data;
			const post = allPosts.filter(user => user.authorname== loginusername );
			setAppState({ loading: false, posts: post });
			console.log(res.data);
		});
	}, [setAppState]);

	return (
		<div className="App">
			<h1>Latest Posts</h1>
			<PostLoading  isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default Admin;
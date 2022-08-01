import React from 'react';
import { Container } from '@material-ui/core';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
	const user = JSON.parse(localStorage.getItem('profile'));

	return (
		<GoogleOAuthProvider clientId='654756871117-ieb894a28aht1ddhp28191vjjblttn2f.apps.googleusercontent.com'>
			<Container maxWidth='xl'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Navigate to='/posts' replace />} />
					<Route path='/posts' element={<Home />} />
					<Route path='/posts/search' element={<Home />} />
					<Route path='/posts/:id' element={<PostDetails />} />
					<Route
						path='/auth'
						exact
						// element={!user ? <Auth /> : <Navigate to='/posts' />}
						element={<Auth />}
					/>
				</Routes>
			</Container>
		</GoogleOAuthProvider>
	);
};

export default App;

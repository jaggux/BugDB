import React from 'react';
import './App.css';
import { Row, Col, Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './redux/utils/setAuthToken.js';
import { setUser, userLogout } from './redux/actions/authActions.js';


import { Provider } from 'react-redux';
import store from './redux/store.js';

 
import Landing from './views/Landing.jsx';
import Login from './views/auth/Login.jsx';
import Register from './views/auth/Register.jsx';
import PrivateRoute from './views/pvt-route/PrivateRoute.js';
import Home from './views/pages/Home.jsx';

if(localStorage.jwtToken) {
	const token = localStorage.jwtToken;
	setAuthToken(token);
	const decoded = jwt_decode(token);
	store.dispatch(setUser(decoded));
	const currTime = Date.now() / 1000;
	if(decoded.exp < currTime) {
		store.dispatch(userLogout());
		window.location.href = '/'
	}
}

const { Content,Footer } = Layout;
function App() {
	const layoutStyle = {};
	const baseStyle={ padding:'4vh', background:'#212D40', minHeight:'100vh'};
	const footerStyle={background:'#11151C',color:'#fff'};
	return (
	<Provider store={store}>
		<Layout style={layoutStyle}>
			<Content style={baseStyle}>
				<Row type='flex' align='middle' justify='center'>
					<Col span={24}>
						<Switch>
							<Route exact path='/' component={Landing} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/register' component={Register} />
							<PrivateRoute exact path='/home' component={Home} />
						</Switch>
					</Col>
				</Row>
			</Content>
			<Footer style={footerStyle}>
				FOOTER GOES HERE
			</Footer>
		</Layout>
	</Provider>
	);
}

export default App;

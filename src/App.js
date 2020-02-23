import React from 'react';
import './App.css';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import RegistrarUsuario from './components/RegistrarUsuario';
import PaginaInicial from './components/PaginaInicial';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Login} />
				<Route exact path='/Login' component={Login} />
				<Route exact path='/RegistrarUsuario' component={RegistrarUsuario} />
				<Route exact path='/PaginaInicial' component={PaginaInicial} />
			</Switch>
		</div>
	);
}
export default App;

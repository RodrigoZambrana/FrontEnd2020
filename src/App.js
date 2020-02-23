import React from 'react';
import './App.css';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import RegistrarUsuario from './components/RegistrarUsuario';
import PaginaInicial from './components/PaginaInicial';
// import PageNotFound from './components/PageNotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Login} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/registrarUsuario' component={RegistrarUsuario} />
				<Route exact path='/paginaInicial' component={PaginaInicial} />
				{/* <Route component={PageNotFound} /> */}
			</Switch>
		</div>
	);
}
export default App;

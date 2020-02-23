import React from 'react';/* 
import { BrowserRouter as Link } from 'react-router-dom';
import Login from './Login'; */

const Header = () => (
	<header className='App-header'>
		{/* <h1>Tienda Online</h1> */}
		<nav className='navbar navbar-expand-lg navbar-light'>
			<div className='container'>
				<div className='collapse navbar-collapse'>
					<ul className='navbar-nav ml-auto'>
						<li className='nav-item'>
							<p className='forgot-password text-right'>
								<a href='/Login'>Salir</a>
							</p>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
);

export default Header;

import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

const Header = ({ Salir }) => (
	<header className='App-header'>
		{/* <h1>Tienda Online</h1> */}
		<Navbar collapseOnSelect bg="bg-primary" variant="dark" >
			<Form inline>
				<Button variant="outline-success" onClick={() => Salir()}>Salir</Button>
			</Form>
		</Navbar>
	</header>
);

export default Header;

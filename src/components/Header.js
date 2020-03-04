import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

const Header = () => (
	<header className='App-header'>
		{/* <h1>Tienda Online</h1> */}
		<Navbar collapseOnSelect bg="bg-primary" variant="dark" >
			<Navbar.Brand href="#home"></Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="">
				<Nav className="mr-auto">
				</Nav>
				<Nav>
					<Nav.Link eventKey={2} href="/Login">Salir</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	</header>
);

export default Header;

import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Ya estoy recibiendo desestructuradas a las props! No necesito
//      tener una variable para las props.
const Producto = ({ producto }) => (
	<div className='row'>
		<div className='col-md-2'>
			<Card style={{ width: '300px' }}>
				<Card.Img src={producto.photo} height='200px' />
				<Card.Body>
					<Card.Title>{producto.name}</Card.Title>
					<span className='badge badge-pill badge-success mt-12'>${producto.price}</span>
					<Card.Text>{producto.description}</Card.Text>
					<Button variant='primary'>Agregar al carrito</Button>
				</Card.Body>
			</Card>
		</div>
	</div>
);

export default Producto;

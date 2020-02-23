import React from 'react';
import Producto from './Producto';
import Header from './Header';
import Carrito from './Carrito';
import { ListarProductos } from './services';
import Form from 'react-bootstrap/Form';
import { Nav } from 'react-bootstrap';

export default class PaginaInicial extends React.Component {
	state = {
		nombreProducto: '',
		products: []
	};

	componentDidMount() {
		ListarProductos().then(data =>
			this.setState({
				products: data
			})
		);
	}
	render() {
		return (
			<>
			<Header/>
			<div className='mainPage row'>
			<div className='col-md-12'>
				<Nav className='navbar navbar-light col-12'>
					<Form className='form-inline col-12'>
						<input
							className='form-control col-10'
							type='search'
							placeholder='Ingrese nombre de producto'
							aria-label='Search'
						/>
						<button className='btn btn-outline-primary ' type='submit'>
							Buscar
						</button>
					</Form>
				</Nav>
				</div>
				<Carrito/>
				<div className='mainPage row '>
				{this.state.products.map((producto, index) => 
				<Producto key={index} producto={producto} />)}
				</div>

				</div>
			</>
		);
	}
}

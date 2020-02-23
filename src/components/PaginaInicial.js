import React from 'react';
import Producto from './Producto';
import Header from './Header';
import Carrito from './Carrito';
import { ListarProductos } from './services';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { Nav } from 'react-bootstrap';

export default class PaginaInicial extends React.Component {
	state = {
		nombreProducto: '',
		products: [],
		productosComprados: [],
	};

	componentDidMount() {

		if (sessionStorage.getItem("usuarioLogueado") !== "1") {
			return (window.location = '/PaginaInicial');
		}

		ListarProductos().then(data =>
			this.setState({
				products: data
			})
		);
	}

	agregarAlCarrito = (nuevoProducto) => {
		const { productosComprados } = this.state;
		const otroProducto = nuevoProducto;
		this.setState({ nuevoProducto, productosComprados: [...productosComprados, otroProducto] });

	};

	eliminarDelCarrito = nombre => {
		const { productosComprados } = this.state;
		const productosFiltrados = productosComprados.filter(producto => producto.nombre !== nombre);
		this.setState({ tareas: productosFiltrados });
	};

	render() {
		return (
			<>
				<Header />
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
					<div className='cartContainer'>
						<Table striped bordered hover >
							<thead>
								<tr>
									<th>Cantidad</th>
									<th>Producto</th>
									<th>Precio</th>
									<th>Eliminar</th>
								</tr>
							</thead>
							<tbody>
								{this.state.productosComprados.map((producto, index) =>
									<tr>
										<td>1</td>
										<td key={index}>{producto.name}</td>
										<td>{producto.price}</td>
										<td>Eliminar</td>
									</tr>
								)}
								<td colSpan="4">Total a pagar</td>
							</tbody>

						</Table>

						<Button variant='primary' type='submit'>
							Finaliza tu compra
					</Button>
					</div>

					<div className='mainPage row '>
						{this.state.products.map((producto, index) =>
							<Producto key={index} producto={producto} agregarAlCarrito={this.agregarAlCarrito} />
						)}
					</div>

				</div>
			</>
		);
	}
}

import React from 'react';
import Producto from './Producto';
import Header from './Header';
import Carrito from './Carrito';
import { ListarProductos } from './services';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'

import { Nav } from 'react-bootstrap';

export default class PaginaInicial extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			nombreProducto: '',
			filtro: '',
			listaProductos: [],
			productosComprados: [],
			productoFiltered: [],
			cantProducto: 1,
			costoTotal: 0,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {

		if (sessionStorage.getItem("usuarioLogueado") !== "1") {
			return (window.location = '/PaginaInicial');
		}

		ListarProductos().then(data =>
			this.setState({
				listaProductos: data
			})
		);
	}

	agregarAlCarrito = (nuevoProducto) => {
		const { productosComprados } = this.state;
		const otroProducto = nuevoProducto;
		this.setState({ nuevoProducto, productosComprados: [...productosComprados, otroProducto] });
		// this.calcularTotal();
	};

	eliminarDelCarrito = unNombre => {
		const { productosComprados } = this.state;
		const productoEliminado = productosComprados.filter(producto => unNombre !== producto.name);
		this.setState({ productosComprados: productoEliminado });
		// this.calcularTotal();
	};


	existeProducto = (unProducto) => {
		let existe = false;
		this.state.productosComprados.forEach(producto => {
			if (producto.name === unProducto.name) {
				existe = true;
			}

		});

		return existe;
	};

	calcularTotal = () => {
		this.state.productosComprados.forEach(producto => {
			const subTotal = Number(producto.price) + Number(this.state.costoTotal);
			this.setState({ costoTotal: subTotal })

		});

		/* const precioPorProducto = this.state.productosComprados.map((producto) => Number(producto.price) + Number(this.state.costoTotal));
		console.log(producto.price);
		this.setState({ costoTotal: precioPorProducto }); */
	};


	handleChange(e) {
		// Variable to hold the original version of the list
		let currentList = [];
		// Variable to hold the filtered list before putting into state
		let newList = [];

		// If the search bar isn't empty
		if (e.target.value !== "") {
			// Assign the original list to currentList
			currentList = this.state.listaProductos;

			// Use .filter() to determine which items should be displayed
			// based on the search terms
			newList = currentList.filter(item => {
				// change current item to lowercase
				const lc = item.name.toLowerCase();

				// change search term to lowercase
				const filter = e.target.value.toLowerCase();
				console.log(filter);
				// check to see if the current list item includes the search term
				// If it does, it will be added to newList. Using lowercase eliminates
				// issues with capitalization in search terms and search content
				return lc.includes(filter);
			});
		} else {
			// If the search bar is empty, set newList to original task list
			newList = this.state.listaProductos;
		}
		// Set the filtered state based on what our rules added to newList
		this.setState({
			productoFiltered: newList
		});
	}



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
									onChange={this.handleChange}
								/>
								<button className='btn btn-outline-primary ' type='submit' >
									Buscar
						</button>
							</Form>
						</Nav>
					</div>
					{this.state.productosComprados.length === 0 ? (
						//costo total= 0 ¿como agregar?
						<div className='cartContainer'>
							<p>Agrega productos al carrito! Comienza .</p>
						</div>
					) : (
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
												<td>{this.state.cantProducto}</td>
												<td key={index}>{producto.name}</td>
												<td>{producto.price}</td>
												<Button
													variant='primary'
													type="button"

													onClick={() => this.eliminarDelCarrito(producto.name)}
												//   onClick siempre debe ser una función! No poner una invocación a una función!
												>
													Eliminar
													</Button>
											</tr>
										)}
										<td colSpan="4">Total a pagar: ${this.state.costoTotal}</td>
									</tbody>

								</Table>

								<Button variant='primary' type='submit'>
									Finaliza tu compra
					</Button>
							</div>
						)}



					{this.state.productoFiltered.length === 0 ? (
						//muestra todos los productos

						<div className='mainPage row '>
							<span variant="danger">
								No existen productos
								</span><br></br>
							{this.state.listaProductos.map((producto, index) =>
								<Producto key={index} producto={producto} agregarAlCarrito={this.agregarAlCarrito} />
							)}
						</div>
					) : (

							<div className='mainPage row '>

								{this.state.productoFiltered.map((producto, index) =>
									<Producto key={index} producto={producto} agregarAlCarrito={this.agregarAlCarrito} />
								)}
							</div>

						)

					}





				</div>
			</>
		);
	}
}

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
			costoSubTotal: 0,
			costoTotal: 0,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {

		if (sessionStorage.getItem("usuarioLogueado") !== "1") {
			return (window.location = '/Login');
		}

		ListarProductos().then(data =>
			this.setState({
				listaProductos: data
			})
		);
	}

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


	eliminarDelCarrito = unNombre => {
		const { productosComprados } = this.state;
		const productoEliminado = productosComprados.filter(producto => unNombre !== producto.name);
		this.setState({ productosComprados: productoEliminado });
		this.calcularTotal();
	};
	agregarAlCarrito = (nuevoProducto) => {
		debugger;
		let encontreProducto = this.state.productosComprados.find(producto => producto.name === nuevoProducto.name);
		if (!encontreProducto) {
			this.addNewItem(nuevoProducto);
		} else {
			let sinRepetido = this.state.productosComprados.filter(producto => producto.name !== nuevoProducto.name);
			let aumentarCantidad = sinRepetido.push({ ...encontreProducto, cantidad: encontreProducto.cantidad + 1 });
			this.setState({ productosComprados: sinRepetido });

		}
		this.calcularTotal();
	};

	addNewItem(producto) {
		const { productosComprados } = this.state;
		let newItem = {
			cantidad: 1,
			name: producto.name,
			price: producto.price,
		};
		this.setState({ productosComprados: [...productosComprados, newItem] });
	}

	calcularTotal = () => {
		let subTotal = 0;
		if (this.state.productosComprados.length === 0) {
			this.setState({
				costoSubTotal: 0,
				costoTotal: 0,
			});
		} else {
			this.state.productosComprados.forEach(producto => {
				subTotal = subTotal + ((producto.price).toFixed() * (producto.cantidad).toFixed());
				this.setState({ costoSubTotal: subTotal });
			});
			let total = subTotal + (subTotal * 22 / 100);
			this.setState({ costoTotal: total.toFixed() });
		}
	};


	finalizarCompra = () => {
		this.setState({
			nombreProducto: '',
			filtro: '',
			productosComprados: [],
			costoSubTotal: 0,
			costoTotal: 0,
		});
	};

	funcSalir = () => {
		this.setState({
			nombreProducto: '',
			filtro: '',
			productosComprados: [],
			costoSubTotal: 0,
			costoTotal: 0,
		});
		sessionStorage.clear();
		return (window.location = '/Login');
	};


	render() {
		return (
			<>
				<Header Salir={this.funcSalir} />
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
						<div className='cartContainer col-md-6'>
							<Alert variant="success">
								<Alert.Heading>No hay productos en tu carrito</Alert.Heading>
								<p>Comienza ahora!</p>

							</Alert>
						</div>
					) : (
							<div className='cartContainer'>
								<Table responsive >
									<thead>
										<tr>
											<th>Cantidad</th>
											<th>Producto</th>
											<th>Precio Unitario</th>
											<th>Precio Total</th>
											<th>Eliminar</th>
										</tr>
									</thead>
									<tbody>
										{this.state.productosComprados.map((producto, index) =>
											<tr>
												<td>{producto.cantidad}</td>
												<td key={index}>{producto.name}</td>
												<td>{producto.price}</td>
												<td>{producto.price * producto.cantidad.toFixed()}</td>
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
										<tr col-span="5"> Sub-Total:$
										<td>{this.state.costoSubTotal}</td>
										</tr>
										<tr>Total(IVA):$
										<td>{this.state.costoTotal}</td>
										</tr>
									</tbody>

								</Table>

								<Button variant='primary' type='submit' onClick={() => this.finalizarCompra()}>
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

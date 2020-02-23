import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Carrito extends Component {

  state = {
    nombreProducto: '',
    productosComprados: [],
  };

  agregarAlCarrito = producto => {
    const { productosComprados } = this.state;
    if (producto) {
      const nuevoProducto = { producto: producto };
      this.setState({ producto: '', productosComprados: [...productosComprados, nuevoProducto] });
    }
  };
  /* 
    eliminarDelCarrito = nombre => {
      const { productosComprados } = this.state;
      const productosFiltrados = productosComprados.filter(producto => producto.nombre !== nombre);
      this.setState({ tareas: productosFiltrados });
    }; */

  render() {

    return (

      <div className='cartContainer'>
        {this.state.productosComprados.length === 0 ? (
          <p>No tienes productos en tu carrito. Comienza Ahora</p>
        ) : (
            this.state.productosComprados.map((producto, index) => (
              <Table striped bordered hover key={index} producto={producto} eliminarDelCarrito={this.eliminarDelCarrito} >
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{producto.name}</td>
                    <td>{producto.name}</td>
                    <td>{producto.name}</td>
                    <td>Eliminar</td>
                  </tr>
                </tbody>
              </Table>

            ))
          )}

        <Button variant='primary' type='submit'>
          Finaliza tu compra
					</Button>

      </div>



    );

  }
}

export default Carrito;

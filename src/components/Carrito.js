import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
const Carrito = () => (
	<div className='cartContainer'>
		<Table striped bordered hover>
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
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>Eliminar</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>Eliminar</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Larry</td>
      <td>Thornton</td>
      <td>Eliminar</td>
    </tr>
	<tr>
      <td colSpan="3">Total(Iva Inc)</td>
    </tr>
  </tbody>
</Table>
<Button variant='primary' type='submit'>
						Finaliza tu compra
					</Button>
	</div>

);

export default Carrito;

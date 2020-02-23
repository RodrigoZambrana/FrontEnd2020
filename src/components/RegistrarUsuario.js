import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createUser } from './services';
import Alert from 'react-bootstrap/Alert'

export default class RegistrarUsuario extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errorMsg: '',
		};
	}
	handleChange = event => {
		const { name } = event.target;
		this.setState({ [name]: event.target.value });
	};

	onSubmit = event => {
		event.preventDefault();
		const { newEmail, newPassword } = this.state;
		console.log({ newEmail, newPassword });
		createUser({ newEmail, newPassword })
			.then(({ status }) => {
				/* window.location = '/PaginaInicial';
			this.setState({ email: '', contrasena: '' }); */
				if (status === 200) {
					this.setState({ email: '', contrasena: '' });
					return (window.location = '/PaginaInicial');
				} this.setState({ errorMsg: "Datos incorrectos. Intente nuevamente." });
			})

			.catch(response => {
				console.log(response);
			});
	};

	render() {
		return (
			<div className='auth-inner'>
				<h3>Registrar Usuario</h3>
				<Form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<Form.Label>Correo electrónico</Form.Label>
						<Form.Control
							type='email'
							name='newEmail'
							placeholder='Ingrese email'
							onChange={this.handleChange}
							required='required'
						/>
					</div>
					<div className='form-group'>
						<Form.Label>Contraseña</Form.Label>
						<Form.Control
							type='password'
							name='newPassword'
							placeholder='Password'
							onChange={this.handleChange}
							required='required'
						/>
						<Form />
					</div>
					<Button variant='primary' type='submit'>
						Ingresar
					</Button>
					<span id='spanFeedback' />
				</Form>
				<br></br>
				{
					this.state.errorMsg && <Alert variant="danger">
						{this.state.errorMsg}
					</Alert>

				}
			</div>
		);
	}
}

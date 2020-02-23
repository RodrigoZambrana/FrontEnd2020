import React, { Component } from 'react';
import { loginUser } from './services';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleChange = event => {
		const { name } = event.target;
		this.setState({ [name]: event.target.value });
	};

	onSubmit = event => {
		event.preventDefault();
		const { email, contrasena } = this.state;
		loginUser({ email, contrasena }).then(({ status }) => {
			/* window.location = '/PaginaInicial';
			this.setState({ email: '', contrasena: '' }); */
			if (status === 200) {
				this.setState({ email: '', contrasena: '' });
				return (window.location = '/PaginaInicial');
			}
			console.log(status);
		});
		/* .catch((response) => {
				console.log(response);
			}); */
	};

	render() {
		return (
			<div className='auth-inner'>
				<h3>Iniciar Sesion</h3>
				<Form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<Form.Label>Correo electrónico</Form.Label>
						<Form.Control
							type='email'
							name='email'
							placeholder='Ingrese email'
							onChange={this.handleChange}
							required='required'
						/>
					</div>
					<div className='form-group'>
						<Form.Label>Contraseña</Form.Label>
						<Form.Control
							type='password'
							name='contrasena'
							placeholder='Password'
							onChange={this.handleChange}
							required='required'
						/>
						<Form />
					</div>
					<Button variant='primary' type='submit'>
						Ingresar
					</Button>
					<p className='forgot-password text-right'>
						¿No tienes usuario? <a href='/RegistrarUsuario'>Registrate</a>
					</p>
					<span id='spanFeedback' />
				</Form>
			</div>
		);
	}
}

import React, { Component } from 'react';
import { loginUser } from './services';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'

class Login extends Component {
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
		const { email, contrasena } = this.state;
		loginUser({ email, contrasena }).then(({ status }) => {
			if (status === 200) {
				this.setState({ email: '', contrasena: '' });
				sessionStorage.setItem("usuarioLogueado", 1);
				return (window.location = '/PaginaInicial');
			}
			this.setState({ errorMsg: "Usuario o contraseña incorrectos. Intente nuevamente." });

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
				</Form>
				{
					this.state.errorMsg && <Alert variant="danger">
						{this.state.errorMsg}
					</Alert>

				}
			</div>
		);
	}
}

export default Login;

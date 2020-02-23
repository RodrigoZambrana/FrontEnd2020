export function ListarProductos() {
	return fetch('http://tiendaonline2020.herokuapp.com/api/product/all', {
		method: 'GET',
		headers: {
			'Content-type': 'application/json'
		}
	}).then(res => res.json());
}

export function loginUser({ email, contrasena: password }) {
	return fetch('http://tiendaonline2020.herokuapp.com/api/user/login', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	});
}

export function createUser({ newEmail: email, newPassword: password }) {
	return fetch('http://tiendaonline2020.herokuapp.com/api/user/register', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	});
}

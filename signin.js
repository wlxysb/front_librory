const form = document.getElementById('login-screenn');
form.addEventListener('submit', async function (event) {
	event.preventDefault();

	const url = 'http://localhost:5252/auth'
	const obj = {}
	const formData = new FormData(form);

	formData.forEach(function (value, key) {
		obj[key] = value;
	});
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	}
	try {
		const request = await fetch(url, options)
		if (!request.ok) {
			throw new Error('Ошибка запроса: ' + request.status);
		}
		const answer = await request.json()
		localStorage.clear()
		localStorage.setItem('token', JSON.stringify(answer))
		console.log('Server`s answer: ', localStorage.getItem("token"))
		location.href = 'main.html'
	} catch (error) {
		console.log('Error: ', error)
	}
});
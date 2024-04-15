const form = document.getElementById('login-screenn');
form.addEventListener('submit', async function (event) {
	event.preventDefault();


	if (localStorage.getItem('token') == null) {
		document.getElementById('links').innerHTML = `
        <a href="login.html">АККАУНТ</a>
        `
	}
	else {
		document.getElementById('links').innerHTML = `
        <a href="profile.html">АККАУНТ</a>
		<a href="main.html">ГЛАВНАЯ</a>
        `
	}


	const url = 'http://localhost:4343/auth'
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
			document.getElementById('error').innerHTML = `
			    Неправильное имя или пароль 
			`
			throw new Error('Ошибка запроса: ' + request.status);
		}
		const answer = await request.json()
		localStorage.clear()
		localStorage.setItem('token', JSON.stringify(answer))

		fetch('http://localhost:4343/books/checkRole', {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token,
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				if(data.role.name == 'ROLE_ADMIN'){
					location.href = "adminProfil.html";
				}
				else{
					location.href = 'main.html'
				}
			})
	} catch (error) {
		console.log('Error: ', error)
	}
});

const forms = document.getElementById("searchBox")
forms.addEventListener('submit', async function (event) {
	event.preventDefault();
	const formData = new FormData(forms);

	const jsonData = {};
	formData.forEach((value, key) => {
		jsonData[key] = value;
	});

	fetch('http://localhost:4343/search/book', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(jsonData)
	})
		.then(response => response.json())
		.then(data => {
			if (data.status != 500) {
				console.log(data)
				window.location.href = `book.html?bookId=${data.id}`
			}
			else {
				alert(`Книг, похожих на "${formData.get('book_name')}" не нашлось`)
			}
		})
	console.log(jsonData)
})
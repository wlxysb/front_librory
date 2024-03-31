
const form = document.getElementById('login-screenn')
		form.addEventListener('submit', async function (event) {
			event.preventDefault();

		
				const formData = new FormData(form);
				const jsonData = {};

				formData.forEach((value, key) => {
					jsonData[key] = value;
				});

				localStorage.clear
				const res = await fetch('http://localhost:5252/auth',
					{
						method: "POST",
						body: JSON.stringify(state),
						headers: {
							"Content-Type": "application/json",
						}
					})
				if (!response.ok) {
					throw new Error('Ошибка запроса: ' + response.status);
				}
				const json = res.text
				localStorage.setItem("token", json)
				console.log('Ответ от сервера:', localStorage.getItem("token"));
				router.push("/") 

				// const url = 'http://localhost:5252/auth'; // Замените на URL вашего сервера
				// const options = {
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'application/json'
				// 	},
				// 	body: JSON.stringify(jsonData)
				// }
				// console.log(jsonData)
				// try {
				// 	const response = await fetch(url, options);
				// 	if (!response.ok) {
				// 		throw new Error('Ошибка запроса: ' + response.status);
				// 	}
				// 	const responseData = await response.json();
                //     localStorage.setItem("token", JSON.stringify(resp))
				// 	console.log('Ответ от сервера:', localStorage.getItem("token"));
          // location.href = 'main.html'
				// } catch (error) {
				// 	console.error('Ошибка:', error);
				// }
			}
		);
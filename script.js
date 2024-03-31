
const form = document.getElementById('registration-screenn')
form.addEventListener('submit', async function (event) {
    event.preventDefault();


    const formData = new FormData(form);
    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    const url = 'http://localhost:5252/registration';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    }
    console.log(jsonData)
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Ошибка запроса: ' + response.status);
        }
        const responseData = await response.json();
        console.log('Ответ от сервера:', responseData);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
);




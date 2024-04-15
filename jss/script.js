
const form = document.getElementById('registration-screenn')
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    const url = 'http://localhost:4343/registration';
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
        window.location.href = "main.html"
        console.log('Ответ от сервера:', responseData);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
);

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
            if(data.status != 500){
                console.log(data)
                window.location.href = `book.html?bookId=${data.id}`
            }
            else{
                alert(`Книг, похожих на "${formData.get('book_name')}" не нашлось`)
            }
        })
    console.log(jsonData)
})





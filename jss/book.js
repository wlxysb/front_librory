const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('bookId');
const opisanie = document.getElementById('description')
const framed_photo = document.getElementById('photo')
const book = document.getElementById('bronirovat')

if (localStorage.getItem('token') == null) {
    document.getElementById('links').innerHTML = `
    <a href="login.html">АККАУНТ</a>
    <a id="glavnaya" href="main.html">ГЛАВНАЯ</a>
    `
}
else {
    document.getElementById('links').innerHTML = `
    <a href="profile.html">АККАУНТ</a>
    <a id="glavnaya" href="main.html">ГЛАВНАЯ</a>
    `
}


fetch(`http://localhost:8080/books/${bookId}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        opisanie.innerHTML = `
        <p class ="opisanie">
        ${data.description}</p>
        <p>Жанр: ${data.genre}</p>
        <p>Год издания: ${data.year_published}</p>
        <p>Кол-во в наличии: ${data.quantity}</p>
        </p>
    `;
        framed_photo.innerHTML = `
        <img src="${data.image_url}" class="img-book">
    `;
        document.getElementById('bookname').innerHTML = `
        <h3>${data.title}</h3>
        `;

        document.getElementById('bronirovat')
            .addEventListener('click', function () {
                checkToken(localStorage.getItem('token'))
            })
    });
function checkToken(token) {
    if (token == null) {
        alert("Похоже, вы не зарегестрированы")
    }
    else {
        createOrder(bookId);
    }
}

console.log(JSON.parse(bookId))

function createOrder(bookId) {
    const token = JSON.parse(localStorage.getItem('token')).token
    fetch('http://localhost:8080/order/createOrder', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookId)
    })
        .then(res => {
            if(!res.ok){
                alert(`Похоже, у вас уже есть забронированная книга. 
                Чтобы забронировать эту, отмените бронь`)
                window.location.href = 'main.html'
            }else{
                window.location.href = 'main.html'
                alert(`вы успешно забронировали книгу. 
                Для того, чтобы узать код получателя, перейдите в АККАУНТ`)
            }
        })
}

const forms = document.getElementById("searchBox")
forms.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(forms);

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('http://localhost:8080/search/book', {
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

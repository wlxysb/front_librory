async function getResponse(url) {
    let response = await fetch(url);
    let content = await response.json();
    console.log(content)


    if (localStorage.getItem('token') == null) {
        document.getElementById('links').innerHTML = `
            <a href="login.html">АККАУНТ</a>
            `
    } else {
        fetch('http://localhost:4343/books/checkRole', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                    if (data.role.name == 'ROLE_ADMIN') {
                        document.getElementById('links').innerHTML = `
            <a href="adminProfil.html">АККАУНТ</a>
            `
                    } else {
                        document.getElementById('links').innerHTML = `
                <a href="profile.html">АККАУНТ</a>
                `
                    }
            })
    }
    
    var list = document.getElementById("myList");

    content.forEach(function (b) {
        var listItem = document.createElement("li");
        listItem.className = 'card';
        listItem.innerHTML = `     
<div class="product-item">
<a id="book${b.id}" class="book_id">
<img id="img" src="${b.image_url}" style="height: 65%; width: 65%;">
<div class="product-list">
    <h3>${b.title}</h3>
        <span class="price">${b.genre}</span>
        <button  class="button">Забронировать</button>
</div>
</a>
</div>
`
        list.appendChild(listItem);

        document.getElementById(`book${b.id}`).addEventListener('click', function () {
            viewBook(`${b.id}`)
        })
    });
    function viewBook(bookId) {
        console.log(bookId)
        window.location.href = `book.html?bookId=${bookId}`
    }
}
getResponse('http://localhost:4343/books')


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


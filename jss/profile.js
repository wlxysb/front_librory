const token = JSON.parse(localStorage.getItem('token')).token
fetch('http://localhost:8080/user/getUserInfo', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById("username").innerHTML = `${data.username}`
        document.getElementById("class_number").innerHTML = `${data.class_number}`

        const list = document.getElementById("data-user")

        var listItem = document.createElement("li");
        if (data.book != null) {
            if (data.isActiveOrder == "НЕАКТИВНЫЙ") {
                const buttonItem = document.createElement("button")
                buttonItem.innerHTML = "Отменить бронь"
                buttonItem.setAttribute("oncLick", "deleteOrder()")
                list.appendChild(buttonItem)
            }
        }
        listItem.className = 'card';
        listItem.innerHTML = `     
<div class="product-item">
<a id="book${data.book.id}" class="book_id">
<img id="img" src="${data.book.image_url}" style="height: 65%; width: 65%;">
<div class="product-list">
    <h3>${data.book.title}</h3>
        <span class="price">${data.book.genre}</span>
</div>
</a>
</div>
`
        list.appendChild(listItem);

        document.getElementById("discription-book").innerHTML =
            `
        <h3>Покажите данные код библиотекарю: 
        <u><br>${data.order_number}</u></h3>
        `

        if (data.isActiveOrder == 'АКТИВНЫЙ') {
            document.getElementById('isActiveOrder').innerHTML = `
                <h3 style="color:green">Книга у вас!</h3>
            `
        } else {
            document.getElementById('isActiveOrder').innerHTML = `
            <h3 style="color:red">Книга еще не у вас!</h3>
        `
            // const buttonItem = document.createElement("button")
            // buttonItem.innerHTML = "Отменить бронь"
            // buttonItem.setAttribute("oncLick", "deleteOrder()")
            // list.appendChild(buttonItem)
        }

    })

function deleteOrder() {
    fetch("http://localhost:8080/order/deleteOrder", {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                window.location.href = "main.html"
            } else {
                alert("Во время отмены брони произошла ошибка")
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
        .then(b => {
            if (b.status != 500) {
                console.log(b)
                window.location.href = `book.html?bookId=${b.id}`
            }
            else {
                alert(`Книг, похожих на "${formData.get('book_name')}" не нашлось`)
            }
        })
    console.log(jsonData)
})
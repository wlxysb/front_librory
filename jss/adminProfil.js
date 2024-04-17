const forms = document.getElementById("searchBox")
forms.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(forms);

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    console.log(jsonData.orderNumber)
    fetch('http://localhost:8080/search/order', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData.orderNumber
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status != 500) {
                console.log(data)

                document.getElementById('orderDisplayBox').innerHTML =
                    `
                <img src="${data.book.image_url}" class="framed-photo">
                `
                document.getElementById('custom-div').innerHTML = `
                <p>Книга: ${data.book.title}</p>
                <p>Получатель: ${data.username}</p>
                <p>Номер заказа: ${data.order_number} </p>
                <p>Статус заказа: ${data.isActiveOrder}</p>
                `

                if (data.isActiveOrder == "АКТИВНЫЙ") {
                    document.getElementById('buttGive').innerHTML = `
                <button  class="btn">ЗАБРАТЬ</button>
                `
                    var button = document.querySelector('.btn');

                    button.onclick = function () {
                        withdrawBook(data.id);
                    };
                }
                else {
                    document.getElementById('buttGive').innerHTML = `
                <button  class="btn">Отдать</button>
                `
                    var button = document.querySelector('.btn');

                    console.log(data.id, data.book.id, data.order_number)

                    button.onclick = function () {
                        giveBook(data.id, data.book.id, data.order_number);
                    };
                }

                function withdrawBook(userId){
                    fetch('http://localhost:8080/order/deleteActiveOrder', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userId)
                    })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        alert(`Книга ${data.book.title}  успешно возвращена!`)
                    location.reload()
                }

                function giveBook(userId, bookId, order_number) {
                    res = { user: userId, book: bookId, order_number: order_number };
                    console.log(JSON.stringify(res))
                    fetch('http://localhost:8080/order/activeOrder', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(res)
                    })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        alert(`Книга ${data.book.title} отдана ${data.username}`)
                    location.reload()
                }
            }
            else {
                alert(`Заказов с номером "${formData.get('order_name')}" не нашлось`)
            }
        })
})
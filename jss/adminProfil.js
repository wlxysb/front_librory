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
                document.getElementById('buttGive').innerHTML = `
                <button " class="btn">Отдать</button>
                `
                var button = document.querySelector('.btn');

                console.log(data.id, data.book.id, data.order_number)

                button.onclick = function () {
                    giveBook(data.id, data.book.id, data.order_number);
                };


                function giveBook(userId, bookId, order_number) {
                    res = {userId, bookId, order_number}
                    fetch('http://localhost:8080/order/activeOrder', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.parse(res),
                    })
                        .then(response => response.json())
                        .then(data => console.log(data))
                }
            }
            else {
                alert(`Заказов с номером "${formData.get('order_name')}" не нашлось`)
            }
        })
})
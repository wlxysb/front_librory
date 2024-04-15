const forms = document.getElementById("searchForm")
forms.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(forms);

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('http://localhost:4343/search/order', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(data => {
            if(data.status != 500){
                console.log(data)

                document.getElementById('but').innerHTML 

                function giveBook(userId, bookId, order_number){
                    fetch('http://localhost:4343/books/activeOrder', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: {
                            "user": + userId,
                            "book": + bookId,
                            "order_number": + order_number
                        }
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                }
            }
            else{
                alert(`Заказов с номером "${formData.get('order_name')}" не нашлось`)
            }
        })
})
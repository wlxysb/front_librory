
    async function getResponse(url){
    let response = await fetch(url);
    let content = await response.json();

    var list = document.getElementById("myList");

    content.forEach(function(b) {
        var listItem = document.createElement("li");
        listItem.className = 'card'; // Устанавливаем класс для элемента списка
    listItem.innerHTML = `
    <div class="product-item">
    <a href="show_book" id="book${b.id}" class="book-link">
        <img id="img" src="${b.image}" style="height: 65%; width: 65%;">
    </a>
        <div class="product-list">
            <h3>${b.name}</h3>
                <span class="price">${b.year}</span>
                <a href="" class="button">Забронировать</a>
        </div>
    </div>
    `;
        list.appendChild(listItem);

        var book_id= document.getElementById(`book${b.id}`);
        console.log(book_id);

        });
}  
getResponse('http://localhost:8086/books');





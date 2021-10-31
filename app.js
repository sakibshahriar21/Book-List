//Get the UI elements
let form = document.querySelector('#book-form');


//Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class
class UI {
    constructor() {

    }
    addBooklist(book) {
        //console.log(book);
        let list = document.querySelector("#book-list");
        let row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`;

        list.appendChild(row);
        //console.log(row);
    }

    clearFields() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }
}

// Add Event Listener
form.addEventListener('submit', newBook);

// Define functions

function newBook(e) {
    //console.log('Hello');
    let title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        isbn = document.querySelector("#isbn").value;

    let book = new Book(title, author, isbn);
    //console.log(book);

    let ui = new UI();

    ui.addBooklist(book);

    ui.clearFields();

    e.preventDefault();
}
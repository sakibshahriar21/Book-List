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

    showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`; //error will show in place of classname which is a built in class of skeleton CSS
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        /*setTimeout(function () {
            document.querySelector('.alert').remove(); //we can all with error class also
        }, 3000);*/
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000); //error message will vanish after 3 sec
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
 
    let ui = new UI();
     
    if(title === '' || author === '' || isbn === '') {
        //alert("All Fields!");
        ui.showAlert("Please fill all the fields!", "error");
    } else {
        let book = new Book(title, author, isbn);
        //console.log(book);

        ui.addBooklist(book);

        ui.showAlert("Book Added!", "success");

        ui.clearFields();
    }
    

    

    e.preventDefault();
}
//Get the UI elements
let form = document.querySelector('#book-form');
let booklist = document.querySelector("#book-list");


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
    
    static addToBooklist(book) {
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

    static clearFields() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }

    static showAlert(message, className) {
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
    
    static deleteFromBook(target) {
        //console.log(target);
        if(target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            //console.log(target.parentElement.previousElementSibling.textContent.trim()); //to print the isbn associated with each book
            UI.showAlert("Book Removed!", "success");
        }
    }
}

//Local Storage Class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        let books = Store.getBooks(); //check wether it has any book info 
        books.push(book);
        
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks() {
        let books = Store.getBooks();

        books.forEach(book => {
            UI.addToBooklist(book);
        });
    }

    static removeBook(isbn) {
        let books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {    //removing books by isbn
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Add Event Listener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());

// Define functions

function newBook(e) {
    //console.log('Hello');
    let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;
 
    //let ui = new UI();
     
    if(title === '' || author === '' || isbn === '') {
        //alert("All Fields!");
        UI.showAlert("Please fill all the fields!", "error");
    } else {
        let book = new Book(title, author, isbn);
        //console.log(book);

        UI.addToBooklist(book);

        UI.showAlert("Book Added!", "success");

        UI.clearFields();

        Store.addBook(book);
    }
    

    
    e.preventDefault();
}

function removeBook(e) {
    
    //let ui = new UI();
    UI.deleteFromBook(e.target);
    e.preventDefault();
}
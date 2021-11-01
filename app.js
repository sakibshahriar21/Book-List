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
    
    static addBooklist(book) {
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
            UI.showAlert("Book Removed!", "success");
        }
    }
}

// Add Event Listener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);

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

        UI.addBooklist(book);

        UI.showAlert("Book Added!", "success");

        UI.clearFields();
    }
    

    
    e.preventDefault();
}

function removeBook(e) {
    
    //let ui = new UI();
    UI.deleteFromBook(e.target);
    e.preventDefault();
}
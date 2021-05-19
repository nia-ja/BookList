// Book Class (is going to handle creating the actual book object)
class Book {
    constructor(title, author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Constructor (is going to be a set of prototype methods to do things like add the book to the list, delete the book, show the alert etc.)
class UI {
    // Add book to the list
    addBookToList(book) {
        const list = document.getElementById("book-list");
        // Create tr element
        const row = document.createElement("tr");
        // Insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }
    // Show alert
    showAlert(msg, className) {
        // Create div
        const div = document.createElement("div");
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(msg));
        // Get parent element
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);

        // Timeout after 3 seconds
        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 3000);
    }
    // Delete Book
    deleteBook(target) {
        if(target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }
    // Clear fields
    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }
}

// Local Storage Class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book) {
            const ui = new UI;
            // Add book to ui
            ui.addBookToList(book);
        })
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(isbn) {
        // console.log(isbn);
        const books = Store.getBooks();
        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem("books", JSON.stringify(books));
    }
}

//  DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function(e) {
    // Get form values
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;
    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();
    // Validate
    if(title === "" || author === "" || isbn === "") {
        ui.showAlert("Please fill in all fields", "error");
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add book to local storage
        Store.addBook(book);

        // Show success message
        ui.showAlert("Done!", "success");

        // Clear fields
        ui.clearFields();
    }
    e.preventDefault();
})

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {

    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Delete book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show message
    ui.showAlert("Book removed!", "success");

    e.preventDefault();
})
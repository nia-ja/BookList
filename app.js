// Book Constructor (is going to handle creating the actual book object)
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor (is going to be a set of prototype methods to do things like add the book to the list, delete the book, show the alert etc.)
function UI() {}

// Add book to the list
UI.prototype.addBookToList = function(book) {
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
UI.prototype.showAlert = function(msg, className) {
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

// Clear fields
UI.prototype.clearFields = function() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

// Event Listeners
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

        // Show success message
        ui.showAlert("Done!", "success");

        // Clear fields
        ui.clearFields();
    }
    e.preventDefault();
})
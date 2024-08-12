// HTML references //
const table = document.querySelector(".table");
const tableBody = document.querySelector("tbody");
const submitForm = document.querySelector('#submitForm');
const resetForm = document.querySelector('#resetForm');
const openDialog = document.querySelector('.openDialog')
const dialog = document.querySelector('.dialog')
const exitDialog = document.querySelector('.exitDialog')

// Function for making "Book" objects //
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    // this.info = function() {
    //     return(this.title + ' by ' + this.author + ', ' + this.pages + ', ' + this.status);
    // };
}

// Test Variable //
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not started');
const atomicHabits = new Book('Atomic Habits', 'James Clear', '320 pages', 'finished');
const thinkAndGrowRich = new Book('Think and Grow Rich', 'Napoleon Hill', '320 pages', 'reading')

// Array stores //
const myLibrary = [theHobbit, atomicHabits, thinkAndGrowRich];
const tableHeader = ['title', 'author', 'pages', 'status', 'action']
const statusOptions = ['Status', 'not started', 'reading', 'finished']

// initial functions to build up table //
clearTable();
tableEntry();

// Function to handle submit button //
submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let pages = document.querySelector('#pages');
    let status = document.querySelector('#status');
    if (title.value === '' || author.value === '' || pages.value === '') {
        alert('please fill out all the input fields');
    } else {
        myLibrary.push(new Book(title.value, author.value, pages.value, status.value));
        clearTable();
        tableEntry();
        clearForm();
        dialog.close()
    }
});

// Function to handle form reset button //
resetForm.addEventListener('click', () => {
    clearForm()
})


// Function to clear Form after book was added //
function clearForm () {
    const bookTitle = document.querySelector('#title')
    bookTitle.value=''
    const bookAuthor = document.querySelector('#author')
    bookAuthor.value=''
    const bookPages = document.querySelector('#pages')
    bookPages.value=''
    const bookStatus = document.querySelector('#status')
    bookStatus.value='not started'
}


// Function to clear table //
function clearTable () {
    while (tableBody.childNodes.length > 1) {
        tableBody.removeChild(tableBody.childNodes[1])
    };
};

// Function to create and delete table entries //
function tableEntry() {
    myLibrary.forEach((row, rowIndex) => {
        const tableRow = document.createElement('tr');
        tableRow.setAttribute("class", `row-${rowIndex}`)
        tableHeader.forEach((header, cellIndex) => {
            const tableData = document.createElement('td');
            tableData.setAttribute("class", `row-${rowIndex}-cell${cellIndex}`)
            const tableDataText = document.createTextNode(row[header]);
            tableData.appendChild(tableDataText);
            if (tableData.className.includes('cell4')) {
                tableData.textContent = '';
                const btn = document.createElement('button');
                btn.textContent = 'Delete'
                btn.type = 'button';
                btn.className = 'deleteButton';
                tableData.appendChild(btn)
                tableData > btn.addEventListener('click', () => {
                    myLibrary.splice(rowIndex, 1)
                    tableBody.removeChild(tableRow);
                    clearTable();
                    tableEntry();
                })
                // Function to create a change status button with user prompt //
                // const changeStatus = document.createElement('button');
                // changeStatus.textContent = 'Change Status'
                // changeStatus.type = 'button';
                // changeStatus.className = 'changeStatus';
                // tableData.appendChild(changeStatus)
                // tableData > changeStatus.addEventListener('click', () => {
                //     const newStatus = prompt('please select new reading status');
                //     myLibrary[rowIndex].status = newStatus
                //     clearTable();
                //     tableEntry();
                // })

                // Function to create a select dropdown menu to select new reading status // 
                const changeStatus = document.createElement('select')
                changeStatus.className = 'status'
                tableData.appendChild(changeStatus);
                for (let i = 0; i < statusOptions.length; i++) {
                    const options = document.createElement('option');
                    options.value = statusOptions[i];
                    options.text = statusOptions[i];
                    changeStatus.appendChild(options);
                }
                changeStatus.addEventListener('change', () => {
                    myLibrary[rowIndex].status = changeStatus.value;
                    clearTable();
                    tableEntry();
                })

                // switch change status button to drop down menu with status options. 
                // when users selects, change myLibraray[rowIndex].status
            }
            tableRow.appendChild(tableData);
        });
        tableBody.appendChild(tableRow);
    });
}

openDialog.addEventListener('click', () => {
    dialog.showModal()
})

exitDialog.addEventListener('click', () => {
    dialog.close()
})
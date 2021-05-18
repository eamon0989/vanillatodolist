// default toDos
let toDos = [
    {   name: "Click on a todo to mark it as completed",
        completed: false,
        id: 0,
    },
    {   name: "Click the bin icon to delete it",
        completed: false,
        id: 1,
    }
];
let printedList = document.getElementById('printedList')
let count = 2; //count is the id number of each toDo
let toDo = {
    name: '',
    completed: false,
    id: '',
};
let retrievedCount;

window.onload = function() {
    // if there is something in localstorage, show it, otherwise show default
    if (JSON.parse(window.localStorage.getItem('toDos')) === null ) {
        toDos.forEach(addItemToDom);
    } else {
        retrievedItem = window.localStorage.getItem('toDos');
        toDos = JSON.parse(retrievedItem);
        toDos.forEach(addItemToDom);
        retrievedCount = window.localStorage.getItem('count');
        count = JSON.parse(retrievedCount);
        console.log(count);
        console.log(typeof(count));

        console.log(toDos);
    }
}

// checks input field for value, if there is a string it adds it to the array and displays it
function onSubmit() {
    let empty = document.getElementById('newItem').value;
    if (empty !== "") {
        let newToDo = document.getElementById('newItem').value;
        console.log(toDos);
        toDo = {
            name: newToDo,
            completed: false,
            id: count,
        };
        toDos.push(toDo);
        count++;
        addItemToDom(toDo);
        updateStorage(toDos, count);
        document.getElementById('newItem').value = '';
    }
}

// adds changes to local storage
function updateStorage() {
    localStorage.setItem('toDos', JSON.stringify(toDos));
    localStorage.setItem('count', JSON.stringify(count));
}

// adds new items to the DOM
function addItemToDom(toDo) {
    let li = document.createElement('li'); // create list item
    li.textContent = toDo.name; // adds text
    li.id = toDo.id;    // adds id
    printedList.appendChild(li); // adds list item to UL 
    let deleteButton = document.createElement('i'); // adds delete icon
    deleteButton.type = ('button'); // makes icon a button
    deleteButton.classList = "material-icons md-48";
    deleteButton.innerHTML = "delete";
    li.appendChild(deleteButton); // adds button to list item
    if (toDo.completed == true) {
        li.classList.add('checked'); //checks if item is completed, adds strikethrough 
    } else { 
        li.classList.add('box');
    }
}

// mark toDo as completed by clicking
document.addEventListener('click', function(e) {
    if (e.target.className == "box") {
        e.target.classList = 'checked';
        toDos.find(x => x.id == e.target.id).completed = true;
        updateStorage();
    } else if (e.target.className == "checked") {
        e.target.classList = 'box';
        toDos.find(x => x.id == e.target.id).completed = false;
        updateStorage();
    }
}, false);

// adds event listener to delete icons to delete the list item from dom and localstorage
document.addEventListener('click', function(f) {
    if (f.target.className == "material-icons md-48") {
    toDos = toDos.filter(item => item.id != f.target.parentNode.id); // selects list item (parent)
    let elem = f.target.parentNode
    printedList.removeChild(elem); //removes parent
    updateStorage();
}
}, false);



// allow submission of toDo by pressing Enter
document.getElementById('newItem').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        onSubmit();
        e.preventDefault();
    }
});

// reset the page
function clearStorage() {
    localStorage.clear();
    location.reload();
}
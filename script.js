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
let count = 2;

if (localStorage.getItem("infiniteScrollEnabled") === null) {}

window.onload = function() {
    // toDos.forEach(addItemToDom);
    if (JSON.parse(window.localStorage.getItem('user')) === null ) {
        toDos.forEach(addItemToDom);
    } else {
        retrievedItem = window.localStorage.getItem('user');
        toDos = JSON.parse(retrievedItem);
        toDos.forEach(addItemToDom);
        count = window.localStorage.getItem('count');
        console.log(count);
        console.log(toDos);
    }
}

function onSubmit() {
    let newToDo = document.getElementById('newItem').value;
    console.log(toDos);
    const toDo = {
        name: newToDo,
        completed: false,
        id: count,
    };
    toDos.push(toDo);
    count++;
    console.log(count);
    localStorage.setItem('user', JSON.stringify(toDos));
    localStorage.setItem('count', count);
    addItemToDom(toDo)
}

function addItemToDom(toDo) {
    let li = document.createElement('li');
    li.textContent = toDo.name;
    li.id = toDo.id;
    printedList.appendChild(li);
    let deleteButton = document.createElement('i');
    deleteButton.type = ('button');
    deleteButton.classList = "material-icons md-48";
    deleteButton.innerHTML = "delete";
    li.appendChild(deleteButton);
    if (toDo.completed == true) {
        li.classList.add('checked');
    } else { 
        li.classList.add('box');
    }
}

document.addEventListener('click', function(e) {
    if (e.target.className == "box") {
        e.target.classList = 'checked';
        toDos.find(x => x.id == e.target.id).completed = true;
        e.target.completed = !e.target.completed;
        localStorage.setItem('user', JSON.stringify(toDos));
    } else if (e.target.className == "checked") {
        e.target.classList = 'box';
        toDos.find(x => x.id == e.target.id).completed = false;
        localStorage.setItem('user', JSON.stringify(toDos));
    }
}, false);


document.addEventListener('click', function(f) {
    if (f.target.className == "material-icons md-48") {
    toDos = toDos.filter(item => item.id != f.target.parentNode.id);
    console.log(toDos);
    let elem = f.target.parentNode
    printedList.removeChild(elem);
    localStorage.setItem('user', JSON.stringify(toDos));
}
}, false);




document.getElementById('newItem').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        onSubmit();
        e.preventDefault();
    }
});

function clearStorage() {
    localStorage.clear();
}
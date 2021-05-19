const cantHover = window.matchMedia('(hover: none)').matches; //check if it's a touchscreen (no mouse)
let toDos;

// if there is no mouse, show first list, if there is a mouse, show second list
function checkHover() {
    if (cantHover) {
        // default toDos
        toDos = [
        {   name: "Click on a todo to mark it as completed",
            completed: false,
            id: 0,
        },
        {   name: "Then swipe right to remove from list",
            completed: false,
            id: 1,
        }
    ];
      } else {
        // default toDos
        toDos = [
        {   name: "Click on a todo to mark it as completed",
            completed: false,
            id: 0,
        },
        {   name: "Then click the bin icon to remove it",
            completed: false,
            id: 1,
        }
    ];
    }
}


let printedList = document.getElementById('printedList') // select unordered list from dom
let count = 2; //count is the id number of each toDo
let toDo = {
    name: '',
    completed: false,
    id: '',
};
let retrievedCount; // to store items from localstorage

window.onload = function() {
    // if there is something in localstorage, show it, otherwise show default
    if (JSON.parse(window.localStorage.getItem('toDos')) === null ) {
        checkHover();
        toDos.forEach(addItemToDom);
    } else {
        retrievedItem = window.localStorage.getItem('toDos');
        toDos = JSON.parse(retrievedItem);
        toDos.forEach(addItemToDom);
        retrievedCount = window.localStorage.getItem('count');
        count = JSON.parse(retrievedCount);
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
    let div = document.createElement('div');
    div.classList = "liDiv";
    let buttonDiv = document.createElement('div');
    buttonDiv.classList = "buttonDiv";
    buttonDiv.id = toDo.id;
    let li = document.createElement('li'); // create list item
    li.textContent = toDo.name; // adds text
    li.id = toDo.id;    // adds id
    div.appendChild(li);
    div.appendChild(buttonDiv);
    printedList.appendChild(div); // adds list item to UL 
    let deleteButton = document.createElement('i'); // adds delete icon
    deleteButton.type = ('button'); // makes icon a button
    deleteButton.classList = "material-icons md-48";
    deleteButton.innerHTML = "delete";
    buttonDiv.appendChild(deleteButton); // adds button to list item
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
    // console.log(f.target.parentNode);
    let compStyles = getComputedStyle(f.target.parentNode);
    let disType = compStyles.getPropertyValue('display');    
    if ((f.target.className == "material-icons md-48") && (disType === 'flex') && (f.target.parentNode.className === 'buttonDiv')) {
    toDos = toDos.filter(item => item.id != f.target.parentNode.id); // selects list item (parent) and removes it from toDos
    let elem = f.target.parentNode.parentNode
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

// reset the page using the reset button
function clearStorage() {
    localStorage.clear();
    location.reload();
}

//check for swipes on touchscreens
document.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false);

let elem; //stores the div that user swipes on
let itemId; //stores id of swiped item

function handleGesture() {
    // if (touchendX < touchstartX) {
    //     console.log('Swiped Left');
    // }
    // if swipe right is detected on a completed item, it is deleted
    if ((touchendX > touchstartX) && (event.target.parentNode.className === 'liDiv')) {
        console.log('Swiped Right');
            elem = event.target.parentNode
            elemId = event.target.id
            console.log(elem);
            console.log(elemId);

            if (event.target.className == "checked") {
                elem.className = "liDivAnimation";
                itemId = event.target.id
                elem.addEventListener("animationend", listener, false);
            }
    }
    // if (touchendY < touchstartY) {
    //     console.log('Swiped Up');
    // }

    // if (touchendY > touchstartY) {
    //     console.log('Swiped Down');
    // }

    // if (touchendY === touchstartY) {
    //     console.log('Tap');
    // }
}

//listens for end of animation, then removes div and item from toDo list
function listener() {
    toDos = toDos.filter(item => item.id != itemId); // selects list item (parent)
    console.log(itemId);
    printedList.removeChild(elem); //removes parent
    updateStorage();
    console.log(toDos);
}
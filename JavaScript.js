let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButtonEl = document.getElementById("saveTodoButton");
let backgroundContainerEl = document.getElementById("backgroundContainer");
let changeImageEl = document.getElementById("changeImage");

//backgroundContainerEl.style.backgroundImage="url('https://res.cloudinary.com/daxinnvsa/image/upload/v1661859976/cld-sample-4.jpg')"
//creating fuction getting details from the localStorage
function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem('todoList');

    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
/*
//creating Object
let todoList = [{
        text: 'Learn HTML',
        uniqueNo: 1

    },
    {
        text: 'Learn CSS',
        uniqueNo: 2
    },
    {
        text: 'Learn JavaScript',
        uniqueNo: 3
    },
    {
        text: 'Learn BootStrap',
        uniqueNo: 4
    },
];*/
let TodoColor=["#D11534","#D42F8F","#C414BC","#8B11D1","#6B11D1","#1194D1","#11D124","#C7BF4C","#E65F05","#ED1509"]
let numberOfBgColors = TodoColor.length;
let randomBgColorIndex = Math.ceil(Math.random() * numberOfBgColors);
if (randomBgColorIndex === numberOfBgColors) {
    randomBgColorIndex = numberOfBgColors - 1;
    console.log(randomBgColorIndex);
    
    }

//creating localStorage when user save the task
saveTodoButtonEl.onclick = function() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
};

//findinfg the length of todoList ==> Object
let todosCount = todoList.length;

//creating function onTodoStatusChange() it helps to strike the line when the task is checked
function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    
    let todoObjectIndex = todoList.findIndex(
        function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;

            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        }
    );
    let todoObject = todoList[todoObjectIndex];

    if (todoObject.isChecked === true) {
        //labelContainer.classList.add('label-container-slide')
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
        //labelContainer.classList.remove('label-container-slide')
    }
}

// the function onDeletedTodo() hekps to delete the task when done or if you don't need any more
function onDeletedTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deletedElementIndex = todoList.findIndex(
        function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        }
    );
    todoList.splice(deletedElementIndex, 1);
}

// createAndAppendTodo()  ==> function is used to create an elements add and append the list of task 
function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    console.log(todoId)
    let checkboxId = "chesckbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    //let randomBgColorEl = randomBgColor
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;
    todoElement.appendChild(inputElement);

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    labelContainer.style.borderColor=TodoColor[todo.uniqueNo-1];
    //labelContainer.style.borderColor=TodoColor[randomBgColorIndex]
    
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;

    if (todo.isChecked === true) {
        labelElement.classList.add('checked');
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeletedTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);

}
// for loop is used to 
for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function onAddTodo() {
    let userInputElement = document.getElementById('todoUserInput');
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter Valid Text!");
        return;
    }

    todosCount = todosCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";

}


addTodoButton.onclick = function() {
    onAddTodo();
//let numberOfBgColors = TodoColor.length;
//let randomBgColorIndex = Math.ceil(Math.random() * numberOfBgColors);
//if (randomBgColorIndex === numberOfBgColors) {
//    randomBgColorIndex = numberOfBgColors - 1;
//    console.log(randomBgColorIndex);
//    
//    }
};



/*function onButton() {
    let numberOfBgColors = TodoColor.length;
    let randomBgColorIndex = Math.ceil(Math.random() * numberOfBgColors);
    if (randomBgColorIndex === numberOfBgColors) {
        randomBgColorIndex = numberOfBgColors - 1;
        console.log(randomBgColorIndex);
    }
    let randomBgColor = TodoColor[randomBgColorIndex];
    console.log(randomBgColor);
    labelContainer.style.backgroundColor = randomBgColor;
}
console.log(2+3)*/
let select = document.querySelector("select");
let html = document.querySelector('body')
select.addEventListener('change',backgrounds);
    function backgrounds(){
        var choice = select.value;
        //console.log(choice)
        if (choice === 'food'){
            backgroundContainerEl.style.backgroundImage="url('https://res.cloudinary.com/daxinnvsa/image/upload/v1672302527/1278235_g4yuqj.jpg')"
            //console.log(choice === 'food')
        }
        else if (choice === 'grocery'){
            backgroundContainerEl.style.backgroundImage="url('https://res.cloudinary.com/daxinnvsa/image/upload/v1672300929/banner1.b111a3b6_vb8aos.jpg')"
        }
        else if (choice === 'medicine'){
            backgroundContainerEl.style.backgroundImage="url('https://res.cloudinary.com/daxinnvsa/image/upload/v1672302161/359-3595145_pharmacy-medicine-images-hd_dr4rib.jpg')"
        }
        else if (choice === 'sweets'){
            backgroundContainerEl.style.backgroundImage="url('https://res.cloudinary.com/daxinnvsa/image/upload/v1672302012/wp3064856_fv4ovo.jpg')"
        }
        else if (choice === 'fruits'){
            backgroundContainerEl.style.backgroundImage="url('https://res.cloudinary.com/daxinnvsa/image/upload/v1672301774/122018_xdkiwo.jpg')"
        }
        else if (choice === 'program'){
            backgroundContainerEl.style.backgroundImage="url(' https://res.cloudinary.com/daxinnvsa/image/upload/v1672301329/top10lan-1024x576_o86erp.jpg')"
        }
       
    }

    
    //document.getElementById("selectImage").style.backgroundImage=image//"url('https://res.cloudinary.com/daxinnvsa/image/upload/v1661859976/cld-sample-4.jpg')";

//let inputElement = document.createElement("input");
//
//function printKeydown(event) {
//  console.log(event.target.value);  // <input></input>
//}

//selectImageEl.addEventListener("keydown", printKeydown);
//document.body.appendChild(inputElement);
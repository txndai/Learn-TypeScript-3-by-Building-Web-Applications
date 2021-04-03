console.log("just do it"); 

const todoList: string[] = []
const todoInput: HTMLInputElement = document.getElementById('todoInput') as HTMLInputElement
const todoListDiv: HTMLDivElement = document.getElementById('todoListContainer') as HTMLDivElement

// console.log('current todo list:', todoList)

function addTodo(): void { 
    // if we don't have the todo input 
    if(todoInput == null) { 
        console.error('The todo input is missing from the page!'); 
        return; 
    } 

    // get the value from the input 
    const newTodo: string = todoInput.value; 

    // verify that there is text 
    if ('' !== newTodo.trim()) { 
        console.log('Adding todo: ', newTodo);

        // add the new item to the list 
        todoList.push(newTodo); 
        console.log('New todo list: ', todoList); 

        // clear the input 
        todoInput.value = ''; 

        // keep the list sorted 
        todoList.sort(); 

        // update the todo list 
        updateTodoList(); 
    } 
}

function updateTodoList(): void { 
    console.log("Updating the rendered todo list"); 
    todoListDiv.innerHTML = ''; 
    todoListDiv.textContent = ''; // Edge, ...​ 

    const ul = document.createElement('ul'); 
    ul.setAttribute('id', 'todoList'); 
    todoListDiv.appendChild(ul); 

    todoList.forEach(item => { 
        const li = document.createElement('li'); 
        li.setAttribute('class','todo-list-item'); 
        li.innerText = item; 
        ul.appendChild(li); 
    }); 
} 
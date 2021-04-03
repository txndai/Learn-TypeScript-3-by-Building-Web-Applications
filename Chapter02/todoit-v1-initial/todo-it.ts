console.log("just do it"); 

const todoList: string[] = []
const todoInput: HTMLInputElement = document.getElementById('todoInput') as HTMLInputElement

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
    } 
}
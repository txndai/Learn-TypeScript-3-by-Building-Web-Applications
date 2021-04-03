"use strict";
console.log("just do it");
var todoList = [];
var todoInput = document.getElementById('todoInput');
// console.log('current todo list:', todoList)
function addTodo() {
    // if we don't have the todo input 
    if (todoInput == null) {
        console.error('The todo input is missing from the page!');
        return;
    }
    // get the value from the input 
    var newTodo = todoInput.value;
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

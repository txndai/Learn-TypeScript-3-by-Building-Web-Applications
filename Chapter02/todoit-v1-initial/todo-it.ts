class TodoItem { 
    private readonly _creationTimestamp: number;
    private readonly _identifier: string; 

    constructor(private _description: string, identifier?: string) { 
        this._creationTimestamp = new Date().getTime();  

        if (identifier) { 
            this._identifier = identifier; 
        } else { 
            // this is just for the example; for any real project, use 
            // UUIDs instead: https://www.npmjs.com/package/uuid 
            this._identifier = Math.random().toString(36).substr(2,9); 
        } 
    } 

    get creationTimestamp(): number { 
        return this._creationTimestamp; 
    } 

    get identifier(): string { 
        return this._identifier; 
    } 

    get description(): string { 
        return this._description; 
    } 
}

class TodoList { 
    private _todoList: ReadonlyArray<TodoItem> = []; 

    constructor(todoList?: TodoItem[]) { 
        // first we make sure that we have received a valid array 
        // reference: https://developer.mozilla.org/en-
        // US/docs/Web/JavaScript/Reference/Global_Objects
        // /Array/isArray 
        if(Array.isArray(todoList) && todoList.length) { 
            // If we had instead directly assigned the array like this—this._todoList = todoList;—then the calling code would still have a valid reference towards that array and could modify it at will, breaking the encapsulation!
            this._todoList = this._todoList.concat(todoList); 
        } 
    } 

    get todoList(): ReadonlyArray<TodoItem> { 
        return this._todoList 
    } 

    addTodo(todoItem: TodoItem) { 
        if(todoItem) { 
            // the value is "truthy": 
            // not null, not undefined, not NaN, not an empty string,
            // not 0, not false 
            this._todoList = this._todoList.concat(todoItem); 
        } 
    } 

    removeTodo(itemId: string) {
        if(itemId) {
            this._todoList = this._todoList.filter(item => { 
                if(item.identifier === itemId) { 
                    return false; // drop 
                } else { 
                    return true; // keep 
                } 
            }); 
        } 
    } 
} 
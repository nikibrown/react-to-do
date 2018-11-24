import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { description: 'Wash the cat', isCompleted: true },
                { description: 'Wash the dog', isCompleted: false },
                { description: 'Wash the hamster', isCompleted: false }
            ],
            newTodoDescription: ''
        }
    }

    handleChange(event) {
        this.setState({ newTodoDescription: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();

        // prevents submit with empty value
        if (!this.state.newTodoDescription) { return }

        const newTodo = { description: this.state.newTodoDescription, isCompleted: false };

        // This adds the new todo to the state. Why don't we just push this to the toDos array? Not sure I understand the spread syntax here
        this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
   
    }
      
    toggleComplete(index) {
        // create a copy of the array - ?  I get that .slice method returns a copy of the array but  why do we use slice if we aren't actually removing values? Why not just makea copy and set it equal to a variable? 
        const todos = this.state.todos.slice();
        
        // grab the index of the specific todo
        const todo = todos[index];
        
        // toggle the isCompleted value
        todo.isCompleted = todo.isCompleted ? false : true;
        
        // using setState method to set this.state.todos to the new todos array we created with the toggled isCompleted value
        this.setState({ todos: todos });
    }

    deleteTodo(index) {
        //console.log(index);
        let todos = this.state.todos;

        todos.filter((todo, indexofTodo) =>  {
            console.log("index of todo that is run through filter: " + indexofTodo);
            console.log("todo that was clicked: " + index);   
            
            // return the todos that do not have the index of the one clicked
            // not working whyyyyy          
            return indexofTodo !== index;
        });

        console.log(todos);

        this.setState({ todos: todos });
    }


    render() {
        return (
            <div className="App">
                <ul>
                    { 
                        this.state.todos.map( (todo, index) =>
                            <ToDo key={ index } description={ todo.description } isCompleted={ todo.isCompleted } toggleComplete={ () => this.toggleComplete(index) }  deleteTodo={ () => this.deleteTodo(index) } />
                    )}
                </ul>
                <form onSubmit={ (event) => this.handleSubmit(event) }>
                    <input type="text" value={ this.state.newTodoDescription } onChange={ (event) => this.handleChange(event) } />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default App;

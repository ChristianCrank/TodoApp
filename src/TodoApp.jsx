// TodoApp.js
import React, { useState, useEffect } from 'react';
import './TodoApp.css';
//import { Auth, API } from 'aws-amplify';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      //const user = await Auth.currentAuthenticatedUser();
      //const data = await API.get('todoAPI', `/todos/${user.username}`);
      //setTodos(data.items);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  // Add todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    console.log('Adding todo:', newTodo);
    try {
      //const user = await Auth.currentAuthenticatedUser();
      //await API.post('todoAPI', '/todos', {
        //body: { id: Date.now().toString(), text: newTodo, completed: false, userId: user.username }
      //});
      //setNewTodo('');
      //fetchTodos();
      const newTodoItem = { id: Date.now().toString(), text: newTodo, completed: false };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  // Toggle completion
  const toggleTodo = async (id) => {
    try {
      //await API.put('todoAPI', `/todos/${id}`, { body: { completed: !todos.find(t => t.id === id).completed } });
      //fetchTodos();
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await API.del('todoAPI', `/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-section">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
// TodoApp.js
import React, { useState, useEffect } from 'react';
//import { Amplify, API, Auth } from 'aws-amplify';
//import { withAuthenticator } from '@aws-amplify/ui-react';
//import awsconfig from './aws-exports';

//Amplify.configure(awsconfig);

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const data = await API.get('todoAPI', `/todos/${user.username}`);
      setTodos(data.items);
    } catch (err) { console.error(err); }
  };

  // Add todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const user = await Auth.currentAuthenticatedUser();
    await API.post('todoAPI', '/todos', {
      body: { id: Date.now().toString(), text: newTodo, completed: false, userId: user.username }
    });
    setNewTodo('');
    fetchTodos();
  };

  // Toggle completion
  const toggleTodo = async (id) => {
    await API.put('todoAPI', `/todos/${id}`, { body: { completed: !todos.find(t => t.id === id).completed } });
    fetchTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await API.del('todoAPI', `/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => { fetchTodos(); }, []);

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
        {todos.map((todo) => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;//withAuthenticator(TodoApp);
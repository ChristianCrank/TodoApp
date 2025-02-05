// TodoApp.js
import { useAuth } from "react-oidc-context";
import React, { useState, useEffect } from 'react';
import Login from './login';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(''); 
  const auth = useAuth();

  // Cognito Function
  const signOutRedirect = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_LOGOUT_URI; 
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN; 
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  // TODO functions
  const fetchTodos = async () => {
    try {
      //code
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  // Add todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    console.log('Adding todo:', newTodo);
    try {
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
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      //code
      setTodos(todos.filter(todo => todo.id !== id));
      //fetchTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (!auth.isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="container">
      {auth.user?.profile && (
        <header>
          <div className="user-info">
            <span>Welcome, {auth.user.profile.email}</span>
            <button onClick={signOutRedirect}>Sign Out</button>
          </div>
        </header>
      )}
      
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
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
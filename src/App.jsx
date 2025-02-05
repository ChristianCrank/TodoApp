// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import TodoApp from './TodoApp';
import Callback from './Callback';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<TodoApp />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
}

export default App;
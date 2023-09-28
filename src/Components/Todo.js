import React, { useState, useEffect } from 'react';
import './Todo.css';

export default function Todo() {
  const [data, setData] = useState('');
  const [mapData, setMapData] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    if (storedTasks) {
      setMapData(storedTasks);
    }
    if (storedCompletedTasks) {
      setCompletedTasks(storedCompletedTasks);
    }
  }, []);

  const getData = (e) => {
    setData(e.target.value);
  }

  function showData() {
    if (data.trim() !== '') {
      const newTasks = [data, ...mapData]; 
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      setMapData(newTasks);
      setData('');
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      showData();
    }
  }

  function markAsComplete(index) {
    const completedTask = mapData[index];
    const updatedTasks = mapData.filter((_, i) => i !== index);
    setMapData(updatedTasks);
    setCompletedTasks([completedTask, ...completedTasks]);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    localStorage.setItem('completedTasks', JSON.stringify([completedTask, ...completedTasks]));
  }

  function resetTodos() {
    setMapData([]);
    setCompletedTasks([]);
    localStorage.removeItem('tasks');
    localStorage.removeItem('completedTasks');
    setShowCompleted(false);
  }

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          className="inputBar"
          placeholder="Enter Task"
          onChange={getData}
          onKeyPress={handleKeyPress}
          value={data}
        />
        <button onClick={showData}>Add Task</button>
      </div>

      <button onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? 'Hide Completed' : 'Show Completed'}
      </button>

      <div className="task-list">
        {mapData.map((task, index) => (
          <div key={index} className="task-item" onClick={() => markAsComplete(index)}>
            <p>{task}</p>
          </div>
        )).reverse()} {/* Reverse the order of rendering */}
        {showCompleted && completedTasks.map((task, index) => (
          <div key={index} className="task-item completed">
            <p>{task}</p>
          </div>
        ))}
      </div>

      <button className="reset-button" onClick={resetTodos}>Reset</button>
    </div>
  );
}

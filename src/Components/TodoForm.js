import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import './TodoForm.css';

const TodoForm = (props) => {
	const [input, setInput] = useState('');
	let [todos, setTodos] = useState([]);
	todos = localStorage.getItem('todo-data') !== null ? JSON.parse(localStorage.getItem('todo-data')) : [];

	const handleSubmit = (e) => {
		e.preventDefault();
		const newTodo = { id: uuidv4(), task: input, complete: false };
		todos.unshift(newTodo);
		localStorage.setItem('todo-data', JSON.stringify(todos));
		setTodos(todos);
		setInput('');
	};

	const handleInputChange = (e) => {
		let inputValue = e.target.value;
		setInput(inputValue);
	};

	const deleteTask = (id) => {
		const remTodos = todos.filter((todo) => todo.id !== id);
		localStorage.setItem('todo-data', JSON.stringify(remTodos));
		setTodos(remTodos);
	};

	const inputRef = useRef(null);
	useEffect(() => {
		inputRef.current.focus();
	});

	return (
		<>
			<form className='todo-form' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Add a Task'
					name='text'
					className='todo-input'
					value={input}
					onChange={handleInputChange}
					ref={inputRef}
					autoComplete='off'
					required
				/>
				<button className='todo-button'>Add</button>
			</form>
			<TodoList todoData={todos} deleteTask={deleteTask} />
		</>
	);
};

export default TodoForm;

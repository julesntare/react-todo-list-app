import React, { useState } from 'react';
import { RiEditBoxLine } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';

const TodoList = (props) => {
	const [edit, setEdit] = useState(false);
	const [value, setValue] = useState('');
	const [valueId, setValueId] = useState('');
	const [isComplete, setIsComplete] = useState(false);

	const inputChange = (id) => {
		const currValue = props.todoData.find((todo) => todo.id === id);
		setEdit(true);
		setValue(currValue.task);
		setValueId(currValue.id);
	};

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const handleEdit = (e) => {
		e.preventDefault();
		const editedValue = props.todoData.find((todo) => todo.id === valueId);
		editedValue.task = value;
		localStorage.setItem('todo-data', JSON.stringify(props.todoData));
		setEdit(false);
	};

	const markComplete = (id) => {
		const currValue = props.todoData.find((todo) => todo.id === id);
		currValue.complete = !currValue.complete;
		localStorage.setItem('todo-data', JSON.stringify(props.todoData));
		setIsComplete(!isComplete);
	};

	const listTasks =
		props.todoData.length === 0 ? (
			<p>No task set</p>
		) : (
			props.todoData.map((todo, index) => {
				return (
					<div
						key={index}
						id={todo.id}
						className={todo.complete ? 'todo-row complete' : 'todo-row'}
						title='double click to mark task as complete'
						onDoubleClick={(e) => markComplete(todo.id)}
					>
						<p>{todo.task}</p>
						<div className='icons'>
							<RiEditBoxLine onClick={(e) => inputChange(todo.id)} className='edit-icon' />
							<MdDelete onClick={() => props.deleteTask(todo.id)} className='delete-icon' />
						</div>
					</div>
				);
			})
		);
	return (
		<div>
			<h1>Today's plan</h1>
			{edit ? (
				<form className='todo-form' onSubmit={handleEdit}>
					<input
						type='text'
						placeholder='Add a Task'
						name='text'
						className='todo-input'
						value={value}
						onChange={onChange}
						autoComplete='off'
						required
					/>
					<button className='todo-button'>Apply Changes</button>
				</form>
			) : null}
			{listTasks}
		</div>
	);
};

export default TodoList;

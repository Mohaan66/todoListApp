//import { Details } from '@material-ui/icons';
import React, {useState} from 'react';
import './Items.css';



function Item() {

	    const[taskList, setTaskList]= useState([])
		const[task, setTask] = useState('');
		const [editTask, setEditTask] = useState(null)
		const [editingText, setEditingText] = useState('')

		



		const handleChange = (e) => {
		setTask(e.target.value);

		}
		function AddTask(event) {
	      event.preventDefault()
		 
		
		 const taskDetails = {
			id: Math.floor(Math.random()*1000),
			text: task,
			isCompleted: false,
		}

		

		if(task !== '')	{
			if(!taskList.includes(taskDetails)) {
			
				setTaskList([...taskList, taskDetails]);
			     setTask('')
			}
			else{
				alert("task already in the list")
			}
    	}	
	      else{
		alert("please enter a new task")
	  } 

	  
	  
	}
	
	
		const deleteButton = (e, id) => {
			e.preventDefault();
			   setTaskList(taskList.filter((t) => t.id !== id))
		}

		const taskCompleted = (e, id) => {
			e.preventDefault();
			// find index of element
	  		const element = taskList.findIndex((elem) => elem.id === id);
			// copy array into new variable
			const newTaskList = [...taskList];
            // edit our element
			newTaskList[element] = {
			...newTaskList[element],
				isCompleted: true,
			}
				setTaskList(newTaskList);
		}

		
		function editButton(id) {
			const updatedTodos = taskList.map((todo) => {
				if (todo.id !== "") {
					todo.text = editingText
				} else{
					alert('please enter a text')
				}
				return todo
				
			})
			setTaskList(updatedTodos)
			setEditTask(null)
			setEditingText("")
		}

		return(

		<section className='form-area'>
			<div className="items">
				<h1>React Todos App</h1>

		<input
				type="text"
				id= "text"
				name="text"
				placeholder="AddTask"
				onChange={handleChange} text={task}
				

					/>


		<button 
			  className="add-btn"  
		    	onClick={AddTask}
				>
				AddTask
	  			</button>
		 	 	 <br/>
		 			  {taskList !== [] ? (
		<ul>
			{taskList.map((todo) => (
			<li className={todo.isCompleted ? "crossText" : "listitem"}>
				
				{editTask === todo.id ? (<input 
				type="text"
			       
				   onChange={(e) => setEditingText(e.target.value)} 
				   value={editingText} ></input>) : (<div>{todo.text}</div>)}
			
		<button
				className="completed"
				onClick={(e) => taskCompleted(e, todo.id)}
				>
				Completed
				</button>

		<button className="delete" onClick={(e) => deleteButton(e, todo.id)}>
			
			Delete
		 </button>
			{editTask === todo.id 
			? (<button className='submitedit' onClick={() => editButton(todo.id)}> Submit Edit 
				</button>) 
				: (<button className="editbtn"  onClick={() => setEditTask(todo.id)}> Edit Todos</button>	) 
			}
			
			
			</li>
			))}
			</ul>
			) : null}
			</div>
		</section>
		);

}


export default Item;


import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("");

	const [tareas, setTareas] = useState([]);

	 const crearUsuario = async () => {
	 	const response = await fetch("https://playground.4geeks.com/todo/users/JoseDiez", {
 		method: "POST",
	 		headers: {
	 			"Content-Type": "application/json"
	 		},
	 		body: JSON.stringify([])
	 	})
	 	console.log(response)
	 	const data = await response.json()
	 	console.log(data)
	 }

	 useEffect(() => {
	 	crearUsuario();
	 }, [])


	const postTareas = async () => { //subir a la nube se ejecuta al pulsar "enter"
		const response = await fetch("https://playground.4geeks.com/todo/todos/JoseDiez", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				label: inputValue,
				is_done: false
			})


		})
		bringTareas();
	}


	const bringTareas = async () => { // traer de la nube
		const response = await fetch("https://playground.4geeks.com/todo/users/JoseDiez")
		console.log(response);
		const data = await response.json();
		console.log(data)
		setTareas(data.todos)
	}
	useEffect(() => {
		bringTareas();
	}, []);


	const deleteTarea = async (id) => { // borrado de la nube no de local
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",

		})

		bringTareas();

	}

	// const handDelete =(id)=>{
	// 	let newTareas = tareas.filter(tarea=>tarea.id !== id) 
	// 	setTareas(newTareas)



	return (
		<div className="container">
			<h2>Tareas Pendientes</h2>
			<ul>
				<li>
					<input
						onChange={(elEvento) => setInputValue(elEvento.target.value) //<=set se ejecuta y cambia " " a lo que le pases en el input "Matar cucaracha"
						}
						value={inputValue} // Al pulsar enter se reinicia tambien y guarda "" como su contewnido inicial.

						onKeyUp={(t) => {
							if (t.key === "Enter") {
								postTareas();
								//setTareas([...tareas,inputValue]); // invocamos la funcion setTareas para modificar  la variable tareas y !!!actualizar el array.!!! para usarlo mas abajo.
								setInputValue(""); // reiniciamos el input , todo esto con pulsar "enter".
							}
						}}
						type="text"
						placeholder="Qué tienes pendiente...?">
					</input>
				</li>
				{tareas.map((tarea, index) => (<li key={index}>{tarea.label}


					<i className="bi bi-trash-fill"  // devuelve el <li> con la {tarea} añadida debido al .map. 
						onClick={() => deleteTarea(tarea.id)}></i></li>))   //filtra o compara un index con el otro y mantiene los que no son el mimso indice, por lo que borra el selecionado unicamente.

				}

			</ul>
			<div><b>{tareas.length} pendientes.</b></div>

		</div> // Conteo basado en la longitud del array de la variable
	);
};

export default Home;
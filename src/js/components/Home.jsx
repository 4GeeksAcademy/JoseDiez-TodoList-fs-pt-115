import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("");

	const [tareas, setTareas] = useState([]);

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
								setTareas(tareas.concat([inputValue])); // invocamos la funcion setTareas para modificar  la variable tareas y !!!actualizar el array.!!! para usarlo mas abajo.
								setInputValue(""); // reiniciamos el input , todo esto con pulsar "enter".
							}
						}}
						type="text" placeholder="Qué tienes pendiente...?">
					</input>
				</li>
				{tareas.map((tarea, index) => (<li>{tarea}<i className="bi bi-trash-fill"  // devuelve el <li> con la {tarea} añadida debido al .map. 
				onClick={()=>setTareas(tareas.filter((hueco,nuevoIndex)=>index != nuevoIndex))}></i></li>))   //filtra o compara un index con el otro y mantiene los que no son el mimso indice, por lo que borra el selecionado unicamente.

				}
			</ul>
			<div><b>{tareas.length} pendientes.</b></div> 

		</div> // Conteo basado en la longitud del array de la variable
	);
};

export default Home;
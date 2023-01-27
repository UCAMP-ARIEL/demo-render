import React, { useState } from 'react'
import { db } from './firebase'
import './App.css'

import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'

function App() {
	const [info, setInfo] = useState()
	const [nombre, setNombre] = useState()

	const getData = async () => {
		const snapshot = await getDocs(collection(db, 'mensajes'))
		const data = snapshot.docs.map((doc) => doc)
		setInfo(data)
	}

	let usuario = { nombre: nombre }

	const createDoc = async () => {
		await addDoc(collection(db, 'mensajes'), usuario)
		getData()
		setNombre('')
	}

	const handleUpdateDoc = async (id, coleccion, nombre) => {
		await updateDoc(doc(db, coleccion, id), { nombre })
		getData()
	}

	const handleDeleteDoc = async (id, coleccion) => {
		await deleteDoc(doc(db, coleccion, id))
		getData()
	}
	const miNombre = process.env.REACT_APP_MI_NOMBRE

	return (
		<div className='App'>
			<button onClick={createDoc}>Crear</button>
			<button onClick={getData}>GetDocs</button>
			<input onChange={(e) => setNombre(e.target.value)} value={nombre} type='text' name='' id='' />
			<h1>{miNombre}</h1>
			<ul>
				{info &&
					info.map((e) => {
						return (
							<li>
								{e.data().nombre}:{e.id}
								<button onClick={() => handleUpdateDoc(e.id, 'mensajes', nombre)}>actualizar</button>
								<button onClick={() => handleDeleteDoc(e.id, 'mensajes')}>borrar</button>
							</li>
						)
					})}
			</ul>
		</div>
	)
}

export default App

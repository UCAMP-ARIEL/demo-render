import React, { useState, useEffect } from 'react'
import db, { autenticacion } from './firebase'
import { collection, getDocs, query, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite'
import './App.css'
import { getAuth, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth'

function App() {
	const [data, setData] = useState()
	const [nombre, setNombre] = useState()
	const [nuevoNombre, setNuevoNombre] = useState()
	const [isUser, setUser] = useState(undefined)

	//AUTH
	const auth = getAuth()
	useEffect(() => {
		onAuthStateChanged(auth, (user) => setUser(user))
	})

	const handleLogin = () => {
		signInWithRedirect(auth, autenticacion).then((res) => console.log('res', res))
	}

	const handleLogout = () => {
		signOut(auth)
			.then(() => console.log('me fui'))
			.catch((error) => console.log('error :', error))
	}

	//CREATE
	const createDoc = async (nombre) => {
		await addDoc(collection(db, 'users'), { nombre })
		getMensajes(db, 'users')
	}

	//READ
	useEffect(() => {
		getMensajes(db, 'users')
	}, [])
	async function getMensajes(db, coleccion) {
		const mensajesSnapshot = await getDocs(query(collection(db, coleccion)))
		const listaMensajes = mensajesSnapshot.docs.map((doc) => doc)
		return setData(listaMensajes)
	}

	// DELETE
	const handleDelete = async (id, coleccion) => {
		await deleteDoc(doc(db, coleccion, id))
		getMensajes(db, 'users')
	}

	//UPDATE
	const handleUpdate = async (id, coleccion, nombre) => {
		await updateDoc(doc(db, coleccion, id), { nombre })
		getMensajes(db, 'users')
		setNuevoNombre('')
	}

	return (
		<div className='App'>
			{isUser && (
				<div style={{ margin: '20px' }}>
					<input type='text' onChange={(e) => setNombre(e.target.value)} />
					<button onClick={() => createDoc(nombre)}>Crear</button>
				</div>
			)}
			{!isUser ? <button onClick={() => handleLogin()}>Login</button> : <button onClick={() => handleLogout()}>Logout</button>}
			<hr />
			{data &&
				data.map((e) => {
					return (
						<div style={{ margin: '20px', display: 'flex' }}>
							<p>{e.data().nombre}</p>
							<button onClick={() => handleDelete(e.id, 'users')}>Borrar</button>
							<input type='text' value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
							<button onClick={() => handleUpdate(e.id, 'users', nuevoNombre)}>Actualizar</button>
						</div>
					)
				})}
		</div>
	)
}

export default App

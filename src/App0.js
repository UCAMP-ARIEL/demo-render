import React, { useState, useEffect } from 'react'
import db from './firebase'
import './App.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { handleLogin, handleLogout, createDoc, getMensajes, handleUpdate, handleDelete } from './Api'

function App() {
	const [data, setData] = useState()
	const [nombre, setNombre] = useState()
	const [nuevoNombre, setNuevoNombre] = useState()
	const [user, setUser] = useState()

	const auth = getAuth()
	useEffect(() => {
		onAuthStateChanged(auth, (user) => setUser(user))
	})

	useEffect(() => {
		getMensajes(db, 'users', setData)
	}, [])

	return (
		<div className='App'>
			{!user ? (
				<button onClick={handleLogin}>Login</button>
			) : (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<p>{user.displayName}</p>
					<img src={user.photoURL} width='25px' alt={user.displayName} />
					<button onClick={handleLogout}>Logout</button>
				</div>
			)}
			<hr />
			{user && (
				<div style={{ margin: '20px' }}>
					<input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} />
					<button onClick={() => createDoc(nombre, setData, setNombre)}>Crear</button>
				</div>
			)}

			{user &&
				data &&
				data.map((e) => {
					return (
						<div style={{ margin: '20px', display: 'flex' }}>
							<p>{e.data().nombre}</p>
							<input type='text' value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
							<button onClick={() => handleUpdate(e.id, 'users', nuevoNombre, setNuevoNombre, setData)}>Actualizar</button>
							<button onClick={() => handleDelete(e.id, 'users', setData)}>Borrar</button>
						</div>
					)
				})}
		</div>
	)
}

export default App

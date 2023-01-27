import db, { autenticacion } from './firebase'
import { collection, getDocs, query, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite'
import './App.css'
import { getAuth, signInWithRedirect, signOut } from 'firebase/auth'
//AUTH
const auth = getAuth()

export const handleLogin = () => {
	signInWithRedirect(auth, autenticacion)
		.then((res) => console.log('Me Logie', res))
		.catch((error) => console.log('error :', error))
}

export const handleLogout = () => {
	signOut(auth)
		.then(() => console.log('me fui'))
		.catch((error) => console.log('error :', error))
}

//CREATE
export const createDoc = async (nombre, setData, setNombre) => {
	await addDoc(collection(db, 'users'), { nombre })
	setNombre('')
	getMensajes(db, 'users', setData)
}

//READ

export async function getMensajes(db, coleccion, setData) {
	const mensajesSnapshot = await getDocs(query(collection(db, coleccion)))
	const listaMensajes = mensajesSnapshot.docs.map((doc) => doc)
	return setData(listaMensajes)
}

//UPDAT
export const handleUpdate = async (id, coleccion, nombre, setNuevoNombre, setData) => {
	await updateDoc(doc(db, coleccion, id), { nombre })
	getMensajes(db, 'users', setData)
	setNuevoNombre('')
}

//DELETE
export const handleDelete = async (id, coleccion, setData) => {
	await deleteDoc(doc(db, coleccion, id))
	getMensajes(db, 'users', setData)
}

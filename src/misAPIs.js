import { db } from './firebase'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'

export const getData = async (setInfo) => {
	const snapshot = await getDocs(collection(db, 'mensajes'))
	const data = snapshot.docs.map((doc) => doc)
	setInfo(data)
}

export const createDoc = async (nombre, setNombre) => {
	await addDoc(collection(db, 'mensajes'), nombre)
	getData()
	setNombre('')
}

export const handleUpdateDoc = async (id, coleccion, nombre) => {
	await updateDoc(doc(db, coleccion, id), { nombre })
	getData()
}

export const handleDeleteDoc = async (id, coleccion) => {
	await deleteDoc(doc(db, coleccion, id))
	getData()
}

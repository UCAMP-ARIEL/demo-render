import firebase, { db } from 'path/to/firebase'
import { collection, getDocs, query, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'

// CREATE
addDoc(collection(db, 'persons'), { nombre })

// READ
getDocs(query(collection(db, 'persons')))

// UPDATE
updateDoc(doc(db, 'persons', id), { nombre })

// DELETE
deleteDoc(doc(db, 'persons', id))

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
	projectId: 'ucamp-2873c',
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_FIREBASE_APPID,
}

const app = initializeApp(firebaseConfig)
// Exporta la funcionalidad de la base de datos
const db = getFirestore(app)
//exporta la funcionalidad de autenticacion con goolge
export const autenticacion = new GoogleAuthProvider(app)

// Exporta el paquete firebase para otros usos
export { db }

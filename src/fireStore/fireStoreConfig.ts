// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCZK64h9Mqzg9-ur2JtqT8LxbV1f2IOHRg',
  authDomain: 'hr-app-withreact.firebaseapp.com',
  projectId: 'hr-app-withreact',
  storageBucket: 'hr-app-withreact.appspot.com',
  messagingSenderId: '914267382442',
  appId: '1:914267382442:web:6c441625f11d275292e6d3',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
//初期化

import { collection, addDoc } from "firebase/firestore"; 
import { db } from './firebaseSetup'; // Import the database object

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}
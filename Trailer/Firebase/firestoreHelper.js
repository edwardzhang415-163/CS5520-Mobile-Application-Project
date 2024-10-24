import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from './firebaseSetup'; // Import the database object

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

export async function deleteFromDB(collectionName, id) {
  try {
    await deleteDoc(doc(db, collectionName, id));
    console.log("Document deleted with ID: ", id);
  } catch (err) {
    console.error("Error deleting document: ", err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    console.log("All documents deleted from collection: ", collectionName);
  } catch (err) {
    console.error("Error deleting all documents: ", err);
  }
}

export async function markGoalAsWarning(goalId) {
  try {
    const goalRef = doc(db, "goals", goalId);
    await updateDoc(goalRef, { warning: true });
    console.log("Goal marked as warning with ID: ", goalId);
  } catch (err) {
    console.error("Error marking goal as warning: ", err);
  }
}
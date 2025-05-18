import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from './firebaseConfig';

const db = getFirestore(app);
const formCollection = collection(db, 'formulario');


const saveFormData = async (data) => {
  try {
    await addDoc(formCollection, data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { saveFormData };

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const usersRef = collection(db, 'users');

const createUserInfo = async (email) => {
  await setDoc(doc(usersRef, email), {
    userEmail: email,
    posts: [],
  });
};

export { createUserInfo };

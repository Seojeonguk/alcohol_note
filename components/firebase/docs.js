import { arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const usersRef = collection(db, 'users');
const postsRef = collection(db, 'posts');

const createUserInfo = async (email) => {
  const newUserDoc = doc(usersRef, email);
  await setDoc(newUserDoc, {
    userEmail: email,
    posts: [],
  });
};

const createNewPost = async (data, email) => {
  const newPostDoc = doc(postsRef);
  await setDoc(newPostDoc, data);

  await updateDoc(doc(usersRef, email), {
    posts: arrayUnion(newPostDoc.id),
  });
};

export { createUserInfo, createNewPost };

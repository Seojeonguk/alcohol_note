import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAt,
  updateDoc,
  where,
} from 'firebase/firestore';
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

const getPosts = async (lastSnapShot, email) => {
  if (!lastSnapShot) {
    const q = query(postsRef, where('writer', '==', email), orderBy('createdAt', 'desc'), limit(1));
    const snapShotList = await getDocs(q);
    lastSnapShot = snapShotList.docs[0];
  }

  const q = query(
    postsRef,
    where('writer', '==', email),
    orderBy('createdAt', 'desc'),
    startAt(lastSnapShot)
  );

  const docs = await getDocs(q);

  const ret = [];

  docs.forEach((doc) => {
    const data = doc.data();
    const docId = doc.id;
    ret.push({ data: data, docId: docId });
  });

  return ret;
};

const updateDocForId = async (id, data) => {
  const targetDocRef = doc(postsRef, id);

  await updateDoc(targetDocRef, data);
};

export { createUserInfo, createNewPost, getPosts, updateDocForId };

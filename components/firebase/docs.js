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

  const postLLLL = query(
    postsRef,
    where('writer', '==', email),
    orderBy('createdAt', 'desc'),
    startAt(lastSnapShot)
  );

  const q = await getDocs(postLLLL);

  const ret = [];

  q.forEach((docsss) => {
    ret.push(docsss.data());
  });

  return ret;
};

export { createUserInfo, createNewPost, getPosts };

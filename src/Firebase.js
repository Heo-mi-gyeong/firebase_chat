/* import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; */
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCZdvgIIUnYRRgE2o8_bBqrv8bWgSOiLSE',
  authDomain: 'chat-b29a9.firebaseapp.com',
  projectId: 'chat-b29a9',
  storageBucket: 'chat-b29a9.appspot.com',
  messagingSenderId: '409739889913',
  appId: '1:409739889913:web:3f69e7ba8216781ee6a628',
  measurementId: 'G-VKYFSXGVQN',
};

/* const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const fireStore = getFirestore(app); */
// firebaseConfig 정보로 firebase 시작

firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const fireStore = firebase.firestore();

export { fireStore };
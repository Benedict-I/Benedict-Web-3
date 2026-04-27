import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "benedict-contacts.firebaseapp.com",
  projectId: "benedict-contacts",
  storageBucket: "benedict-contacts.firebasestorage.app",
  messagingSenderId: "184194579113",
  appId: "1:184194579113:web:410e070b113a96fa27c7b8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

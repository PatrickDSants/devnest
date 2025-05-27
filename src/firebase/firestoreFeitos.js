// src/firebase/firestoreFeitos.js
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "./firebaseConfig";

const db = getFirestore();

export async function adicionarFeito(repo) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "feitos", user.uid);
  const snap = await getDoc(ref);
  let feitos = [];

  if (snap.exists()) {
    feitos = snap.data().repos || [];
  }

  const jaExiste = feitos.some((r) => r.id === repo.id);
  if (jaExiste) return;

  const atualizados = [...feitos, repo];
  await setDoc(ref, { repos: atualizados }, { merge: true });
}

export async function getFeitosDoUsuario() {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = doc(db, "feitos", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data().repos || [];
  }

  return [];
}

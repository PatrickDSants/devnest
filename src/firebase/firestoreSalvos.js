// src/firebase/firestoreSalvos.js
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth } from "./firebaseConfig";

const db = getFirestore();

// 🔄 Buscar os repositórios salvos do usuário
export async function getSalvosDoUsuario() {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = doc(db, "salvos", user.uid);
  const snap = await getDoc(ref);

  return snap.exists() ? snap.data().repos || [] : [];
}

// ✅ Salvar repositório no Firestore
export async function salvarRepositorio(repo) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "salvos", user.uid);
  await setDoc(ref, { repos: arrayUnion(repo) }, { merge: true });
}

// ❌ Remover repositório do Firestore
export async function removerRepositorio(repo) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "salvos", user.uid);
  await updateDoc(ref, { repos: arrayRemove(repo) });
}

import { db, collection, getDocs } from "../firebase/firebase-conf";

export const loadNotes = async (uid) => {
  const path = `/${uid}/journal/notes`;
  const notesSnap = await getDocs(collection(db, path));

  const notes = [];

  notesSnap.forEach((snapSon) => {
    notes.push({
      id: snapSon.id,
      ...snapSon.data(),
    });
  });
  return notes;
};

import { types } from "../types/types";
import { db, addDoc, collection } from "../firebase/firebase-conf";
import { loadNotes } from "../utils/loadNotes";

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newNote = {
      title: "test",
      body: "",
      date: new Date().getTime(),
    };

    const docRef = await addDoc(
      collection(db, `${uid}/journal/notes`),
      newNote
    );

    console.log(docRef.id);

    dispatch(activeNote(docRef.id, newNote));
  };
};

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

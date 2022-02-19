import { types } from "../types/types";
import { db, addDoc, collection, setDoc, doc } from "../firebase/firebase-conf";
import { loadNotes } from "../utils/loadNotes";

import Swal from "sweetalert2";
import { fileUpload } from "../utils/fileUpload";

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
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const docRef = await addDoc(
      collection(db, `${uid}/journal/notes`),
      newNote
    );

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

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { notes } = getState().notes;

    if (!note.imgUrl) {
      delete note.imgUrl;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    await setDoc(
      doc(db, `${uid}/journal/notes/`, `${note.id}`),
      noteToFirestore
    );

    if (!notes.some((r) => r.id === note.id)) {
      dispatch(setNotes([...notes, note]));
    }

    dispatch(refreshNote(note.id, noteToFirestore));

    Swal.fire("Saved", note.title, "success");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    activeNote.imgUrl = fileUrl;
    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};

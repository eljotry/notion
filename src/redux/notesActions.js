import * as api from "../api";
import {
  addNote,
  setNoteError,
  deleteNote as deleteNoteAction,
  updateNote as updateNoteAction,
  setNotes,
  initialize,
} from "./notesReducer";

export const createNote = (title, body) => async (dispatch, getState) => {
  const user = getState().user.user;

  if (!user) {
    return;
  }

  const newNote = {
    title,
    body,
    createdAt: new Date().toISOString(),
    userId: user.id,
  };

  try {
    const result = await api.createNote(newNote);

    dispatch(addNote(result));

    return result;
  } catch (error) {
    dispatch(setNoteError(error.message));
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    await api.deleteNote(id);
    dispatch(deleteNoteAction(id));
  } catch (error) {
    dispatch(setNoteError(error.message));
  }
};

export const updateNote = (note) => async (dispatch) => {
  try {
    const result = await api.updateNote(note);
    dispatch(updateNoteAction(result));
  } catch (error) {
    dispatch(setNoteError(error.message));
  }
};

export const runInitialization = () => async (dispatch, getState) => {
  try {
    const user = getState().user.user;

    if (!user) {
      return;
    }

    const notes = await api.fetchNotes(user.id);

    dispatch(setNotes(notes));
  } catch (error) {
    dispatch(setNoteError(error.message));
  } finally {
    dispatch(initialize());
  }
};

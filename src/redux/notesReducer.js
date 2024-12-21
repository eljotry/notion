const initialState = {
  notes: [],
  error: null,
  initialized: false,
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return { ...state, notes: action.payload };
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case "DELETE_NOTE": {
      const filteredNotes = state.notes.filter(
        (note) => note.id !== action.payload.toString()
      );
      return {
        ...state,
        notes: filteredNotes,
      };
    }
    case "SET_NOTE_ERROR":
      return { ...state, error: action.payload };
    case "NOTES_INITIALIZE":
      return { ...state, initialized: true };
    case "RESET_NOTE_STATE":
      return { ...state, notes: [], error: null, initialized: false };
    default:
      return state;
  }
};

export const setNotes = (notes) => ({ type: "SET_NOTES", payload: notes });
export const addNote = (note) => ({ type: "ADD_NOTE", payload: note });
export const updateNote = (note) => ({ type: "UPDATE_NOTE", payload: note });
export const deleteNote = (noteId) => ({
  type: "DELETE_NOTE",
  payload: noteId,
});

export const setNoteError = (error) => ({
  type: "SET_NOTE_ERROR",
  payload: error,
});

export const initialize = () => ({ type: "NOTES_INITIALIZE" });

export const resetState = () => ({ type: "RESET_NOTE_STATE" });

export default notesReducer;

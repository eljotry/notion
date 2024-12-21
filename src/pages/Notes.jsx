import { useEffect } from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, runInitialization } from "../redux/notesActions";

const Notes = () => {
  const { notes, error, initialized } = useSelector((state) => state.notes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialized) {
      dispatch(runInitialization());
    }
  }, [dispatch, initialized]);

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <div className="max-w-2xl mx-auto mt-28 mb-20 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Notes</h2>
      <div className="flex justify-center mb-4">
        <Link
          to="/create-note"
          className="bg-gray-600 w-full text-center text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          Create new note
        </Link>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {!initialized && <div>Loading...</div>}
      {notes.length === 0 && initialized ? (
        <p>You don&apos;t have any notes yet</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div className="flex-grow mr-2">
                <Link
                  to={`/view-note/${note.id}`}
                  className="font-bold block max-w-[calc(100%-60px)] overflow-hidden text-ellipsis"
                >
                  {note.title}
                </Link>
                <p className="text-gray-500">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-4 items-center">
                <Link
                  to={`/edit-note/${note.id}`}
                  className="flex items-center"
                >
                  <img src={editIcon} alt="Edit note" className="w-6 h-6" />
                </Link>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="flex items-center"
                  aria-label="Delete note"
                >
                  <img src={deleteIcon} alt="Delete note" className="w-6 h-6" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;

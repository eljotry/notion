import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNoteError } from "../redux/notesReducer";
import { updateNote } from "../redux/notesActions";

const EditNote = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notes, error, initialized } = useSelector((state) => state.notes);

  const note = notes.find((n) => n.id === noteId);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body || "");
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      dispatch(setNoteError("The title of the note cannot be empty"));
      return;
    }

    const updatedNote = {
      id: noteId,
      title,
      body,
      createdAt: note.createdAt,
      userId: note.userId,
    };

    await dispatch(updateNote(updatedNote));
    navigate("/notes");
  };

  const handleBack = () => {
    navigate("/notes");
  };

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <p>The note was not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-28 p-6 border rounded shadow-lg bg-white">
      <div className="flex items-center mb-4">
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          Back
        </button>
        <h2 className="text-2xl font-bold text-center flex-grow">
          Edit a note
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Text of the note..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded h-40 resize-none"
        />
        <button
          type="submit"
          className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Save
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default EditNote;

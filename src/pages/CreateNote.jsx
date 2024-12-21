import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNoteError } from "../redux/notesReducer";
import { createNote } from "../redux/notesActions";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.notes);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      dispatch(setNoteError("The title of the note cannot be empty"));
      return;
    }

    const note = await dispatch(createNote(title, body));

    navigate(`/view-note/${note.id}`);
  };

  const handleBack = () => {
    navigate("/notes");
  };

  return (
    <div className="max-w-2xl mx-auto mt-28 p-6 border rounded shadow-lg bg-white">
      <div className="flex items-center mb-4 mr-20">
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          Back
        </button>
        <h2 className="text-2xl font-bold text-center flex-grow">
          Create a new note
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
          placeholder="Тext of the note..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Create
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CreateNote;

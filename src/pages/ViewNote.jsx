import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import { deleteNote } from "../redux/notesReducer";
import { runInitialization } from "../redux/notesActions";

const ViewNote = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notes, initialized } = useSelector((state) => state.notes);

  useEffect(() => {
    if (!initialized) {
      dispatch(runInitialization());
    }
  }, [dispatch, initialized]);

  const note = notes.find((n) => n.id.toString() === noteId);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <p>The note was not found</p>;
  }

  const handleDelete = async () => {
    await dispatch(deleteNote(note.id));
    navigate("/notes");
  };

  const handleBack = () => {
    navigate("/notes");
  };

  const handleEdit = () => {
    navigate(`/edit-note/${note.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-28 p-6 border rounded shadow-lg bg-white">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          Back
        </button>
        <div className="flex space-x-4">
          <button onClick={handleEdit} className="flex items-center">
            <img src={editIcon} alt="Edit" className="w-6 h-6" />
          </button>
          <button onClick={handleDelete} className="flex items-center">
            <img src={deleteIcon} alt="Delete" className="w-6 h-6" />
          </button>
        </div>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-center flex-grow min-w-0 break-words">
        {note.title}
      </h2>
      <div className="text-1xl mt-4 break-words whitespace-pre-wrap">
        {note.body}
      </div>
      <p className="mt-4 text-gray-500 mb-2">
        {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ViewNote;

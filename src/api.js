const API_URL = "http://localhost:5001";

export const fetchNotes = async (userId) => {
  const response = await fetch(
    `${API_URL}/notes?userId=${userId}&_sort=-createdAt`
  );
  if (!response.ok) {
    throw new Error("Error loading notes");
  }
  return await response.json();
};

export const createNote = async (newNote) => {
  const response = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });

  if (!response.ok) {
    throw new Error("Error when creating a note");
  }

  return await response.json();
};

export const updateNote = async (updatedNote) => {
  const response = await fetch(`${API_URL}/notes/${updatedNote.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });
  if (!response.ok) {
    throw new Error("Error updating the note");
  }
  return await response.json();
};

export const deleteNote = async (noteId) => {
  const response = await fetch(`${API_URL}/notes/${noteId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting a note");
  }
  return response;
};

export const login = async (email, password) => {
  const result = await findUserByQuery(`email=${email}&password=${password}`);

  if (!result) {
    throw new Error("Can't login");
  }

  return result;
};

export const register = async (email, password) => {
  const userData = {
    email,
    password,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Something went wrong during register");
  }

  const data = await response.json();

  return data;
};

export const findUserByQuery = async (query) => {
  const response = await fetch(`${API_URL}/users?${query}`);

  const data = await response.json();

  if (data.length > 0) {
    const user = data[0];
    return user;
  } else {
    return null;
  }
};

export const findUserById = async (id) => {
  const response = await fetch(`${API_URL}/users?id=${id}`);

  const data = await response.json();

  if (data.length > 0) {
    const user = data[0];
    return user;
  } else {
    throw new Error("Invalid data provided");
  }
};

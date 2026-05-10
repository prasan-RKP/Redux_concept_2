import { createContext, useEffect, useReducer, useState } from "react";

export const NoteConTEXT = createContext({
  notes: [],
  loading: false,
  addNote: () => {},
  editNote: () => {},
  markNote: () => {},
  deleteNote: () => {},
});

// reducer

const noteReducer = (currNotes, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return [action.payload.note, ...currNotes];

    case "DEL_NOTE":
      return currNotes.filter((note) => note?.uid !== action.payload.uid);

    case "MARK_NOTE":
      return currNotes.map((note) =>
        note?.uid === action?.payload.uid
          ? { ...note, marked: action.payload.val }
          : note,
      );

    case "EDIT_NOTE":
      return currNotes.map((note) =>
        note?.uid === action.payload.uid
          ? { ...note, text: action.payload.text }
          : note,
      );

    case "INIL_NOTE":
      return action.payload.myNotes;

    default:
      return currNotes;
  }
};

const NotesProvider = ({ children }) => {
  const [notes, dispatchNote] = useReducer(noteReducer, []);
  const [loading, setLoading] = useState(false);

  const fetchNotes = () => {
    setLoading(true);
    try {
      let myNotes = JSON.parse(localStorage.getItem("NOTE")) || [];
      dispatchNote({
        type: "INIL_NOTE",
        payload: { myNotes },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    localStorage.setItem("NOTE", JSON.stringify(notes));
  }, [notes]);

  // --- Add Note ---
  const addNote = (note) => {
    setLoading(true);
    try {
      dispatchNote({
        type: "ADD_NOTE",
        payload: { note },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // deleteNote

  const deleteNote = (uid) => {
    setLoading(true);
    try {
      dispatchNote({
        type: "DEL_NOTE",
        payload: { uid },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // mark note
  const markNote = (uid, val) => {
    setLoading(true);
    try {
      dispatchNote({
        type: "MARK_NOTE",
        payload: { uid, val },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const editNote = (id, text) => {
    setLoading(true);
    try {
      dispatchNote({
        type: "EDIT_NOTE",
        payload: { uid: id, text },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoteConTEXT.Provider
      value={{
        notes,
        loading,
        addNote,
        editNote,
        deleteNote,
        markNote,
      }}
    >
        {children}
    </NoteConTEXT.Provider>
  );
};

export default NotesProvider;

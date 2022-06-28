import { child, onValue, push, ref, remove, set } from "firebase/database";
import moment from "moment";
import { db } from "../firebase-config/config";

const getNotes = async (padNumber, path) => {
  return new Promise(async (resolve, reject) => {
    const notesRef = ref(db, `data_store/pads/${padNumber}/${path}`);
    onValue(notesRef, (snapshot) => {
      let data = [];
      if (snapshot.exists()) {
        Object.keys(snapshot.val())
          .reverse()
          .forEach((key) => {
            let value = snapshot.val()[key];
            data.push(value);
          });
        resolve(data);
      } else {
        reject("no_data_found");
      }
    });
  });
};

const addNote = async (padNumber, note, path) => {
  return new Promise(async (resolve, reject) => {
    const newPostRef = push(child(ref(db), `data_store/pads/${padNumber}/${path}`));
    const key = newPostRef.key;
    const noteToAdd = {
      id: key,
      title: note.title,
      note: note.note,
      color: note.color,
      ...(note.isNote && { isNote: note.isNote }),
      ...(note.isReminder && { isReminder: note.isReminder, time: note.time }),
      lastModified: moment().format("DD/MM/YYYY HH:mm"),
    };
    await set(newPostRef, noteToAdd)
      .then(() => {
        resolve({ msg: "success", note: noteToAdd });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteNote = async (padNumber, note_id, path) => {
  return new Promise(async (resolve, reject) => {
    await remove(ref(db, `data_store/pads/${padNumber}/${path}/${note_id}`))
      .then(() => {
        resolve("success");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { getNotes, addNote, deleteNote };

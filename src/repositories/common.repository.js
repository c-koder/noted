import { child, onValue, push, ref, remove, set } from "firebase/database";
import moment from "moment";
import { db } from "../firebase-config/config";

const getNotes = async (user_id, path) => {
  return new Promise(async (resolve, reject) => {
    const notesRef = ref(db, `data_store/${user_id}/${path}`);
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

const addNote = async (user_id, note, path) => {
  return new Promise(async (resolve, reject) => {
    const newPostRef = push(child(ref(db), `data_store/${user_id}/${path}`));
    const key = newPostRef.key;
    const noteToAdd = {
      id: key,
      title: note.title,
      note: note.note,
      color: note.color,
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

const deleteNote = async (user_id, note_id, path) => {
  return new Promise(async (resolve, reject) => {
    await remove(ref(db, `data_store/${user_id}/${path}/${note_id}`))
      .then(() => {
        resolve("success");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { getNotes, addNote, deleteNote };

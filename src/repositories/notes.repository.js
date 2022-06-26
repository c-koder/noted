import { ref, update } from "firebase/database";
import moment from "moment";
import { db } from "../firebase-config/config";

const updateNote = (user_id, note) => {
  return new Promise(async (resolve, reject) => {
    const noteToUpdate = {
      title: note.title,
      note: note.note,
      color: note.color,
      lastModified: moment().format("DD/MM/YYYY HH:mm"),
    };
    update(ref(db, `data_store/${user_id}/notes/${note.id}`), noteToUpdate)
      .then(() => {
        resolve({ msg: "success", note: noteToUpdate });
      })
      .catch((err) => reject(err));
  });
};

export { updateNote };

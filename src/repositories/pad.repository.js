import {
  child,
  equalTo,
  get,
  orderByKey,
  query,
  ref,
  set,
} from "firebase/database";
import moment from "moment";
import { db } from "../firebase-config/config";

const padExists = async (number) => {
  const fbQuery = query(
    ref(db, `data_store/pads/`),
    orderByKey(number),
    equalTo(number.toString())
  );

  return new Promise(async (resolve, reject) => {
    await get(fbQuery)
      .then((snapshot) => {
        console.log(snapshot.exists());
        resolve(snapshot.exists());
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const createPad = async (number) => {
  return new Promise(async (resolve, reject) => {
    const padToAdd = {
      number: number,
      created: moment().format("DD/MM/YYYY HH:mm"),
    };
    await set(child(ref(db), `data_store/pads/${number}`), padToAdd)
      .then(() => {
        resolve("success");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { padExists, createPad };

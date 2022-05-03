import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const db = firebase.firestore();

const announcesFirstFetch = async (UID) => {
  try {
    const data = await db
      .collection("announces")
      .where("status", "==", "active")
      .where("uid", "!=", UID)
      .orderBy("uid", "desc")
      .orderBy("posted", "desc")
      .limit(10)
      .get();

    let announces = [];
    let lastKey = "";

    data.forEach((doc) => {
      announces.push({
        announceID: doc.id,
        announceData: doc.data(),
      });
      lastKey = doc.data().posted;
    });

    return { announces, lastKey };
  } catch (e) {
    console.log(e);
  }
};

const announcesNextFetch = async (key, UID) => {
  try {
    const data = await db
      .collection("announces")
      .where("status", "==", "active")
      .where("uid", "!=", UID)
      .orderBy("uid", "desc")
      .orderBy("posted", "desc")
      .startAfter(key)
      .limit(10)
      .get();

    let announces = [];
    let lastKey = "";
    data.forEach((doc) => {
      announces.push({
        announceID: doc.id,
        announceData: doc.data(),
      });
      lastKey = doc.data().posted;
    });

    return { announces, lastKey };
  } catch (e) {
    console.log(e);
  }
};

const exportedFunctions = {
  announcesFirstFetch,
  announcesNextFetch,
};

export default exportedFunctions;

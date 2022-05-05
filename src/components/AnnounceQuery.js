import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const db = firebase.firestore();

const announcesFirstFetch = async (UID, filter) => {
  let query = db.collection("announces").where("status", "==", "active").where("uid", "!=", UID);

  if (filter.country) query = query.where("country", "==", filter.country);
  if (filter.state) query = query.where("state", "==", filter.state);
  if (filter.city) query = query.where("city", "==", filter.city);

  query = query.orderBy("uid", "desc");

  if (filter.order)
    switch (filter.order) {
      case "recently":
        query = query.orderBy("posted", "desc");
        break;
      case "latest":
        query = query.orderBy("posted", "asc");
        break;
      case "difficultyAscending":
        query = query.orderBy("difficulty", "asc").orderBy("posted", "desc");
        break;
      case "difficultyDescending":
        query = query.orderBy("difficulty", "desc").orderBy("posted", "desc");
        break;
      default:
        break;
    }

  try {
    const data = await query.limit(10).get();

    let announces = [];
    let lastKey = "";

    data.forEach((doc) => {
      announces.push({
        ID: doc.id,
        Data: doc.data(),
      });
      lastKey = doc.data().posted;
    });

    return { announces, lastKey };
  } catch (e) {
    console.log(e);
  }
};

const announcesNextFetch = async (key, UID, filter) => {
  let query = db.collection("announces").where("status", "==", "active").where("uid", "!=", UID);

  if (filter.country) query = query.where("country", "==", filter.country);
  if (filter.state) query = query.where("state", "==", filter.state);
  if (filter.city) query = query.where("city", "==", filter.city);

  query = query.orderBy("uid", "desc");

  if (filter.order)
    switch (filter.order) {
      case "recently":
        query = query.orderBy("posted", "desc");
        break;
      case "latest":
        query = query.orderBy("posted", "asc");
        break;
      case "difficultyAscending":
        query = query.orderBy("difficulty", "asc").orderBy("posted", "desc");
        break;
      case "difficultyDescending":
        query = query.orderBy("difficulty", "desc").orderBy("posted", "desc");
        break;
      default:
        break;
    }

  try {
    const data = await query.startAfter(key).limit(10).get();

    let announces = [];
    let lastKey = "";
    data.forEach((doc) => {
      announces.push({
        ID: doc.id,
        Data: doc.data(),
      });
      console.log([announces[announces.length].ID]);
      lastKey = doc.data().posted;
    });

    return { announces, lastKey };
  } catch (e) {
    console.log(e);
  }
};

const myAnnouncesFirstFetch = async (UID, status) => {
  let query = db
    .collection("announces")
    .where("uid", "==", UID)
    .where("status", "==", status)
    .orderBy("posted", "desc");

  try {
    const data = await query.limit(10).get();

    let announces = [];
    let lastKey = "";

    data.forEach((doc) => {
      announces.push({
        ID: doc.id,
        Data: doc.data(),
      });
      lastKey = doc.data().posted;
    });

    return { announces, lastKey };
  } catch (e) {
    console.log(e);
  }
};

const myAnnouncesNextFetch = async (key, UID, status) => {
  let query = db
    .collection("announces")
    .where("uid", "==", UID)
    .where("status", "==", status)
    .orderBy("posted", "desc");

  try {
    const data = await query.startAfter(key).limit(10).get();

    let announces = [];
    let lastKey = "";

    data.forEach((doc) => {
      announces.push({
        ID: doc.id,
        Data: doc.data(),
      });
      lastKey = doc.data().posted;
    });

    return { announces, lastKey };
  } catch (e) {
    console.log(e);
  }
};

const myHelpedAnnouncesFirstFetch = async (UID, status) => {
  let query = db
    .collection("announces")
    .where("uid", "!=", UID)
    .where("helpedBy", "==", UID)
    .where("status", "==", status)
    .orderBy("uid", "desc")
    .orderBy("posted", "desc");

  try {
    const data = await query.limit(10).get();

    let announces = [];
    let lastKey = "";

    data.forEach((doc) => {
      announces.push({
        ID: doc.id,
        Data: doc.data(),
      });
      lastKey = doc.data().posted;
    });

    return { announces, lastKey };
  } catch (e) {
    console.log(e);
  }
};

const myHelpedAnnouncesNextFetch = async (key, UID, status) => {
  let query = db
    .collection("announces")
    .where("uid", "!=", UID)
    .where("helpedBy", "==", UID)
    .where("status", "==", status)
    .orderBy("uid", "desc")
    .orderBy("posted", "desc");

  try {
    const data = await query.startAfter(key).limit(10).get();

    let announces = [];
    let lastKey = "";

    data.forEach((doc) => {
      announces.push({
        ID: doc.id,
        Data: doc.data(),
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
  myAnnouncesFirstFetch,
  myAnnouncesNextFetch,
  myHelpedAnnouncesFirstFetch,
  myHelpedAnnouncesNextFetch,
};

export default exportedFunctions;

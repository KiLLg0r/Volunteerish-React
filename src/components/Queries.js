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

const getAnnounceData = async (ID) => {
  try {
    const data = await db.collection("announces").doc(ID).get();
    const announceData = data.data();

    return announceData;
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async (ID) => {
  try {
    let messages = [];
    let lastKey = "";
    // await db
    //   .collection("conversations")
    //   .doc(ID)
    //   .collection("messages")
    //   .orderBy("posted", "desc")
    //   .limit(10)
    //   .onSnapshot((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       messages.push({ ID: doc.id, Data: doc.data() });
    //       lastKey = doc.data().posted;
    //     });
    //   });

    const data = await db.collection("conversations").doc(ID).collection("messages").limit(10).get();

    data.forEach((doc) => {
      messages.push({ ID: doc.id, Data: doc.data() });
      lastKey = doc.data().created;
    });

    return { messages, lastKey };
  } catch (error) {
    console.log(error);
  }
};

const getNextMessages = async (key, ID1, ID2) => {
  try {
    const data = await db.collection("conversations").where("uid1", "==", ID1).where("uid2", "==", ID2).get();

    let messages = [];
    let lastKey = "";
    let conversationID = "";

    data.forEach((snapshot) => {
      conversationID = snapshot.id;
      snapshot.forEach((document) => {
        const conversationMessages = document
          .collection("messages")
          .orderBy("posted", "desc")
          .startAfter(key)
          .limit(10)
          .get();
        conversationMessages.forEach((doc) => {
          messages.push({
            ID: doc.id,
            Data: doc.data(),
          });
          lastKey = doc.data().posted;
        });
      });
    });

    return { messages, lastKey, conversationID };
  } catch (error) {
    console.log(error);
  }
};

const getConversations = async (UID) => {
  try {
    let conversations = [];

    const person1 = await db.collection("conversations").where("uid1", "==", UID).get();
    const person2 = await db.collection("conversations").where("uid2", "==", UID).get();

    person1.forEach((doc) => {
      conversations.push({ ID: doc.id, data: doc.data() });
    });

    person2.forEach((doc) => {
      conversations.push({ ID: doc.id, data: doc.data() });
    });

    return conversations;
  } catch (error) {
    console.log(error);
  }
};

const exportedFunctions = {
  announcesFirstFetch,
  announcesNextFetch,
  myAnnouncesFirstFetch,
  myAnnouncesNextFetch,
  myHelpedAnnouncesFirstFetch,
  myHelpedAnnouncesNextFetch,
  getAnnounceData,
  getMessages,
  getNextMessages,
  getConversations,
};

export default exportedFunctions;

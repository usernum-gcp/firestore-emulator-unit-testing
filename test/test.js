const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = 'emulator-rules-demo';
const auth_user_id = "auth_user_id";
const stranger_uid = "stranger_uid";
const auth_user = {uid:auth_user_id, email: "abc@gmail.com"};

function get_firestore(auth){
  return firebase.initializeTestApp(({projectId:MY_PROJECT_ID, auth:auth})).firestore();
}

describe("Social app demo", () => {
  it("Understands basic addition", () => {
    assert.equal(2 + 2, 4);
  });

  it("Can read items in the read-only collection", async () => {
    const db = get_firestore(null);
    const testDoc = db.collection("readonly").doc("testDoc");
    await firebase.assertSucceeds(testDoc.get());
  });

  Promise.all(firebase.apps().map(app => app.delete()))
  it("Can't write items to read-only collection", async () => {
    const db = get_firestore(null);
    const testDoc = db.collection("readonly").doc("testDoc_write");
    await firebase.assertFails(testDoc.set({some_field:"some_value"}));
  });
  Promise.all(firebase.apps().map(app => app.delete()))

  it("Can write to read-only collection with correct id", async () => {

    const db = get_firestore(auth_user);
    const testDoc = db.collection("users").doc(auth_user_id);
    await firebase.assertSucceeds(testDoc.set({some_field:"some_value"}));
  });

  it("Can't write to read-only collection with wrong id", async () => {

    const db = get_firestore(auth_user);
    const testDoc = db.collection("users").doc(stranger_uid);
    await firebase.assertFails(testDoc.set({some_field:"some_value"}));
  });

});
const db = require('firebase/database');
const { firebaseConfig } = require('../../config.json');

require('firebase/app').initializeApp(firebaseConfig);

const globalRef = (author) => db.ref(db.getDatabase(), author ?? '');
const getDatabaseInfo = async (id) => (await db.get(globalRef(id)))?.val();

module.exports = { db, globalRef, getDatabaseInfo };
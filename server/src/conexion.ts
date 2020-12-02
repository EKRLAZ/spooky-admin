
import  *  as  admin from 'firebase-admin'

let serviceAccount = require('../AuthService/ServiceAccountKey.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore()
export default db
 
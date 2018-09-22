const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);
exports.pushnotification = functions.database.ref('/notification/{id}').onWrite((event) => {
    console.log("EVENT", event.after._data);
    // const { id } = event.params;
    // const notification = event.data.val();

    const payload = {
        data: { key: event.after.key },
        notification: {
            body: event.after._data,
            sound: 'default'
        }
    };

    return admin.messaging().sendToTopic('notification', payload)
})

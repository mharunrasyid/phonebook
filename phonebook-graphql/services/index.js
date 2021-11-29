const serviceAccount = require('../key.json');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const getPhonebooks = async (data) => {
    try {
        let phonebookSnapshot = db.collection('phonebook');
        
        if (data.name && data.phone) {
            phonebookSnapshot = phonebookSnapshot.where('name', '==', data.name).where('phone', '==', data.phone)
        } else if (data.name) {
            phonebookSnapshot = phonebookSnapshot.where('name', '==', data.name)
        } else if (data.phone) {
            phonebookSnapshot = phonebookSnapshot.where('phone', '==', data.phone)
        }

        const phonebookList = (await phonebookSnapshot.get()).docs.map(doc => doc.data()).sort(function (a, b) {
            return new Date(b.id) - new Date(a.id);
        });

        return phonebookList
    } catch (err) {
        console.log(err);
    }
}

const createPhonebook = async (data) => {
    try {
        let id = Date.now().toString();
        const phonebookSnapshotAdd = db.collection('phonebook').doc(id);

        const phonebookAdd = await phonebookSnapshotAdd.set({
            id: id,
            name: data.name,
            phone: data.phone
        })

        const phonebook = (await phonebookSnapshotAdd.get()).data();
        return phonebook
    } catch (err) {
        console.log(err);
    }
}

const editPhonebook = async (data) => {
    try {
        const phonebookSnapshotUpdate = db.collection('phonebook').doc(data.id);
        const phonebookUpdate = await phonebookSnapshotUpdate.set({
            id: data.id,
            name: data.name,
            phone: data.phone
        })

        const phonebook = (await phonebookSnapshotUpdate.get()).data();
        return phonebook
    } catch (err) {
        console.log(err);
    }
}

const removePhonebook = async (data) => {
    try {
        const phonebookSnapshotDelete = db.collection('phonebook').doc(data.id);
        const phonebook = {
            id: data.id,
            name: data.name,
            phone: data.phone
        }

        const phonebookDelete = await phonebookSnapshotDelete.delete()
        return phonebook
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getPhonebooks,
    createPhonebook,
    editPhonebook,
    removePhonebook
};
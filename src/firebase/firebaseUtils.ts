import {GoogleAuthProvider, signInWithPopup, User as FirebaseUser} from "firebase/auth";
import {getFirestore,collection, addDoc, getDocs, updateDoc, doc, deleteDoc} from "firebase/firestore";
export const firebaseConfig = {
    "apiKey": "AIzaSyBZsrv24ffZz8e4ylET9JDwcbtoaJNVxNQ",
    "authDomain": "ecomoving-ac278.firebaseapp.com",
    "projectId": "ecomoving-ac278",
    "storageBucket": "ecomoving-ac278.appspot.com",
    "messagingSenderId": "190317021622",
    "appId": "1:190317021622:web:3e50051c48cb152ea5d917",
    "measurementId": "G-7Q0EB63CN6"
};

interface loginArgs {
    setUser: (user: FirebaseUser) => void
    auth: any
    googleAuthProvider: GoogleAuthProvider
}

export const googleLogin = ({setUser, auth, googleAuthProvider}:loginArgs ) => {
    signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            setUser(user)
        }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export const uploadImage = async (file: File, path: string) => {
    // const storage = getStorage();
    // const storageRef = ref(storage, path);
    // const snapshot = await uploadBytes(storageRef, file);
    // console.log('Uploaded a blob or file!');
    // return snapshot
}
export const saveDoc = async (data: any, path: string) => {
    const db = getFirestore();
    return await addDoc(collection(db, path), data);
}
export const getAllDocs = async (path: string) => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, path));
    return querySnapshot.docs
}

const DELIVERIES_COLLECTION_NAME = 'deliveries';
export const fetchDeliveries = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, DELIVERIES_COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
}

export const saveDelivery = async (id: string | null, docData: any, path: string) => {
    const db = getFirestore();
    if (id) {
        const docRef = doc(db, path, id);
        await updateDoc(docRef, docData);
    } else {
        await addDoc(collection(db, path), docData);
    }
}

export const saveCustomer = async ( docData: any, path: string,id: string | null = null) => {
    const db = getFirestore();
    if (id) {
        const docRef = doc(db, path, id);
        await updateDoc(docRef, docData);
    } else {
        await addDoc(collection(db, path), docData);
    }
}

export const deleteDelivery = async (id: string, path: string) => {
    const db = getFirestore();
    const docRef = doc(db, path, id);
    await deleteDoc(docRef);
}
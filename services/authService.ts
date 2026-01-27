import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from "./firebase"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"

export const registerUser = async (name: string, email: string, password: string) => {
    console.log("User registered:", email,name,password)

    const userCredential = await createUserWithEmailAndPassword(
        auth, email, password
    )
    const user = userCredential.user;

    console.log("User registered:", user);
    await updateProfile(user, {
        displayName: name,
    })

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: "USER",
        createdAt: serverTimestamp()
    })
    return user
}
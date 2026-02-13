import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import { uploadImage } from "./imageService";

const createProfile = async (image :string) =>{
    const user = auth.currentUser;
    if(!user){
        throw new Error("No user logged in")
    }
    await addDoc(collection(db, 'userProfile'),{
        userId: user.uid,
        profileImage: image,
    })
}

export const uploadProfilePicture = async (image :any) =>{
    const user = auth.currentUser;
    if(!user){
        throw new Error("No user logged in")
    }

    const imageUrl = await uploadImage(image)

    const profile = await alreadyCreated()

    if(profile.empty){
        try {
            await createProfile(imageUrl);
            return true
        } catch (error: any) {
            throw new Error("Failed to set profile picture: " + error.message);
        }
    }else{
        try {
            await updateDoc(profile.docs[0].ref,{
            profileImage: imageUrl
            })
            return true
        } catch (error: any) {
            throw new Error("Failed to update profile picture: " + error.message);
        }   
    }
}

const alreadyCreated = async () =>{
    const user = auth.currentUser;
    if(!user){
        throw new Error("No user logged in")
    }

    const profile = query(
        collection(db, "userProfile"),
        where("userId", "==", user.uid)
    )
    const ref = await getDocs(profile)

    return ref;
}

export const getProfilePicture = async () =>{
    const user = auth.currentUser;
    if(!user){
        throw new Error("No user logged in")
    }   
    const profile = await alreadyCreated()
    if(profile.empty){
        return
    }
    return profile.docs[0].data().profileImage
}
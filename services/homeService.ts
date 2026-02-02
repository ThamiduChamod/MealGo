import { collection, getDocs, query } from "firebase/firestore"
import { auth, db } from "./firebase"


const food_data = collection(db, "FOOD_DATA")
export const  getAll =async () => {
    console.log("Fetching food data...")
    // Simulate fetching data from a database or external API
    const user = auth.currentUser

    if (!user) return null
    
    const q = query(
        food_data,    
    )

    const snapshot = await getDocs(q)
    console.log("Fetched food data:", snapshot.docs.map(doc => doc.data()))
    return snapshot.docs.map(doc => ({
        id: doc.id, // 🔥 Firestore එකේ document ID එක මෙතනට එනවා
        ...doc.data()
        }
    ))

}
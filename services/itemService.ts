import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import { auth, db } from "./firebase"


export const  findById =async (id: any) => {
    // Simulate fetching data from a database or external API
    const user = auth.currentUser

    if (!user) throw new Error('User not authenticated.')

    const ref = doc(db, "FOOD_DATA", id)
    const FOOD_data = await getDoc(ref)

    if (!FOOD_data.exists()) throw new Error('Item not found.')

    const data = FOOD_data.data()
    // if (data.userId !== user.uid) throw new Error('Unauthorized')


    // console.log("Fetched food data:", FOOD_data.data())
    return {
        
        id: FOOD_data.id,
        image: data.image,
        price: data.price,
        name: data.name,
        description: data.description,
        ingredients: data.ingredients

    }

}

export const addToCart = async (food_id: any) =>{
    const user  = auth.currentUser

    if(!user) throw new Error('user not authenticated')

    await addDoc(collection(db, 'cart'),{
        food_id,
        user_id: user.uid
    })
    
}
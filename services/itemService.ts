import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
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

export const isAddCart = async (id: any) =>{
    const user = auth.currentUser

    if (!user) throw new Error('User not authenticated.')
    
    const q = query(
            collection(db, "cart"),
            where("food_id", "==", id)
    )

    const ref = await getDocs(q)

    if(ref.empty){
        return false
    }
    return true
}

export const quantityUpdate = async (id: any, quantity: number) =>{
    const user = auth.currentUser
    if (!user) throw new Error('User not authenticated.')
    
    const ref = await getDoc(doc(db, "FOOD_DATA", id))

    if(!ref.exists()) throw new Error('Item not found.')
    
    const docRef = ref.data()

    if(docRef.quantity < quantity || docRef.quantity <= 0) throw new Error('Not enough stock available.')

    const newQTY = docRef.quantity - quantity

    await updateDoc(doc(db, "FOOD_DATA", id), {
        quantity: newQTY
    })

    return true
}
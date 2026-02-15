import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebase";
import { quantityUpdate } from "./itemService";
import { deleteCartItem } from "./catService";




export const placeOrder = async ( address_id:string, cartItems: any[])=>{
    const user = auth.currentUser;
    if(!user) throw new Error("No user logged in");

    cartItems.forEach(async (item) => {
        console.log(`Food ID: ${item.id}, Quantity: ${item.quantity}`);
        const isUpdated = await quantityUpdate(item.id, item.quantity)
        if(!isUpdated){
            throw new Error("Failed to update item quantity")
        return false
    }
    })

    try {
       await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        cartItems: cartItems,
        addressId: address_id,
        timestamp: new Date()
       })

       cartItems.forEach(async (item) => {
           await deleteCartItem(item.cart_id)
        })
        return true
    } catch (error) {
        throw new Error("Failed to place order: ");
    }
    
    
    return false
}
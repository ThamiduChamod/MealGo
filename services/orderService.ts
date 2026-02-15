import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebase";
import { quantityUpdate } from "./itemService";
import { deleteCartItem } from "./catService";




export const placeOrder = async ( address_id:string, cartItems: any[])=>{
    const user = auth.currentUser;
    if(!user) throw new Error("No user logged in");

    console.log("Placing order with address ID:", address_id);
    const isUpdated = await updateQuantity(cartItems)
    if( !isUpdated ){
        console.error("Failed to update item quantities");
        throw new Error("Failed to update item quantities");
    }
    
    try {
       await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        cartItems: cartItems,
        addressId: address_id,
        timestamp: new Date()
       })
       console.log("Order placed successfully");
       if (cartItems !== null && typeof cartItems === 'object' && !Array.isArray(cartItems)) {
            const item = cartItems as any;
            return true
        }else{
            cartItems.forEach(async (item) => {
                await deleteCartItem(item.cart_id)
            })
            return true
        }
    } catch (error) {
        throw new Error("Failed to place order: ");
    }
    
    
    return false
}

const updateQuantity = async (cartItems: any[]) =>{
    console.log(" cart items:",typeof(cartItems), cartItems);
    try {
        if (cartItems !== null && typeof cartItems === 'object' && !Array.isArray(cartItems)) {
            console.log("Single item in cart:", cartItems);
            const item = cartItems as any;
            if (item.id) {
                const isUpdated = await quantityUpdate( item.id, 1)
                if(!isUpdated){
                return false
            }
                return true
            }
        }else{
            for (const item of cartItems) {    
                const isUpdated = await quantityUpdate(item.id, item.quantity)
                
                if(!isUpdated){
                    return false
                }
                    return true
            }
        }
    } catch (error) {
        console.error("Error updating quantity:", error);
        return false
    }
}
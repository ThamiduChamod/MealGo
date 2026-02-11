import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "./firebase"
import { findById } from "./itemService"
import { useState } from "react";

export const loadCartId = async ()=>{
    console.log("load data")
    const user = auth.currentUser

    if (!user) throw new Error("Not User Authenticate")
    
    console.log(user.uid)
    const q = query(
        collection(db, "cart"),
        where("user_id", "==", user.uid)
    )

    const cartSnapShort = await getDocs(q)

    if(!cartSnapShort) throw Error("Not found cart items")
    
    
     const foods = await Promise.all(
        
        cartSnapShort.docs.map(async (doc)=>{
        //    console.log(doc.data())
        const food = await findById(doc.data().food_id)
        console.log(food)
        console.log(typeof( food.price))

            return{
                cart_id: doc.id,
                ...food,
                quantity: 1,
                price:Number(food.price)
            }
       
        })
    
     )     
    return foods
    

}


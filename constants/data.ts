import { useEffect } from "react";
import { getAll } from "../services/homeService";


export const food_data = getAll()

export const FOOD_DATA = [
    {
      id: '1',
      qty: 10,
      cat: 1,
      name: 'Classic Beef Burger',
      price: '1,250',
      description: 'Juicy beef patty with melted cheese and secret sauce.',
      rating: '4.8 (120+)',
      image: require('@/assets/images/b2.png'),
      ingredients: [
      { id: 1, name: 'Beef', icon: '🥩' },
      { id: 2, name: 'Cheese', icon: '🧀' },
      { id: 3, name: 'Bun', icon: '🍞' },
      { id: 4, name: 'Onion', icon: '🧅' },
    ],
    },
    {
      id: '2',
      cat: 2,
      name: 'Spicy Zinger',
      price: '1,100',
      description: 'Extra crispy chicken with spicy mayo and lettuce.',
      rating: '4.5 (90+)',
      image: require('@/assets/images/b2.png'),
      ingredients: [
      { id: 1, name: 'Chicken', icon: '🍗' },
      { id: 2, name: 'Mayo', icon: '🍶' },
      { id: 3, name: 'Lettuce', icon: '🥬' },
      { id: 4, name: 'Bun', icon: '🍞' },
    ],
    },
  ];
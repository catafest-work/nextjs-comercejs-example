import {createContext, useReducer, useContext, useEffect } from 'react' 

import commerce from '../lib/commerce'

const CartStateContext = createContext()
const CartDispachContext = createContext()

const SET_CART = "SET_CART";

const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return {...state, ...action.payload};
    default: 
      throw new Error (`Unknown action: ${action.type}`);
  }
};

export const CartProvider = ({children}) => {
   
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
     getCart();
   }, []);

   const setCart = (payload) => dispatch({ type: SET_CART, payload });

   const getCart = async() => {
     try {
       const cart = await commerce.cart.retrieve()

       setCart(cart)
     } catch (err) {
       console.log(err)
     }
   };

   return (
     <CartDispachContext.Provider value={{ setCart }}>
       <CartStateContext.Provider value={state}>
        {children}
       </CartStateContext.Provider>
     </CartDispachContext.Provider>
   );
};

export const useCartState = () => useContext(CartStateContext)
export const useCartDispatch = () => useContext(CartDispachContext)
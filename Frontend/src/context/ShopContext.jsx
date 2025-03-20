import { createContext, useEffect, useState } from "react";
//import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "₹"
    const delivery_fee = 100
    const server = "https://cloth-e-commerce-47l9.onrender.com"
    const navigate = useNavigate(); 

    const [search, setSearch] = useState('');
    const [showSearch, setShowSeacrh] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)

    const addTocart = async (itemId, size) => {

        if(!size){
            toast.error('Select Product Size')
        }

        let cartData = structuredClone(cartItems)

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1; 
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

        if(token){
            try {
                await axios.post(server + '/api/cart/add', {itemId, size}, {headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartCount = () => {
        let totleConut = 0;

        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totleConut += cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totleConut;
    }

    const updateQuantity = async (itemId,size,quantity) => {

        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity

        setCartItems(cartData)

        if(token){
            try {
                await axios.post(server + '/api/cart/update', {itemId, size, quantity}, {headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {

        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items)  
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount = itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount
    }

    const getUserCart = async (token) => {
        try {
            
            const response = await axios.post(server + '/api/cart/get',{},{headers:{token}})
            if(response.data.success){
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getProductsData = async () => {
        setLoading(true)
        try {
            
            const response = await axios.get(server + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
                setLoading(false)
            }
            else{
                toast.error(response.data.message)
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
            setLoading(false)
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const value = {
        products,
        currency, 
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSeacrh,
        cartItems, 
        setCartItems,
        addTocart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        server,
        token, 
        setToken,
        navigate,
        loading, setLoading
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;
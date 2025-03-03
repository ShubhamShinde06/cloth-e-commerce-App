import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterproducts, setFilterproducts] = useState([]);
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  //category filter
  const categoryFilter = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  } 

  //Subcategory filter
  const SubCategoryFilter = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  } 

  // both are function same logic
  const applyFilter = () => {

    let productCopy = products.slice();

    if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category))
    }

    if(subCategory.length > 0){
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }

    if(showSearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    setFilterproducts(productCopy)
    
  }

  // sorting products
  const SortProducts = () => {

    const FilterProductCopy = filterproducts.slice();

    switch(sortType){

      case 'low-high':
        setFilterproducts(FilterProductCopy.sort((a,b) => (a.price - b.price)))
        break;
      
      case 'high-low':
        setFilterproducts(FilterProductCopy.sort((a,b) => (b.price - a.price)))
        break;

      default:
        applyFilter()
        break;

    }

  }

  useEffect(()=>{
    SortProducts()
  },[sortType])

  useEffect(()=> {
    applyFilter()
  },[category, subCategory, search, showFilter, products])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter option LEFT_SIDE */}
      <div className="min-w-60">
        <p 
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={()=>setShowFilter(!showFilter)}
        >
          FILTERS
          <img 
            src={assets.dropdown_icon} 
            className={`h-3 sm:hidden ${showFilter ? ' rotate-90' : ''}`}
            alt="drop-icon" 
          />
        </p>
        {/* category */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        > 
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Men"} onClick={categoryFilter}/> Men
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Women"} onClick={categoryFilter}/> Women
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Kids"} onClick={categoryFilter}/> Kids
            </p>
          </div>
        </div>
        {/* Subcategory */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Topwear"} onClick={SubCategoryFilter} /> Topwear
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Bottomwear"} onClick={SubCategoryFilter}/> Bottomwear
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Winterwear"} onClick={SubCategoryFilter} /> Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* RIGHT_SIDE */}
      <div className="flex-1">
        <div className="flex items-center justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTION'}/>
          {/* Sorting for product */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2 py-2 rounded">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* product display */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {
          filterproducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default Collection;

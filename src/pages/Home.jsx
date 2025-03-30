import {useState, useEffect} from 'react'
import './Home.css'
import { data, Link, useNavigate } from 'react-router'
import { IoCart } from "react-icons/io5";

import { useSelector, useDispatch } from 'react-redux'
import { addProductToCart } from '../features/cart/cartSlice'

function Home() {
    const productsOfCart = useSelector((state) => state.cart.products)
    const dispatch = useDispatch()

    const [allproducts, setAllproducts] = useState([])
    const [sort, setSort] = useState("low")
    const [categories, setCategories] = useState([])
    const [selectedcategory, setSelectedcategory] = useState("all")
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchedProduct, setSearchedProduct] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then((data) => {
                const sortedProducts = data.products.sort((a, b) => a.price - b.price)
                setAllproducts(sortedProducts);
            })

        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then((data) => {
                setCategories(data)
            })
    }, [])

    function getProductsSorted(){
        if (selectedcategory === "all") {
            const sortedProducts = [...allproducts];
            if(sort == "low"){
                setAllproducts(sortedProducts.sort((a, b) => a.price - b.price))
            }else{
                setAllproducts(sortedProducts.sort((a, b) => b.price - a.price))
            }
        } else {
            const productsCategory = allproducts.filter((product) => product.category === selectedcategory);
           
            if(sort == "low"){
                setFilteredProducts(productsCategory.sort((a, b) => a.price - b.price))
            }else{
                setFilteredProducts(productsCategory.sort((a, b) => b.price - a.price))
            }
        }


        
    }
    useEffect(() => {
        getProductsSorted();
    }, [sort]);

    function choosenCategory(){
        if (selectedcategory === "all") {
        
            if(sort == "low"){
                setFilteredProducts(allproducts.sort((a, b) => a.price - b.price))
            }else{
                setFilteredProducts(allproducts.sort((a, b) => b.price - a.price))
            }
            
        } else {
            const productsCategory = allproducts.filter((product) => product.category === selectedcategory);
    
            if(sort == "low"){
                setFilteredProducts(productsCategory.sort((a, b) => a.price - b.price))
            }else{
                setFilteredProducts(productsCategory.sort((a, b) => b.price - a.price))
            }
        }
    }
    
    useEffect(() => {
        choosenCategory();
    }, [selectedcategory, allproducts]);

 
    useEffect(() => {
        if (searchedProduct === "") {
          setFilteredProducts(allproducts);
        } else {
          setFilteredProducts(
            allproducts.filter((product) =>
              product.title.toLowerCase().includes(searchedProduct.toLowerCase())
            )
          );
        }
      }, [searchedProduct, allproducts])

      function handleAddToCart(product){
        if(localStorage.getItem("data")){

            dispatch(addProductToCart({ ...product, quantity: 1 }))
            
        }else{
            navigate("/login")
        }
      }

  return (
        <>
            
            <div className="main-content">
    <div className="search-and-filters">
       
        <div className="search-container">
            <div className="search-bar">
                <input
                    type="text"
                    value={searchedProduct}
                    onChange={(e) => setSearchedProduct(e.target.value)}
                    placeholder="What are you looking for?"
                />
                <span className="search-icon">🔍</span>
            </div>
            
        </div>

        <p className="cart-icon">
            <Link to={'/cart'}>
                <IoCart size={50} className="cart-icon-svg" />
                <span className="cart-count">{productsOfCart.length}</span>
            </Link>
        </p>
        <div className="filters-container">
            <div className="dropdown-container">
                <div className="select-container">
                    <label htmlFor="sorted" className="sort-label">Sort by</label>
                    <select id="sorted" onChange={(e) => setSort(e.target.value)} value={sort}>
                        <option value="low">Low Price</option>
                        <option value="high">High Price</option>
                    </select>
                </div>

                <div className="select-container">
                    <label htmlFor="category" className="sort-label">Category</label>
                    <select id="category" onChange={(e) => setSelectedcategory(e.target.value)} value={selectedcategory}>
                        <option value="all">All</option>
                        {categories.map((category) => (
                            <option key={category.slug} value={category.slug}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    </div>

   
    <div className="product-container">
        {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
                <img src={product.images[0]} alt={product.title} />
                <h1>{product.title}</h1>
                <p>${product.price}</p>
                <button className="add-to-cart-btn" onClick={()=>handleAddToCart(product)}>Add to cart</button>
            </div>
        ))}
    </div>
</div>

        </>
  )
}

export default Home

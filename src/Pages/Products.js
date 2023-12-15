import React, {useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ProductCard from '../Components/Card/ProductCard'


export default function Products() {
  const [courses, setcourses] = useState([]);
  const [cart, setCart] = useState([]);
 

  useEffect(() => {
    fetch("mocks/courses.json")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.courses.length > 0) {
      setcourses(data.courses);
    }
  })    
  .catch((error) => console.log(error));
}, []);

  function handleAddToCart (data = {}){
    if (data){
      let cartCopy = [...cart];
      cartCopy.push(data);
      setCart(cartCopy);
    }
  }
 
  return (
    <div>
      <Navbar brand = "Learning Community" cartCount = {cart.length}/>
      <Header heading = "Shop your next course" description ="Get 15% discount on all courses" />
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                  {courses && 
                  courses.length > 0 && 
                  courses.map((d, i) => (
                  <ProductCard product ={d} key = {`product-courses-${i}`}
                  handleAddToCart = {handleAddToCart}
                  disabled = {
                    cart.filter((cItem) => cItem.courseName === d.courseName)
                    .length > 0
                    ? true
                    : false
                  }
                  // removeItem = {removeItem}
                  />
                  )) 
                  }
                  </div>
            </div>
        </section>
      <Footer/>
    </div>
  )
}

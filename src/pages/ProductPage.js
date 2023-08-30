import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const ProductPage = () => {
    const params = useParams()
    const category = params.category
    const [productList,setProductList] = useState([])

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/category/${category}`)
            .then(response => setProductList(response.data.products))
            .catch(error => console.log(error))
    }, [category]);
    return(
        <>
            <h1>Product Page and category is {category}</h1>
            {
                productList.map(product => {
                    return(
                        <>
                            <h4>Product Name: {product.title}</h4>
                        </>
                    )
                })
            }
        </>
    )
}
export default ProductPage;
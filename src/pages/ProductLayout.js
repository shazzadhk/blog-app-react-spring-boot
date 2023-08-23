import {Link, Outlet} from "react-router-dom";

const ProductLayout = () => {
    return(
        <>
            <ul>
                <li>
                    <Link to="/product/1" replace>Product 1</Link>
                    <Link to="/product/2">Product 2</Link>
                </li>
            </ul>
            <Outlet/>
        </>
    )
}
export default ProductLayout;
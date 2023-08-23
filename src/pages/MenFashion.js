import {useParams, useSearchParams} from "react-router-dom";

const MenFashion = () => {
    const {id} = useParams()
    const [searchParam,setSearchParam] = useSearchParams()
    const isShowActiveProduct = searchParam.get('filter') === 'active'
    return(
        <>
            <h3>Product Page with id: {id}</h3>
            <button onClick={() => setSearchParam({filter: 'active'})}>
                Active Product
            </button>
            <button onClick={() => setSearchParam({})}>
                Reset Filter
            </button>
            {
                isShowActiveProduct ? <h3>Show Only Active Products</h3> : <h3>Show All Products</h3>
            }
        </>
    )
}
export default MenFashion;
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import MenFashion from "../pages/MenFashion";
const Index = () => {
    return(
        <Routes>
            <Route index element={<HomePage />}/>
            <Route path="product" element={<MenFashion />}/>
        </Routes>
    )
}
export default Index;
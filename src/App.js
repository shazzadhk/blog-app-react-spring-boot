// import Index from "./routes";
import React from "react";
import './App.css'
import {Route, Routes} from "react-router-dom";
import MenFashion from "./pages/MenFashion";
import ProductPage from "./pages/ProductPage";
import AddEmployee from "./components/AddEmployee";
import EmployeeView from "./pages/EmployeeView";
import UpdateEmployee from "./pages/UpdateEmployee";
import Navbar from "./components/Navbar";
const LazyHomePage = React.lazy(() => import('./pages/HomePage'))

const App = () => {

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={
                    <React.Suspense fallback='...Loading'>
                        <LazyHomePage/>
                    </React.Suspense>
                }/>
                <Route path="/product" element={<ProductPage/>}>
                    <Route index element={<LazyHomePage/>}/>
                    <Route path=":id" element={<MenFashion/>}/>
                </Route>
                <Route path="/add-employee" element={<AddEmployee/>}/>
                <Route path="/view-employee" element={<EmployeeView/>}/>
                <Route path="update-employee/:id" element={<UpdateEmployee/>}/>
                <Route path="product-page/:category" element={<ProductPage/>}/>
            </Routes>
        </>
    )

};
export default App;
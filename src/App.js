// import Index from "./routes";
import {NavLink, Route, Routes} from "react-router-dom";
// import HomePage from "./pages/HomePage";
import MenFashion from "./pages/MenFashion";
import ProductLayout from "./pages/ProductLayout";
import React from "react";
import YoutubeForm from "./components/YoutubeForm";
import EmployeeView from "./pages/EmployeeView";
import './App.css'
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
const LazyHomePage = React.lazy(() => import('./pages/HomePage'))

const App = () => {

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/product">Product</NavLink>
                    </li>
                    <li>
                        <NavLink to="/add-employee">Add Employee</NavLink>
                    </li>
                    <li>
                        <NavLink to="/view-employee">View Employee</NavLink>
                    </li>
                </ul>
            </nav>
            {/*<Navbar/>*/}
            {/*<Index/>*/}
            {/*<Footer/>*/}
            <Routes>
                <Route path="/" element={
                    <React.Suspense fallback='...Loading'>
                        <LazyHomePage/>
                    </React.Suspense>
                }/>
                <Route path="/product" element={<ProductLayout/>}>
                    <Route index element={<LazyHomePage/>}/>
                    <Route path=":id" element={<MenFashion/>}/>
                </Route>
                <Route path="/add-employee" element={<YoutubeForm/>}/>
                <Route path="/view-employee" element={<EmployeeView/>}/>
            </Routes>
        </>
    )

};
export default App;
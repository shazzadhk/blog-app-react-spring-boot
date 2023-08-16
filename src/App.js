import Index from "./routes";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {

    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Index/>
                <Footer/>
            </BrowserRouter>
        </>
    )

};
export default App;
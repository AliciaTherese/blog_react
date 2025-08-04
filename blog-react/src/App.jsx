import { useState ,useEffect} from 'react'
import{Routes, Route, BrowserRouter} from "react-router";
import Signup from "./components/sign_up";
import Signin from "./components/sign_in";
import All_blogs from "./components/all_blogs"
import Create_blog from "./components/create_blog"
import My_blogs from "./components/my_blogs"
import Viewablog from './components/viewablog';
import Home from './components/home'

function App() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/sign_in" element={<Signin/>}/>
            <Route path="/sign_up" element={<Signup/>}/>
            <Route path="/all_blogs" element={<All_blogs/>}/>
            <Route path="/create_blog" element={<Create_blog/>}/>
            <Route path='/my_blogs' element={<My_blogs/>}/>
            <Route path="/viewablog/:id" element={<Viewablog/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
        </BrowserRouter>
    )
    
}

export default App

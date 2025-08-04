import axios from "axios"
import { useState } from "react"
import {useNavigate} from "react-router"
function Signin(){
    const [username, setUsername]= useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate()
    function signin(){
        axios.post("http://localhost:3003/signin",{
            username:username,
             password:password
        }).then(function(response){
            let token=response.data
            localStorage.setItem("token",token)
            navigate("/all_blogs")
        })
    }
    return(
        <div>
            <div style={{display:"flex", flexDirection:"column",alignItems:"center", margin:"100px"}}>
                <div style={{border: "0px", boxShadow:"2px 2px 2px 2px #888888" ,padding:"20px", display:"flex",flexDirection:"column"}}>
                <center><h1>Signin</h1><br /></center>

                <input type="text" placeholder="Enter username" id="username" onChange={(e) => setUsername(e.target.value)} style={{padding:"9px", margin: "10px"}}/>
                <input type="password" placeholder="Enter password" id="password" onChange={(e) =>setPassword(e.target.value)} style={{padding:"9px", margin: "10px"}}/>
                <button onClick={signin} style={{padding:"8px",margin:"8px", color:"white", backgroundColor:"black", borderRadius:"5px"}}>signin</button>
                <a href="sign_up">dont have an account</a>
             </div>
            </div>
        </div>
    )
}
export default Signin;
import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router";


function Signup(){
    const[username, setUsername]=useState("");
    const[name, setName]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    function signup(){
        axios.post("http://localhost:3003/signup",{
            username:username, name:name, password:password
        }).then(function(){
            navigate("/sign_in")
        }).catch((err) =>{
            alert("An error occured")
            console.log("error")
        })
    }
    return(
        <div>
            <div style={{display:"flex", flexDirection:"column",alignItems:"center", margin:"100px"}}>
                <div style={{border: "0px", boxShadow:"2px 2px 2px 2px #888888" ,padding:"20px", display:"flex",flexDirection:"column"}}>
                <center><h1 >Signup</h1><br/></center>
                
                <input type="text" placeholder="Enter username" id="username" onChange={(e) => setUsername(e.target.value)} style={{padding:"9px", margin: "10px"}}/>
                <input type="text" placeholder="Enter name" id="name" onChange={(e) => setName(e.target.value)} style={{padding:"9px", margin: "10px"}}/>
                <input type="password" placeholder="Enter password" id="password" onChange={(e) => setPassword(e.target.value)} style={{padding:"9px", margin: "10px"}}/>
                <button onClick={signup} style={{padding:"8px",margin:"8px", color:"white", backgroundColor:"black", borderRadius:"5px"}}>signup</button>
                </div>
            </div>
        </div>
    )
}
export default Signup;
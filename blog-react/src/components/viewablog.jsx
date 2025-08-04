import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

function Viewablog() {
    const [blog, setBlogs] = useState([])
    const navigate = useNavigate()
    const { id } = useParams();
    
    useEffect(() => {
        axios.get("http://localhost:3003/viewablog/" + id, {
             headers:{
               token:localStorage.getItem("token")
             }
        }).then(function (response) {
            setBlogs(response.data)
        }).catch((err) => {
            console.log("error ocuured")
        })}, [])



function back() {
    navigate("/all_blogs")
}

return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div key={blog.blog_id} style={{border: "0px", boxShadow:"2px 2px 5px 2px #888888", padding:"20px", margin:"20px", width:"150vh"}}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
        </div>
        <button onClick={back} style={{ padding: "15px", color: "white", backgroundColor: "black", borderRadius: "7px", width: "200px", margin: "20px" }} >back</button>
    </div>
)
    
}

export default Viewablog
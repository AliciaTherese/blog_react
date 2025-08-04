import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";


function Create_blog() {
    const [title, setTitle] = useState("");
    const [blog_content, setContent] = useState("");
    const navigate = useNavigate()
    let token = localStorage.getItem("token")
    function create_blog() {
        axios.post("http://localhost:3003/createblog", {
            title: title,
            blog_content: blog_content
        },
            {
                headers: {
                    token: token
                }
            }).then(function (response) {
                alert("successfull");
                navigate("/all_blogs");
            }).catch((error) => {
                alert("error occured")
            }
            )
    }
    function viewallblogs(){
        navigate("/all_blogs")
    }
    return (
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
            <h1 style={{marginLeft:"20px"}}>Create a blog</h1>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
                <input type="text" id="title" placeholder="Enter title"  onChange={(e) => setTitle(e.target.value)} style={{width:"300px", padding:"16px", margin:"20px", border: "0px", boxShadow:"1px 1px 2px 2px #888888" ,}}/>
                <textarea type="text" id="title" placeholder="Enter content" rows={10} cols={5}  onChange={(e) => setContent(e.target.value)} style={{margin:"20px", width:"800px", padding:"20px" ,border: "0px", boxShadow:"1px 1px 2px 2px #888888" }} />
                <div>
                    <button onClick={create_blog} style={{width:"200px", padding:"15px", margin:"20px", color:"white", backgroundColor:"black", borderRadius:"5px"}}>submit</button>
                    <button onClick={viewallblogs} style={{ padding: "15px", color: "white", backgroundColor: "black", borderRadius: "7px", width: "200px", margin: "20px" }} >back</button>
                </div>
            </div>

        </div>
    )
}

export default Create_blog
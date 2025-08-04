import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"


function My_blogs() {
    const [my_blogs, setBlog] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:3003/viewmyblog",
            {
                headers:
                {
                    token: localStorage.getItem("token")
                }
            }
        ).then(function (response) {
            setBlog(response.data)
        }).catch(err => {
            console.log("no blogs found")
        })
    },[]);

    function viewallblogs(){
        navigate("/all_blogs")
    }
    function view_blog(id){
          navigate(`/viewablog/${id}`)
    }

    function delete_blog(id)
    {
      axios.delete(`http://localhost:3003/delete/${id}`,{
        headers:{
            token:localStorage.getItem("token")
        }
        
      }).then(function(response){
          setBlog(response.data)
      }).catch(error=>{
        console.log("error")
      })
      
    }

   return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1>My blogs</h1>
        <div style={{margin:"20px", }}></div>
        {my_blogs.map(blog =>
            <div key={blog._id} style={{border: "0px", boxShadow:"2px 2px 5px 2px #888888", padding:"20px", margin:"20px", width:"150vh"}}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <button  onClick={() => view_blog(blog.blog_id) } style={{width:"200px", padding:"15px", margin:"20px", color:"white", backgroundColor:"black", borderRadius:"5px"}}>view</button>
                <button  onClick={() => delete_blog(blog.blog_id) } style={{width:"200px", padding:"15px", margin:"20px", color:"white", backgroundColor:"black", borderRadius:"5px"}}>delete</button>
            </div>
        )}
        <button onClick={viewallblogs} style={{ padding: "15px", color: "white", backgroundColor: "black", borderRadius: "7px", width: "200px", margin: "20px" }} >back</button>
        
    </div>
)



}

export default My_blogs
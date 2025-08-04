import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

function All_blogs() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        axios.get("http://localhost:3003/viewallblogs", {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(function (response) {
            setBlogs(response.data)
            console.log(response.data)

        }
        ).catch(err => {
            console.log("some error occured")
        })

    }, []);

    function create_blog() {
        navigate("/create_blog")
    }
    function myblogs() {
        navigate("/my_blogs")
    }
    function viewablog(id){
            navigate(`/viewablog/${id}`)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1 >Welcome to Your Blog Dashboard</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>


                <button style={{ padding: "15px", color: "white", backgroundColor: "black", borderRadius: "7px", width: "200px", margin: "20px" }} onClick={create_blog}>
                    Create a Blog
                </button>
                <button style={{ padding: "15px", color: "white", backgroundColor: "black", borderRadius: "7px", width: "200px", margin: "20px" }} onClick={myblogs}>
                    My Blogs
                </button>

            </div>
            <div style={{margin:"40px", }}>
                {blogs.map(blog => (
                    <div key={blog.blog_id} style={{border: "0px", boxShadow:"2px 2px 5px 2px #888888", padding:"20px", margin:"20px"}} onClick={()=>viewablog(blog.blog_id)}>
                        <h2>
                            {blog.title}
                        </h2>
                        <p>
                            {blog.content}
                        </p>

                    </div>

                ))}
            </div>

        </div>
    )

}

export default All_blogs;
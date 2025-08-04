import axios from "axios"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router"


function Home() {
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

    function sign_in(){
        navigate("/sign_in")
    }
    function sign_up(){
        navigate("/sign_up")
    }

  

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1 >Welcome to Blog Website</h1>

            <h2 >Don't have an account?</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
 

                <button style={{ padding: "15px", color: "white", backgroundColor: "black", borderRadius: "7px", width: "200px", margin: "20px" }} onClick={sign_in}>
                    Signup
                </button>
                <button style={{ padding: "15px", color: "white", backgroundColor: "black", borderRadius: "7px", width: "200px", margin: "20px" }} onClick={sign_up}>
                    Signin
                </button>

            </div>

        </div>
    )

}

export default Home;

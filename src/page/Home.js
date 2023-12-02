import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();


    useEffect(() => {
        const isLoggedIn = localStorage.getItem('user');
       
        if (!isLoggedIn) {
            navigate("/dangnhap")
        }
    }, [])



    return (
        <h1 style={{ textAlign: "center" }}>Chào mừng đến với Mini Stop</h1>


    );
}

export default Home;
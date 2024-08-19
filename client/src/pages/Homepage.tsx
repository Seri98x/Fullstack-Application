import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function Homepage() {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('login');
        }
    }, [token, navigate]);

    return ( <div>Homepage</div> );
}

export default Homepage;
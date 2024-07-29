import React, { useEffect, useState } from "react";
import axios from "axios";

const Success = () => {
  const [userData, setUserData] = useState(null);
  const [pages, setPages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8000/auth/success", {
          withCredentials: true,
        });
        setUserData(result.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFetchPages = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8000/webhook/fetch-pages",
        {
          withCredentials: true,
        }
      );
      setPages(result.data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("http://localhost:8000/auth/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    window.location.href = "http://localhost:5173/";
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
        {userData ? (
          <div>
            <p>Full Name: {userData.fullName}</p>
            <p>Email: {userData.email}</p>
            <img src={userData.avatar} alt="avatar" />
            <button onClick={handleFetchPages}>Fetch Facebook Pages</button>
            <button onClick={handleLogout}>Logout</button>
            {pages && (
              <div>
                <h2>Your Pages:</h2>
                <ul>
                  {pages.data.map((page) => (
                    <li key={page.id}>{page.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
};

export default Success;

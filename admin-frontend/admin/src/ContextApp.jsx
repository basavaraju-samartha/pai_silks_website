import React, { createContext, useState, useEffect } from "react";

export const ContextApp = createContext();

export const LoginDetailsProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email") || "";
    const savedPassword = localStorage.getItem("password") || "";
    setEmail(savedEmail);
    setPassword(savedPassword);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }
  }, [email, password, loaded]);

  return (
    <ContextApp.Provider value={{ email, password, setEmail, setPassword }}>
      {children}
    </ContextApp.Provider>
  );
};

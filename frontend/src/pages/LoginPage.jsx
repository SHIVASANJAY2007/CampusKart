import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";

export default function LoginPage() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Signup fields
  const [department, setDepartment] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [idCard, setIdCard] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType("success");
        setMessage("Login Successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        
        // Fetch and store user data after login
        const userResponse = await fetch(`${API_URL.replace('/auth', '')}/user/${data.userId}`, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${data.token}`
          }
        }).catch(() => null);
        
        if (userResponse?.ok) {
          const userData = await userResponse.json();
          localStorage.setItem('userData', JSON.stringify(userData));
        }
        
        setTimeout(() => navigate("/home"), 700);
      } else {
        setMessageType("error");
        setMessage(data.message || "Invalid Username or Password");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Server Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    if (
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      department === "" ||
      rollNo === "" ||
      phone === "" ||
      collegeEmail === "" ||
      !idCard
    ) {
      setMessageType("error");
      setMessage("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match!");
      return;
    }

    if (!collegeEmail.endsWith("@kongu.edu")) {
      setMessageType("error");
      setMessage("Enter valid college email (must end with @kongu.edu)!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("department", department);
      formData.append("rollNo", rollNo);
      formData.append("phone", phone);
      formData.append("collegeEmail", collegeEmail);
      formData.append("idCard", idCard);

      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType("success");
        setMessage("Signup Successful! Switching to Login...");
        // Store signup data for profile display
        const signupData = {
          _id: data.userId,
          username,
          department,
          rollNo,
          phone,
          collegeEmail,
          idCard: idCard?.name || "ID Card uploaded",
          idCardUrl: `http://localhost:5000/api/auth/idcard/${data.userId}`,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('userData', JSON.stringify(signupData));
        localStorage.setItem('userId', data.userId);
        
        setTimeout(() => {
          setMode("login");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setDepartment("");
          setRollNo("");
          setPhone("");
          setCollegeEmail("");
          setIdCard(null);
          setMessage("");
          setMessageType("");
        }, 1200);
      } else {
        setMessageType("error");
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Server Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if input has value
  const hasValue = (val) => val && val.length > 0;

  // --- Input Field Component Function ---
  const renderInputField = (label, value, setter, type = "text") => (
    <div key={label} className="mb-4 relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder="" // The input itself has no placeholder
        className="w-full p-3 rounded-xl bg-white border border-gray-300 text-[#2B303B] focus:outline-none focus:ring-2 focus:ring-[#007BFF] peer"
      />
      <label
        // MODIFIED: The label's CSS is now set to use opacity: 0 when hasValue is true,
        // causing it to completely disappear when text is typed.
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
          ${hasValue(value) ? "opacity-0" : ""}`} // <<< Changes here: Use opacity-0 (Tailwind class)
      >
        {label}
      </label>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-[#2B303B]">
      <div className="w-[400px] bg-white border border-gray-200 p-10 rounded-2xl shadow-lg">

       
        <div className="flex justify-center mb-6 gap-6">
          <button
            onClick={() => { setMode("login"); setMessage(""); }}
            className={`text-lg font-bold pb-2 ${
              mode === "login"
                ? "text-[#007BFF] border-b-2 border-[#007BFF]"
                : "text-gray-500 hover:text-[#2B303B]"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => { setMode("signup"); setMessage(""); }}
            className={`text-lg font-bold pb-2 ${
              mode === "signup"
                ? "text-[#007BFF] border-b-2 border-[#007BFF]"
                : "text-gray-500 hover:text-[#2B303B]"
            }`}
          >
            Signup
          </button>
        </div>

        
        {renderInputField("Username", username, setUsername)}
        {renderInputField("Password", password, setPassword, "password")}

        
        {mode === "signup" && (
          <>
           
            {renderInputField("Confirm Password", confirmPassword, setConfirmPassword, "password")}

           
            {renderInputField("Department", department, setDepartment)}
            {renderInputField("Roll Number", rollNo, setRollNo)}
            {renderInputField("Phone Number", phone, setPhone)}
            {renderInputField("College Email", collegeEmail, setCollegeEmail, "email")}

           
            <div className="mb-4">
              <label className="text-gray-700">Upload ID Card</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setIdCard(e.target.files[0])}
                className="w-full mt-2 text-[#2B303B]"
              />
            </div>
          </>
        )}

        
        <button
          onClick={mode === "login" ? login : signup}
          disabled={loading}
          className="w-full p-3 mt-2 text-lg font-bold bg-[#007BFF] text-white rounded-xl hover:bg-[#0056b3] transition disabled:opacity-50"
        >
          {loading ? "Processing..." : (mode === "login" ? "Login" : "Signup")}
        </button>

        
        {message && (
          <p className={`text-center mt-4 font-medium ${messageType === "success" ? "text-green-400" : "text-red-400"}`}>{message}</p>
        )}
      </div>
    </div>
  );
}
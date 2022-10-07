import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from '../utils/firebase'
import "../Reset.css";
//Reset the user's password
function Reset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/Signup">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Reset;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./AuthService";

export function Login() {
    const [apiHealth, setApiHealth] = useState("OK");

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch("http://localhost:3333/api/health")
                .then((res) => (res.json()))
                .then((data) => setApiHealth(data.status))
                .catch((err) => setApiHealth("BAD"))
          }, 1000);
        return () => clearInterval(intervalId);
    }, [])

    const navigate = useNavigate();
    return (
        <div className="w-100 m-5 p-4 border shadow">
            <div className="d-flex flex-column text-center">
                <span className={`w-100 ${apiHealth==="OK" ? "text-success" : "text-danger" }`}>{apiHealth}</span>
                <h4 className="w-100">Sign in to your account</h4>
            </div>
            <div className="p-3">
                <form onSubmit={async (event: React.SyntheticEvent) => {
                    event.preventDefault();
                    const target = event.target as typeof event.target & {
                        username: { value: string }
                        password: { value: string }
                    };
                    await login(target.username.value, target.password.value)
                    navigate("/transactions")
                }}>
                    <input type="text" className="form-control mb-2" name="username" placeholder="Enter username" required/>
                    <input type="password" className="form-control mb-4" name="password" placeholder="Password" required/>
                    <div className="pe-3 ps-3">
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
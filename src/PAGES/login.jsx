import { useState } from "react";
import { Loader } from "./loading";
import { Navigate, useNavigate } from "react-router-dom";
import { loginApi } from "../API/loginApi";
import { useDispatch } from "react-redux";
export let Login = () => {
    let [logindetail, setlogindetail] = useState({ email: "", password: "" })
    let isAuthenticated = Boolean(localStorage.getItem("userdetails"))
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [loading, setloading] = useState(false)
    let datachange = (e) => {
        setlogindetail({ ...logindetail, [e.target.name]: e.target.value })
    }
    let loginsubmit = async (e) => {
        e.preventDefault()
        try {
            setloading(true)
            let data = await loginApi(logindetail)
            localStorage.setItem("token", data.token)
            localStorage.setItem("userdetails", JSON.stringify(data.userDetails))
            dispatch({ type: "LOGIN", payload: data.userDetails })
            navigate("/dashboard")
            setloading(false)
        } catch (e) {
            setloading(false)
            console.log(e.message)
            alert(e.message)
        }
    }
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    return (
        <>
            <div className="h-screen  flex items-center justify-center">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
                    <h2 className="text-3xl font-semibold text-center text-green-600">
                        Welcome Back
                    </h2>
                    <p className="text-center text-gray-600">Please log in to your account</p>

                    <form onSubmit={(e) => { loginsubmit(e, logindetail) }} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={logindetail.email}
                                onChange={datachange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={logindetail.password}
                                onChange={datachange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <button className="text-green-600 hover:text-green-700 font-semibold mb-5" onClick={() => { navigate("/forgetpassword") }}>
                            Forget Password
                        </button>
                        <p className="text-sm text-gray-500">
                            Don't have an account?{' '}
                            <button className="text-green-600 hover:text-green-700 font-semibold" onClick={() => { navigate("/register") }}>
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            {loading && <Loader />
            }
        </>
    )
}
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Loader } from "./loading"
import { registerApi } from "../API/loginApi"

export let Register = () => {
    let [registerdetail, setregisterdetails] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmpassword: "",
    })
    let isAuthenticated = Boolean(localStorage.getItem("userdetails"))
    let [loading, setloading] = useState(false)
    let navigate = useNavigate()
    let datachange = (e) => {
        setregisterdetails({ ...registerdetail, [e.target.name]: e.target.value })
    }
    let registersubmit = async (e) => {
        e.preventDefault()
        if (!registerdetail.name || !registerdetail.email || !registerdetail.phone || !registerdetail.password || !registerdetail.confirmpassword) {
            alert("Please fill all the fields");
            return;
        }
        if (registerdetail.password !== registerdetail.confirmpassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            delete registerdetail.confirmpassword;
            setloading(true);
            let data = await registerApi(registerdetail)
            alert(data.msg)
            setloading(false);
        } catch (e) {
            setloading(false)
            alert("Something Went Wrong, Please try again later");
            console.log("Error", e);
        }
        setregisterdetails({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmpassword: "",
        })
    }
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
                    <h2 className="text-3xl font-semibold text-center text-green-600">Create Your Account</h2>
                    <p className="text-center text-gray-600">Please fill in the details to register</p>

                    <form onSubmit={registersubmit} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={registerdetail.name}
                                onChange={datachange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={registerdetail.email}
                                onChange={datachange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={registerdetail.phone}
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
                                value={registerdetail.password}
                                required
                                onChange={datachange}
                                className="mt-datachange w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmpassword"
                                name="confirmpassword"
                                value={registerdetail.confirmpassword}
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
                                Register
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{' '}
                            <button className="text-green-600 hover:text-green-700 cursor-pointer font-semibold" onClick={() => { navigate("/") }}>
                                Log In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}
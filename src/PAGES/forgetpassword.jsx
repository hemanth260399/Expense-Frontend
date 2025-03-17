import { useState } from "react"
import { Loader } from "./loading"
import { Navigate, useNavigate } from "react-router-dom"
import { forgetPasswordApi } from "../API/loginApi"

export let Forgetpassword = () => {
    let [userdata, setuserdata] = useState({ email: "" })
    let [loading, setloading] = useState(false)
    let navigate = useNavigate()
    let isAuthenticated = Boolean(localStorage.getItem("userdetails"))
    let datachange = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value })
    }
    let emailsubmit = async (e) => {
        e.preventDefault()
        if (!userdata.email) {
            alert("Please enter a valid email")
            return
        }
        try {
            setloading(true)
            let data = await forgetPasswordApi(userdata)
            console.log(data)
            setloading(false)
        } catch (e) {
            setloading(false)
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
                        Forget Password
                    </h2>

                    <form onSubmit={emailsubmit} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userdata.email}
                                onChange={datachange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <button className="w-full text-white bg-green-600 p-3 rounded-lg hover:text-green-700 font-semibold">
                            Send Mail
                        </button>
                    </form>
                    <div className="text-center flex justify-evenly">
                        <button className="text-green-600 p-3 cursor-pointer underline  underline-offset-2 rounded-lg hover:text-green-700 hover:font-bold font-semibold" onClick={() => { navigate("/register") }}>
                            Sign Up
                        </button>
                        <button className="text-green-600 p-3 cursor-pointer underline underline-offset-2 rounded-lg hover:text-green-700 hover:font-bold font-semibold" onClick={() => { navigate("/") }}>
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}
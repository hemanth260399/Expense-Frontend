import { useState } from "react"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { Loader } from "./loading"
import { changepasswordapi } from "../API/loginApi.js"

export let Changepassword = () => {
    let isAuthenticated = Boolean(localStorage.getItem("userdetails"))
    let [password, setpassword] = useState({ password: "", newpassword: "" })
    let [loading, setloading] = useState(false)
    let navigate = useNavigate()
    let [params] = useSearchParams()
    let passwordchange = (e) => {
        setpassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }
    let emailsubmit = async (e) => {
        e.preventDefault()
        try {
            e.preventDefault();
            if (password.password !== password.newpassword) {
                alert("Passwords do not match");
                return;
            }
            try {
                setloading(true)
                let response = await changepasswordapi(params.get("token"), { password: password.password });
                setloading(false)
                alert(response.msg)
                navigate("/");
            } catch (e) {
                setloading(false)
                alert(e);
                console.log("Error", e);
                navigate("/");
            }

        }
        catch (e) {
            alert(e.msg)
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
                        Change Password
                    </h2>

                    <form onSubmit={emailsubmit} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password.password}
                                onChange={passwordchange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="newpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="newpassword"
                                id="newpassword"
                                name="newpassword"
                                value={password.newpassword}
                                onChange={passwordchange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <button className="w-full text-white bg-green-600 p-3 rounded-lg hover:text-green-700 font-semibold">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}
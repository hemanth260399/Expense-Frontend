import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { initalValueApi } from "../API/expenseTrackerApi"
import { useDispatch, useSelector } from "react-redux"

export let NavMenu = () => {
    let navigate = useNavigate()
    let userdata = useSelector((state) => state.reduxReducer)
    let dispatch = useDispatch()
    let ThisMonth = new Date().toLocaleDateString("default", { month: "long" })
    useEffect(() => {
        let getInitial = async () => {
            let currentDate = new Date().toLocaleDateString("default", { month: "2-digit", year: "numeric" }).split("/").reverse().join("-")
            let response = await initalValueApi({ userDetails: userdata.userDetails, date: currentDate })
            dispatch({ type: "SetData", payload: response.data })
        }
        getInitial()
    }, [])
    let logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userdetails")
        dispatch({ type: "LOGIN", payload: null })
        navigate("/")
    }
    return (
        <>
            <div className="bg-green-400 max-w-xl mx-auto p-1 relative">
                <div className="text-center justify-end flex" onClick={logout}>
                    <button className="text-green-600 bg-white rounded-lg p-2 transform transition-all duration-300 hover:text-white hover:bg-green-500 font-semibold" onClick={() => { navigate("/logout") }}>
                        Logout
                    </button>
                </div>
                <div className="max-w-xl mx-auto p-1">
                    <h1 className="text-3xl font-semibold text-center text-white mb-6">Income & Expense Tracker</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <p className="text-xl font-semibold text-gray-700">{ThisMonth} Balance</p>
                            <p className="text-2xl font-bold " style={{ color: userdata.ExpenseData.All < 0 ? "red" : "green" }}>Rs.{userdata.ExpenseData.All}</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <p className="text-xl font-bold text-gray-700">{ThisMonth} Income</p>
                            <p className="text-2xl font-bold text-green-600">Rs.{userdata.ExpenseData.income > 0 ? userdata.ExpenseData.income : 0}</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <p className="text-xl font-bold text-gray-700">{ThisMonth} Expense</p>
                            <p className="text-2xl font-bold text-red-500">Rs.{userdata.ExpenseData.expense > 0 ? userdata.ExpenseData.expense : 0}</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-xl mx-auto flex flex-wrap mb-5 justify-evenly">
                    <button
                        className="bg-gradient-to-r from-blue-500  to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        onClick={() => { navigate("/dashboard") }}
                    >
                        Dashboard
                    </button>
                    <button className="bg-gradient-to-r p-10 from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        onClick={() => { navigate("/inandout") }}>
                        +
                    </button>
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        onClick={() => { navigate("/alltransaction") }}>
                        All Transaction
                    </button>
                </div>

            </div>
            <Outlet />
        </>
    )
}
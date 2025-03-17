import { useState } from "react"
import { expenseInOutApi, initalValueApi } from "../API/expenseTrackerApi"
import { useDispatch, useSelector } from "react-redux"
export let ExpenseInOut = () => {
    let userdata = useSelector((state) => state.reduxReducer)
    let dispatch = useDispatch()
    let [newData, setnewData] = useState({
        "type": "",
        "category": "",
        "description": "",
        "amount": "",
        "date": ""
    })
    let handleChange = (e) => {
        setnewData({ ...newData, [e.target.name]: e.target.value })
    }
    let handleSubmit = async (e, data) => {
        e.preventDefault()
        if (!data.type || !data.category || !data.amount || !data.date) {
            alert("All fields are required")
        } else {
            try {
                let response = await expenseInOutApi({ data: newData, userDetails: userdata.userDetails })
                let currentDate = new Date().toLocaleDateString("default", { month: "2-digit", year: "numeric" }).split("/").reverse().join("-")
                let getInitialResponse = await initalValueApi({ userDetails: userdata.userDetails, date: currentDate })
                dispatch({ type: "SetData", payload: getInitialResponse.data })
                setnewData({
                    type: "",
                    category: "",
                    description: "",
                    amount: "",
                    date: ""
                })
            } catch (e) {
                alert(e.message)
            }
        }
    }
    return (
        <>
            <div className="bg-white max-w-xl h-98 mx-auto p-6 ">
                <div className="shadow-md rounded-lg p-6 mb-6 ">
                    <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
                    <div className="grid grid-cols-3 gap-4 mb-4 ">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                name="type"
                                value={newData.type}
                                className="w-full p-2 border rounded-md"
                                onChange={handleChange}
                            >
                                <option value="">Select Type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        {newData.type === "expense" ? < div >
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                value={newData.category}
                                className="w-full p-2 border rounded-md"
                                onChange={handleChange}
                            >
                                <option value="">Select Type</option>
                                <option value="Grocery"><img width="10" height="10" src="https://img.icons8.com/color/50/ingredients.png" alt="ingredients" />Grocery</option>
                                <option value="Movie">Movie</option>
                                <option value="Rent">Rent</option>
                                <option value="Subscription">Subscription</option>
                                <option value="Outing">Outing</option>
                                <option value="Others">Others</option>
                            </select>
                        </div> : < div >
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                value={newData.category}
                                className="w-full p-2 border rounded-md"
                                onChange={handleChange}
                            >
                                <option value="">Select Type</option>
                                <option value="Salary">Salary</option>
                                <option value="Savings">Savings</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                name="date"
                                max={new Date().toISOString().split("T")[0]}
                                value={newData.date}
                                onChange={handleChange}
                                placeholder="Enter description"
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>

                    <div className="mb-4" style={{ display: newData.category !== "Others" ? "none" : "block" }}>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={newData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={newData.amount}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    <button
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                        onClick={(e) => { handleSubmit(e, newData) }}
                    >
                        Add Transaction
                    </button>
                </div>

                {/* Transactions List */}
            </div >
        </>
    )
}
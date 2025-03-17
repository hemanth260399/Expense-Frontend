import { useEffect, useState } from "react"
import { alltransactionApi, deleteApi, filtertransactionApi, initalValueApi } from "../API/expenseTrackerApi.js"
import { useDispatch, useSelector } from "react-redux"
import * as XLSX from 'xlsx';
export let AllTransaction = () => {
    let userData = useSelector((state) => state.reduxReducer)
    let dispatch = useDispatch()
    let [filter, setfilter] = useState({
        type: "All",
        startDate: "",
        endDate: new Date().toISOString().split("T")[0],
    })
    let [total, settotal] = useState({})
    let handleChange = (e) => {
        setfilter({ ...filter, [e.target.name]: e.target.value })
    }
    let [trans, settrans] = useState([])
    useEffect(() => {
        let getData = async () => {
            try {
                let response = await alltransactionApi(userData.userDetails)
                let sortedData = response.data.trackerData.sort((a, b) => new Date(a.date) - new Date(b.date))
                let totalData = sortedData.reduce((acc, pre) => {
                    pre.type === "income" ? acc.income += pre.amount : acc.expense += pre.amount
                    return acc
                }, { All: 0, income: 0, expense: 0 })
                totalData.All = totalData.income - totalData.expense
                settotal(totalData)
                settrans(sortedData)
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [])
    let handleSubmit = async () => {
        if (!filter.startDate) {
            alert("Please select a start date")
            return
        }
        try {
            let response = await filtertransactionApi({ userDetails: userData.userDetails, data: filter })
            let sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date))
            let totalData = sortedData.reduce((acc, pre) => {
                pre.type === "income" ? acc.income += pre.amount : acc.expense += pre.amount
                return acc
            }, { All: 0, income: 0, expense: 0 })
            totalData.All = totalData.income - totalData.expense
            settotal(totalData)
            settrans(response.data)
            setfilter({
                type: "All",
                startDate: "",
                endDate: new Date().toISOString().split("T")[0],
            })
        } catch (err) {
            console.log(err)
        }
    }
    let handleDelete = async (id) => {
        try {
            let response = await deleteApi({ id: id, userDetailsId: userData.userDetails.id })
            settrans(response.data.trackerData)
            let currentDate = new Date().toLocaleDateString("default", { month: "2-digit", year: "numeric" }).split("/").reverse().join("-")
            let newresponse = await initalValueApi({ userDetails: userData.userDetails, date: currentDate })
            dispatch({ type: "SetData", payload: newresponse.data })
        } catch (err) {
            console.log(err)
        }
    }
    let handleDownload = () => {
        trans.forEach((d) => delete d._id)
        let ws = XLSX.utils.json_to_sheet(trans)
        let wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Transaction")
        XLSX.writeFile(wb, "Transactions.xlsx")
    }
    return (
        <>
            <div className="bg-white max-w-xl mx-auto">
                <div className="p-6">
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        name="type"
                        className="w-full p-2 border rounded-md"
                        onChange={handleChange}
                        value={filter.type}
                    >
                        <option value="All">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    <div className=" mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={filter.startDate}
                                onChange={handleChange}
                                max={new Date().toISOString().split("T")[0]}
                                placeholder="Start Date"
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                onChange={handleChange}
                                value={filter.endDate}
                                max={new Date().toISOString().split("T")[0]}
                                min={filter.startDate}
                                placeholder="End Date"
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        onClick={handleSubmit}
                    >
                        Apply Filter
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg " style={{ maxHeight: "20em", overflowY: "scroll" }}>
                    <div className="flex justify-center relative">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600 text-center">Transactions</h2>
                        <img width="40" height="40" className="absolute right-10 cursor-pointer " onClick={handleDownload} src="https://img.icons8.com/arcade/64/save.png" alt="save--v1" />
                    </div>
                    <table className="w-full table-auto text-center w-200 overflow-y-scroll overscroll-contain">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Type</th>
                                <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Date</th>
                                <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Reason</th>
                                <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Amount</th>
                                <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Delete</th>
                            </tr>
                        </thead>
                        <tbody >
                            {trans.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center text-gray-500 py-4">No transactions added yet.</td>
                                </tr>
                            ) : (
                                trans.map((item) => (
                                    < tr key={item._id} className="hover:bg-gray-100 overflow-scroll" >
                                        <td className={`py-2 px-4 ${item.type === "income" ? "text-green-600" : "text-red-500"}`}>
                                            {item.type === "income" ? "+" : "-"}
                                        </td>
                                        <td className="py-2 px-4 text-sm text-gray-600">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 text-sm text-gray-600">{item.category}{item.description && ` (${item.description})`}</td>
                                        <td className={`py-2 px-4 text-sm font-semibold ${item.type === "income" ? "text-green-600" : "text-red-500"}`}>
                                            Rs.{item.amount.toFixed(2)}
                                        </td>
                                        <td className="py-2 px-4 text-sm">
                                            <button
                                                className="px-3 py-1 font-semibold text-sm rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-teal-500 hover:to-blue-500"
                                                onClick={() => { handleDelete(item._id) }}
                                            >
                                                <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="delete-forever" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-around mt-4 border-t-1 border-b-1 ">
                    <div className="flex flex-col bg-white text-green-500 shadow-md text-center rounded-lg p-2">
                        <p>Total Cash In</p>
                        <p>Rs. {total.income}</p>
                    </div>
                    <div className="flex flex-col bg-white text-center text-red-500 shadow-md rounded-lg p-2">
                        <p>Total Cash Out</p>
                        <p>Rs. {total.expense}</p>
                    </div>
                    <div className="flex flex-col bg-white text-center shadow-md rounded-lg p-2">
                        <p>Total Cash in Hand</p>
                        <p>Rs. {total.All}</p>
                    </div>
                </div>
            </div >
        </>
    )
}
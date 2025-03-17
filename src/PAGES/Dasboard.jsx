import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { dashboardApi } from "../API/expenseTrackerApi"
import { useSelector } from "react-redux"

export let Dashboard = () => {
    let userdata = useSelector((state) => state.reduxReducer)
    let [expense, setexpense] = useState([])
    let [monthExpense, setmonthExpense] = useState([])
    let [monthIncome, setmonthIncome] = useState([])
    let [overAll, setoverAll] = useState([])
    let [overAllIncome, setoverAllIncome] = useState([])
    useEffect(() => {
        let getDashData = async () => {
            let res = await dashboardApi(userdata.userDetails)
            const convertedData = Object.keys(res.data).map(key => ({
                name: key,
                value: res.data[key]
            }));
            const convertedIncomeData = Object.keys(res.
                allDataIncome
            ).map(key => ({
                name: key,
                value: res.allDataIncome[key]
            }
            ));
            let formatExpense = Object.entries(res.MonthExpense).map(([name, value]) => ({
                name,
                value
            })).sort((a, b) => new Date(a.name) - new Date(b.name));
            formatExpense.sort((a, b) => new Date(a.name) - new Date(b.name))
            let formatIncome = Object.entries(res.MonthIncome).map(([name, value]) => ({
                name,
                value
            })).sort((a, b) => new Date(a.name) - new Date(b.name));
            setexpense(convertedData)
            setmonthExpense(formatExpense)
            setmonthIncome(formatIncome)
            setoverAll(res.overAll)
            setoverAllIncome(convertedIncomeData)
        }
        getDashData()
    }, [])
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#F44236', '#FFFFf'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <>
            <div className="text-center bg-white max-w-xl mx-auto">
                <div className="max-w-xl mx-auto p-1 ">
                    <h2 className="text-center text-blue-600  pt-6" >Overall Income/Expense Data</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                        <div className="bg-violet-700 text-white shadow-md rounded-lg p-6">
                            <h5 className="text-md font-semibold">Balance</h5>
                            <p className="text-2xl font-bold " style={{ color: overAll.All < 0 ? "red" : "White" }}>Rs.{overAll.All}</p>
                        </div>
                        <div className="bg-violet-700 text-white shadow-md rounded-lg p-6">
                            <h5 className="text-md font-semibold ">Income</h5>
                            <p className="text-2xl font-bold ">Rs. {overAll.income}</p>
                        </div>
                        <div className="bg-violet-700 text-white shadow-md rounded-lg p-6">
                            <h5 className="text-md font-semibold "> Expense</h5>
                            <p className="text-2xl font-bold ">Rs. {overAll.expense}</p>
                        </div>
                    </div>
                </div>
                <h2 className="text-center text-blue-600 text-2xl pt-6" style={{ fontWeight: "bolder", fontSize: 50, fontFamily: "Serif" }}>Expense Bar Graph</h2>
                <ResponsiveContainer width="100%" height={300} className="mt-8">
                    <BarChart data={monthExpense}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <p>Hello</p>
                        <Bar dataKey="value" fill="#FF6347" />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-center text-blue-600 mt-6" style={{ fontWeight: "bolder", fontSize: 50, fontFamily: "Serif" }}>Income Bar Graph</h1>
                <ResponsiveContainer width="100%" height={300} className="mt-8">
                    <BarChart data={monthIncome}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <p>Hello</p>
                        <Bar dataKey="value" fill="#4CAF50" />
                    </BarChart>
                </ResponsiveContainer>
                <h1 className="text-center text-blue-600 mt-6" style={{ fontWeight: "bolder", fontSize: 50, fontFamily: "Serif" }}>Expense Pie Chart</h1>
                <div className="flex justify-center">
                    <PieChart width={400} height={350}>
                        <Pie
                            data={expense}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {expense.length > 0 && expense.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
                <h1 className="text-center text-blue-600 mt-6" style={{ fontWeight: "bolder", fontSize: 50, fontFamily: "Serif" }}>Income Pie Chart</h1>
                <div className="flex justify-center">
                    <PieChart width={400} height={350}>
                        <Pie
                            data={overAllIncome}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {overAllIncome.length > 0 && overAllIncome.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
        </>
    )
}
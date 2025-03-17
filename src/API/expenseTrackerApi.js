import axios from "axios"
let url = import.meta.env.VITE_BE_URL
export let expenseInOutApi = async (data) => {
    try {
        let response = await axios.post(`${url}/inout`, data)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let alltransactionApi = async (data) => {
    try {
        let response = await axios.post(`${url}/gettransaction`, data)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let filtertransactionApi = async (data) => {
    try {
        console.log("filter")
        let response = await axios.post(`${url}/filtertransaction`, data)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let initalValueApi = async (data) => {
    try {
        let response = await axios.post(`${url}/initalvalues`, data)
        return response.data
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let dashboardApi = async (data) => {
    try {
        let response = await axios.post(`${url}/dashboard`, data)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let deleteApi = async (data) => {
    try {
        let response = await axios.post(`${url}/delete`, data)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
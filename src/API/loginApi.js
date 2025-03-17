import axios from "axios";
let url = import.meta.env.VITE_BE_URL
export let registerApi = async (data) => {
    try {
        let response = await axios.post(`${url}/register`, data)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let verifyuseremail = async (token) => {
    try {
        let response = await axios.post(`${url}/register-verify-email?token=${token}`)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let loginApi = async (data) => {
    try {
        let response = await axios.post(`${url}/login`, data)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let forgetPasswordApi = async (data) => {
    try {
        let response = await axios.post(`${url}/forgetpassword`, data)
        return response.data
    }
    catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let changepasswordapi = async (token, data) => {
    try {
        console.log(data)
        let response = await axios.post(`${url}/changepassword?token=${token}`, data)
        return response.data
    }
    catch (e) {
        throw new Error(e.response.data.msg)
    }
}
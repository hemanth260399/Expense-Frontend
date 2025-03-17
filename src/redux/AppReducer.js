let userInfo = JSON.parse(localStorage.getItem("userdetails"))
let Authstate = Boolean(userInfo)
let initialState = {
    userDetails: userInfo,
    authenticated: Authstate,
    ExpenseData: { All: 0, income: 0, expense: 0 }
}
export let reduxReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, userDetails: action.payload, authenticated: true }
        case "LOGOUT":
            return { ...state, userDetails: null, authenticated: false }
        case "SetData":
            return { ...state, ExpenseData: action.payload }
        default:
            return state
    }
}
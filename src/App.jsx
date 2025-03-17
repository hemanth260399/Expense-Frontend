import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ExpenseInOut } from './PAGES/expenseAdding'
import { NavMenu } from './PAGES/navMenu'
import { AllTransaction } from './PAGES/AllTransaction'
import { Login } from './PAGES/login'
import { Register } from './PAGES/register'
import { Forgetpassword } from './PAGES/forgetpassword'
import { Emailverifyregister } from './PAGES/verify-email'
import { Changepassword } from './PAGES/changepassword'
import { store } from './redux/AppContext.js'
import { Provider } from 'react-redux'
import { Dashboard } from './PAGES/Dasboard.jsx'

function App() {
  let PrivateRouter = ({ component }) => {
    let auth = Boolean(localStorage.getItem("userdetails"))
    if (auth) {
      console.log(auth)
      return component
    } else {
      return <Navigate to="/" />
    }
  }
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<NavMenu />}>
              <Route path="/inandout" element={<PrivateRouter component={<ExpenseInOut />} />} />
              <Route path="/alltransaction" element={<PrivateRouter component={<AllTransaction />} />} />
              <Route path="/dashboard" element={<PrivateRouter component={<Dashboard />} />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />
            <Route path="/register-verify-email" element={<Emailverifyregister />} />
            <Route path="/changepassword" element={<Changepassword />} />
            <Route path="*" element={<h1>404 NOT FOUND</h1>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App

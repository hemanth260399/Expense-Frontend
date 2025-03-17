/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { Loader } from "./loading";
import { verifyuseremail } from "../API/loginApi";

export let Emailverifyregister = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    let [loading, setloading] = useState(false)
    const verifyAccount = async () => {
        try {
            const response = await verifyuseremail(params.get("token"));
            setloading(false)
            alert(response.msg);
            navigate("/");
        }
        catch (e) {
            alert(e)
        }
    };
    useEffect(() => {
        setloading(true);
        verifyAccount();
    }, []);
    if (loading) {
        <Loader />
    }
    return (
        <>
            <h1>User Login Page</h1><br />
            <div className="d-flex justify-content-center">
                <h2>Email verifed succesfully</h2>
            </div>
            {loading && <Loader />}
        </>
    )
}
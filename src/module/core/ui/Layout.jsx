import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../../../stores";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export function Layout() {
    // const { Authenticated } = useUserStore();
    const Authenticated = true
    const navigate = useNavigate();

    useEffect(() => {
        if (!Authenticated) {
            navigate('/sign-in', { replace: true });
        }
    }, [Authenticated, navigate]);

    return (
        <>
            <Navbar />
            <Outlet />
            {Authenticated && <Footer />}
        </>
    )
}
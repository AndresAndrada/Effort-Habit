import { FaHome } from "react-icons/fa";
import { RiProfileLine } from "react-icons/ri";
import { GiStrong } from "react-icons/gi";
import { RiEqualizerFill } from "react-icons/ri";

export const siderBarAdmin = [
    { title: "Inicio", label: "main", icons: <FaHome size={"1rem"} /> },
    { title: "Perfil", label: "profile", icons: <RiProfileLine /> },
    { title: "Entrenamientos", label: "exercise", icons: <GiStrong /> },
    { title: "Panel de control", label: "dashboard", icons: <RiEqualizerFill /> }
];

export const siderBarUser = [
    { title: "Inicio", label: "main", icons: <FaHome /> },
    { title: "Perfil", label: "profile", icons: <RiProfileLine /> },
    { title: "Entrenamientos", label: "exercise", icons: <GiStrong /> },
];

export const closeDrawer = (option, navigate, setOptionLocation) => {
    switch (option) {
        case "main":
            navigate("/");
            setOptionLocation("main");
            break;
        case "profile":
            navigate("/profile");
            setOptionLocation("profile");
            break;
        case "exercise":
            navigate("/exercise");
            setOptionLocation("exercise");
            break;
        case "dashboard":
            navigate("/dashBoard");
            setOptionLocation("dashboard");
            break;
        case "user":
            navigate("/users");
            setOptionLocation("user");
            break;
        default:
            break;
    }
    document.getElementById('my-drawer').checked = false;
};
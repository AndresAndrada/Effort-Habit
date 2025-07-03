import img from "../assets/svg/login.svg";

export const dashBoard = [{
    id: "1",
    title: "Usuario",
    label: "user",
    subTitle: "Todos los usuarios",
    description: "Crear, eliminar y editar usuarios",
    img,
}, {

    id: "2",
    title: "Exercise",
    label: "exercise",
    subTitle: "Todos los ejercicios",
    description: "Crear, eliminar y editar ejercicios",
    img,
}, {

    id: "3",
    title: "Panel de control",
    label: "dashboard",
    subTitle: "Todos los usuarios",
    description: "Usuarios, ejercicios y estadísticas",
    img,
}];

export const navigateToSection = (option, navigate, setOptionLocation) => {
    switch (option) {
        case "main":
            setTimeout(() => navigate("/"), 0);
            break;
        case "profile":
            setTimeout(() => navigate("/profile"), 0);
            break;
        case "exercise":
            setTimeout(() => navigate("/exercise"), 0);
            break;
        case "dashboard":
            setTimeout(() => navigate("/dashBoard"), 0);
            setOptionLocation && setOptionLocation("dashboard");
            break;
        case "user":
            setTimeout(() => navigate("/users"), 0);
            break;
        default:
            break;
    }
};
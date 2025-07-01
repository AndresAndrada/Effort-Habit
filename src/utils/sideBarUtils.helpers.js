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
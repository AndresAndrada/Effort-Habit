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
            navigate("/dashBoard");
            setOptionLocation("exercise");
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
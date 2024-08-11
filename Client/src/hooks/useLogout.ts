import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogout = (
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.create({
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                },
            }).get("/api/auth/logout");

            localStorage.setItem("accessToken", "");
            localStorage.setItem("refreshToken", "");
            localStorage.setItem("connectedUserId", "");
            navigate("/login");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status !== 500) {
                    localStorage.setItem("accessToken", "");
                    localStorage.setItem("refreshToken", "");
                    localStorage.setItem("connectedUserId", "");
                    navigate("/login");
                } else {
                    setError("An unknown error occurred, please try again later");
                }
            }
        }
    };

    return { handleLogout }
};

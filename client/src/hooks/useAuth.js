import { useSelector } from "react-redux";

export const useAuth = () => {

    const {user} = useSelector((state) => state.auth);

    const isAuthenticated = !!user;
    
    return {isAuthenticated: isAuthenticated, user: user};
}
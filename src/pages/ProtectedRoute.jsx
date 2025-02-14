import {useAuth} from "../context/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function ProtectedRoute({children}) {
  const {isAuthenticated} = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/", {replace: true})
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
}

export default ProtectedRoute
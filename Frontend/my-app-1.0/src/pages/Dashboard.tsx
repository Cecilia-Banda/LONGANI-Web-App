import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role) {
      switch (user.role) {
        case "admin":
          navigate("/dashboard/admin");
          break;
        case "doctor":
          navigate("/dashboard/doctor");
          break;
        case "nurse":
          navigate("/dashboard/nurse");
          break;
        case "Record Officer":
          navigate("/dashboard/Record Officer");
          break;
        default:
          navigate("/dashboard");
          break;
      }
    }
  }, [user, navigate]);

  return null;
};

export default Dashboard;

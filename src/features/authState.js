import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchUserData } from "../utils/utils";

export const RequireAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { status, message } = await fetchUserData("/isLogin");
      if (status === 403) {
        return navigate("/login");
      }
      if (status === 500) {
        return navigate("/error", {
          state: { status: status, message: message },
        });
      }
    })();
  }, []);

  return <>{children}</>;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

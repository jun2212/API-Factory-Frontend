import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { backEndFetchDataUtil } from "../utils/utils";

export const RequireAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { status, message } = await backEndFetchDataUtil(
        "/isLoggedIn",
        "POST",
      );

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

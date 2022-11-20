export const fetchUserData = async (path, bodyParams = {}) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify(bodyParams),
  });

  const status = response.status;
  const message = await response.json();

  return { status: status, message: message };
};

export const getFunctions = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}${"/functionData"}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  return await response.json();
};

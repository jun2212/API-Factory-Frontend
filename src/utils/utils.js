export const fetchUserData = async (path, userId, password) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify({
      userId: userId,
      password: password,
    }),
  });

  const status = response.status;
  const message = await response.json();

  return { status: status, message: message };
};

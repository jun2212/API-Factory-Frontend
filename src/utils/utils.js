export const fetchDataUtil = async (path, method, bodyParams = {}) => {
  const params = {
    url: `${process.env.REACT_APP_SERVER_URL}${path}`,
    data: {
      method: method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
    },
  };

  if (method === "POST" || method === "PUT") {
    params.data.body = JSON.stringify(bodyParams);
  }

  const response = await fetch(params.url, params.data);

  const status = response.status;
  const message = await response.json();

  return { status: status, message: message };
};

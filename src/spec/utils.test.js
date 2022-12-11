import { fetchDataUtil } from "../utils/utils";

describe("utils.fetchDataUtil", () => {
  beforeEach(() => {
    const response = Promise.resolve({
      status: "mockStatus",
      json: () => Promise.resolve("mockMessage"),
    });

    global.fetch = jest.fn(() => response);
  });

  const path = "mockPath";
  const bodyParams = { userId: "mockUserId", password: "mockPassword" };

  describe("GET", () => {
    it("method가 GET 인 경우 알맞은 url과 파라미터를 가지고 fetch 함수를 호출한 뒤 response를 받는다.(body 적용 X)", async () => {
      const method = "GET";

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

      const { status, message } = await fetchDataUtil(path, method, bodyParams);

      expect(global.fetch).toBeCalledWith(params.url, params.data);
      expect(status).toBe("mockStatus");
      expect(message).toBe("mockMessage");
    });

    it("method가 DELETE 인 경우 알맞은 url과 파라미터를 가지고 fetch 함수를 호출한 뒤 response를 받는다.(body 적용 X)", async () => {
      const method = "DELETE";

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

      const { status, message } = await fetchDataUtil(path, method, bodyParams);

      expect(global.fetch).toBeCalledWith(params.url, params.data);
      expect(status).toBe("mockStatus");
      expect(message).toBe("mockMessage");
    });

    it("method가 POST 인 경우 알맞은 url과 파라미터를 가지고 fetch 함수를 호출한 뒤 response를 받는다.(body 적용)", async () => {
      const method = "POST";

      const params = {
        url: `${process.env.REACT_APP_SERVER_URL}${path}`,
        data: {
          method: method,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(bodyParams),
          credentials: "include",
        },
      };

      const { status, message } = await fetchDataUtil(path, method, bodyParams);

      expect(global.fetch).toBeCalledWith(params.url, params.data);
      expect(status).toBe("mockStatus");
      expect(message).toBe("mockMessage");
    });

    it("method가 PUT 인 경우 알맞은 url과 파라미터를 가지고 fetch 함수를 호출한 뒤 response를 받는다.(body 적용)", async () => {
      const method = "PUT";

      const params = {
        url: `${process.env.REACT_APP_SERVER_URL}${path}`,
        data: {
          method: method,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(bodyParams),
          credentials: "include",
        },
      };

      const { status, message } = await fetchDataUtil(path, method, bodyParams);

      expect(global.fetch).toBeCalledWith(params.url, params.data);
      expect(status).toBe("mockStatus");
      expect(message).toBe("mockMessage");
    });
  });
});

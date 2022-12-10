const requestInitialApi = async (route, header) => {
  try {
    const response = await fetch(route, {
      method: "GET",
      headers: {
        Authorization: header,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { error: error.json() };
  }
};

const requestAnApi = async (apiRoute, method, body) => {
  try {
    const response = await fetch(apiRoute, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    return { error: error.json() };
  }
};

export { requestInitialApi, requestAnApi };

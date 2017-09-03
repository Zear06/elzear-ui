function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

class Quest {
  constructor(token = null) {
    this.token = token;
  }

  setToken(token) {
    this.token = token;
  }

  get(url) {
    return this.query('get', url);
  }

  post(url, body) {
    return this.query('post', url, body);
  }

  query(method, url, body) {
    const headers = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return fetch(url, {
      method,
      headers: {
        ...headers,
        // 'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body)
    })
      .then(handleErrors);
  }
}

export default Quest;

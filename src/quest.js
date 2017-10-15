function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

class Quest {
  token: ?string;

  constructor(token : ?string = null) {
    this.token = token;
  }

  get(url: string) {
    return this.query('get', url);
  }

  post(url: string, body: {[string]: any}) {
    return this.query('post', url, body);
  }

  query(method: string, url: string, body: ?{[string]: any}): Promise<*> {
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

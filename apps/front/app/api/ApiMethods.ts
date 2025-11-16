
const getHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token ? { 'Authorization': `Bearer ${token}` } : {})
})

type ApiRequestOptions = {
  body?: any;
  params?: RequestInit,
  cookie?: string,
  token?: string,
}

class ApiMethods {
  static apiRequest(method: string, url: string, {body, params, cookie, token}: ApiRequestOptions = {}) {
    url = process.env.NEXT_PUBLIC_API_ENDPOINT + url;

    const requestParams : RequestInit = {
      method,
      headers: {
        ...getHeaders(token),
        ...(cookie ? { cookie } : {})
      },
      credentials: 'include',
      ...(body ? { body: JSON.stringify(body) } : {}),
      ...(params ? params : {}),
    };

    return new Promise((resolve, reject) => {
      fetch(url, requestParams)
        .then(res => {
          if (!res.ok) return null
          return res.json()
        })
        .then(resolve)
        .catch(reject)
    })
  }

  static get(url: string, {params, cookie, token}: ApiRequestOptions = {}) {
    return this.apiRequest('GET', url, {params, cookie, token})
  }

  static post(url: string, {body, params, cookie, token}: ApiRequestOptions = {}) {
    return this.apiRequest('POST', url, {body, params, cookie, token})
  }

  static put(url: string, {body, params, cookie, token}: ApiRequestOptions = {}) {
    return this.apiRequest('PUT', url, {body, params, cookie, token})
  }

  static patch(url: string, {body, params, cookie, token}: ApiRequestOptions = {}) {
    return this.apiRequest('PATCH', url, {body, params, cookie, token})
  }

  static delete(url: string, {params, cookie, token}: ApiRequestOptions = {}) {
    return this.apiRequest('DELETE', url, {params, cookie, token})
  }
}

export default ApiMethods;
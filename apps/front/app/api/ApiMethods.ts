
const getHeaders = () => ({
  'Content-Type': 'application/json',
})

type ApiRequestOptions = {
  body?: any;
  params?: RequestInit,
  cookie?: string,
}

class ApiMethods {
  static apiRequest(method: string, url: string, {body, params, cookie}: ApiRequestOptions = {}) {
    url = process.env.NEXT_PUBLIC_API_ENDPOINT + url;

    const requestParams : RequestInit = {
      method,
      headers: {
        ...getHeaders(),
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

  static get(url: string, {params, cookie}: ApiRequestOptions = {}) {
    return this.apiRequest('GET', url, {params, cookie})
  }

  static post(url: string, {body, params, cookie}: ApiRequestOptions = {}) {
    return this.apiRequest('POST', url, {body, params, cookie})
  }

  static put(url: string, {body, params, cookie}: ApiRequestOptions = {}) {
    return this.apiRequest('PUT', url, {body, params, cookie})
  }

  static patch(url: string, {body, params, cookie}: ApiRequestOptions = {}) {
    return this.apiRequest('PATCH', url, {body, params, cookie})
  }

  static delete(url: string, {params, cookie}: ApiRequestOptions = {}) {
    return this.apiRequest('DELETE', url, {params, cookie})
  }
}

export default ApiMethods;
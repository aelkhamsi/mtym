
const getHeaders = () => ({
  'Content-Type': 'application/json',
})

class ApiMethods {
  static apiRequest(method: string, url: string, body={}, params={}) {
    url = process.env.NEXT_PUBLIC_API_ENDPOINT + url;
    const requestParams : RequestInit = {
      method,
      headers: getHeaders(),
      credentials: 'include',
      ...params,
      ...(body && { body: JSON.stringify(body) }),
    };

    return new Promise((resolve, reject) => {
      fetch(url, requestParams)
        .then(res => res.json())
        .then(resolve)
        .catch(reject)
    })
  }

  static get(url: string, params?: any) {
    return this.apiRequest('GET', url, undefined, params)
  }

  static post(url: string, data?: any, params?: any) {
    return this.apiRequest('POST', url, data, params)
  }

  static put(url: string, data?: any, params?: any) {
    return this.apiRequest('PUT', url, data, params)
  }

  static patch(url: string, data: any, params?: any) {
    return this.apiRequest('PATCH', url, data, params)
  }

  static delete(url: string, params?: any) {
    return this.apiRequest('DELETE', url, undefined, params)
  }
}

export default ApiMethods;
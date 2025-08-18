import { getToken } from '@/lib/utils';

const getHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token ?? getToken()}`,
})

class ApiMethods {
  static apiRequest(method: string, url: string, body=null, token?: string) {
    url = process.env.NEXT_PUBLIC_API_ENDPOINT + url;
    const params = body
      ? {method, body: JSON.stringify(body), headers: getHeaders(token)}
      : {method, headers: getHeaders()}

    return new Promise((resolve, reject) => {
      fetch(url, params)
        .then(res => res.json())
        .then(resolve)
        .catch(reject)
    })
  }

  static get(url: string) {
    return this.apiRequest('GET', url)
  }

  static post(url: string, data: any) {
    return this.apiRequest('POST', url, data)
  }

  static put(url: string, data: any, token?: string) {
    return this.apiRequest('PUT', url, data, token)
  }

  static patch(url: string, data: any) {
    return this.apiRequest('PATCH', url, data)
  }

  static delete(url: string) {
    return this.apiRequest('DELETE', url)
  }
}

export default ApiMethods;
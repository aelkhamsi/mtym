/**
 * Both the candidate and admin sessions live on `.mathmaroc.org`, so the
 * browser sends both cookie pairs to the API. This header tells the API to read
 * the admin pair — every request out of this dashboard must carry it.
 */
export const AUTH_CONTEXT_HEADERS = { 'x-auth-context': 'admin' }

const getHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...AUTH_CONTEXT_HEADERS,
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
          if (!res.ok) return res.json().then(data => ({ ...data, statusCode: res.status })).catch(() => null)
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
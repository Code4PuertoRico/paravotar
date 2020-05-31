import { baseUrl, PUBLIC_S3_BUCKET } from "./constants"

interface HttpResponse<T> extends Response {
  parsedBody?: T
}

interface QueryParams {
  [key: string]: string | number
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request)
  response.parsedBody = await (response.text ? response.json() : null)

  if (!response.ok) {
    throw new Error("Bad response from server")
  }

  return response
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: "get" }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args))
}

export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "post", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args))
}

const encodeQueryParams = (params: QueryParams) =>
  Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&")

export const createService = (baseUrl: string, options?: RequestInit) => ({
  get: <T>(path: string, queryParams?: QueryParams, args?: RequestInit) => {
    let url = `${baseUrl}${path}`

    if (queryParams) {
      url +=
        (url.indexOf("?") === -1 ? "?" : "&") + encodeQueryParams(queryParams)
    }

    const opts = { ...(options || {}), ...args }

    return get<T>(url, opts)
  },
  post: <T>(path: string, args?: RequestInit) =>
    post<T>(`${baseUrl}${path}`, args),
})

export const papeletaClient = createService(baseUrl)

export const s3Client = createService(PUBLIC_S3_BUCKET)

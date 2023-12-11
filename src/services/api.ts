import { API_URL } from "../packages/practica/services/constants"

interface RequestOptions {
  baseUrl?: string
}

interface ApiInterface {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T>
  post<T>(endpoint: string, params: any, options?: RequestOptions): Promise<T>
}

class FetchAdapter implements ApiInterface {
  private baseUrl

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async processResponse<T>(res: Response) {
    if (!res.ok) {
      throw Error("Network request failed.")
    }

    const data: T = await res.json()

    return data
  }

  private getBaseUrl(options?: RequestOptions) {
    if (options && options.baseUrl) {
      return options.baseUrl
    }

    return this.baseUrl
  }

  async get<T>(endpoint: string, options?: RequestOptions) {
    const baseUrl = this.getBaseUrl(options)
    const res = await fetch(`${baseUrl}${endpoint}`)
    const data = await this.processResponse<T>(res)

    return data
  }

  async post<T>(endpoint: string, params: any, options?: RequestOptions) {
    const baseUrl = this.getBaseUrl(options)
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(params),
    })
    const data = await this.processResponse<T>(res)

    return data
  }
}

class ApiService {
  private adapter

  constructor(adapter: ApiInterface) {
    this.adapter = adapter
  }

  async get<T>(endpoint: string, options?: RequestOptions) {
    const res = await this.adapter.get<T>(endpoint, options)

    return res
  }

  async post<T>(endpoint: string, params: any, options?: RequestOptions) {
    const res = await this.adapter.post<T>(endpoint, params, options)

    return res
  }
}

const adapter = new FetchAdapter(API_URL)

export default new ApiService(adapter)

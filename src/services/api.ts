import { API_URL } from "../packages/practica/services/constants"

interface ApiInterface {
  get<T>(endpoint: string): Promise<T>
  post<T>(endpoint: string, params: any): Promise<T>
}

class FetchAdapter implements ApiInterface {
  private baseUrl

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string) {
    const res = await fetch(`${this.baseUrl}${endpoint}`)

    if (!res.ok) {
      throw Error("Network request failed.")
    }

    const data: T = await res.json()

    return data
  }

  async post(endpoint: string, params: any) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(params),
    })

    if (!res.ok) {
      throw Error("Network request failed.")
    }

    const data = await res.json()

    return data
  }
}

class ApiService {
  private adapter

  constructor(adapter: ApiInterface) {
    this.adapter = adapter
  }

  async get<T>(endpoint: string) {
    const res = await this.adapter.get<T>(endpoint)

    return res
  }

  async post(endpoint: string, params: any) {
    const res = await this.adapter.post(endpoint, params)

    return res
  }
}

const adapter = new FetchAdapter(API_URL)

export default new ApiService(adapter)

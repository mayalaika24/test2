import Repository from './Repository';
import { AxiosResponse } from 'axios';

export default class CrudRepository<T = any> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get<Params = object, Res = AxiosResponse<T>>(
    params?: Params
  ): Promise<Res> {
    return Repository.get(this.endpoint, { params }).then(
      (response) => response.data
    );
  }

  async getById<Params = object, Res = AxiosResponse<T>>(
    url: string,
    params?: Params
  ): Promise<Res> {
    return Repository.get(url, { params }).then((response) => response.data);
  }
  async post<Payload = object, Res = AxiosResponse<T>>(
    url: string,
    payload?: Payload
  ): Promise<Res> {
    return Repository.post(url, payload).then((response) => response.data);
  }
  async put<Payload = object, Res = AxiosResponse<T>>(
    url: string,
    payload: Payload
  ): Promise<Res> {
    return Repository.put(url, payload).then((response) => response.data);
  }

  async patch<Payload = object, Res = AxiosResponse<T>>(
    url: string,
    payload: Payload
  ): Promise<Res> {
    return Repository.patch(url, payload).then((response) => response.data);
  }

  async delete<Res = AxiosResponse<T>>(url: string): Promise<Res> {
    return Repository.delete(url).then((response) => response.data);
  }
}

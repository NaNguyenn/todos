import apiClient from "./api-client";

interface Entity{
    id?: string,
    completed: boolean
}

class HttpService{
    endpoint: string

    constructor(endpoint: string){
        this.endpoint = endpoint
    }

    getAll<T>() {
        return apiClient.get<T[]>(this.endpoint);
    }

    delete<T extends Entity>(entity: T){
        return apiClient.delete(`${this.endpoint}/${entity.id}`);
    }

    add<T>(entity: T){
        return apiClient.post(this.endpoint, entity);
    }

    update<T extends Entity>(entity: T){
        return apiClient.put(`${this.endpoint}/${entity.id}`, {
            completed: !entity.completed,
          });
    }
}

const create = (endpoint: string) => new HttpService(endpoint)

export default create
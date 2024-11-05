import BaseService from "./base.service.ts";
import {IArticle} from "../interfaces";

export const apiGetArticles = async (): Promise<IArticle[]> => {
    return (await BaseService.get('/articles')).data;
}

export const apiGetArticle = async (id: number) => {
    return (await BaseService.get(`/articles/${id}`)).data;
};

export const apiCreateArticle = async (formData: object) => {
    return (await BaseService.post('/articles', formData)).data;
}

export const apiUpdateArticle = async (id: number, formData: object) => {
    return (await BaseService.put(`/articles/${id}`, formData)).data;
}

export const apiDeleteArticle = async (id: number) => {
    return (await BaseService.delete(`/articles/${id}`)).data;
}

import {createRouter, createWebHashHistory} from 'vue-router'
import IndexPage from "./views/IndexPage.vue";
import CreateArticle from "./views/articles/CreateArticle.vue";
import UpdateArticle from "./views/articles/UpdateArticle.vue";
import ViewArticle from "./views/articles/ViewArticle.vue";


const routes = [
    {path: '/', component: IndexPage, name: 'index'},
    {path: '/create-article', component: CreateArticle, name: 'create-article'},
    {path: '/update-article/:id', component: UpdateArticle, name: 'update-article'},
    {path: '/view-article/:id', component: ViewArticle, name: 'view-article'},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

<script setup lang="ts">
import {onMounted} from "vue";
import {apiDeleteArticle, apiGetArticles} from "../services/articles.service.ts";
import {useArticlesStore} from "../stores/articles.store.ts";
import {useRouter} from "vue-router";

const articles = useArticlesStore();
const router = useRouter();
const deleteArticle = async (id: number) => {
  if (!confirm('This article will be deleted permanently. Continue?')) return;
  await apiDeleteArticle(id);
  alert('Article deleted successfully.');
  const index = articles.articles.findIndex(a => a.id === id);
  articles.articles.splice(index, 1);
}

const createArticle = async () => await router.push({name: 'create-article'})

onMounted(async () => {
  articles.articles = await apiGetArticles()
})
</script>

<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center">
      <h2>Articles</h2>
      <div>
        <button @click="createArticle">Create article</button>
      </div>
    </div>
    <hr/>
    <table border="1" width="100%" cellpadding="10" cellspacing="1">
      <thead>
      <tr>
        <th>SN</th>
        <th style="width:70%">Title</th>
        <th>Author</th>
        <th>Actions</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(article, i) in articles.articles" :key="article.id">
        <td>{{ i + 1 }}</td>
        <td>
          <router-link :to="{name: 'view-article', params: {id: article.id}}">
            {{ article.title }}
          </router-link>
        </td>
        <td>{{ article.author }}</td>
        <td>
          <button @click="router.push({name: 'update-article', params: {id: article.id}})">Edit</button>
          <button @click="deleteArticle(article.id)">Delete</button>
        </td>
      </tr>
      <tr v-if="!articles.articles.length">
        <td colspan="4">
          <div style="padding: 5px">No article found.</div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

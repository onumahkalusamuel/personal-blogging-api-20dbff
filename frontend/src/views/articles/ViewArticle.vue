<template>
  <div style="display: flex; justify-content: space-between; align-items: center">
    <h2>{{ article.title }}</h2>
    <div>
      <button @click="router.push({name: 'index'})">&leftarrow; back</button>
    </div>
  </div>
  <hr/>
  <table width="100%" border="1">
    <thead>
    <tr>
      <td width="50%">{{ article.author }}</td>
      <td>{{ article.createdAt }}</td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td colspan="4">
        <div style="padding: 15px" v-html="article.content"></div>
      </td>
    </tr>
    </tbody>
  </table>

  <div style="display: flex; width: 100%; justify-content: space-between; margin: 10px 0">
    <button @click="router.back()">&leftarrow; back</button>
    <button @click="router.push({name: 'update-article', params: {id: article.id}})">edit</button>
  </div>
</template>
<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {IArticle} from "../../interfaces";
import {apiGetArticle} from "../../services/articles.service.ts";

const router = useRouter();

const {id} = useRoute().params;
const article = ref({} as IArticle);

onMounted(async () => {
  article.value = await apiGetArticle(id as unknown as number);
})
</script>
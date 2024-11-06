<template>
  <div style="display: flex; justify-content: space-between; align-items: center; text-align: left">
    <h2>Update Article: {{ article.title }}</h2>
    <div>
      <button @click="router.push({name: 'index'})">&leftarrow; articles</button>
    </div>
  </div>
  <hr/>
  <form @submit.prevent="updateArticle">
    <table width="100%" border="1" cellpadding="10px">
      <tbody>
      <tr>
        <th>Title</th>
        <td>
          <input v-model="article.title" style="width: 90%; height: 25px" required/>
        </td>
      </tr>
      <tr>
        <th>Content</th>
        <td>
          <textarea v-model="article.content" style="width: 90%;" rows="15" required/>
        </td>
      </tr>
      <tr>
        <th>Author</th>
        <td>
          <input v-model="article.author" style="width: 90%; height: 25px" required/>
        </td>
      </tr>
      <tr>
        <th>Tag</th>
        <td>
          <input v-model="article.tag" style="width: 90%; height: 25px"/>
        </td>
      </tr>
      </tbody>
    </table>
    <div style="display: flex; width: 100%; margin: 10px 0">
      <button>update</button>
    </div>
  </form>

</template>
<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {IArticle} from "../../interfaces";
import {apiGetArticle, apiUpdateArticle} from "../../services/articles.service.ts";

const {id} = useRoute().params;
const router = useRouter();

const article = ref({title: '', content: '', author: '', tag: ''} as IArticle);

const updateArticle = async () => {
  if (!article.value.title || !article.value.content || !article.value.author) return alert('Please fill in required fields.');
  const create = await apiUpdateArticle(id as unknown as number, article.value);
  if (create.id) {
    await router.push({name: 'view-article', params: {id: create.id}});
  }
}

onMounted(async () => {
  article.value = await apiGetArticle(id as unknown as number);
  if (!article.value.title) {
    alert('Article not found.');
    await router.push({name: 'index'});
  }
})
</script>

<template>
  <div style="display: flex; justify-content: space-between; align-items: center">
    <h2>Create Article</h2>
    <div>
      <button @click="router.push({name: 'index'})">&leftarrow; back</button>
    </div>
  </div>
  <hr/>
  <form @submit.prevent="createArticle">
    <table width="100%" border="1" cellpadding="10px">
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
    </table>
    <div style="display: flex; width: 100%; margin: 10px 0">
      <button>submit</button>
    </div>
  </form>

</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import {IArticle} from "../../interfaces";
import {apiCreateArticle} from "../../services/articles.service.ts";

const router = useRouter();

const article = ref({
  title: '',
  content: '',
  author: '',
  tag: '',
} as IArticle);

const createArticle = async () => {
  if (!article.value.title || !article.value.content || !article.value.author) return alert('Please fill in required fields.');
  const create = await apiCreateArticle(article.value);
  if (create.id) {
    alert('Article created successfully.');
    await router.push({name: 'view-article', params: {id: create.id}});
  }
}
</script>
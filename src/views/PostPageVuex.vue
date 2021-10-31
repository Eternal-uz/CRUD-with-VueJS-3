<template>
  <div>
    <h1>Page with the posts</h1>
    <my-input v-focus @update:model-value="setSearchQuery"  :model-value="searchQuery" placeholder="Search..." />
    <div class="app__button">
      <my-button @click="showDialog">create a post</my-button>
      <my-select :options="sortOptions" :model-value="selectedSort" @update:model-value="setSelectedSort" ></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list

      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    />
    <div v-else>Loading...</div>
    <div v-intersection="loadPosts" class="observer"></div>
  </div>
</template>

 
<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import axios from "axios";
export default {
  components: { PostList, PostForm },
  data(){
    return{
      dialogVisible: false,
    }
  },

  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadPosts: 'post/loadPosts',
      fetchPosts: 'post/fetchPosts',
    }), 
    inputValue(event) {
      this.title = event.target.value;
    },
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },

  },
  mounted() {
    this.fetchPosts();
  },
  computed:{
    ...mapState({
        posts: state => state.post.posts,
        isPostLoading: state => state.post.isPostLoading,
        selectedSort: state => state.post.selectedSort,
        searchQuery: state => state.post.searchQuery,
        page: state => state.post.page,
        limit: state => state.post.limit,
        totalPage: state => state.post.totalPage,
        sortOptions: [
            { value: "title", name: "by title" },
            { value: "body", name: "by description" },
        ],
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
  }

};
</script>


<style scoped>
.app__button {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  /* border: 1px solid black; */
  padding: 10px;
}
.current-page {
  border: 1px solid teal;
}

</style>
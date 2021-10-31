<template>
  <div>
  <h1>Page with the posts</h1>
  <my-input v-focus v-model="searchQuery" placeholder="Search..." />
    <div class="app__button">
      <my-button >create a post</my-button>
      <my-select :options="sortOptions" v-model="selectedSort"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      v-if="!isPostLoading"
    />
  </div>
</template>

 
<script>
import { ref } from "vue";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
export default {
  components: { PostList, PostForm },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "by title" },
        { value: "body", name: "by description" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPage, isPostLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQury, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);
    return {
      posts,
      totalPage,
      isPostLoading,
      sortedPosts,
      selectedSort,
      searchQury,
      sortedAndSearchedPosts,
    };
  },
  methods: {
    async fetchPosts() {
      try {
        setTimeout(async () => {
          this.isPostLoading = true;
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          );
          this.totalPage = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          this.posts = response.data;
          this.isPostLoading = false;
        }, 1000);
      } catch (e) {}
    },
    async loadPosts() {
      try {
        this.page += 1;
        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          );
          this.totalPage = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          this.posts = [...this.posts, ...response.data];
        });
      } catch (e) {}
    },
  },
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
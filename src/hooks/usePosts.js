import { ref, onMounted } from 'vue';
import axios from 'axios';
export function UsePosts() {

  const posts = ref([])
  const totalPage = ref(0)
  const isPostLoading = ref(true)
  const fetching = async () => {

    try {
      setTimeout(async (limit) => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: 1,
              _limit: limit,
            },
          }
        );
        totalPage.value = Math.ceil(
          response.headers["x-total-count"] / limit
        );
        posts.value = response.data;
        isPostLoading.value = false;
      }, 1000);
    } catch (e) { }
  },
  onMounted(fetching);
  return{
      posts, isPostLoading, totalPage
    }
  }

}
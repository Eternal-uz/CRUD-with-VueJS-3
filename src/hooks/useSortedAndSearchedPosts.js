import {ref, computed} from 'vue'
export default function useSortedPosts(SortedPosts){
    const searchQuery =ref('')
    const sortedAndSearchedPosts = computed(()=>{
        return useSortedPosts.value.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    })

    return{
        searchQuery, sortedAndSearchedPosts
    }
}
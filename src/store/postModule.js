import axios from "axios";
export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        selectedSort: "",
        searchQuery: "",
        page: 1,
        limit: 10,
        totalPage: 0,
        sortOptions: [
            { value: "title", name: "by title" },
            { value: "body", name: "by description" },
        ],
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]));
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter((post) =>
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        },
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPage(state, totalPage) {
            state.setTotalPage = totalPage
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        }

    },
    actions: {
        async fetchPosts({ state, commit }) {
            try {
                setTimeout(async() => {
                    commit('setLoading', true);
                    const response = await axios.get(
                        "https://jsonplaceholder.typicode.com/posts", {
                            params: {
                                _page: state.page,
                                _limit: state.limit,
                            },
                        }
                    );
                    commit('setTotalPage', Math.ceil(
                        response.headers["x-total-count"] / state.limit));
                    commit('setPosts', response.data)
                    commit('setLoading', false);
                }, 1000);
            } catch (e) {
                console.log(e)
            }
        },
        async loadPosts({ state, commit }) {
            try {
                commit('setPage', state.page + 1)
                setTimeout(async() => {
                    const response = await axios.get(
                        "https://jsonplaceholder.typicode.com/posts", {
                            params: {
                                _page: state.page,
                                _limit: state.limit,
                            },
                        });
                    commit('setTotalPage', Math.ceil(response.headers["x-total-count"] / state.limit));
                    commit('setPosts', [...state.posts, ...response.data]);
                });
            } catch (e) {
                console.log(e);
            }
        },
    },
    namespaced: true,
}
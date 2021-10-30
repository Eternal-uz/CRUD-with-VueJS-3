<template>
<h3>Create a post</h3>
  <form @submit.prevent="">
    <my-input 
    v-focus
    v-model="post.title" 
    type="text" 
    placeholder="Title" />
    <my-input
      v-model="post.body"
      type="text"
      placeholder="Description"
    />
    <my-button 
    style="align-self: flex-end; margin-top: 14px"
    class="btn" 
    @click="createPost"
    >
        create
        </my-button>
  </form>
</template>

<script> 
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost(post) {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
         title: "",
         body:  ""
      }
    },
  },
};
</script>

<style scoped>

.form {
  display: flex;
  flex-direction: column;
}
</style>
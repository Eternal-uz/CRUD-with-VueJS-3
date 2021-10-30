<template>
    <button class="btn">
        <slot/>
    </button>
</template>
<script>
export default {
  name: 'my-button'
}
</script>
<style scoped>
.btn {
  align-self: flex-end;
  padding: 10px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>
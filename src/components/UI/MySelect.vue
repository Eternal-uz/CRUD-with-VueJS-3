<template>
  <select v-model="modelValue" @click="changeOptions" >
    <option disabled value="">choose from the list</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="options.value"
    >
      {{option.name}}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods:{
    changeOptions(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
};
</script>

<style>
</style>
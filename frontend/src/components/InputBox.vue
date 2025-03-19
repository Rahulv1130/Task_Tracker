<template>
  <label>
    <p>{{ label }}</p>
    <input :placeholder="placeholder" :type="type" v-model="inputValue"/>
  </label>
</template>

<script>
export default {
  name: 'InputBox',
  props: {
    label: String,
    placeholder: String,
    modelValue: String,
    type: String
  },
  computed: {
    inputValue: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<template>
  <Layout v-model="state"></Layout>
</template>

<script lang="ts">
// import Layout from "@/layout/Layout";

// @ts-ignore
import Layout from '@/layout/Layout/Layout.tsx';


export default {
  components: {Layout}
}
</script>

<script setup lang="ts">
import data from "@/data/data.json"
import {provide, ref} from "vue";
//这里as Config只是改个名字
import {registerConfig as config} from "@/utils/editor-config";

const state = ref(data);
provide('config', config);

</script>

<style lang="less">
#app {
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>
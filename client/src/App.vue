<template>
  <div id="app">
    <AppTopBar />
    <div id="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppTopBar from '@/components/AppTopBar';

export default {
  components: {
    AppTopBar,
  },
};
</script>

<style lang="scss">
@import "./styles/carbon";

body{
    background-color: $ui-01;
}
// body {
//   background: #000;
// }

// #app {
//   background: #000;
//   color: #FFF;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   max-width: 480px;
//   margin: 5% auto;
// }
</style>

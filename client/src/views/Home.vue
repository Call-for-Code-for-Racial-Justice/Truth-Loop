<template>
  <div>
    <h1>Setup</h1>
    <Policy item="1" />
    <PolicyNotice />
  </div>
</template>

<script>
import Policy from '@/components/Policy';
import PolicyNotice from '@/components/PolicyNotice';

export default {
  name: "Home",
  components: {
    Policy,
    PolicyNotice,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

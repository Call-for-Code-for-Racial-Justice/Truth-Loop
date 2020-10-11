<template>
  <div v-if="policy">
    <PolicyDetail :policy="policy" />
  </div>
</template>

<script>
import PolicyDetail from '../components/PolicyDetails/PolicyDetails.vue';

export default {
  name: "Policy",
  data() {
    return {
      id: this.$route.params.policyid,
    };
  },
  components: {
    PolicyDetail,
  },
  mounted() {
    this.$store.dispatch("policystore/fetchPolicy", this.id);
  },
  computed: {
    policy() {
      const policy = this.$store.getters["policystore/getCurrentPolicy"];
      return policy;
    },
  },
};
</script>

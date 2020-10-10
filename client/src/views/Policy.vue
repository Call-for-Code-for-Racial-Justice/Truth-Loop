<template>
  <PolicyDetail :policy="policy" />
</template>

<script>
import PolicyDetail from '../components/PolicyDetails/PolicyDetails.vue';
import policy from "../../mockdata/CURRENT_FULL_RETRIEVAL_OF_ARTIFACT_1";

export default {
  name: "Policy",
  data() {
    return {
      policy,
    };
  },
  components: {
    PolicyDetail,
  },
};
</script>

<template>
  <div class="member">
    <form-member class="member__form"></form-member>
    <table-members class="member__table"></table-members>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import FormMember from "@/views/Member/components/formMember.vue";
import TableMembers from "@/views/Member/components/tableMembers.vue";

export default defineComponent({
  name: "Home",
  components: {TableMembers, FormMember},
})

</script>

<style lang="sass" scoped>
.member
  display: flex
  flex-direction: column
  justify-content: space-around
  align-items: center
  padding: 5%
  &__form
    width: 100%
    margin-bottom: 10%
  &__table
    width: 100%
@media only screen and (min-width: 600px)
  .member
    flex-direction: row

    &__form
      width: 30%
      margin-bottom: 0
    &__table
      width: 60%
</style>

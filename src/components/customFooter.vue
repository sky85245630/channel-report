<template>
  <v-footer app padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>亞洲指標數位行銷</strong>
      </v-col>
    </v-footer>
</template>
<script>
export default {
    name: "custom-footer",
    data: ()=>({

    })
};
</script>
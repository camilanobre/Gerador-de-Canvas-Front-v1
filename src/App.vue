<template>
  <v-app>

    <core-toolbar v-if="$route.path!=='/login'"/>

    <core-drawer v-if="$route.path!=='/login'"/>

    <core-view />
    
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear'
    })
  },
  watch: {
    $route (to, from){
      // clear alert on location change
      this.clearAlert();
    }
  },
};
</script>

<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

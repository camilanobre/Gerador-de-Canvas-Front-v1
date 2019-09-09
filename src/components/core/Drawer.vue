<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    light
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-layout
      class="fill-height"
      tag="v-list"
      column
    >
      <v-list-tile
        avatar
        class="logo"
      >
        <v-list-tile-avatar
          size="70"
          style="margin: auto; display: block"
        >
          <v-img
            :src="logo"
            height="85"
            style="margin: auto; display: block"
            contain
          />
        </v-list-tile-avatar>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-title style="text-align: center">Sistema Pessoas</v-list-tile-title>
      </v-list-tile>
      <v-divider />
      <template>
        <v-list-tile
          :to="homePage.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ homePage.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="homePage.text" />
        </v-list-tile>
      </template>
      <template>
        <v-list-tile
          :to="page3.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ page3.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="page3.text" />
        </v-list-tile>
      </template>
      <v-list-group
        no-action
      >
        <template v-slot:activator>
          <v-icon>mdi-pencil-box</v-icon>
          <p class="v-list-item">Button Select</p>
        </template>
        <v-list-tile
          v-for="(link, i) in buttonSelect"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text" />
        </v-list-tile>
      </v-list-group>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from 'vuex'

export default {
  data: () => ({
    logo: './img/logo-prefeitura1.png',
    homePage: { to: '/', icon: 'mdi-monitor', text: 'Home' },
    buttonSelect: [
      {
        to: '/pagina1',
        icon: 'mdi-clipboard-check',
        text: 'Pagina 1'
      },
      {
        to: '/pagina2',
        icon: 'mdi-clipboard-text',
        text: 'Pagina 2'
      }
    ],
    page3: { to: '/pagina3', icon: 'mdi-clipboard-outline', text: 'Pagina 3' },
    responsive: false
  }),
  computed: {
    ...mapState('app', ['color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }

  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }

  div.v-responsive.v-image > div.v-responsive__content {
    overflow-y: auto;
  }
}

.logo .v-list__tile--avatar{
  padding-bottom: 0px !important;
}

.v-navigation-drawer .v-list .v-avatar{
  background-color: white;
 }

.v-list-item{
  margin: 5px 15px 5px !important;
}

.v-list__group__header{
  margin-left: 20px !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}

</style>

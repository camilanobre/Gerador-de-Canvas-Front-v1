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
          style="margin:auto; display: block">
          <v-img
            :src="logo"
            height="85"
            style="margin: auto; display: block"
            contain
          />
        </v-list-tile-avatar>
      </v-list-tile>
      <v-list-tile>
        <div class="posicionamentoExterno">
          <v-list class="posicionamentoInterno"> Gerador de Canvas <v-icon color="tertiary">mdi-emoticon-cool</v-icon></v-list>
        </div>
      </v-list-tile>
      <v-divider />
      <div
        v-for="(link, i) in links"
        :key="i"
      >
        <v-list-tile
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
        <div v-show="link.divider == true">
          <v-divider />
        </div>
      </div>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>

import { mapMutations, mapState } from 'vuex'

export default {
  data: () => ({
    perfil: '',
    logo: './img/idea.png',
    links: [
      {
        to: '/',
        icon: 'mdi-home-circle',
        text: 'Página Inicial',
        divider: true
      },
      {
        to: '/iniciarProjeto',
        icon: 'mdi-lightbulb-on-outline',
        text: 'Iniciar um projeto',
        divider: true
      },
      {
        to: '/comoCriar',
        icon: 'mdi-help',
        text: 'Como criar o Canvas?',
        divider: true
      },
      {
        to: '/sobre',
        icon: 'mdi-human-greeting',
        text: 'Sobre nós'
      },
    ],
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
    },
    ...mapState({
      account: state => state.account
    })
  },
  created () {
    this.getUsuarioStorage()
   /*  if (!this.usuario.perfilSuper) {
      this.validaPerfil()
    } */
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
    },
    getUsuarioStorage () {
      let usuario = JSON.parse(localStorage.getItem('usuario'))
      this.usuario = usuario.value
    },
/*     validaPerfil () {
      let ids = []
      for (let i = 0; i < this.links.length; i++) {
        if (!this.links[i].title && this.links[i].text !== 'Sair') {
          if (!this.verificarSeExiste(this.links[i].text)) {
            ids.push(i)
          }
        }
      }
      this.remontaMenu(ids)
    }, */
    verificarSeExiste (item) {
      let objJsonStr = JSON.parse(atob(this.usuario.moduloDescricaoFuncao))
      let qtd = Object.keys(objJsonStr).length
      let existe = false
      for (let i = 0; i < qtd; i++) {
        if (decodeURIComponent(escape(objJsonStr[i].DescricaoModulo)) === item) {
          existe = true
          break
        } else {
          existe = false
        }
      }
      return existe
    },
    remontaMenu (ids) {
      let menuAntigo = this.links
      this.links = []
      for (let i = 0; i < menuAntigo.length; i++) {
        if (this.verificaRecriaMenu(i, ids)) {
          this.links.push(menuAntigo[i])
        }
      }
    },
    verificaRecriaMenu (item, ids) {
      for (let i = 0; i < ids.length; i++) {
        if (item === ids[i]) {
          return false
        }
      }
      return true
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

.logo .v-list__tile--avatar {
  padding-bottom: 0px !important;
}

.v-navigation-drawer .v-list .v-avatar {
  background-color: white;
}

.v-list-item {
  margin: 5px 15px 5px !important;
}

.v-list__group__header {
  margin-left: 20px !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}

.v-navigation-drawer .v-list .v-list-item .v-list__tile.v-list__tile--active.primary{
  color: white;
}
</style>

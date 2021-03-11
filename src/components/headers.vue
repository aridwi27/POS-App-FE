<template>
  <div id="main" class="container-fluid">
    <div class="row">
      <div class="col-3 col-sm-2 col-md-1 box">
        <div>
          <button @click="setStatusSidebar()" class="btn">
            <img src="../assets/menu.png" class="img-fluid rounded mt-3" />
          </button>
        </div>
        <div></div>
      </div>
      <div class="col-9 col-sm-10 col-md-8 boxside" v-if="Food === 1">
        <h1 class="text-center font-weight-bold centertext d-inline">
          Food Items
        </h1>
      </div>
      <div class="col-9 col-sm-10 col-md-11 boxside" v-else>
        <h1 class="text-center font-weight-bold centertext d-inline">
          History
        </h1>
      </div>
      <div class="d-none d-md-block col-md-3 boxside" v-if="Food === 1">
        <h3 class="text-center headerside">
          Cart
          <span class="rounded-circle backgroundspan">{{ totalCart }}</span>
        </h3>
      </div>
      <div v-else></div>
    </div>
    <sidebar v-show="status === true" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import sidebar from './sidebar'
export default {
  props: ['totalCart', 'Food'],
  components: {
    sidebar
  },
  data () {
    return {
      status: false,
      statusCart: 1
    }
  },
  methods: {
    ...mapActions({
      setLogout: 'auth/logout'
    }),
    setStatusSidebar: function () {
      this.status = !this.status
    }
  }
}
</script>

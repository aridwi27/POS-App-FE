<template>
  <div>
    <body class="bgimagelo" style="height: 100%; margin: 0">
      <div class="container-fluid py-5">
        <div class="card w-75 h-100 py-5 mx-auto" style="border-radius: 30px">
          <div class="card-body row">
            <div class="col-12 col-md-6 px-5">
              <form class="form" @submit.prevent="login()">
                <h3 class="text-center fonttype">Login</h3>
                <div class="form-group">
                  <label for="username" v-blue="{ color: '#00BFFF' }"
                    >Email :</label
                  ><br />
                  <input
                    type="text"
                    id="username"
                    v-model="email"
                    required
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="password" v-blue="{ color: '#00BFFF' }"
                    >Password:</label
                  ><br />
                  <input
                    type="password"
                    v-model="password"
                    required
                    name="password"
                    id="password"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    value="Login"
                    class="btn btn-info btn-md"
                  />
                </div>
                <div id="register-link" class="text-right">
                  <router-link to="/register" class="text-info"
                    >Register here</router-link
                  >
                </div>
              </form>
            </div>
            <div class="col-md-6 d-none d-md-block">
              <h1 class="text-center fonttype">Welcome</h1>
              <img
                src="../assets/777d9c6e187bfc29677c7de89aa73c5a.jpg"
                class="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: '',
      token: localStorage.getItem('token')
    }
  },
  methods: {
    ...mapActions({
      action: 'auth/login'
    }),
    login () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.action(data).then((response) => {
        if (response.message === 'data unregisted') {
          this.$swal('email unregister')
        } else if (response.message === 'password wrong') {
          this.$swal('password wrong')
        } else {
          this.$router.push('/items')
        }
      })
    }
  },
  directives: {
    blue: function (el, binding) {
      el.style = `color: ${binding.value.color}`
    }
  }
}
</script>

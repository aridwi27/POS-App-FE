<template>
  <div>
    <body class="bgimagelo">
      <div class="container-fluid py-5">
        <div class="card w-75 py-5 mx-auto" style="border-radius: 30px">
          <div class="card-body row">
            <div class="col-md-6 px-5">
              <form class="form" action="" @submit.prevent="register()">
                <h3 class="text-center">Register</h3>
                <div class="form-group">
                  <label for="username" class="text-info">name :</label><br />
                  <input
                    type="text"
                    id="username"
                    required
                    v-model="form.name"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="email" class="text-info">email:</label><br />
                  <input
                    type="text"
                    v-model="form.email"
                    name="password"
                    required
                    id="email"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="password" class="text-info">password :</label
                  ><br />
                  <input
                    type="password"
                    id="password"
                    required
                    v-model="form.password"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label class="text-info">Level :</label><br />
                  <b-form-select
                    v-model="form.level"
                    class="mb-3 formadditem"
                    required
                  >
                    <template #first>
                      <b-form-select-option :value="null" disabled
                        >Select</b-form-select-option
                      >
                    </template>
                    <b-form-select-option value="2">
                      Cashier
                    </b-form-select-option>
                    <b-form-select-option value="1">
                      Admin
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="form-group">
                  <input type="submit" class="btn btn-info btn-md" />
                </div>
                <div id="register-link" class="text-right">
                  <router-link to="/" class="text-info"
                    >Have Account? Login Here</router-link
                  >
                </div>
              </form>
            </div>
            <div class="col-md-6">
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
      form: {
        name: '',
        email: '',
        password: '',
        level: ''
      }
    }
  },
  methods: {
    ...mapActions({
      actionRegister: 'register/register'
    }),
    register () {
      this.actionRegister(this.form).then((response) => {
        if (response.code === 409) {
          this.$swal('Email already register')
        } else {
          this.$swal('register success')
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<template>
  <div class="sidemenu">
    <div class="menu">
      <router-link to="/items">
        <img
          src="../assets/fork.jpg"
          class="img-fluid rounded imagemenusidebar mt-3"
      /></router-link>
    </div>
    <div>
      <router-link to="/history">
        <img
          src="../assets/clipboard.jpg"
          class="img-fluid rounded imagemenusidebar mt-3"
      /></router-link>
    </div>
    <div>
      <a href="#" @click="modalShow = !modalShow">
        <img
          src="../assets/add.jpg"
          class="img-fluid rounded imagemenusidebar mt-3"
        />
      </a>

      <b-modal v-model="modalShow">
        <template #modal-title>
          <h3 class="font-weight-bold">Add Item</h3>
        </template>
        <form>
          <div class="row mb-3">
            <label
              for="name"
              class="col-sm-3 col-form-label font-weight-bold fs-3"
              >Name</label
            >
            <div class="col-sm">
              <input
                type="text"
                required
                v-model="form.name"
                class="form-control form-control-lg formadditem"
                id="name"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label
              for="image"
              class="col-sm-3 col-form-label font-weight-bold fs-3"
              >Image</label
            >
            <div class="col-sm">
              <input
                type="file"
                required
                @change="uploadImage($event)"
                class="form-control form-control-lg formadditem"
                id="image"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label
              for="price"
              class="col-sm-3 col-form-label font-weight-bold fs-3"
              >Price</label
            >
            <div class="col-sm-6">
              <input
                type="text"
                required
                v-model="form.price"
                class="form-control form-control-lg formadditem"
                id="price"
              />
            </div>
          </div>
          <div class="form-group row mb-3">
            <label
              for="formselected"
              class="col-sm-3 col-form-label font-weight-bold fs-3"
              >Category</label
            >
            <div class="col-sm-4">
              <b-form-select v-model="form.category" class="mb-3 formadditem">
                <template #first>
                  <b-form-select-option :value="null" disabled
                    >Select</b-form-select-option
                  >
                </template>
                <b-form-select-option value="1">Drink</b-form-select-option>
                <b-form-select-option value="2">Food</b-form-select-option>
              </b-form-select>
            </div>
          </div>
        </form>
        <template #modal-footer>
          <div class="w-100">
            <b-button
              variant="primary"
              size="lg"
              class="float-right"
              @click="input()"
            >
              Add
            </b-button>
            <b-button
              size="lg"
              class="btn btn-secondary float-right mx-2"
              @click="modalShow = !modalShow"
            >
              Cancel
            </b-button>
          </div>
        </template>
      </b-modal>
      <!-- <router-link to="/insert"> <img src="../assets/add.jpg" class="img-fluid rounded imagemenusidebar mt-3"></router-link> -->
    </div>
  </div>
</template>

<style scoped>
.sidemenu {
  position: fixed;
  height: 100%;
  background-color: aliceblue;
  max-width: 100px;
  width: 100%;
  left: 0;
  padding: 20px;
  z-index: 1;
}
.menu {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      modalShow: false,
      show: false,
      form: {
        name: '',
        price: '',
        category: null,
        image: ''
      },
      reload: {
        search: '',
        sort: null,
        order: null,
        setPage: 1
      },
      selected: null
    }
  },
  methods: {
    ...mapActions({
      actionInput: 'items/addItems',
      get: 'items/getItems'
    }),
    input () {
      const convertForm = new FormData()
      convertForm.append('name', this.form.name)
      convertForm.append('id_category', this.form.category)
      convertForm.append('price', this.form.price)
      convertForm.append('image', this.form.image)
      this.actionInput(convertForm).then((response) => {
        if (response.code === 404) {
          this.$swal('type file must be .png or .jpg')
        } else if (response.code === 400) {
          this.$swal('please fill all form')
        } else if (response.code === 500) {
          this.$swal('please fill all form')
        } else {
          this.$swal('input data Success')
          this.$router.push('/items')
          this.get(this.reload)
        }
      })
    },
    uploadImage (e) {
      this.form.image = e.target.files[0]
    }
  }
}
</script>

<template>
  <div>
    <headers v-bind:totalCart="dataCart.length" />
    <div class="row content">
      <div class="col-md-1"></div>
      <div class="col-md-8 py-3 px-5 container-fluid maincontent">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="Search">Search</label>
            <input
              type="text"
              v-model="form.search"
              @keyup="searchItems()"
              class="form-control"
              id="Search"
            />
          </div>
          <div class="form-group col-md-2">
            <label for="Sort">Sort</label>
            <b-form-select id="Sort" v-model="form.sort" class="form-control">
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select an option --</b-form-select-option
                >
              </template>
              <b-form-select-option value="id">Id</b-form-select-option>
              <b-form-select-option value="name">Name</b-form-select-option>
              <b-form-select-option value="price">Price</b-form-select-option>
            </b-form-select>
          </div>
          <div class="form-group col-md-2">
            <label for="Order">Order</label>
            <b-form-select id="Order" v-model="form.order" class="form-control">
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select an option --</b-form-select-option
                >
              </template>
              <b-form-select-option value="asc"
                >ascending
              </b-form-select-option>
              <b-form-select-option value="desc"
                >descending</b-form-select-option
              >
            </b-form-select>
          </div>
          <div class="form-group col-md-2">
            <button
              type="submit"
              @click="searchItems()"
              class="btn btn-primary mt-4 ml-2 float-right"
            >
              Filter
            </button>
          </div>
        </div>
        <div class="row">
          <div v-if="errorData" class="col-12">
            <img src="../assets/nofound.jpg" class="center img-fluid" />
          </div>
          <div
            class="col-12 col-sm-6 col-md-4"
            v-else
            v-for="(item, index) in allItems"
            :key="index"
          >
            <img
              :src="'http://localhost:3000/image/' + item.image"
              class="card-img-top rounded mb-2 img-fluid"
              style="height: 100%; max-height: 150px"
            />
            <h4 class="card-title text-left">{{ item.name }}</h4>
            <h5 class="font-weight-bold text-left">Rp.{{ item.price }}</h5>
            <!-- add to cart -->
            <button
              v-on:click="addCart(item)"
              class="btn btn-primary float-left mb-2"
            >
              Add Cart
            </button>
            <!-- delete -->

            <!-- detail -->
            <button
              class="btn btn-link float-right"
              @click="detailItems(item.id)"
            >
              Detail
            </button>
          </div>
        </div>
        <button
          v-for="(item, index) in page.totalPage"
          class="btn btn-danger"
          :key="index"
          @click="movePage(item)"
        >
          {{ item }}
        </button>
      </div>

      <!-- cart -->

      <div class="col-md-3">
        <div v-if="dataCart.length <= 0" class="card-body p-2">
          <img
            src="../assets/food-and-restaurant.png"
            class="img-fluid mx-auto d-block imageempty"
            alt=""
          />
          <h3 class="text-center textempty">Your cart is empty</h3>
          <p class="text-center textempty">
            Please add some items from the menu
          </p>
        </div>
        <div v-else class="card-body p-1">
          <div class="row" v-for="(items, index) in dataCart" :key="index">
            <div class="col-4 col-md-4">
              <img
                :src="'http://localhost:3000/image/' + items.image"
                class="img-fluid my-2"
                style="max-height: 100px"
                alt=""
              />
            </div>
            <div class="col-8 col-md-8">
              <h5 class="text-left font-weight-bold">{{ items.name }}</h5>
              <div class="btn-group float-left btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-primary font-weight-bold"
                  @click="minValue(items.id)"
                >
                  -
                </button>
                <button type="button" class="btn btnvalue">
                  {{ items.quantity }}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary font-weight-bold"
                  @click="addValue(items.id)"
                >
                  +
                </button>
              </div>
              <span class="font-weight-bold" style="float: right"
                >Rp. {{ items.quantity * items.price }}</span
              >
              <br />
              <button
                @click="deleteCart(items.id)"
                class="btn btn-danger mt-3 float-right"
              >
                cancel
              </button>
            </div>
            <br />
          </div>
          <div class="footer">
            <div class="d-grid gap-3">
              <h5 class="float-left font-weight-bold ml-3">TOTAL :</h5>
              <h5 class="float-right font-weight-bold">Rp. {{ addPrice }}</h5>
            </div>
            <div>
              <b-button
                class="btn btn-primary btn-block my-3 font-weight-bold"
                v-b-modal.modal-center
                variant="primary"
              >
                <!-- @click="historyInput(dataCart)" -->
                CHECKOUT
              </b-button>
              <div>
                <b-modal
                  id="modal-center"
                  centered
                  size="lg"
                  hide-header
                  hide-footer
                  title="BootstrapVue"
                >
                  <div class="px-4 py-3">
                    <h3 class="font-weight-bold text-left d-inline">
                      Checkout
                    </h3>
                    <h5 class="font-weight-bold float-right">
                      Recipe No <span>#{{ invoice }}</span>
                    </h5>
                    <br />
                    <p class="font-weight-bold mt-3">Cashier : {{ Cashier }}</p>
                    <div v-for="(item, i) in dataCart" :key="i">
                      <h4 class="font-weight-bold">
                        {{ item.name }} {{ item.quantity }}x
                        <span class="float-right"
                          >Rp. {{ item.price * item.quantity }}</span
                        >
                      </h4>
                    </div>
                    <h4 class="text-right mt-5 font-weight-bold">
                      Total : Rp. {{ addPrice }}
                    </h4>
                    <h4 class="mt-5 font-weight-bold">Payment : Cash</h4>
                    <b-button
                      class="btn btn-primary btn-block my-3 font-weight-bold"
                      v-b-modal.modal-center
                      variant="secondary"
                      size="lg"
                      @click="historyInput(dataCart)"
                    >
                      <!-- @click="historyInput(dataCart)" -->
                      Print
                    </b-button>
                    <h5 class="text-center">Or</h5>
                    <b-button
                      class="btn btn-primary btn-block my-3 font-weight-bold"
                      v-b-modal.modal-center
                      variant="primary"
                      size="lg"
                    >
                      <!-- @click="historyInput(dataCart)" -->
                      Send Email
                    </b-button>
                  </div>
                </b-modal>
              </div>
              <button class="font-weight-bold btn btn-secondary btn-block">
                CANCEL
              </button>
              <b-modal v-model="modalShow">
                <template #modal-title>
                  <h3 class="font-weight-bold">Add Item</h3>
                </template>
                <form>
                  <div class="row mb-3">
                    <label
                      for="colFormLabel"
                      class="col-sm-3 col-form-label font-weight-bold fs-3"
                      >Name</label
                    >
                    <div class="col-sm">
                      <input
                        type="text"
                        v-model="form.name"
                        class="form-control form-control-lg formadditem"
                        id="colFormLabel"
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label
                      for="colFormLabel"
                      class="col-sm-3 col-form-label font-weight-bold fs-3"
                      >Image</label
                    >
                    <div class="col-sm">
                      <input
                        type="file"
                        @change="uploadImage($event)"
                        class="form-control form-control-lg formadditem"
                        id="colFormLabel"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label
                      for="colFormLabel"
                      class="col-sm-3 col-form-label font-weight-bold fs-3"
                      >Price</label
                    >
                    <div class="col-sm-6">
                      <input
                        type="text"
                        v-model="form.price"
                        class="form-control form-control-lg formadditem"
                        id="colFormLabel"
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
                      <b-form-select
                        v-model="form.category"
                        class="mb-3 formadditem"
                      >
                        <template #first>
                          <b-form-select-option :value="null" disabled
                            >Select</b-form-select-option
                          >
                        </template>
                        <b-form-select-option value="1"
                          >Drink</b-form-select-option
                        >
                        <b-form-select-option value="2"
                          >Food</b-form-select-option
                        >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import headers from '../components/headers'
import mixinsdata from '../mixins/mixins'
export default {
  mixins: [mixinsdata],
  components: {
    headers
  },
  data () {
    return {
      form: {
        search: '',
        sort: null,
        order: null,
        setPage: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      allItems: 'items/getAllItems',
      errorData: 'items/isError',
      msg: 'items/errorMsg',
      page: 'items/getPage',
      Cashier: 'auth/getCashier'
    })
  },
  methods: {
    ...mapActions({
      get: 'items/getItems',
      setLogout: 'auth/logout',
      delete: 'items/deleteItems',
      inputHistory: 'history/input'
    }),
    movePage (page) {
      this.form.setPage = page
      this.get(this.form)
    },
    searchItems () {
      this.get(this.form)
    },
    whenLogout () {
      this.setLogout().then((response) => {
        if (response) {
          this.$router.push('/')
        }
      })
    },
    detailItems (id) {
      this.$router.push('/detailitems/' + id)
    },
    deleteItems (id) {
      console.log(id)
      this.delete(id)
    },
    addCart (element) {
      const cekProduct = this.dataCart.filter((items) => {
        console.log(items)
        return items.id === element.id
      })
      if (cekProduct.length >= 1) {
        this.dataCart.forEach(elements => {
          if (element.id === elements.id) {
            elements.quantity += 1
          }
        })
      } else {
        const newData = {
          id: element.id,
          quantity: 1,
          image: element.image,
          name: element.name,
          price: element.price,
          addPrice: 0,
          cashier: this.Cashier,
          invoice: this.invoice
        }
        this.dataCart = [...this.dataCart, newData]
      }
      this.quantityPrice()
      this.totalprice()
      console.log(this.dataCart)
    },
    deleteCart: function (id) {
      console.log(id)
      const deleteCart = this.dataCart.filter((items) => {
        return items.id !== id
      })
      this.dataCart = deleteCart
      this.quantityPrice()
      this.totalprice()
    },
    addValue: function (id) {
      this.dataCart.forEach(element => {
        if (id === element.id) {
          element.quantity += 1
          console.log(element.quantity * element.price)
        }
      })
      this.quantityPrice()
      this.totalprice()
    },
    minValue: function (id) {
      this.dataCart.forEach(element => {
        if (id === element.id) {
          element.quantity -= 1
          if (element.quantity <= 0) {
            element.quantity = 1
          }
        }
      })
      this.quantityPrice()
      this.totalprice()
    },
    quantityPrice: function () {
      this.quantity = 0
      this.dataCart.forEach((element) => {
        this.quantity = this.quantity + (element.price * element.quantity)
      })
    },
    totalprice: function () {
      this.addPrice = 0
      this.dataCart.forEach((element) => {
        this.addPrice = this.addPrice + (element.price * element.quantity)
      })
    },
    historyInput (data) {
      // console.log(data)
      data.forEach((element) => {
        this.databaru = ''
        const getData = {
          invoice: element.invoice,
          cashier: element.cashier,
          orders: element.id,
          quantity: element.quantity,
          amount: element.price
        }
        this.databaru = [...this.databaru, getData]
        console.log(this.databaru)
        this.inputHistory(this.databaru)
        alert('data input success')
      })
    }
  },
  mounted () {
    this.get(this.form)
  }
}
</script>

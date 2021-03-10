<template>
  <div>
    <headers />
    <div class="container">
      <div class="row">
        <div class="col-8">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">INVOICES</th>
                <th scope="col">CASHIER</th>
                <th scope="col">orders</th>
                <th scope="col">quantity</th>
                <th scope="col">price</th>
              </tr>
            </thead>
            <tbody v-for="(element, index) in detail" :key="index">
              <tr>
                <th class="my-3">{{ element.invoice }}</th>
                <th class="my-3">{{ element.cashier }}</th>
                <th class="my-3">{{ element.name }}</th>
                <th class="my-3">{{ element.quantity }}</th>
                <th class="my-3">{{ element.amount }}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headers from '../components/headers'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    headers
  },
  data () {
    return {
      paramInv: this.$route.params.inv
    }
  },
  computed: {
    ...mapGetters({
      detail: 'history/getDetail'
    })
  },
  methods: {
    ...mapActions({
      detailget: 'history/getDetailHistory'
    })
  },
  mounted () {
    this.detailget(this.paramInv)
  }
}
</script>

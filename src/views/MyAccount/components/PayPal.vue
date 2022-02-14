<template>
  <div>
    <div v-if="!paidFor">
      <h1>Valor a ser pago - R${{ totalCredit }}</h1>

      <p>{{ product.description }}</p>
    </div>

    <div ref="paypal"></div>
  </div>
</template>

<script>
import Auth from "../../../services/Auth";
import Products from "../../../services/Products";
import Swal from "sweetalert2";
export default {
  props: ["dados", "totalCredit"],

  data() {
    return {
      load: false,
      valor: null,
      loaded: false,
      paidFor: false,
      product: {
        price: 777.77,
        description: "leg lamp from that one movie",
      },
    };
  },
  methods: {
    setLoaded: function () {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: '#259',
                  amount: {
                    currency_code: "BRL",
                    value: 1,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
    currencyBRL(value) {
      let val = value.toString();
      console.log(val.substr(0, 5));
      return "R$ " + val.substr(0, 5);
    },
    calcValue() {
      let value = (Number(this.dados.NET_PRICE) * 5) / 100;
      value = value + Number(this.dados.NET_PRICE);
      return value;
    },
  },
  created() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AXODb8C_QhUz8GTZAsmDhPXvxDUrVXj4bifvzt4EQ4RwFRDFprUBS6U3C1NP4ZqQNtRfKWTcLQAzu1co&currency=BRL";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  mounted() {},
  components: {},
};
</script>


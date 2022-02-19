<template>
  <!-- Content My Orders -->
  <div
    class="table-responsive"
    style="border-radius: 10px 10px 0 0; min-height: 300px"
    v-loading="loadTable"
  >
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="border-0">
            <div class="text-uppercase"></div>
          </th>
          <th scope="col" class="border-0">
            <div class="text-uppercase">ID</div>
          </th>
          <th scope="col" class="border-0">
            <div class="text-uppercase">Status</div>
          </th>
          <th scope="col" class="border-0">
            <div class="text-uppercase">Data de Registro</div>
          </th>
          <th scope="col" class="border-0">
            <div class="text-uppercase"></div>
          </th>
        </tr>
      </thead>
      <tbody v-if="orders">
        <tr
          v-for="(product, index) in orders"
          :key="index"
          style="border-bottom: 1px solid #f7f7f7"
        >
          <th
            scope="row"
            class="border-0"
            style="padding-left: 20px; padding-right: 0"
          >
            <a href="#">
              <i
                class="fas fa-circle"
                style="color: orange"
                v-if="product.STATUS_ORDER_ID == 1"
              ></i>
              <i
                class="fas fa-circle"
                style="color: #3c9c00"
                v-if="product.STATUS_ORDER_ID == 2"
              ></i>
              <i
                class="fas fa-circle"
                style="color: #ad0000"
                v-if="product.STATUS_ORDER_ID == 3"
              ></i>
            </a>
          </th>
          <th scope="row" class="border-0">
            <a
              href="#"
              @click.prevent="
                showModal = true;
                getDetails(product.VS_ORDER_ID, product);
              "
            >
              {{ product.VS_ORDER_ID }}</a
            >
          </th>
          <th scope="row" class="border-0">
            {{ getStatusMessage(product.STATUS_ORDER_ID) }}
          </th>
          <th scope="row" class="border-0">
            {{ dateFormat(product.DT_REGISTER) }}
          </th>
          <th scope="row" class="border-0">
            <a
              href="#"
              @click.prevent="
                showModal = true;
                getDetails(product.VS_ORDER_ID, product);
              "
            >
              <i class="fas fa-search-plus"></i> DETALHES
            </a>
          </th>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <th></th>
          <th></th>
          <th>Nenhum pedido encontrado</th>
          <th></th>
          <th></th>
        </tr>
      </tbody>
    </table>
  </div>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    @closed="closedModal"
  >
    <button class="modal__close" @click="showModal = false">
      <i class="far fa-times-circle"></i>
    </button>

    <div class="modal__content" v-loading="loadDetail">
        <el-collapse accordion>
  <el-collapse-item name="1">
    <template #title>
      Consistency<i class="header-icon el-icon-info"></i>
    </template>
    <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
    <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
  </el-collapse-item>
  <el-collapse-item title="Feedback" name="2">
    <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
    <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
  </el-collapse-item>
  <el-collapse-item title="Efficiency" name="3">
    <div>Simplify the process: keep operating process simple and intuitive;</div>
    <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
    <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
  </el-collapse-item>
  <el-collapse-item title="Controllability" name="4">
    <div>Decision making: giving advices about operations is acceptable, but do not make decisions for the users;</div>
    <div>Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.</div>
  </el-collapse-item>
</el-collapse>
      <div class="header">
        <h4>
          Pedido <b>#{{ SelectedOrder.VS_ORDER_ID }}</b>
        </h4>
        <div class="tabs">
          <a
            v-on:click="activetab = 1"
            v-bind:class="[activetab === 1 ? 'active' : '']"
            >Detalhes da Compra</a
          >
          <a
            v-on:click="activetab = 2"
            v-bind:class="[activetab === 2 ? 'active' : '']"
            >Detalhes Pagamento</a
          >
        </div>
      </div>

      <div class="content" v-if="activetab === 1">
        <div class="totals" v-if="SelectedOrder">
          <h4>Informações do Pedido</h4>
          <p>
            <b>Status:</b>
            {{ getStatusMessage(SelectedOrder.STATUS_ORDER_ID) }}
            <i
              class="fas fa-circle"
              style="color: orange"
              v-if="SelectedOrder.STATUS_ORDER_ID == 1"
            ></i>
            <i
              class="fas fa-circle"
              style="color: #3c9c00"
              v-if="SelectedOrder.STATUS_ORDER_ID == 2"
            ></i>
            <i
              class="fas fa-circle"
              style="color: #ad0000"
              v-if="SelectedOrder.STATUS_ORDER_ID == 3"
            ></i>
          </p>
          <p>
            <b>Valor do Frete:</b>
            {{ currencyBRL(SelectedOrder.SHIPPING_COST) }}
          </p>
          <p><b>Valor Total:</b> {{ currencyBRL(SelectedOrder.NET_PRICE) }}</p>
          <p>
            <b>Data do Registro:</b> {{ dateFormat(SelectedOrder.DT_REGISTER) }}
          </p>
        </div>

        <div class="detalhes">
          <h2>Produtos</h2>
          <div v-for="(item, index) in ordersDetails" :key="index">
            <div
              class="product_info row"
              v-for="product in item.PRODUCT_LIST"
              :key="product.id"
            >
              <div class="col-md-6">
                <h5>{{ product.VS_PRODUCT }}</h5>
                <b v-if="product.VARIATIONS_JSON">
                  Cor:
                  {{ JSON.parse(product.VARIATIONS_JSON).COLOR }}<br />
                  Tamanho:
                  {{ JSON.parse(product.VARIATIONS_JSON).SIZE }}
                </b>
                <b v-else>  <br />  </b>
              </div>
              <div class="col-md-6 row">
                <div class="col-md-6 row text-right">
                  <div class="col-md-12">
                    <p>Quantidade</p>
                  </div>
                  <div class="col-md-12">
                    <h4>{{ product.UNITS }}</h4>
                  </div>
                </div>
                <div class="col-md-6 row text-right">
                  <div class="col-md-12">
                    <p>Total</p>
                  </div>
                  <div class="col-md-12">
                    <h4>
                      {{ currencyBRL(product.SALE_PRICE * product.UNITS) }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="detalhes frete">
          <h2>Remessas</h2>
          <div
            v-for="(item, index) in ordersDetails"
            :key="index"
            class="product_info"
          >
            <h5><b>Status:</b> {{ item.DELIVERY_STATUS }}</h5>
            <h5>
              <b>Data estimada para entrega:</b>
              {{ dateBRL(item.DT_ESTIMATED_DELIVERY) }}
            </h5>
            <h5>Produtos:</h5>
            <ul>
              <li
                class=""
                v-for="product in item.PRODUCT_LIST"
                :key="product.id"
              >
                <p v-if="product.VARIATIONS_JSON">
                  {{ product.VS_PRODUCT }} -
                  {{ JSON.parse(product.VARIATIONS_JSON).COLOR }} -
                  {{ JSON.parse(product.VARIATIONS_JSON).SIZE }}
                </p>
                <p v-else>
                  {{ product.VS_PRODUCT }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="activetab === 2" class="content">METODOS PAGAMENTO</div>
    </div>
  </vue-final-modal>


  <!-- End Left Bar My Account -->
</template>
<style scoped>
table.table.able-striped.table-hover.border-table {
  border: 2px solid #dee2e6;
}
</style>
<script>
import Products from "../../../services/Products";
import Auth from "../../../services/Auth";
// import   "https://sdk.mercadopago.com/js/v2";
// const mp = new MercadoPago('YOUR_PUBLIC_KEY');

export default {
  methods: {
    
    dateBRL(data) {
      return data.split("-").reverse().join("/");
    },
    currencyBRL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "R$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getDetails(oderID, order) {
      this.loadDetail = true;
      let data = {
        VS_ORDER_ID: oderID,
      };
      Products.GetOrderDetails(data)
        .then((r) => {
          this.ordersDetails = r.data.DATA;
          this.SelectedOrder = order;
          this.loadDetail = false;
        })
        .catch((e) => {
          if (e.response.status == 403) {
            Auth.logoutUser();
          }
          this.loadDetail = false;
        });
    },
    dateFormat(data) {
      let date = data.substr(0, 10);
      return date.split("-").reverse().join("/");
    },
    getOrders() {
      this.loadTable = true;
      const token = localStorage.getItem("token");
      let data = {
        P_USER_ACCOUNT_ID: JSON.parse(
          localStorage.getItem("SELECTED_ACCOUNT_ID")
        )
          ? JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
          : 0,
        P_USER_ID: JSON.parse(localStorage.getItem("userID")),
      };
      Products.GetOrders(data)
        .then((r) => {
          this.orders = r.data.DATA;
          this.loadTable = false;
        })
        .catch((e) => {
          if (e.response.status == 403) {
            Auth.logoutUser();
          }
          this.loadTable = false;
        });
    },
    getStatusMessage: function (statusId) {
      switch (statusId) {
        case 1:
          return "Pendente de Pagamento";
          break;
        case 2:
          return "Pago com sucesso";
          break;
        case 3:
          return "Pedido Cancelado";
          break;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.STATUS_ORDER_ID === 1) {
        return "warning-row";
      }
      if (row.STATUS_ORDER_ID === 2) {
        return "success-row";
      }
      if (row.STATUS_ORDER_ID === 3) {
        return "danger-row";
      }
      return "";
    },
    rowClicked(row) {
      this.$refs.tableData.toggleRowExpansion(row);
    },
    closedModal() {
      this.ordersDetails = "";
      this.SelectedOrder = "";
    },
  },
  data() {
    return {
      orders: null,
      loginStatus: false,
      showModal: false,
      globalLoading: false,
      expandRowKeys: [],
      ordersDetails: "",
      SelectedOrder: "",
      loadTable: false,
      loadDetail: false,
      activetab: 1,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    //verifica login
    if (localStorage.getItem("token") !== null) {
      this.getOrders();
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }
  },
};
</script>
<style >
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table .danger-row {
  background: #ffebee;
}
</style>
<style scoped>
.BrowsingHistory {
  margin-top: 50px;
}

.table thead {
  background: #191928;
  border: none !important;
  color: white;
  background: linear-gradient(144deg, rgb(25 25 40) 0%, rgb(0 132 245) 100%);
}

.table tbody th {
  padding: 20px 10px;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  background: #fbfbfb;
}
.table tbody tr:hover th {
  background: #e8f4ff;
}
.table a,
a:hover {
  color: #0180ed;
}
</style>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 85%;
  max-width: 90%;
  margin: 0 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  background: #fff;
  min-width: 80%;
  min-height: 50%;
  max-height: max-content;
  padding-bottom: 15px;
}

.modal__title {
  margin: 0 2rem 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal__content {
  flex-grow: 1;
}

.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

.modal__close {
  position: absolute;
  top: -20px;
  right: 5px;
  z-index: 10;
  background: #0078f5;
  border-radius: 50%;
  width: 30px;
  padding: 1px 4px;
  height: 30px;
  color: white;
  text-align: center;
  font-size: 30px;
}
.modal__close i {
  background: #0078f5;
  color: white;
  padding: 10px;
  border-radius: 50%;
}
</style>
<style scoped>
.dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}

.vfm--inset {
  z-index: 9 !important;
  top: 5%;
}

.modal__close {
  border: none;
  background: none;
}
.el-loading-mask {
  z-index: 1029 !important;
}

.modal__content .header {
  border-bottom: 1px solid #ececec;
  padding: 15px 0px 0px 2vw;
  box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
}

.modal__content .header b {
  color: #8c8c8c;
  font-size: 19px;
}

.modal__content .header h4 {
  color: #0078f5;
  font-size: 30px;
}
.detalhes {
  padding: 2vw 2vw;
}
.detalhes h2 {
  font-size: 18px;
  color: #4c4c4c;
  text-transform: uppercase;
}
.detalhes .product_info {
  margin-bottom: 10px;
  padding: 1vw 1vw;
  background: #f5f5f5;
  box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
  border-radius: 2px;
}

.detalhes .product_info b {
  color: #8c8c8c;
  font-size: 12px;
}

.detalhes .product_info h5 {
  color: #191928;
  font-size: 15px;
}
.modal__content .content {
  height: 475px;
  overflow: scroll;
  overflow-x: hidden;
}
.frete .product_info {
  border-left: 4px solid #0078f5;
}
.frete p {
  margin: 0;
  font-size: 12px;
}
.frete .product_info h5 {
  color: #191928;
  font-size: 15px;
}

.frete .product_info b {
  color: #616161;
  font-size: 15px;
}
.totals {
  padding: 2vw 0px 0px 2vw;
}
.totals p {
  margin-bottom: 0;
  font-size: 15px;
}
::-webkit-scrollbar {
  width: 13px;
  height: 13px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(13deg, #737373 14%, #474747 64%);
  border-radius: 0px;
}
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(13deg, #047dba 14%, #00ddff 64%);
}
::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 0px;
  box-shadow: inset 7px 10px 12px #f0f0f0;
}

.box {
  border: 2px solid #eee;
  padding: 5px;
  padding-left: 15px;
  background-color: white;
}

.tags {
  padding: 3px;
  background-color: #eee;
  border-radius: 2px;
  border: 1px solid #bbb;
  margin-right: 2px;
}

.tags span {
  background-color: #ffcdd2;
  font-size: 11px;
  cursor: pointer;
  padding: 2px;
  color: #d32f2f;
  border: 1px solid #ef9a9a;
}

tr {
  cursor: pointer;
}

.add-suppliers {
  margin-top: 10px;
  border: 1px solid #0a285c;
  color: #ffffff;
  background-color: #0a285c;
}

.mb-5,
.my-5 {
  margin-bottom: 0rem !important;
}

.title-modal h2 {
  margin: 5px 0px;
  margin-top: -40px;
}

.el-table .cell,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0;
}

.el-table .cell {
  padding-left: 0;
}
.el-select {
  width: 100%;
}
.error-msg {
  background: red;
  border-radius: 4px;
  padding: 0px 0px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px;
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
  color: #484848;
  margin-right: 5px;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #0a285c;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 5px 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
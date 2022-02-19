<template>
  <Header></Header>
  <br />
  <Carousel :Carousel="Carousel"></Carousel>
  <!-- .block-banner -->
  <div class="block block-banner" id="myorder">
    <div class="container">
      <div class="myorders">
        <div  class="one" :style="'width: ' + one + '%'">
      <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
  <el-menu-item  index="1"  @click="isCollapseF();">
      <i class="el-icon-menu"></i>
      <template #title>Menu</template>
    </el-menu-item>
    <el-menu-item  @click="goTO('/myaccount');">
      <i class="el-icon-odometer" @click="goTO('/myaccount'); "></i>
      <template #title>Dashboard</template>
    </el-menu-item>
    <el-menu-item  @click="goTO('/edit-user'); ">
      <i class="el-icon-user" @click.prevent="goTO('/edit-user')"></i>
      <template #title @click.prevent="goTO('/edit-user')"
        >Editar Informações</template
      >
    </el-menu-item>
    <el-menu-item  @click="goTO('/myorders'); ">
      <i class="el-icon-shopping-cart-2" @click.prevent="goTO('/myorders')"></i>
      <template #title @click.prevent="goTO('/myorders')"
        >Meus Pedidos</template
      >
    </el-menu-item>
  </el-menu>
        </div>
        <div class="two" :style="'width: ' + two + '%'">
            <div class="avaliar-body" v-if="Evaluation">
            <div class="Avaliar row" style="padding: 0vw 3vw">
              <div
                class="fechar"
                style="
                  width: 50px;
                  position: absolute;
                  right: 0;
                  z-index: 1031;
                  margin-top: 15px;
                "
              >
                <button
                  @click="
                    Evaluation = false;
                    clearRating();
                  "
                  style="background: none; border: none"
                >
                  <i class="far fa-times-circle" style="font-size: 25px"></i>
                </button>
              </div>
              <div class="col-md-12">
                <p style="font-size: 15px; margin-top: 5px; margin-bottom: 5px">
                  Avaliar: <br />
                  {{ ProductAvaliable.VS_PRODUCT }}
                </p>
              </div>
              <div class="col-md-6">
                <label for="">Comentário</label><br />
                <textarea
                  placeholder="Por Favor, Conte sua experiência com nosso produto"
                  v-model="comment"
                  style="width: 100%; height: 80px"
                >
                </textarea>
              </div>
              <div class="col-md-6">
                <p style="margin-bottom: 5px">Avalie o produto:</p>
                <star-rating
                  :rounded-corners="true"
                  :border-width="4"
                  :star-points="[
                    23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34,
                    46, 19, 31, 17,
                  ]"
                  inactive-color="#eaeaea"
                  active-color="#ffd333"
                  :show-rating="false"
                  v-bind:star-size="30"
                  text-class="custom-text"
                  @update:rating="setRating"
                >
                </star-rating>
                <button
                  v-if="rating != null"
                  @click="CofirmRating()"
                  style="
                    background: #0078f5;
                    border: none;
                    padding: 2px 25px;
                    color: white;
                    font-weight: bold;
                    border-radius: 5px;
                    width: 100%;
                    margin-top: 15px;
                  "
                >
                  Avaliar Produtos
                </button>
                <button
                  v-else
                  style="
                    background: rgb(121 121 121);
                    border: none;
                    padding: 2px 25px;
                    color: white;
                    font-weight: bold;
                    border-radius: 5px;
                    width: 100%;
                    margin-top: 15px;
                  "
                  disabled
                >
                  Avaliar Produtos
                </button>
              </div>
            </div>
            </div>
          <h3 style="color: #353535" v-if="onTable">Meus Pedidos</h3>
          <p v-if="onTable">
            Aqui você encontra todas as informações do seu pedido.
          </p>
          <div class="contenttwo">
            <!-- Content My Orders -->
            <div
              v-if="onTable"
              class="table-responsive myorder"
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
                    style="    border-bottom: 1px solid rgb(224 224 224);" 
                  >
                  
                    <th v-if="product.STATUS_ORDER_ID == 1"
                      scope="row"
                      class="border-0"
                      style="padding-left: 20px; padding-right: 0; border-left: 5px solid orange!important;"
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
                      <th v-if="product.STATUS_ORDER_ID == 2"
                      scope="row"
                      class="border-0"
                      style="padding-left: 20px; padding-right: 0; border-left: 5px solid #3c9c00!important;"
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
                      <th v-if="product.STATUS_ORDER_ID == 3"
                      scope="row"
                      class="border-0"
                      style="padding-left: 20px; padding-right: 0; border-left: 5px solid #ad0000!important;"
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
                     <th v-if="product.STATUS_ORDER_ID == 7"
                      scope="row"
                      class="border-0"
                      style="padding-left: 20px; padding-right: 0; border-left: 5px solid orange!important;"
                    >
                      <a href="#">
                        <i
                          class="fas fa-circle"
                          style="color: orange"
                          v-if="product.STATUS_ORDER_ID == 7"
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
                         <th v-if="product.STATUS_ORDER_ID == 8"
                      scope="row"
                      class="border-0"
                      style="padding-left: 20px; padding-right: 0; border-left: 5px solid #ad0000!important;"
                    >
                      <a href="#">
                        <i
                          class="fas fa-circle"
                          style="color: orange"
                          v-if="product.STATUS_ORDER_ID == 7"
                        ></i>
                        <i
                          class="fas fa-circle"
                          style="color: #3c9c00"
                          v-if="product.STATUS_ORDER_ID == 2"
                        ></i>
                        <i
                          class="fas fa-circle"
                          style="color: #ad0000"
                          v-if="product.STATUS_ORDER_ID == 8"
                        ></i>
                      </a>
                    </th>
                    <th scope="row" class="border-0">
                      <a
                        href="#"
                        @click.prevent="
                          showModal = true;
                          onTable = false;
                          redirectToHome();
                          getDetails(product);
                        "
                      >
                        {{ product.VS_ORDER_ID }}</a
                      >
                    </th>
                    <th scope="row" class="border-0">
                      {{ getStatusMessage(product.STATUS_ORDER_ID, product.STATUS) }}
                    </th>
                    <th scope="row" class="border-0">
                      {{ dateFormat(product.DT_REGISTER) }}
                    </th>
                    <th scope="row" class="border-0">
                      <a
                        href="#"
                        @click.prevent="
                          showModal = true;
                          redirectToHome();
                          onTable = false;
                          getDetails(product);
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
            <div
              v-if="showModal"
              class="modal-container myorder"
              content-class="modal-content"
              @closed="closedModal"
            >
          

              <div class="modal__content" v-loading="loadDetail">
                <div class="header" style="position: relative;">
                  <h4>
                    Pedido
                    <b
                      >#{{ SelectedOrder.VS_ORDER_ID }}
                      <p style="font-size: 15px">
                        {{ getStatusMessage(SelectedOrder.STATUS_ORDER_ID) }}
                        <i
                          class="fas fa-circle"
                          style="color: orange"
                          v-if="SelectedOrder.STATUS_ORDER_ID == 1 || SelectedOrder.STATUS_ORDER_ID == 7"
                        ></i>
                        <i
                          class="fas fa-circle"
                          style="color: #3c9c00"
                          v-if="SelectedOrder.STATUS_ORDER_ID == 2"
                        ></i>
                        <i
                          class="fas fa-circle"
                          style="color: #ad0000"
                          v-if="SelectedOrder.STATUS_ORDER_ID == 3 || SelectedOrder.STATUS_ORDER_ID == 8"
                        ></i>
                      </p>
                    </b>
                  </h4>
                  <div class="tabs">
                    <a
                      v-on:click="activetab = 1"
                      v-bind:class="[activetab === 1 ? 'active' : '']"
                      >Detalhes da Compra</a
                    >
                    <a
                      v-if="SelectedOrder.STATUS_ORDER_ID !== 3"
                      v-on:click="activetab = 2; payPix2(SelectedOrder)"
                      v-bind:class="[activetab === 2 ? 'active' : '']"
                      >Detalhes Pagamento</a
                    >
                  </div>
                    <button
                      class="modal__close"
                      @click="
                        showModal = false;
                        onTable = true;
                        dadosPix = false;
                      "
                    >
                    Voltar
                <i class="el-icon-back"></i>
              </button>
                </div>

                <div class="content" v-if="activetab === 1">
                  <div class="totals" v-if="SelectedOrder">
                    <h4
                      style="
                        font-size: 15px;
                        text-transform: uppercase;
                        color: #969696;
                      "
                    >
                      Informações do Pedido
                    </h4>
                    
                    <p v-if="ResultShopping == 0" style=" color: rgb(23, 162, 184);">
                      <b style="    color: #191928;">Valor do Frete:</b>
                      Grátis
                    </p>
                    <p v-else>
                      <b>Valor do Frete:</b>
                        {{ currencyBRL(ResultShopping) }}
                    </p>
                    <p v-if="SelectedOrder.BILLET_NET_PRICE !== null">
                      <b>Valor Total:</b>
                      {{ currencyBRL(SelectedOrder.BILLET_NET_PRICE) }}
                    </p>
                    <p v-else>
                      <b>Valor Total:</b>
                      {{ currencyBRL(SelectedOrder.NET_PRICE) }}
                    </p>
                    <p>
                      <b>Data do Registro:</b>
                      {{ dateFormat(SelectedOrder.DT_REGISTER) }}
                    </p>
                    <p>
                      <b>Pontuação:</b>
                      {{ formatScore(SelectedOrder.PURCHASE_SCORE) }}
                    </p>
                  </div>

                  <div class="detalhes">
                    <h2>Produtos</h2>
                    <div
                      v-for="(item, index) in ordersDetails"
                      :key="index"
                      style="
                        display: flex;
                        flex-flow: row wrap;
                        align-items: center;
                        align-content: space-between;
                      "
                    >
                      <div
                        class="product_info row"
                        v-for="product in item.PRODUCT_LIST"
                        :key="product.id"
                      >
                        <!-- 
                        <div class="col-md-2 img-product">
                          <img
                            v-if="product.IMAGE_LIST"
                            class="product-image__img img-"
                            :src="
                              product.IMAGE_LIST != null
                                ? product.IMAGE_LIST[0]
                                : ''
                            "
                            alt=""
                          />
                          <img
                            v-else
                            src="../../assets/images/default.png"
                            alt=""
                          />
                        </div>
                        -->
                      
                        <div class="col-md-9 col-9">
                          <h5>{{ product.VS_PRODUCT }}</h5>
                          <div v-if="item.DELIVERY_STATUS_ID == 3">
                            <a
                              style="
                                color: #3b3b3b;
                                font-weight: 500;
                                background: #ffb500;
                                padding: 2px 10px;
                                border-radius: 5px;
                                font-size: 13px;
                              "
                              v-if="product.EVALUATION_COMPLETED == 0"
                              href="#"
                              @click.prevent="CreateEvaluation(product)"
                              >Avaliar Produto<i class="far fa-star"></i
                            ></a>
                            <a
                              style="color: #3a8601; font-weight: 500"
                              v-else
                              href="#"
                              @click.prevent="null"
                              >Produto Avalidado</a
                            >
                          </div>
                            <div class="" v-if="product.VARIATIONS_JSON">
                                <ul style="display: block; list-style-type: none; margin-block-start: 0; margin-block-end: 0; margin-inline-start: 0px; margin-inline-end: 0px; padding-inline-start: 0;">
                                  <li  v-for="(item, index) in getVariations(product.VARIATIONS_JSON, index)" :key="index" >
                                    <p style="margin-bottom: 0; font-size: 15px;     position: relative;" v-if="item.NAME == 'COR' || item.NAME == 'COLOR' "> <b>{{item.NAME}}: </b> <div
                                      :style="
                                      'background:' +
                                    item.VARIATION +
                                      ';color:' +
                                      item.VARIATION +
                                      ';border: 1px solid #19192894; width: 15px; display: inline; height: 15px; border-radius: 50%; display: inline; position: absolute; left: 35px; top: 2px;'
                                    "
                                    ></div> </p>
                                    <p style="margin-bottom: 0; font-size: 10px;"  v-else> <b>{{item.NAME}}: </b>  {{item.VARIATION}}</p>
                                  </li>
                                </ul>
                              </div>
                          <b v-else><br></b>
                        </div>
                        <div class="col-md-3 col-3 ">
                          <div class="col-md-12  text-right">
                              <p>Quantidade<h4>{{ product.UNITS }}</h4></p>
                              <p>Total  
                                <h4 
                                v-if="
                                  product.SALE_PRICE_DISCOUNT !=
                                  product.SALE_PRICE
                                "
                              >
                                {{
                                  currencyBRL(
                                    product.SALE_PRICE_DISCOUNT * product.UNITS
                                  )
                                }}
                              </h4 >
                              <h4 v-else>
                                {{
                                  currencyBRL(product.SALE_PRICE * product.UNITS)
                                }}
                              </h4>
                              </p>
                          
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="detalhes frete"
                    v-if="SelectedOrder.STATUS_ORDER_ID !== 3"
                  >
                    <h2>Remessas</h2>
                    <div
                      v-for="(item, index) in ordersDetails"
                      :key="index"
                      class="product_info"
                    >
                      <h5>
                        <b>Status:</b>
                        {{ item.DELIVERY_STATUS_ID == 2 ? "PEDIDO ENVIADO" : "" }}
                        {{
                          item.DELIVERY_STATUS_ID == 1 ? "AGUARDANDO ENVIO" : ""
                        }}
                        {{ item.DELIVERY_STATUS_ID == 3 ? "ENTREGUE" : "" }}
                        {{
                          item.DELIVERY_STATUS_ID == 4
                            ? "RETORNOU AO REMETENTE"
                            : ""
                        }}
                      </h5>
                      <h5>
                        <b>Data estimada para entrega:</b>
                        {{ dateBRL(item.DT_ESTIMATED_DELIVERY) }}
                      </h5>
            
                      <h5
                            style="margin-bottom: 0; color: #17a2b8"
                            v-if="item.FREE_SHIPPING != 0"
                          >
                          <b>Preço frete:</b>
                            Grátis 
                          </h5>
                          <h5 v-else>
                            <b>Preço frete:</b>
                            {{ currencyBRL(item.SHIPPING_COST) }}
                          </h5>
                    
                      <h5>Produtos:</h5>
                      <ul>
                        <li
                          class=""
                          v-for="product in item.PRODUCT_LIST"
                          :key="product.id"
                        >
                          <p>
                            {{ product.VS_PRODUCT }}
                          </p>
                        </li>
                      </ul>
                      <div
                        class="confirm-send"
                        v-if="item.DELIVERY_STATUS_ID == 2"
                      >
                        <button
                          @click="
                            CofirmSend(item.VS_ORDER_ID, item.VS_DELIVERY_ID)
                          "
                          style="
                            background: green;
                            border: none;
                            padding: 5px 25px;
                            color: white;
                            font-weight: bold;
                            border-radius: 5px;
                          "
                        >
                          Confirmar Recebimento
                        </button>
                      </div>
                      <h5 v-if="item.TRACKING_CODE">
                        Código de Rastreio:
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          @click.prevent="
                            goTO('/trakingcode/' + item.TRACKING_CODE)
                          "
                          >{{ item.TRACKING_CODE }}</a
                        >
                      </h5>
                    </div>
                  </div>
                  <div
                    v-if="SelectedOrder.STATUS_ORDER_ID == 1 || SelectedOrder.STATUS_ORDER_ID == 8 "
                    class="cancel"
                    @click="CancelOrder(SelectedOrder.VS_ORDER_ID)"
                  >
                    Cancelar Pedido
                  </div>
                </div>
                <div style="    padding-bottom: 100px;padding-top: 25px;"
                  v-if="activetab === 2"
                  class="content text-center"
                  v-loading="transferLoad"
                > 
                <div class="pagamentos">
                  <div v-if="SelectedOrder.STATUS_ORDER_ID == 1 && SelectedOrder.PAYMENT_METHOD_ID == 6"> 
                        
                                <div class="result-pix" v-if="dadosPix">
                                    <br><br>
                                   <div class="sc-ibushM cdYEHE qr-code-wrapper">
                                     <div data-cy="ame-qr-code-container" class="ame-qr-code-container">
                                       <img data-cy="ame-qr-code-img" :src="dadosPix.image" alt="código QR"></div>
                                       <ul data-cy="pixInstructionsList" class="sc-heOwwK izlmnd">
                                         <span>   <b>Nome do destinatário</b><br />
                                            JLB EDUCAÇÃO ASSESSORIA EMPRESARIAL LTDA</span> <br>
                                         <li>
                                        <span>
                                         <strong>1.</strong> Abra o app do seu banco ou instituição financeira e entre no ambiente <strong class="--ignore-case">Pix</strong></span></li>
                                         <li>
                                         <span><strong>2.</strong> Escolha a opção <strong>
                                            Pagar com QR Code</strong> e escaneie o código ao lado</span>
                                            </li>
                                            <li><span><strong>3.</strong> Confirme as informações e finalize a compra</span></li>
                                            <li><span><strong>4.</strong> Após confirmação do pagamento <a href="#" @click.prevent="reload()">cliqui aqui </a> </span></li>
                                            </ul></div>
                                            <div data-cy="total" class="sc-joCieG gXKmMR">total:<strong class="--ignore-case"> {{currencyBRL(SelectedOrder.NET_PRICE)}}</strong></div>
                                </div>
                  </div>
                  <div class="" v-if="SelectedOrder != null">
                    <!--Seleciona o Método -->
                    <div v-if="SelectedOrder.PAYMENT_METHOD == null || SelectedOrder.STATUS_ORDER_ID == 8">
                      <!-- Antes de definir método-->
                      <div class="" v-if="beforePay" style="    padding: 1vw 2vw;">
                        <div
                          class="methods-pay row"
                          v-if="SelectedOrder.STATUS_ORDER_ID == 1 || SelectedOrder.STATUS_ORDER_ID == 8"
                        >
                          <div class="col-md-12">
                                <h3
                              style=" text-align: left; color: rgb(25, 25, 40); margin: -20px 0px 15px; font-weight: 200; font-size: 20px;   "
                            >
                           Escolha o Método de Pagamento.
                            </h3>
                          <el-collapse accordion>
                              <el-collapse-item  name="2">
                                <template #title>
                                  Boleto Bancário<i class="el-icon-tickets icone" ></i>
                                </template>
                                  <div class="billet" >
                                      <button
                                        v-if="userTypeDocument != 3"
                                        style="
                                          background: #0078f5;
                                          border: none;
                                          border-radius: 5px;
                                          padding: 0 5vw;
                                        "
                                        class="btn btn-info mt-3"
                                        @click="BilletGenerate(SelectedOrder)"
                                      >
                                        <i data-v-24f21499="" class="el-icon-tickets"></i>
                                        Gerar boleto
                                      </button>
                                      <p v-else style="padding: 2vw 12vw">
                                        <el-alert type="error" show-icon>
                                          Boleto não disponível <br />
                                          Você se cadastrou com documento do tipo
                                          Passaporte, por favor entre em contato com nosso
                                          suporte no e-mail:
                                          <a href="mailto:suporte@vg.company"
                                            >suporte@vg.company</a
                                          >
                                        </el-alert>
                                      </p>
                                  </div>
                              </el-collapse-item>
                              <el-collapse-item  name="3">
                                <template #title>
                                U4Crypto Carteira Digital <i class="fas fa-money-check-alt icone"></i>
                              </template>
                                  <div class="digital-transfer row" >
                                      <div class="col-md-2"></div>
                                      <div class="col-md-8">
                                        <span
                                          style="
                                            border: 2px solid #0078f5;
                                            padding: 10px;
                                            border-radius: 5px;
                                            display: block;
                                            margin-top: 5px;
                                          "
                                          ><p class="text-center" style="font-weight: bold">
                                            Dados da conta para transferência por plataforma
                                            digital
                                          </p>
                                          <hr />
                                          <p style="margin: 0px; padding: 0px">
                                            <b>Nome do destinatário</b><br />
                                            JLB EDUCAÇÃO ASSESSORIA EMPRESARIAL LTDA
                                            <br />
                                            <b>CNPJ do destinatário</b><br />
                                            37.886.966/0001-88 <br />
                                            <b> Valor a ser depositado: </b><br />{{
                                              currencyBRL(SelectedOrder.NET_PRICE)
                                            }}
                                          </p>
                                        </span>
                                      </div>
                                      <div class="col-md-2"></div>
                                      <div class="col-md-12 text-left row">
                                        <div class="col-md-2"></div>
                                        <div class="col-md-8">
                                          <ul
                                            style="
                                              list-style-type: none;
                                              margin-block: 0px;
                                              margin-inline: 0px;
                                              padding-inline-start: 0px;
                                              font-size: 14px;
                                              color: rgb(210 106 0);
                                              padding: 10px 15px;
                                              font-weight: 600;
                                            "
                                          >
                                            <li>
                                              1°) Acesse o Aplicativo U4Crypto e realize a
                                              transferência do valor indicado.
                                            </li>
                                            <li>
                                              2°) Verifique a conclusão da transferência.
                                            </li>
                                            <li>
                                              3°) Copie e cole a HASH de pagamento no campo
                                              abaixo e clique em enviar!
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="col-md-2"></div>
                                      <div class="col-md-8 row send-row">
                                        <div class="col-md-8">
                                          <input
                                            v-model="hashPay"
                                            type="text"
                                            style="
                                              width: 100%;
                                              height: 50px;
                                              padding: 0px 15px;
                                            "
                                            placeholder="Hash de Pagamento"
                                          />
                                        </div>
                                        <div class="col-md-4">
                                          <button
                                            v-if="hashPay != null"
                                            class="btn btn-info btn-block"
                                            style="height: 50px"
                                            @click="sendTransfer(SelectedOrder)"
                                          >
                                            <i class="el-icon-upload2"></i>
                                            Enviar
                                          </button>
                                          <button
                                            v-else
                                            class="btn btn-info btn-block"
                                            style="height: 50px"
                                            disabled
                                          >
                                            <i class="el-icon-upload2"></i>
                                            Enviar
                                          </button>
                                        </div>
                                      </div>
                                      <div class="col-md-2"></div>
                                    </div>
                              </el-collapse-item>
                     <el-collapse-item  name="4">
                                <template #title>
                                Pix <svg style="width: 25px; margin-left: 17px;"  viewBox="0 0 20 20" fill="none" class="payment-icon"><g clip-path="url(#clip0_1275:429)"><path d="M14.992 15.098C14.6153 15.0991 14.242 15.0254 13.8939 14.8812C13.5458 14.737 13.2297 14.5252 12.964 14.258L10.025 11.319C9.92146 11.2194 9.7833 11.1637 9.63955 11.1637C9.4958 11.1637 9.35763 11.2194 9.25404 11.319L6.32705 14.247C6.06114 14.5142 5.7449 14.726 5.39664 14.8702C5.04837 15.0143 4.67497 15.0881 4.29804 15.087H3.94604L7.66605 18.806C7.94134 19.0818 8.26829 19.3005 8.6282 19.4497C8.98811 19.599 9.37391 19.6758 9.76354 19.6758C10.1532 19.6758 10.539 19.599 10.8989 19.4497C11.2588 19.3005 11.5858 19.0818 11.861 18.806L15.57 15.098H14.992ZM11.273 18.22C10.8724 18.6201 10.3293 18.8449 9.76305 18.8449C9.19681 18.8449 8.65372 18.6201 8.25304 18.22L5.68204 15.651C6.1434 15.4646 6.56243 15.1871 6.91405 14.835L9.64005 12.107L12.378 14.845C12.7702 15.2386 13.2464 15.5381 13.771 15.721L11.273 18.22Z" fill="#333333"></path><path d="M11.861 0.869019C11.3047 0.312895 10.5502 0.000488281 9.76354 0.000488281C8.97688 0.000488281 8.22243 0.312895 7.66605 0.869019L3.94604 4.58802H4.29804C4.67505 4.58708 5.0485 4.66092 5.39678 4.80528C5.74506 4.94964 6.06125 5.16164 6.32705 5.42902L9.25404 8.35702C9.30466 8.40766 9.36475 8.44784 9.4309 8.47525C9.49705 8.50266 9.56795 8.51677 9.63955 8.51677C9.71115 8.51677 9.78204 8.50266 9.84819 8.47525C9.91434 8.44784 9.97443 8.40766 10.025 8.35702L12.964 5.41702C13.2298 5.14999 13.5459 4.93827 13.894 4.79409C14.2421 4.64991 14.6153 4.57614 14.992 4.57702H15.57L11.861 0.869019ZM12.378 4.83002L9.64005 7.56702L6.91305 4.84002C6.56186 4.48789 6.14315 4.21033 5.68204 4.02402L8.25304 1.45502C8.65385 1.05516 9.19689 0.830605 9.76305 0.830605C10.3292 0.830605 10.8722 1.05516 11.273 1.45502L13.773 3.95502C13.2477 4.13712 12.7707 4.43634 12.378 4.83002Z" fill="#333333"></path><path d="M18.6559 7.74272L16.4299 5.51672H14.9919C14.4601 5.51807 13.9503 5.72898 13.5729 6.10372L10.6339 9.04272C10.37 9.30579 10.0126 9.45351 9.63993 9.45351C9.26729 9.45351 8.90985 9.30579 8.64593 9.04272L5.71693 6.11372C5.33964 5.73889 4.82976 5.52796 4.29793 5.52672H3.08493L0.869926 7.74172C0.594234 8.01693 0.375519 8.3438 0.226288 8.70363C0.0770569 9.06346 0.000244141 9.44918 0.000244141 9.83872C0.000244141 10.2283 0.0770569 10.614 0.226288 10.9738C0.375519 11.3336 0.594234 11.6605 0.869926 11.9357L3.08493 14.1507H4.29793C4.8299 14.1492 5.33981 13.9379 5.71693 13.5627L8.64593 10.6357C8.91366 10.38 9.26967 10.2372 9.63993 10.2372C10.0102 10.2372 10.3662 10.38 10.6339 10.6357L13.5729 13.5747C13.9496 13.9507 14.4597 14.1624 14.9919 14.1637H16.4299L18.6559 11.9377C18.9318 11.6625 19.1506 11.3356 19.2999 10.9756C19.4493 10.6157 19.5261 10.2299 19.5261 9.84022C19.5261 9.45055 19.4493 9.06472 19.2999 8.7048C19.1506 8.34488 18.9318 8.01795 18.6559 7.74272ZM8.05593 10.0487L5.12793 12.9777C4.90682 13.1971 4.60843 13.321 4.29693 13.3227H3.42593L1.45393 11.3497C1.05402 10.9487 0.82943 10.4055 0.82943 9.83922C0.82943 9.2729 1.05402 8.7297 1.45393 8.32872L3.42593 6.35572H4.29593C4.60812 6.3569 4.90732 6.48082 5.12893 6.70072L8.05693 9.62972C8.13344 9.70507 8.21459 9.77554 8.29993 9.84072C8.21496 9.90449 8.13444 9.97399 8.05893 10.0487H8.05593ZM18.0669 11.3487L16.0839 13.3317H14.9899C14.678 13.3309 14.3789 13.2069 14.1579 12.9867L11.2199 10.0487C11.1442 9.9735 11.0629 9.90398 10.9769 9.84072C11.0623 9.77554 11.1434 9.70507 11.2199 9.62972L14.1589 6.69072C14.3801 6.47079 14.679 6.34684 14.9909 6.34572H16.0849L18.0679 8.32972C18.4683 8.73044 18.6933 9.27374 18.6933 9.84022C18.6933 10.4067 18.4683 10.95 18.0679 11.3507L18.0669 11.3487Z" fill="#333333"></path></g><defs><clipPath id="clip0_1275:429"><rect width="19.525" height="19.524" fill="white"></rect></clipPath></defs></svg>
                              </template>
                                <div class="pix" v-if="dadosPix == false">
                                  <p style="font-weight: 500; color: #686868; padding: 1vw 15vw;">Pague com <b> Pix </b> em qualquer dia e a qualquer hora! O pagamento é instantâneo, prático e pode ser feito em poucos segundos. É muito rápido e seguro :)</p>
                                    <a style="background: #0078f5; padding: 9px 20px; color: white; border-radius: 5px;  font-size: 14px; text-transform: uppercase;" href="#" @click.prevent="payPix(SelectedOrder)">Pagar com pix</a>
                                </div>
                                <div class="result-pix" v-if="dadosPix">
                                    <br><br>
                                   <div class="sc-ibushM cdYEHE qr-code-wrapper">
                                     <div data-cy="ame-qr-code-container" class="ame-qr-code-container">
                                       <img data-cy="ame-qr-code-img" :src="dadosPix.image" alt="código QR"></div>
                                       <ul data-cy="pixInstructionsList" class="sc-heOwwK izlmnd">
                                         <span>   <b>Nome do destinatário</b><br />
                                            JLB EDUCAÇÃO ASSESSORIA EMPRESARIAL LTDA</span> <br>
                                         <li>
                                        <span>
                                         <strong>1.</strong> Abra o app do seu banco ou instituição financeira e entre no ambiente <strong class="--ignore-case">Pix</strong></span></li>
                                         <li>
                                         <span><strong>2.</strong> Escolha a opção <strong>
                                            Pagar com QR Code</strong> e escaneie o código ao lado</span>
                                            </li>
                                            <li><span><strong>3.</strong> Confirme as informações e finalize a compra</span></li>
                                            <li><span><strong>4.</strong> Após confirmação do pagamento <a href="#" @click.prevent="reload()">cliqui aqui </a> </span></li>
                                            </ul></div>
                                            <div data-cy="total" class="sc-joCieG gXKmMR">total:<strong class="--ignore-case"> {{currencyBRL(SelectedOrder.NET_PRICE)}}</strong></div>
                                </div>
                              </el-collapse-item> 
                 
                            </el-collapse>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- depois de Definir pagamento-->
                      <div class="show-result" v-if="afterPay">
                        <div class="billet" v-if="typeAfterpay == 1">
                          <h4>Pagamento por Boleto Bancário</h4>
                          <div class="row">
                            <div class="col-md-2"></div>
                            <div class="col-md-8 text-center row">
                              <br />
                              <div class="col-md-6">
                                <button
                                  @click.prevent="goBillet(resultBillet.billet)"
                                  target="_BLANK"
                                  :href="resultBillet.billet"
                                  class="btn btn-info mr-2"
                                  style="width: 100%"
                                >
                                  <i class="el-icon-tickets"></i> Ver Boleto
                                </button>
                              </div>
                              <div class="col-md-6">
                                <button
                                  @click="CancelBillet(resultBillet.barCode)"
                                  class="btn btn-danger"
                                  style="width: 100%"
                                >
                                  <i class="el-icon-tickets"></i> Cancelar Boleto
                                </button>
                              </div>
                              <div class="col-md-12 text-left">
                                <div class="copy">
                                  <br />
                                  <b>Linha digitável:</b><br />
                                  <input
                                    ref="myBillet"
                                    type="text"
                                    style="width: 100%"
                                    v-model="resultBillet.barCode"
                                    disabled
                                  />
                                  <i
                                    class="el-icon-copy-document"
                                    @click.stop.prevent="copyCode"
                                  ></i>
                                </div>
                                <div class="left">
                                  <b>Data de emissão: </b>
                                  <p>
                                    {{ dateFormat(resultBillet.issueDate) }}
                                  </p>
                                </div>
                                <div class="right">
                                  <b>Valor: </b>
                                  <p>
                                    {{ currencyBRL(resultBillet.amount) }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--Resultado método selecionado -->
                    <!-- boleto -->
                       <div
                        class="billet"
                        v-if="SelectedOrder.PAYMENT_METHOD_ID == 1"
                      >
                        <h4>Pagamento por Boleto Bancário</h4>
                        <div class="row">
                          <div class="col-md-2"></div>
                          <div class="col-md-8 text-center row">
                            <br />
                            <div class="col-md-6">
                              <button
                                @click.prevent="
                                  goBillet(SelectedOrder.BILLET_URL_PDF)
                                "
                                target="_BLANK"
                                :href="SelectedOrder.BILLET_URL_PDF"
                                class="btn btn-info mr-2"
                                style="width: 100%"
                              >
                                <i class="el-icon-tickets"></i> Ver Boleto
                              </button>
                            </div>
                            <div class="col-md-6">
                              <button
                                @click="
                                  CancelBillet(
                                    SelectedOrder.BILLET_DIGITABLE_LINE
                                  )
                                "
                                class="btn btn-danger"
                                style="width: 100%"
                              >
                                <i class="el-icon-tickets"></i> Cancelar Boleto
                              </button>
                            </div>
                            <div class="col-md-12 text-left">
                              <div class="copy">
                                <br />
                                <b>Linha digitável:</b><br />
                                <input
                                  ref="myBillet"
                                  type="text"
                                  style="width: 100%"
                                  v-model="SelectedOrder.BILLET_DIGITABLE_LINE"
                                  disabled
                                />
                                <i
                                  class="el-icon-copy-document"
                                  @click.stop.prevent="copyCode"
                                ></i>
                              </div>
                              <div class="left">
                                <b>Data de emissão: </b>
                                <p>
                                  {{ dateFormat(SelectedOrder.BILLET_DATE) }}
                                </p>
                              </div>
                              <div class="right">
                                <b>Valor: </b>
                                <p>
                                  {{
                                    currencyBRL(SelectedOrder.BILLET_NET_PRICE)
                                  }}
                                </p>
                              </div>
                            </div>
                            <div class="send-payment"></div>
                          </div>
                        </div>
                      </div>
                    <div  class="show-result">
                      <div
                        class="direct-transfer"
                        v-if="
                          SelectedOrder.PAYMENT_METHOD_ID == 2 ||
                          (SelectedOrder.PAYMENT_METHOD_ID == 4 &&
                            SelectedOrder.STATUS_ORDER_ID == 2)
                        "
                      >
                        <p>Pagamento Realizado com sucesso!</p>
                        <i class="fas fa-check-circle"></i><br />
                        <b v-if="SelectedOrder.BILLET_NET_PRICE">
                          Boleto Bancário
                        </b>
                        <b v-else>
                          {{ SelectedOrder.DIGITAL_PLATFORM }}
                        </b>
                      </div>
                    </div>
                    <div  class="show-result" v-if=" SelectedOrder.PAYMENT_METHOD_ID == 5">
                      <div
                        class="direct-transfer"
                        v-if=" SelectedOrder.STATUS_ORDER_ID == 2  "
                      >
                        <p>Pagamento Realizado com sucesso!</p>
                        <i class="fas fa-check-circle"></i><br />
                        <b >
                          Cartão de Crédito
                        </b>
                      </div>
                      <div class="" v-else>
                        <div class="direct-transfer" v-if="SelectedOrder.STATUS_ORDER_ID == 7">
                             <p style="color: #ffa500; margin-top: 20px;">Processando pagamento!</p>
                            <i class="fas fa-exclamation-circle" style="    color: #ffa500;"></i><br />
                            <b >
                             AGUARDANDO APROVAÇÃO DO CARTÃO DE CRÉDITO
                            </b>
                        </div>
                  
                      </div>
                    </div>
                          <div class="direct-transfer" v-if="SelectedOrder.STATUS_ORDER_ID == 8">
                             <p style="color: rgb(173 0 0);    margin-top: -20px;">Pagamento Recusado!</p>
                            <i class="fas fa-exclamation-triangle" style=" color: rgb(173 0 0);"></i><br />
                            <b >
                             Escolha um dos nossos métodos e realize um novo pagamento.
                            </b>
                        </div>
                     
                </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <!-- End Left Bar My Account -->
          <BrowsingHistory></BrowsingHistory>
        </div>
      </div>
    </div>
  </div>

  <!-- .block-banner / end -->
  <Footer></Footer>
  
</template>

<style scoped>
.breadcrumb-item + .breadcrumb-item:before {
  display: block;
}

.breadcrumb-item {
  position: relative;
  padding-right: 11px;
}

.breadcrumb {
  background: transparent;
  padding: 0;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 0;
  margin: 21px 0px 15px 0px;
}

.breadcrumb-item.active {
  color: #4dcbf7;
}
</style>



<script>
import Header from "../../components/Header/index.vue";
import Carousel from "./components/Carousel.vue";

import LeftBar from "./components/LeftBar.vue";
import Footer from "../../components/Footer/index.vue";
import BrowsingHistory from "../../components/BrowsingHistory/index.vue";
import StarRating from "vue-star-rating";
import Products from "../../services/Products";
import Auth from "../../services/Auth";

export default {
  name: "myaccount",
  components: {
    Header,
    Carousel,
    LeftBar,
    Footer,
    BrowsingHistory,
    StarRating,
  },
  methods: {
    reload() {
      window.location.reload();
    },
    payPix(ordem) {
        this.loadDetail = true;
        let data = {
          VS_ORDER_ID: ordem.VS_ORDER_ID,
        };
        Products.payPix(data)
          .then((r) => {
            this.dadosPix = r.data.DATA;
            this.loadDetail = false;
          })
          .catch((e) => {
            console.log(e);
            this.$notify.error({
              title: "Erro",
              message: "Algo deu errado, Tente novamente!",
            });
            this.reload();
          });
    },
    payPix2(ordem) {
      if (ordem.STATUS_ORDER_ID == 1 && ordem.PAYMENT_METHOD_ID == 6) {
        this.payPix(ordem);
      }
    },
    isCollapseF() {
      if (this.isCollapse == true) {
        this.isCollapse = false;
        this.one = 18;
        this.two = 82;
      } else {
        this.isCollapse = true;
        this.one = 6;
        this.two = 94;
      }
    },
    goTO(url) {
      this.$router.push(url);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    reloadOrderNew(dado) {
      console.log("reloadOrderNew");
      this.showModal = false;
      this.onTable = true;
      if (localStorage.getItem("token") !== null) {
        this.getOrders();
      } else {
        this.loginStatus = false;
      }
      // this.getDetails(dado);
      // this.showModal = true;
      // this.onTable = false;
      this.activetab = 1;
      this.redirectToHome();
    },
    reloadComponent(dado) {
      console.log("reloadComponent");
      this.renderComponent = false;
      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
    transferVariation(variations) {
      console.clear();
      var html = [];
      for (var obj in variations) {
        var item = {};
        item.NAME = obj;
        item.VARIATION = variations[obj];
        html.push(item);
      }
      return html;
    },
    getVariations(product, index) {
      var variations = JSON.parse(product);
      var html = [];
      for (var obj in variations) {
        var item = {};
        item.NAME = obj;
        item.VARIATION = variations[obj];
        html.push(item);
      }
      return html;
    },
    formatScore: function (value) {
      return Intl.NumberFormat("pt-BR", {}).format(value || 0);
    },
    getCarousel() {
      Products.getBanner("4").then((r) => {
        this.Carousel = r.data.DATA;
      });
    },
    CofirmRating() {
      this.loadDetail = true;
      let data = {
        P_USER_ID: JSON.parse(localStorage.getItem("userID")),
        P_VS_PRODUCT_ID: this.ProductAvaliable.VS_PRODUCT_ID,
        P_COMMENT: this.comment,
        P_STAR: this.rating,
      };
      Products.SendRating(data)
        .then((r) => {
          this.$notify({
            title: "Sucesso",
            message: "Obrigado, Avaliação Salva!",
            type: "success",
          });
          this.loadDetail = false;
          this.showModal = false;
          this.onTable = true;
          this.closedModal();
        })
        .catch((e) => {
          this.loadDetail = false;
          if (e.response.status == 403) {
            Auth.logoutUser();
          }
        });
    },
    clearRating() {
      this.comment = "";
      this.rating = 0;
      this.Evaluation = false;
      this.ProductAvaliable = {};
    },
    setRating(rating) {
      this.rating = rating;
    },
    goTO(url) {
      this.$router.push(url);
    },
    CofirmSend(order, delivery) {
      let user = parseInt(localStorage.getItem("userID"));
      let data = {
        VS_ORDER_ID: order,
        VS_DELIVERY_ID: delivery,
      };
      this.$confirm("Confirmar Recebimento?", "Atenção", {
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        type: "warning",
      })
        .then(() => {
          Products.setSend(data)
            .then((r) => {
              this.$message({
                type: "success",
                message: "Recebimento Confirmado!",
              });
              this.showModal = false;
              this.closedModal();
            })
            .catch((e) => {
              if (e.response.status == 403) {
                Auth.logoutUser();
              }
              this.$notify.error({
                title: "Erro",
                message: "Tente novamente!",
              });
            });
        })
        .catch(() => {});
    },
    sendTransfer(order) {
      this.transferLoad = true;
      let data = {
        hash: this.hashPay,
        order_item_id: order.VS_ORDER_ID,
        digital_platform_id: 1,
        user_account_id: JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
          ? JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
          : 0,
        user_id: parseInt(localStorage.getItem("userID")),
      };
      Products.TransferGenerate(data)
        .then((r) => {
          console(r.data.DATA);
          this.transferLoad = false;
          this.$notify({
            title: "Sucesso",
            message: "Pagamento Realizado!",
            type: "success",
          });
          this.showModal = false;
          this.closedModal();
        })
        .catch((e) => {
          if (e.response.data.REF == "I0056") {
            this.$notify.error({
              title: "Erro",
              message: "Hash já utilizada, tente novamente!",
            });
          } else {
            this.$notify.error({
              title: "Erro",
              message: "Algo deu errado, tente novamente!",
            });
          }
          if (e.response.status == 403) {
            Auth.logoutUser();
          }
          this.transferLoad = false;
          //teste
        });
    },
    goBillet(url) {
      window.open(url, "_blank").focus();
    },
    dateFormat(data) {
      return data.split("-").reverse().join("/");
    },
    currencyBRL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "R$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    copyCode() {
      var Url = this.$refs.myBillet.value;
      navigator.clipboard.writeText(Url);
      this.$message({
        message: "Copiado com sucesso!",
        type: "success",
      });
    },
    CancelOrder(orderID) {
      let user = JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
        ? JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
        : 0;
      this.$confirm("Cancelar Ordem: n°" + orderID, "Atenção", {
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        type: "warning",
      })
        .then(() => {
          Products.CancelOrder(user, orderID)
            .then((r) => {
              this.$message({
                type: "success",
                message: "Ordem Cancelada!",
              });
              this.showModal = false;
              this.closedModal();
            })
            .catch((e) => {
              if (e.response.status == 403) {
                Auth.logoutUser();
              }
              this.$notify.error({
                title: "Erro",
                message: "Tente novamente!",
              });
            });
        })
        .catch(() => {});
    },
    redirectToHome() {
      window.scrollTo(0, 200);
    },
    CancelBillet(digitableLine) {
      let user = parseInt(localStorage.getItem("userID"));
      let data = {
        digitableLine: digitableLine,
      };
      this.$confirm("Cancelar Boleto?", "Atenção", {
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        type: "warning",
      })
        .then(() => {
          Products.boletoCancel(user, data)
            .then((r) => {
              this.$message({
                type: "success",
                message: "Boleto Cancelado!",
              });
              this.showModal = false;
              // this.redirectToHome();
              this.closedModal();
            })
            .catch((e) => {
              if (e.response.status == 403) {
                Auth.logoutUser();
              }
              this.$notify.error({
                title: "Erro",
                message: "Tente novamente!",
              });
            });
        })
        .catch(() => {});
    },
    reloadOrder(ordem) {},
    BilletGenerate(ordem) {
      this.transferLoad = true;
      let data = {
        VS_ORDER_ID: ordem.VS_ORDER_ID,
        P_DIGITAL_PLATFORM_ID: 1,
      };
      Products.BilletGenerate(data)
        .then((r) => {
          this.$notify({
            title: "Sucesso",
            message: "Boleto gerado!",
            type: "success",
          });
          this.resultBillet = r.data.DATA;
          this.transferLoad = false;
          this.typeAfterpay = 1;
          this.beforePay = false;
          this.afterPay = true;
        })
        .catch((e) => {
          if (e.response.status == 403) {
            Auth.logoutUser();
          }
          this.transferLoad = false;
        });
    },
    dateBRL(data) {
      return data.split("-").reverse().join("/");
    },
    currencyBRL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "R$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getDetails(order) {
      this.loadDetail = true;
      let data = {
        VS_ORDER_ID: order.VS_ORDER_ID,
      };
      Products.GetOrderDetails(data)
        .then((r) => {
          if (order.STATUS_ORDER_ID == 8) {
            let dataCard = {
              VS_ORDER_ID: order.VS_ORDER_ID,
            };
            Products.resetCard(dataCard)
              .then((r) => {})
              .catch((e) => {});
          }
          this.ordersDetails = r.data.DATA;
          this.SelectedOrder = order;
          this.totalCredit = ((order.NET_PRICE * 100) / 95.01).toFixed(2);
          this.loadDetail = false;
          this.ResultShopping = 0;
          this.ordersDetails.map((item) => {
            if (item.FREE_SHIPPING == 1) {
              this.ResultShopping += Number(0);
            } else {
              this.ResultShopping += Number(item.SHIPPING_COST);
            }
          });
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
    getStatusMessage: function (statusId, STATUS) {
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
        case 7:
          return "Aguardando aprovação do cartão de crédito";
          break;
        case 8:
          return "COMPRA RECUSADA PELO OPERADOR DE CARTÃO DE CRÉDITO";
          break;
        default:
          return STATUS;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.STATUS_ORDER_ID === 1 || row.STATUS_ORDER_ID === 7) {
        return "warning-row";
      } else if (row.STATUS_ORDER_ID === 2) {
        return "success-row";
      } else if (row.STATUS_ORDER_ID === 3 || row.STATUS_ORDER_ID === 8) {
        return "danger-row";
      } else {
        return "warning-row";
      }
      return "";
    },
    rowClicked(row) {
      this.$refs.tableData.toggleRowExpansion(row);
    },
    closedModal() {
      this.clearRating();
      this.ordersDetails = "";
      this.SelectedOrder = "";
      this.typePay = "";
      (this.typeAfterpay = null), (this.beforePay = true);
      this.afterPay = false;
      this.getOrders();
      this.onTable = true;
    },
    CreateEvaluation(product) {
      this.Evaluation = true;
      this.ProductAvaliable = product;
    },
  },
  created() {
    this.canCopy = !!navigator.clipboard;
    this.getCarousel();
  },

  data() {
    return {
      dadosPix: "",
      pix: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA7oAAAFTCAYAAAAX0HAOAAAACXBIWXMAAAsSAAALEgHS3X78AAAgAElEQVR4nO3dW04byf/38ZrR3A+zgiErCPEGAhL3AbGAwJ0lywqsgLACQJYl30EWYEHuLcXZAHFWEGcFP/9X8Dwq5ltJpdNn96EO75eEMpmA6UN1d326Tn8oAAAARG2wmJ8qpd4opY6s47BUSn1USt0/HZ5sYj9GAPxC0AUAAIjUYDHfUUo9KKX2c47AWil1/HR4sqKcAPAFQRcAACBCEnI/KaX2Suy9btE9IOwC8AVBFwAAIDIVQ65B2AXgDYIuAABARGqGXIOwC8ALBF0AAIBIbBlyDcIuAOcRdAEAACLQUMg1CLsAnEbQBQAACFzDIdcg7AJwFkEXAAAgYC2FXIOwC8BJBF0AAIBAtRxyDcIuAOcQdAEAAALUUcg1CLsAnELQBQAACEzHIdcg7AJwBkEXAAAgID2FXIOwC8AJBF0AAIBA9BxyDcIugN79ySkAAAAIxkPPIVd7DtsSugGgFwRdAACAAAwW81Ol1L4je6JD7qUD2wEgUgRdAACAMLxxbC9OHdgGAJEi6AIAAITBldZcY2ewmO+6sSkAYkPQBQAACIOLY2IJugB6QdAFAAAIw8bBvXBxmwBEgKALAAAQhqVje7FhiSEAfSHoAgAAhOGjY3vx6MA2AIgUQRcAACAAT4cn90opV1pQdZflKwe2A0Ck/uLEo2myQPyefOn/fm39it3ExBRr+VLyUPwqf+oH9erp8ISxPQAAlHemlPrkwMRUF0+HJ+sS3wcArfiDw4ptDRbzPVnS4LWE2yZnWFxL6P2su0Dx0AQAIJ88l/sMu2fSugwAvSHoohZ5iL5VSh11vHTAWsb8fGCCCwAA0vUYdgm5AJxA0EVpsuj7qQRcF9bF06H3Vil1TxdnAAB+1UPYJeQCcAZBF4Uk4F5KyHXRRlp5r+jaDADATx2GXUIuAKcQdJHJg4Cb5p7ACwDATx2EXUIuAOcQdPEbmTVZB9xzj4+OXtLghi7NAAC0GnYJuQCcRNDFLwaLuW69vXZgWYImrGV5AxasBwBEr4WwS8gF4CyCLp5JK+6DLBMUmkd5GNO6CwCIWoNhl5ALwGkEXeiHnl4i6C6QVtwsunX3mCWJAACxayDsEnIBOO9PTlHcBov5e2nJDTnkKlkO6ctgMfd53DEAAFuTl74HsmpBVYRcAF6gRTdS0lX52rMZlZui1909C2NXAACop0bLLiEXgDcIuhGSkKsfbHsRH4aldGVm3C4AIFoSdh+k51OWjUzuSMgF4A2CbmQIub947rpF2AUAxEzqBnpoz9tE4N3IhI6sTw/AOwTdiBByUxF2AQCwDBZzvQLDimcjAJ8RdCNByM1F2AUAAAACQtCNACG3FMIuAAAAEAiCbuAIuZUQdgEAAIAAEHQDRsithbALAAAAeI6gGyhC7lYIuwAAAIDHCLoBIuQ2grALAAAAeIqgGxhCbqMIuwAAAICHCLoBIeS2grALAAAAeIagGwhCbqsIuwAAAIBHCLoBIOR2grALAAAAeIKg6zlCbqcIuwAAAIAHCLoeI+T2grALAAAAOI6g6ylCbq8IuwAAAIDDCLoeIuQ6gbALAAAAOIqg6xlCrlMIuwAAAICDCLoeIeQ6ibALAAAAOIag6wlCrtMIu4CnJtPZrlJKf+0k7q8v5f+FZK2U+l5xfzZyj1Pj0XBJOf+dlKFLKUdd+iy/S5+X9Xg0XDtySHozmc725Fz0de3qa+X/5Fpbc80gdpPpzH627luH4++WMo1+Zn0ej4Y3iqDrB0KuFwi7gOMm09m+PGj/lfsp99R6llZoXsZcmZeQ+8WRlyJrOTcfx6PhowPb0ympUH9z8AXVSr4+y/US/QsJhEmuwX15tr6WP/u6HvW1dkDQdRwh1yuEXcAhk+nsSB62+9xDW7eSkGUq81HcByfT2bVS6tyBTUnSx1+H3atYgtVkOtPn4dqBTSmylnPzYTwartzeVCCf9KLQz9o3Dj5nCbouI+R6ibAL9ETeJpsH7hHnoVePEnofQw5ak+nsU6I7nov0C4iL0EPVZDp7L92WfWJC7y0tvfCF9GQ5VUq97WHIRhVXBF1HEXK9RtgFOjSZzk4Jt07TQeuDhN6g7osetSJq9xJ4g3w2ydCETw5sSl1LaYFnXC+cJNfYO4+etccEXQcRcoNA2AVaJG+U38lb5dAmjQrVxmq9CqJ1UXoR+PS81ufgLNQxvJPp7E7uCT4j8MIp8jK5jwn3tsEYXRcRcoNC2AUaJm+U37ZUmV3Ll5JA8DWw81dnJum2JhMJpjIvYbfrFy4vrZnC6/zem/FoeNHCdvXOGjPYtb+t89FEHY7Ai17J8/auwYBrP2OVNXN80/SM57oHC7Muu4SQGyTCLtAAeeBeNjQecinX5nczI2oskyfVZS3DtGfNWt3EuVhLZf6+nz3zn5yb/Rrd9/V1cEzZb4cE7j1rQry6YSHoLudwj9xT7ra4x2/k/vK17+XPCLqOIOQGjbAL1NTAA1dZEyOtaB1pllTm963KfN1WTVqvGmC1Lr8rGayen0+EqPbJvcxMllf1fraR6+PGx32HP7aY1E3fSz7KXAzODE0h6DqAkBsFwi5QgVTYL2su3WLGgka5nmifpOXdtCzWacFayhhSZqDdkkyUdVni5QNht2NbzFr7KNcH5wqNkpeWdxWzyFomGrx39Z5N0O0ZITcqhF2gBJn44rpG66BZm5Jw6wBrPPVRjXOpW6/eB3lgOiQvjO5KdGkm7PZE1vt+V6GVdyNdzun9gEbUeOYuZVJB55+1BN0eEXKjRNgFMtTspqyvpVuX3yjHzlrfuOqsnWtpvaJCv6WSFVl9DZ15sUMBqjEPwQVdmbENuTdfV5jc0bshJgTdnhByo0bYBRJqvFFmEiMP1ZxULNgZgrskXRM/FVxjZ1xT/aq4lAsvJ1BLxaXRvH3pSNDtASEXhF3gPxW6VhoE3ADUCLwr6a5Jq/0WSoRd/Ux6xXHuV8U5Chi3i0rkPvBQ8mWK18NICLodI+TCQthF1Co+bDcyJohxmwGR8YnXFcrAGWOwt1Mi7C7Ho+GBL/sTsgrrmDLGGqWU7NmhQnm5SNDtECEXKQi7iFLFrsq0WAROlrR4V7I80JV5S/KC4SHnU455oeAGJhRDUyqE3GDusQTdjhBykYOwi6hUWKePyYgiUnEyMl5+bGkynV3ndI1dj0fDF97sTARK3jcJu0hVMuQG12uGoNsBQi5KIOwiCpPp7K7kDI83MjaIayIyrP/aDWkp/JLTLZaJqRwjPWHuCraK6wK/KBly19KTYxXS0SPotoyQiwoIuwhWhWUMGIcJUzG7K/HsZJKqLcgY0E8Zn8BYXQeVDC2EXTyLvbwQdFtEyEUNhF0Ep8IyBoQW/FDx5chBaC0RXZlMZ59yuou/4Hp0T+zhBeVQTpT604FtCBIhFzU935Sk/ADeqxBy7+VhS6Uaz3TFS9YILVon9LmMSaUO1V3l/ESZYQbomLzUOZCXPFn25LqgPhEhQu5/CLotIORiS4RdhOShxL1Qj8VlYiGkknGiRZV6E3bLLFMEi0z2lvWC6Q3Hyk2EXWQh5P5E0G0YIRcNIezCezLxVNEMumesjYsiEsbKhN0HKvW1ZI2J3+N4uouwiyRC7q8Iug0i5KJhhF14q+TsyszqitKkUv9CKmlZqNTX8yHnp8os94SeEHZhEHJ/R9BtCCEXLSHswjuyBEZeyNUP2FeEXFQllbODEmH3moNbnoSlrIov9RrHEXZByE1H0G0AIRctI+zCG7JcSdE6j8Gt1YfulAy7p5PpjC7x1Swzvvu1qxuMnwi78SLkZiPobomQi44QduE8mQjooWA7z2S8JVCbFXbzKm2Xk+nsiKNc2ldPthMZCLvxIeTmI+hugZCLjhF24bqHgoctY3LRmJJh946ZmEvLmnmZMboeIezGg5BbjKBbEyEXPSHswkmT6ey64H54Q8hF06RSf5zzsTslehngP6xhHQjCbvgIueUQdGsg5KJnhF04Rcblnuds0+N4NLzgrKEN0hX+LOej9xivi9gQdsNFyC2PoFsRIReOIOzCCVJBypt8al0QQoCtSW+BvB4Dl1I5BKJB2A0PIbcagm4FhFw4hrALF1wqpfLGQB7zsEVHLgpmYi6aDRwIDmE3HITc6gi6JRFy4SjCLnpTosvyBcsIoStSsTvLWw+WLsyIEWHXf4Tcegi6JRBy4TjCLvpynfN7l+PR8IYzgy5Jhf4q51e+YxZmxIiw6y9Cbn0E3QKEXHiCsItOTaaz05z74oZxueiLvGDJWqt5p+AFDRAswq5/CLnbIejmIOTCM4RddEIqQHlh4Wo8GrJUCfqU96LlSLrdA9Eh7PqDkLs9gm4GQi48RdhFF85zHrwruiyjb/KiJa8L8yUnCbEi7LqPkNsMgm4KQi48R9hFa6TS8y7n81kvF664keWt0uzTqouYEXbdRchtDkE3gZCLQBB20Za81tzH8WiYNTYS6JRUAGnVBTIQdt1DyG0WQddCyEVgCLtoFK258M14NLzPWVuXVl1Ej7DrDkJu8wi6gpCLQBF20aTTnAfwPRNQwVF5L2Bo1UX0CLv9I+S2g6BLyEX4CLtoSl5rbl4XUaA30p0+q0v9PuvqAoTdPhFy2xN90CXkIhKEXWxlMp0dKaWyAgGtuXDdh5zty3uBA0SDsNs9Qm67/gp550raqTCubCcRiF/Ln4zxQZ9MS4UOGt8LtmMvp2UDyPM2599uOXJwmR6rO5nOLjNe1pwyvhz4jw67k+nsoCB8mbBL+NoCIbd9f4S+g10ZLOa7cuG/luBLCzGatpGQ+lX+XD0dnnDjQ+vkzf3/Mn7PcjwaHnAW4LrJdKZnDL/O2MwzmbgqWjIx16e0/R+PhtQXI0MIaxfHtxu06Dbk6fBkLS1qj+pnl2jd1e+N/AnUsZIud8unw5OsmUOBtp3mfH5el1DAJfc5QfeN/DsAWnZbRcjtDm/oOmCF3ne09KKEtXQFfZQXKECvJtPZl4x712Y8Gv7D2YEvJtPZXc6Lm39irlTSoos0hLJmcTy7Ff1kVF3Q3UufDk/unw5PXskgf8ZIIo0uF8dPhycvng5Pbgi5cIHMSJv1gu6RkwTPfMzZXHpfAQlMUNUcQm73CLodezo80V1Q9Q3jFYEXQpeDA10ung5PCA5wTd5ke3mhAXDOeDR8zKmwv+GMAb8j7G6PkNsPgm5P9HhLCbwHUrARn5UVcHnpAVdlVf43EhoA32SVW1ZQADIQdusj5PaHoNszaeF9JUsbULjjoM/zhT7vBFx4IKvyT8iFr7J6IuzIOFUAKQi71RFy+0XQdYQek0l35ijo8/tKzjfgNKn0Zz2c6bYMLxX0RCDoAjkIu+URcvtH0HWInnxIujNfxX4sAnUh3ZSZZAq+yKv081IOPssqv685q0A+wm4xQq4bCLoOejo8ea9n36UrczA2tOLCUy8zNnvFgxme+5yx+bToAiUQdrMRct1B0HWUzL7LRFX+0+dPLxfEeYSPsir9tObCd5llWCqpAAoQdn9HyHULQddhEo4Iu/4yywZxI4N3ZP3crAd1VmsY4IXxaJj3soagC5RE2P2JkOueYILuYDHfGSzmp4PFfNeBzWmMhCTCrn/uZTyu9zeywWK+p68vBzYF3cq7l3I/QgiyynFWl30AKQi7hFxX/RXCTkgl/JN5CztYzNv8dRvr4fhZ/nvV5gRDOiwNFvMDex/hNB1yz7rYwMFivi9lYqelSVRM19WVLoO0Tkclc6zieDRkQjWEYJXxTOU5C1Skw+5kOjsoCHsm7AYV9gi57vI+6CZDbgd2rArgvrUda1lX8kMb4zEJu95oNeTq1lWl1JGE2i4nTXm+iRN2o/J3xs4yPheh+J6xH0H1DAO6EmPYJeS6zeuuyz2E3Dz6wXiulPoyWMy/DRbz901396Qbs/NaCbnSLf98sJh/0eVLKXXZ08ygJuzSjTkOWfdVWnMRiqxnKUEXqCmmbsyEXPd5G3QdC7lJuxJG/jdYzO+aHDdM2HVW4yFXAq5eauqbUurakbJO2I1H1jnOagUDfJNZ8ZTJ2ADUEEPYJeT6wcug63jITTqVVt73TX0gYdc5jYbcRMC9LLiJ9oGwGwdadBG0gpmXCbrAFkIOu4Rcf3gXdD0LuYbe5kvp0txIl1PCrjOaDrn7Vvdkl2/8hN14EXQBAIVCDLuEXL94FXQ9Dbm2XQkHjbTuEnZ713TIvZby7UtLAmE3ULEs7A/kVMCZ9BFoQEhhl5DrH2+CbgAh16ZbdxsJCITd3jQWcqWr8heZzMw3hN0w5d1nudcgJFnlmXsa0JAQwi4h109eBN3AQq6x31RAIOx2rsmQuyddlX0u24TdiPAABwBU5XPYJeT6y/mgG2jINRoLCITdzjQdcn3qqpyHsAsAADL5GHYJuX5zOugGHnINwq4/2gi5IQVDwi4AAMjkU9gl5PrP2aAbScg1CLvuI+SWQ9gFAACZfAi7hNwwOBl0Iwu5BmHXXYTcagi7AAAgk8thl5AbDueCbqQh1yDsuoeQWw9hFwAAZHIx7BJyw+JU0I085BqEXXcQcrdD2AUAAJlcCruE3PA4E3QJub8g7PaPkNsMwi4AAMjkQtgl5IbJiaBLyE1F2O0PIbdZhF0AAJCpz7BLyA1X70GXkJuLsNs9Qm47CLsAACBThbD7bTKd7TdxJCfT2blS6gshN0y9Bl1CbimE3e4QcttF2AUAAJlKht0dadm9m0xnu3WOpg7Kk+lM19OuC76VkOux3oIuIbcSwm77CLndIOwCAIBMJcOudiqtuzrwHhUdUR2KJ9PZ6WQ6+yL1tKJWYUKu5/7qY/MJubWYgHAgYbU2/fP6czgHPxByu9VYWQYAAOHRYXcynR2UrFPpwKsDrJJwulZKfbX+/bVSale+yiLkBqDzFl1C7lZo2W0eIbcftOwCAIBMVsvuusJR0vUL3bp7aX3tVwy5j4TcMHQadAm5jSDsNoeQ2y/CLgAAyCRh95WEzy5cjUfDY0JuGDoLuoTcRhF2t0fIdQNhFwAAZNKhU4dPpdRxiXG7dS11oB6Phu85E+HoJOgScltB2K2PkOsWwi4AAMg1Hg11q+4L3eraYODVdd+z8Wh4IK3HCEjrQZeQ2yrCbnWEXDcRdgEAQC5p3X0/Hg3/0QFVujRXDb16zO+9tODqr3uOephanXWZkNsJZmMuj5DrNmZjBgAApUhAfQ6pel1cqUfoetnLRP1MB9vv8udyPBpWmdwKHmst6BJyO0XYLUbI9QNhFwAAVDIeDZcyzhb4oZWuy4TcXtCNORsh1y90YwYAAMBWGg+6hNxeEXZ/R8j1E2EXAAAAtTUadAm5TiDs/kTI9RthFwAAALU0FnQJuU4h7BJyQ0HYBQAAQGWNBF1CrpNiDruE3LAQdgEAAFDJ1kGXkOu0GMMuITdMhF0AAACUtlXQJeR6IaawS8gNG2EXAAAApdQOuoRcr8QQdgm5cSDsAgAAoNBfdQ4RIddLJiAcSFitTf+8/hyHygAhNy6NlWUAAOC/yXS2J/WDXaXU34n66Wf5c6mUWo9HwzWnPA6Vgy4h12shhl1CbpzMuXoV+4EAACBGk+nsSCn1Ril1VFB325c/L9V/P7eS0HtL6A1bna7LhFy/hdSNmZAbt73BYn4X+0EAACAmk+nsdDKdfVNKPSilTmvU3XSd71wp9W0ynX2aTGf7JX4GHqoUdKVSScj1Xwhhl5AL7XSwmL/nSAAAEDbdgisB9066KDdBh9xPEnib+kw4onTQHSzmp/LWBGHwOewScmG7HCzmRxwRAADCM5nOdibT2Z204LYVRvelhfecIhSOUkFXwgBdBMPjY9gl5CLN3WAx500sAAABkUmmPnXY2HatQ7UO15Qj/xUGXQlBD7EfqID5FHYJucjCfQoAgIBYIbfKsMm1TDR1o5S60nVH+XuVSVhPpTszdUTPlZl1+bLFbgJwgw+zMRNyUURPTvX+6fCEMbsAAHjMCrll6mqPSqmP+s/xaJhZj5UxuHqo07sS2WZPwu5B3mfCbbktuoPFfF9mJUP4XG7ZJeSirEu6MAMA4K8KIVcH3Bfj0fB4PBreFwVSvZTQeDS8GY+GL6SeWrS00B4tu34r6rp8HfsBioyLYZeQi6qYTwAAAA+VDLm6jnksAbfWOrjj0XApgfeq4FsJux7LDLoyyzJLCcXHpbBLyEUd+9IbBQAAeKJkyNV1ylfj0fCxib0aj4bvpa6a1xpM2PVUatCVkENrbrxcCLuEXGyDVl0AADxRIeQe1G3FzaJbdwm7Ycpq0T0nFESv0bD7dHjySmbAK6JvMleEXGxpV3qlAAAAh1UMua1MDDUeDVeE3fBkBd13sR8YPGss7Kr/Au+FnjRAAm+yhVe/TdP//qqpWXMJudG7jP0AAADgMhdCrkHYDc9vywtJKwgnD0ZjSw+p/8LuWgJtqwi5kFbdo6fDk0bG8QAAgOa4FHINHXb1kkIF28XSQ55Ia9GlFQRJjbbsto2QCwu9UwAAcIyLIdegZTccvwRdCQisQYk0XoRdQi4S9llXFwAAd7gccg3CbhiSLbq0fiCP02GXkIsMTEoFAIADfAi5BmHXf8mgexT7AUEhJ8MuIRc53nJwAADol08h1yDs+u1H0NWTthASUJJTYZeQiwK7UkYAAEAPfAy5BmHXX3aL7uvYDwYqcSLsEnJR0j4HCkAKnh1Ay3wOuQZh10920KXbMqoyYbeXyX4IuajgDQcLQIqs3h5rDhawvRBCrkHY9c9z0JWgwsykqENf0F+67hoqXe0JuSiLFl0AVRB0gS2FFHINwq5fTIsu49ewjR0Ju+ddHMXBYn6tlHog5KKKwWJO2AXww2Q64wU/0JIQQ65B2PWHCbqMz0UTrgeL+ae2AoX+3MFi/k0p1UmgRnAIugBseUF3xZEC6gk55BqEXT/Qooum7cu43bumAq8E3E9y0+QNPOr6lyMHwJJZ9/G18g30LYaQaxB23UfQRVtOJfA+d2muOmGVHvMrP/dNbpi0xmFbvCQBYMuqeNKaC9QQU8g1CLtu+0u2jgOPtuzJl+7WvJYJPj7L71rJjWHHetnyWv6bMomm8bIEgC1r2BYTUQEVxRhyDR12J9PZQcH+m7Ab3P677C8maEGHzOzelDkAQN+yerN95cwA5cUccg3Crpv+9HGjAaAOXuwBUD9nXKbrMrAlQu5PdGN2z590EQUAAJHJe+lF0AVKIOT+jrDrlj+ZiAoAAEQmc3zueDRkjC5QgJCbjbDrDrouAwCA2GS16NKaCxQg5BYj7LqBoAsgJvRgASIn43Ozlhv7HPvxAfIQcssj7PaPoAsAAGJylLOvj5QEIB0htzrCbr8IugBiQrdEAG8zjgDjc4EMhNz6CLv9IegCAIAoSLflrCEMtOYCKQi52yPs9uNPWjgAAEAk8rotMz4XSCDkNoew270/Cw42AABAKN5l7MdmPBrSogtYCLnNI+x2i67LAKLxdHiy5GwDcZpMZ/s5sy3fUyyAnwi57SHsdudPKn7omL6ol/J1o5S6kj/N/wMAoA1Zk1BpHzjiwH8Iue0j7HbjL/ktm4LCDNS1kQk+9Nin5dPhSeGMloPFfFcW839TMJ4KqIIXKUCkZBKq04y9X0mlE4geIbc7+r4zmc4OCo63Cbsc7xpM12Vu8GiaLlNnT4cn/zwdnug/78uEXPVf99K1fP+xUuof/Tl62QfOELbEAwKIV1bI1W4pFwAhtw+07LaLoIum6UB6/HR48kqH1W0/++nwZCOh94UEXm6sqOsrRw6Ij1QOMyehYlkhgJDbJ8Jue0zQpQKIJlzpQPp0eNJKpUGC8wsmDUFNdF0G4nSeU3m/pdKO2BFy+0fYbYcJulQAsQ19UR48HZ68b/soSgvvGa27qIqJ94D4FLTmKl6cInaEXHcQdpv3HHRl7CRjIFGHCbmdhghp3S26GQAGIReI03VOBf5+PBpS90G0CLnuIew2y15Hl4ogqjIht5cx3vJ7Cbso4zNHCYiLVOLzJqG6okggVoRcdxF2m2MH3Y++7ww61WvINQi7KInJZoD4XOfs8Q2tuYgVIdd9hN1m/Ai6MoEQhRllOBFyDcIuCqxdKasAujGZzs5lPfY0G1pzEStCrj8Iu9v7M/EJtHqgiFMh1yDsIgf3NSAik+lsVyl1mbPHzLSMKBFy/UPY3U4y6H7wbQfQKSdDrkHYRYZbDgwQlbucivx6PBq2vkIA4BpCrr8Iu/X9EnRl5lzGrCCN0yHXIOwiYSmzygOIQEGXZSVL0wFRIeT6j7BbT7JFVzFuBSm8CLkGYRcWWnOBSEhlvmgCKlaYQFQIueEg7Fb3V8pPPBasO4e4NBpyB4v5jiz38FrK2J7cYDcy8/fj0+HJ1jdavb2DxfygxM0d4VrLJHsAAieVuoecvVzzIh+xIeSGR4fdyXRWVL81YTf68/pbi66EDFpBoFoIuXpc1Dd5kXIk3ct25M8jGVf1bbCYnzfx+2jZjR6VWiAeOuTu5uztWewVPsSFkBsuWnbLS+u6rN0QDqLXWMjVrbiDxfyTzIJZdMHpf78eLOZ3TZwAwm60dGvufewHAYjBZDq7KxiXS5dlRIWQGz7CbjmpQVdadWkNiVejIVdutnmVkDSnhF1s4YKDB4RPJp86zdnR1Xg05H6AaBBy40HYLZbVoqvDwY1cCIhLGyF3r+ZHEHZRx5KxuUD4JtPZacHkUxu57wOxXBOE3MgQdvNlBl3BW9C4uBRyDcIuqmL5ECBwEnKLng1U5hENQm68CLvZcoOurKt70/M2ohsuhlyDsIuyrlg3FwhbyZB7JpU/IIZrgpAbOcJuuqIWXSVjdak4hs3lkGsQdlFk9XR48p6jBISrZMjVk08xGR2iQMiFQdj9XWHQlYmpjnvYNnTDh5BrEHaRZUOXZSBsk+nsfYmQe8/kU4gFIRdJhN1flWnRNaGAB0d4fAq5BmEXaS6aWu8ZgHtkCaHLgg3TIZcXXogCIbrRtoAAAB5USURBVBdZCLs/lQq66ucszHQFCoePIdcg7MJ2w5q5QJh0JWwynX0pWEJIEXIRE0IuihB2/1M66IoLlhwKgs8h1yDsQnt8OjyhtwkQoMl0ptdf/1bi+ULIRTQIuSiLsFsx6Mp43QPCrtdCCLkGYTduK8blAmGS8bhFlXlFyEVMJtPZESEXVVQMu33V51tTtUWXsOu3kEKuQdiN00rKMucKCMhkOtuVrspF43G1K0IuYjGZzs6VUg+EXFRVMezuh3SAKwddRdj1VYgh1yDsxoWQCwRIWnHLdFXeyDq5LCeG4Mk4dV3HuS7YV0IuMpUMuzsSdoO5t9YKuoqw65uQQ65B2I0DIRcIjG5BmExn30q24m6kMs8EdAieNR63aDI2Qi4KlQy72uVkOtOBd9f3o1o76CrCri9iCLkGYTdshFwgINJN+ZM8V8pUqJZKqRdSWQOCJq1qX0rUuQi5KK1C2NVdmL9Il3lv/dHEhnsQgGIVU8i13T8dnjQybmuwmJeZ3RDtI+R2SMbofEr7jePRsJHnBuIlrQSXJVqpbFd0VW4X170b5DzclXz5w2RsqEVmWS5br9d1sIvxaLj07Whv1aJr0LLrpFhDrqJlNziEXCAAuhumjDX8ViHk6uv/FSEXoZMu/FV6ODAZG2qTHgC6fvtY4jPMRFXedWdu9A0dLbvOiDnk2mjZ9R8htwe07KBJk+lMh9q30hWuClpxO8R13w857pcVrg8zGVuZgAIUku7JRZOd2ZZyf3a+hbfxGxdht3eE3F8Rdv1FyO0JFV5sS8qQDrdHNe6ZS+kmRy+xDnHdd0e6jR5JwK3SQraUkLv2/RjALTLx2UPF8qjL4a1uFXa1TLZy4yLs9oaQm46w6x9Cbo+o8KIqqbjrcvOmZrhVUmm6YkblfnDdt8sKt+YaqWIj18ZNoIcHDpAyql++1JmASvcw+Oxa6G3txkXY7RwhNx9h1x+E3J5R4UURGae1J1+va3RLtm2kVeCGmWP7w3XfLOsaMddH3ToVrbjolLTuXm9xX19Luf0qdbpVX/f2Vm9chN3OEHLLIey6j5DrACq8UD8rOzvypf/7byvcNnHvI+A6JJTrXgJmlxPm2GHgpVwb27z4MdYScL2b6RZhkPkVqnavz2PK8kZCcFvWpmdQ6zcuwm7rCLnVEHbdRch1hC8VXglilzW6AaJfz12UpYsb17sjQgi6k+nsuma3S5fQhR9OaSHwduF56a1OblyE3dYQcush7LqHkOsQHyq8MpboG9eeV/QYrltaqNzke9DN235P6OviAwEXrtpiBv2+vGpkHd0irLPbCkJufayz6xZCLuo4JeR6QV/fF0qpf8aj4TEhFy3ypfJt08+9e1kr+oCQC5fp8qnLqVLqhR5yIr0PXHb0V1cbpyuxg8X8gJbdRhByt6fDrmqiZVefB6tsU/GuhpCLurjW3KVbbj/qFiom0EGHfHmObMw1wlq48JHc1/ULzAsZQmSWknOta/Oqs6CrCLtNIeQ2h7DbL0IutvEoY4bQr41cy58l2NJii76Ye4Jrz+B14hqhdyOCIeV5JaF3V3pWvJRs0WcvCz3T82MvYy4IWLURctvBmN3uEXId5tFkVOeyBALat7a+vst4wjUttmGZTGffUlpl9KRhxz7saE8T1K2s1mQzm+ym72VVABdYs6Dbs6H/23Lr70eZjGrTW4WFoFUZIbddhN3uEHId59OkND0sJRIVWmjjIkHxwbqm9Pk/JqwB8FGvFRYCV2mE3G4QdttHyPUA6+gCcZPAu6HFHoDPOpl1OQuzMZdCyO0OszG3i5ALAB7Q4+4IuQB812vQVYTdIoTc7hF220HIBQAAQGd6D7qKsJuFkNsfwm6zCLkAAADolBNBVxF2kwi5/SPsNoOQCwAAgM45E3QVYdcg5LqDsLsdQi4AAAB64VTQVYRdQq57CLv1EHIBAADQG+eCroo37BJy3UXYrYaQCwAAgF45GXRVfGGXkOs+wm45hFwAAAD0ztmgq+IJu4RcfxB28xFyAQAA4ASng64KP+zqfXpByPUKYTcdIRcAAADOcD7oqnDD7rKpYEDI7VzTYfeF52WbkAsAAACneBF0VXhh9+bp8ISQ67cmw+7m6fDklS4XHh4RQi4AAACc403QVWGE3bWEgosmPoyQ27vGwq76r3zrcnEs5cQHhFwAAAA4yaugq/wOu1dKqVdPhyfLJj6MkOuMpsPuoy4nUl5cRsgFAACAs7wLusq/sHsvE069byoUEHKd03TY1V2Z38vY3XsH95eQCwAAAKd5GXSV+2F3Iy1yOuCePR2eNNYVlZDrrEbDrvqvjK91+VFK/SPlyYUuzYRcAAAAOO8P30+RQ8FvLTMpf5Tup40j5HrhXsJpKwaLuT73b5VS+z2UA0JuJCbT2b7ca34zHg29f24AAIDw/eX7HupK92AxP+g4AK6k1fazCbhNttqmIeR6Q7fsqrbCrixH9NyLQcrEnoTev1soG7vypQi5AAAA8Ekwb+al0n8qoTOk9XYJuX5qtWW3S4PF/EiuK0JuJGjRBQAAvqPC4jhCrtd0F/YzAiJ8Q9AFAAC+83YyqhgMFvNdQq7XdEvoJ3lZAQAAAKAjBF1HDRZz3aLyhZDrPX3+vskkUgAAAAA6QNB10GAxfy8tubQEhkGfxy+Dxfw89gMBAAAAdMH7WZdDIl2V72QWXYTnerCYv2bcLgAAANAuWnQdIa19Xwi5wTuSrsy07gIAAAAtoUW3ZzIW95KAG5Udad19o5S6ejo8WcZ+QAAAAIAmEXR7It2UL2XtX8RJv9zYHyzmehmii6fDkzXlAAAAANgeQbdj0oL7loALi+7OfCSB95YWXgAAAGA7BN0OyDqqOsy8Y7kg5DCBV7fs3iql7pm0CgAAAKiOoNsSK9y+kT+BsnS39msZx6tbeT8rpR7p2gwAAACUQ9BtiIy53ZOvN7TcoiFH8nUtLb26W/NXpdSKLs4AAABAuuiDrgTU3Qo/Yn//S5lBd0/+BNq0a4/tHizm+g/dtXkl/+tzid+9JCADAAAgdNEHXQkK17TAwlM71tJURUtU6UB8w4kGAABA6P6M/QzLZD8HVqsYECJdvg+Y3AoAAAAxiD7oKsIuwkfIBQAAQFQIuoKwi0ARcgEAABAdgq6FsIvAEHIBAAAQJYJuAmEXgSDkAgAAIFoE3RSEXXiOkAsAAICoEXQzEHbhKUIuAAAAokfQzUHYhWcIuQAAAIieIugWI+zCE4RcAAAAQBB0SyDswnGEXAAAAMBC0C2JsAtHEXIBAACABIJuBYRdOIaQCwAAAKQg6FZE2IUjCLkAAABABoJuDYRd9IyQCwAAAOQg6NZE2EVPCLkAAABAAYLuFgi76BghFwAAACiBoLslwi46QsgFAAAASiLoNoCwi5YRcgEAAIAKCLoNIeyiJYRcAAAAoCKCboMIu2gYIRcAAACogaDbMMIuGkLIBQAAAGoi6LaAsIstEXIBAACALRB0W0LYRU2EXAAAAGBLBN0WEXZRESEXAAAAaABBt2WEXZREyAUAAAAa8hcHsn06vAwWcx12Pyml9kLfX1RGyAUAD02ms315tqvxaPhHE3swmc705+nPvRqPhu8pF0A5k+lsp6CevR6PhmsOZ3gm05m+V14mduyKoNsRwi4yEHIBAFGZTGe6HnS9xT7rZ+d3pdRyPBrSYy5Sk+nsSCn1Wl4MlapbT6Yz+6+vKD9hI+h2iLCLBEIuACBGOxJO6vrxs5PpbC2t3/eUpDhMprNTab3b3XKHd2I4YJPp7DqRO1bj0fCix03qDGN0O8aYXQhCLgAA29Nh524ynd1xLMOmuyZPprMHfb4bCLkx2ZOXQ/tVWr9DQNDtAWE3eoRcAACadSrj9BAgGX+re0QecX4r26b3hNfoutwTujFHi5ALAEC6g4LjsiNjMo8yWvTeKqUIu2FKdr9N0vWrpVLqq550Kuf79qwuy0xMFTiCbo8Iu9Eh5AI9kIlvdtqYcXMyne1aFe5gZ/S0juGmzclbZBbj0sdRvl+1dezt8zseDZdNf/422izXfSl5jB8n09mVUupLStit1Z01ZbbeVst54nebMtb477TKiGqinCSPU1fXhFznpxn/rI/ZRYVt2Wqb7WPa4f7XvtalfHXGKs96HHBhfde6hz9r+pg2MhU+tjNYzHcIu8Ej5MIb9pIpSU0todIEa4KNY/1Ale3Wf38pD9qs7lq6ovColLqtUmmQSp6ubL1JtAokbeSa/6iUus962MuMoe/kr8dlKgXWdjzIX6+qVAxkHKM+Np+zlq6Rzz+S1rG8/VwW7aP1mWaW3edJUKQytC+tc3uJ51/qsjryM+8KxphtzHZVnZzI2m9zfrMqiCspQ5/l78+zB7e1vFBT5Vq69b6WQHVcc9vO5fhoZ3WDU9Y9psoxzFhOpPAzZCKj6woTEa3N9VymTKVM/PNB/5xV5l9aZT5tGzZyHj9UvLbN9bFXsquqDk0vCj7v1LpG847X2rrnPZa9l5Ul43LTuizre89Zk7/LJvettyXGta6t+85jic9Nln0d1Ffy+/YrXOtXacc6UQbTllza5Ayf/JAs5ynb+3zty3W8n1FGDuzyu811V6ZMZS0vxBhdBzBmN3iEXKAdplLwaTKd/T+pOF9L5SyvoqcrELrC/k0evoXkIfo/+fz9goe1mVH2Wn5HVlfKlTU5SKntEKfWz/1W0c9iVVz3s7rsSfj+JpO9FO2nvY9F22+OiR5H+c36HadlXvJKxe2bnLe87zdhVU9O9E0qjoXkHJltyuoWa+zJ91xvuUROkXcNl+ul/PxR2XKfwrxoUB63Iu9WnG13t2KZSk78c5ko8+cF15Z5ofZJyn0umaDpzro+yo7HTC3jic+7LHEfUPYxKrjnVWa9gErS5a+VmYOtSa++lLjnKNl/fc4eSpaR/cSXLlv/k99X9VpPOzZ2GUzblp2UbTBfaeUi+T0P1r2pShmpdd3l7Gchgq4jCLvBIuQC7TMP8h9vuXULqbxR/sN8KaX+kfus/bb6rqjSL5U+Eyj1tXwjn/OP/fnW7zi2fseOVHR/mxFWgoJ5+/8u+e857O/dr9A1zfzcJq1lSo7Dg+miLPv5KrmPsp8Hcpw38v13JSu3O1ZFammdK/v3/PI5cuzO5a/6mOkWnBcljv2uhIXcSqe0VlyaroElzu+BVLALW262ZI8j3LpcS+uKaWG5lABRmnyeOXdXLe97Ga9TvqftOlSpMpXyM3W7j55LK3oqufa/VHxRlkn269uWn2fueam9gmrICji3Tbccq2YmvXo+J8kuuQWKWsyz7Ejo7LpHaNe/z+xn5XPCGF2HMGY3OIRcoBv30oUrt4VJKkXPlf3JdHYr91oT0pY53T1Npe9euphlXtPyb4/WOMIHuZ/rlszvKV1yP5gWRF0xKuqqmAgbJmReSvgrYvbjNuVz9+TNuTL3roL9NMfxxnpmXcpxLOpueVC2S2by+Od1U0wce/v86nOQ2kVTWsxMhfSmaG1Juwzp78/r5t+ANsr1ldVqc15x4ibzsqfMOW6FBLs9u2U5oWwAT27/Z+u/X1ovZNIC6o60uhVNnNWUS3n5kuahIESndVHNC2B3BYEredzyQrx+CXfdwHqtWZ/f1oumh4w6+L10o03eF99k9ALRwexFG2E8xaW8BHNd3nX3r1Wess75XdXzTtB1DGE3GIRcoDvfq3ajlPFQx1ZIeZfsBidv9k0r6GPVsWAyhsm+n+uuqDd2xUeP55pMZ2t5sL8tMVHKW/lTV7q+SwVHh+jcQCQBecf62STTRXJdFHIT+7iRffxSdh8qhNzax1/O74/t0vufMu5s12opLgy5PWi8XOtjr8OvhJ3fymOWrlpzpTtkXWdlxkdmjU3P2B7zAihZH3vuSVHx/JhZgb/Lf/+YrMcav5s2hnEn7SWYnJO0euJGznnqy7ucfc36vLW84Es9ttaQiLRhFLpFutJcCClepv3Pliaf2095EbCRe2JWb4Gl9VLT/lnTBT3rJUXqZ0n4W0nPG3uMqxkykXacky2dF1Y52ksZYrHK6fZd9rialyif5WeSP/fL8ap43e3KNif3K/VayEPQdRBh13uEXMADiUr/UcqD/8iqLNQKQRIEL6xWtqOUoHlrxmXp782ZvMquhN1KxcJUek4LWudMQH5MVhCtSrbKmtykxD7eWhWTpiaH2er4S+h7tCaYSh53uzu6C11xG1GiXJ9J99SdCq26vbfm5tiUDblVWS9MvqUE0N0KoSC3F4Nck3rCqpW8nEnaT3mBlDbcYS3DAOrUP2p9nmz7e3lh99sQDSmDVcJeUloLc1vjw9OOwVXRbNhyDzTXle1t2X0vmkRNtkGXx03a3AA6CJvttLd3Mp2lfdxm2+t4PBr+s83PF3y2Pr/HMrY92bqbdi1kYoyuoxiz6y1CLuCXj7K1aV2lzBjA1TatB1KhMD+fNq7QDmCZ4/GssKrDhmkNMj/7LmvMZSLIfkj5FrsVom5YMBWPnQbHi5ljVallKuGr/DVtm8x+Nz5LrAN+lOtkuTChSv6aWW4MB8fmJpnxe3dtLKUiZSOtLtZ4Q4QElDKz9qbNpKvqvKiybPV50mMiLYC8Sfl/26oznrWM1Jmdy/ygXFfJctJGGckKzm0dkz6lPa8qoUXXYbTseoeQC/jHfvOd7BJlKs1NvHBcZ409ktaAe2mVfZvWwmZ1D1SJsHEl/z+vm5xppVhntHrZY37PM1oAqmiqwmW2a2eLWVz/TXxW2ud/Tfk339lldi8lgNjlpqhV1+XWXNupzCid1800uYzUbon61SpnrG4bvpaYCCl1m6suqWXkvJyq+uLrY4VZn7fR+LHPeUnyv23uiTW6uJex7Og4N0pempW97ho5ZgRdxxF2vUHIBcL1vYE9+1xQMfkgFXXdAneUEkhNyF3bYUPGAZuQ/C4j6JpK82+TUCXsVFmuqAOm4plcZ7dp0fWcSpabrLG6Xbfmll1HV7rxv02ZHTh3oiiZtbVowqUkX+pe2wSD1ONRo3U47VraNpCl3jtbCJCN9wawPtfXpbgaIS9SiiZOS2rkfBB0PUDYdR4hF8BWZFzlSu7xb+2WlMSkTGlh49YKyb9MuiQVe1NhKGrtyeqiWVXT98K0iU6wPbtV9zJjHLSTrbnWrN/fU17OpE4UJeH4odstRQOy7if7ZbsVoz/SUv6pr67VBF1PEHadRcgFwpF1HafO+llRmc+4ldamo0RF3UzKtE7rmigT5vyYSTdR+fsxS3OJ1hk97rerJVPKMN29P1SZsbOGtK69IUk979KqeyNdl3+bHdeDsblKzltaL4S0VrS07zPj3D9nHKddazbxtlr8mrLN9mVNgFe11TRtG7a9trJ+/rLhoJt1f9z2nhj7XDuXKSG36LozY9Bfb9sjgKDrEcKucwi5gP9+3EtTxvWZCl4T91tTAcyrND5ay4vYsyibCnpe12OzPuqeGWssb9LLdFs29zBXx3w18aIhjVmH+N/qP+q8vHJtS7bq2jNm+zI2t6y0ZWNKrXM6mc5eOxZ0M2dmr3Ou5GVZ2j9VbTVNm2xvK7Jtm7RZr/XY/aZeguUcg03RrMse6vJenzbePHccvXiUuRm22lZmXfYMszE7g5ALhOHHsjspe2MmKdqVbo+1SOA0weNz1mdIhdtsx3NXZavr8SavwimVW/NcsJccUtJSm/fMsNdqLJoEp0vmWO0XzQxckzkmLu1zU/LK9Q9S5sxLkFMzIY8PrbmJLv1F35v2smrl62zbcj2nbfs2Y+zT7hHXZa89OcbJMdPKmgF8G1kv6i4n01npbZTtfF6LVYeolEnu0o6BS/MW1JF679/mmVbRb+emyxcHtOh6iJbd3hFygQBMprNz6x6aVhm7t9YrvJbZXOtc9+YzNiVmMf3RwiZhwwSW2xK/23R93pfA8tb6/5mkJcN0E363xRJDTbu3ur2VXe+1ig/SWqBfZJznLNvhlRLlOulGzrvdqttLa26Jyrfp0vivOXcp35O2RmhaT4o9e+3Rgm1ycemWx5Rgqa99XTe8SNsva1miXekp8cH6vtuUdXD193+T9b1TX7TJZ57mBMIm7id2GU06l5c0j/JyMjnjuOm1sWv93UiWkw8p9eqjvGOaJIF/x7SGtzDjciUyq39ai7h+ph33sX0lr7u9JnrzEHQ9RdjtDSEXCICEARNAlxljX3UF4UoqcPo++6lK2JUK4LXdfbjoZ2XcpBlve1lhIqnnpUUm05n5mU9WS3CZiuaVFZLvpFLX630uMTOwbrnZNBxG7a7i+vNXNUKdU8/fMuU6Scr5rZS3U5ngqa/W3E8NfMZvL3ZkH9eJYLwj1/Rjyszqr61Q7aqrjBZUfe/4It1wTXlOXdrMfhEi9493Kfusj8Od3BeS10fRMbppIkjJ+TvLmUxsJ+NYVHWfMabUHNO8CfvSXtIsHZlIL+2lyJ68xFhZwzj25L7R5FwNaUshfZF7e/K6e1ly6aHSCLoeI+x2jpALuEmHlJfS1XWV1SVRWmb2pGXAXiP3OGuv9Pgv+ewjq2LwKBXEZc7veSM/8yOoVhhL9iHRWlWlVcAEVvtnC+9ZUsl9LZUhsx6proh8TAt/VsuQ3cKmf+fnhieOurCWF9ItEG/l+CwzWqx2rUr9rlVxukjuR6LybELPfdq5TbTS/NvBkkdKyvVrKdfLJst1imSrrvJ0bG7edfYhpdWxqYDUOXkRdFXQtbZq99Szghlyq3yeLq9pM3nXopdck+s12ercGLknHOe8cNnxcf1aeS4cZZzXtu9jtxnHrJPrjqDrOcJuZwi5gNuO7LGWJRf4vy/TcjkeDY9lLNelVTE+rfB7rqqEPwmd11alpHSrWsrPFq2da//smbRYnFvdhc9L7qOROQa5Dql4HkgY3bcDZsXtytpnU3m+rnluVy0/e/et1v1Gy7VNjvNFIkS4OtNymqVcZ5nBXF5a/Vuzgm2OpVNdmGWfNlYr/rafp4cxvDCzv9f8mI30Xml8pnS5v61kf5sInL+9LJOJ/F7VWPfVWfJSJHl9d0LusfdbXHebbc4DQTcAhN3WEXIBt93L2KzX1vizNKbbmW6xe6zSpU4qlPdS+XtTopK1rPN7LFfye1Y1ft787Lrqz+oWmMl09kFa97LGQBrmeK6lC1peN71N3WVGJLAdyJhlc+zzAodZd3cl27XKm8BRKs+PEuzzlpEx+/rVbmGV8XtNMtt7K+XtdUF3vtrlOuU4mIpw2625tcuD/KyZKG5V5RqRlzmf5TxnXcMb6xx8NZO5yQsk+xxk/c60slal/rBOOTaZ+6e780v5fZfoRZJmmbhe04Ke3tZj6R1xWnKJF3M+P5ftRVKX9OQ4sHrO7Jeo+y6tclNYZuR8v0rc7/PuOabMmN+xlvtvVhnf9tqqXMaslwTvclp3lxkvK7faXrnuPli/O8vSvsfKebDnqlA510LqdfPHNhsOtwwW8x3CbuMIuYiOVCBSK+/j0dCZ54YEjP20FlOra61qc3kIq0trq7+nT1Z34GeudGdt89gnPtuZ2XkT5brRc5G47g8CWVIoV6JsV34x5KpE+W1svxKf69QxS14bbVy3Id3v7bLf9bXe1fNZI+gGhrDbKEIuoiQPwG8p+64rDq9cOSZ5QRdA5evpi9QddKtwlfG9AOAk1tENDOvsNoaQi2jJG/rkJCIbmagEQGBkDLp5Qd7YBEIA0CeCboAIu1sj5CJ6sozLgYz31BXfVyF2ywViprsQWhOtqaaWgwEAFzAZVaCYoKo2Qi4gZNxO8OP0gBjI+MLk7Lz2JEP3TS4HAwB9o0U3YLTsVkbIBQCEasdarmjfCrkbGefO0AQAQWEyqggwQVUphFwAQLBkplN7+ZmNTDBHrw0AQSLoRoKwm4uQCwAAAASEoBsRwm4qQi4AAAAQGIJuZAi7vyDkAgAAAAEi6EaIsPuMkAsAAAAEiqAbKQm7dzIxRWzunw5PmF0SAAAACBRBN3KDxVyvqXce0VG4eDo8uXFgOwAAAAC0hKALHXaPpHV3J+CjobsoHz8dnrCMAgAAABC4PznBeDo8eVRKvVJKhRoC9f69IOQCAAAAcaBFF78YLOa6G/NlIK27uhX3TII8AAAAgEjQootfyPjVF3rCJs+PzI204hJyAQAAgMjQootMg8VcLz+kJ6va9+go6YB+9XR4snZgWwAAAAD0gKCLQoPFXAfdt0qpU4ePFgEXAAAAwDOCLkobLOa7EnZ16N114MjpUPtBd1N+OjzZOLA9AAAAABxA0EUtsiTRG6XUUccTV61lFuUPT4cnK84eAAAAgCSCLrYmY3l14H2tlNprOPhuZNmjz/pPwi0AAACAIgRdNE66OO/KJFZ/S/hVEoD3Un7fSgKt+e//k3C7ZswtAAAAgEqUUv8fzfobl8kZCoEAAAAASUVORK5CYII=",
      one: 6,
      two: 94,
      totalCredit: 0,
      renderComponent: true,
      key: null,
      globalVariations: [],
      Variations: {},
      ResultShopping: 0,
      onTable: true,
      Carousel: "",
      ProductAvaliable: {},
      Evaluation: false,
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
      typePay: null,
      transferLoad: false,
      beforePay: true,
      afterPay: false,
      resultBillet: "",
      typeAfterpay: null,
      hashPay: null,
      userTypeDocument: 0,
      rating: null,
      comment: "",
      isCollapse: true,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    //verifica login
    if (localStorage.getItem("token") !== null) {
      this.getOrders();
      this.loginStatus = true;
      this.userTypeDocument = JSON.parse(localStorage.getItem("TDI"));
    } else {
      this.loginStatus = false;
    }
  },
};
</script>

<style scoped>
.avaliar {
  position: absolute;
  background: white;
  width: 500px;
  height: 400px;
  top: 0;
  bottom: 0;
  z-index: 1031;
  margin: auto;
  left: 0;
  right: 0;
}

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
  max-width: 70%;
  margin: 0 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  background: #fff;
  min-width: 70%;
  min-height: 50%;
  max-height: -webkit-max-content;
  max-height: -moz-max-content;
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
  margin-bottom: 50px;
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
  top: 0px;
  right: 0;
  width: 130px;
  padding: 1px 4px;
  height: 40px;
  color: white;
  text-align: center;
  font-size: 20px;
  background: #0078f5 !important;
  z-index: 30;
}
.modal__close i {
  color: white;
}
</style>
<style scoped>
.myorder .BrowsingHistory {
  margin-top: 50px;
}

.myorder .table thead {
  background: #191928;
  border: none !important;
  color: white;
}

.myorder .table tbody th {
  padding: 20px 10px;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  background: #fbfbfb;
}
.myorder .table tbody tr:hover th {
  background: #e8f4ff;
}
.myorder .table a,
a:hover {
  color: #0180ed;
}
.myorder .dark-mode div ::v-deep(.modal-content) {
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
  padding: 15px 0px 0px 2vw;
  box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
  background: #f5f5f5;
  border-bottom: 1px solid #ebebeb;
}
.content {
  background: #fcfcfc;
  border-bottom: 1px solid #ebebeb;
}
.modal__content .header b {
  color: #8c8c8c;
  font-size: 19px;
}

.modal__content .header h4 {
  text-transform: uppercase;
  color: #0078f5;
  font-size: 30px;
}
.myorder .detalhes {
  padding: 2vw 2vw;
}
.myorder .detalhes h2 {
  font-size: 18px;
  color: #4c4c4c;
  text-transform: uppercase;
}
.myorder .detalhes .product_info {
  margin-bottom: 10px;
  padding: 0.5vw;
  background: #f5f5f5;
  box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
  border-radius: 2px;
  width: 100%;
  margin-left: 0px;
  border-left: 2px solid #0078f5;
}

.myorder .detalhes .product_info b {
  color: #8c8c8c;
  font-size: 12px;
}

.myorder .detalhes .product_info h5 {
  color: #191928;
  font-size: 12px;
  margin-top: 5px;
}

.myorder .frete .product_info {
  border-left: 2px solid #0078f5;
}
.myorder .frete p {
  margin: 0;
  font-size: 12px;
}
.myorder .frete .product_info h5 {
  color: #191928;
  font-size: 15px;
}

.myorder .frete .product_info b {
  color: #616161;
  font-size: 15px;
}
.myorder .totals {
  padding: 2vw 0px 0px 2vw;
}
.myorder .totals p {
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

.myorder .box {
  border: 2px solid #eee;
  padding: 5px;
  padding-left: 15px;
  background-color: white;
}

.myorder .tags {
  padding: 3px;
  background-color: #eee;
  border-radius: 2px;
  border: 1px solid #bbb;
  margin-right: 2px;
}

.myorder .tags span {
  background-color: #ffcdd2;
  font-size: 11px;
  cursor: pointer;
  padding: 2px;
  color: #d32f2f;
  border: 1px solid #ef9a9a;
}

.myorder tr {
  cursor: pointer;
}

.myorder .add-suppliers {
  margin-top: 10px;
  border: 1px solid #0a285c;
  color: #ffffff;
  background-color: #0a285c;
}

.myorder .mb-5,
.myorder .my-5 {
  margin-bottom: 0rem !important;
}

.myorder .title-modal h2 {
  margin: 5px 0px;
  margin-top: -40px;
}

.myorder .el-table .cell,
.myorder .el-table--border td:first-child .cell,
.myorder .el-table--border th:first-child .cell {
  padding-left: 0;
}

.myorder .el-table .cell {
  padding-left: 0;
}
.myorder .el-select {
  width: 100%;
}
.myorder .error-msg {
  background: red;
  border-radius: 4px;
  padding: 0px 0px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.myorder .container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.myorder .tabs {
  overflow: hidden;
  margin-left: 0px;
  margin-bottom: 0px;
}

.myorder .tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.myorder .tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  border-top: 2px solid #b7b7b7;
  transition: background-color 0.2s;
  border-right: none;
  font-weight: bold;
  color: #b7b7b7;
  margin-right: 5px;
  text-transform: uppercase;
  background: #fbfbfb;
  margin-bottom: 0px;
}
.myorder .tabs a:last-child {
}

/* Change background color of tabs on hover */
.myorder .tabs a:hover {
  background-color: #f4f4f4;
  border-top: 2px solid #0078f5;
  color: #0078f5;
}

/* Styling for active tab */
.myorder .tabs a.active {
  color: #0a285c;
  border-top: 2px solid #0a285c;
  cursor: default;
}

/* Style the tab content */
.myorder .tabcontent {
  padding: 5px 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
}

@media (max-width: 1400px) {
  .modal-content {
    top: 55px;
  }
}

.methods-pay {
  text-align: center;
  margin-bottom: 40px;
}

.methods-pay .el-radio {
  width: 100%;
}
.methods-pay .item {
  padding: 1vw 0vw;
  background: white;
  border: 2px solid #e2e8f0;
  /* color: red; */
  border-radius: 10px;
}
.methods-pay .is-checked .item {
  color: #0078f5 !important;
  border: 2px solid #0078f5;
}

.methods-pay .item i {
  font-size: 50px;
  margin-bottom: 10px;
}

.cancel {
  background: #790000;
  padding: 15px 0px;
  text-align: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.copy i {
  position: absolute;
  font-size: 30px;
  background: #0078f5;
  color: white;
  padding: 10px;
  cursor: pointer;
  right: 15px;
}

.copy i:hover {
  background: rgb(4, 52, 104) !important;
}

.copy input {
  width: 100%;
  height: 50px;
  padding-left: 15px;
  margin-bottom: 15px;
}
.show-result h4 {
  color: #191928;
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 15px;
}

.show-result b {
  color: #191928;
  text-transform: uppercase;
}

.show-result p {
  color: #191928;
  text-transform: uppercase;
}

.show-result .left {
  float: left;
  width: 50%;
}
.show-result .right {
  float: right;
  width: 50%;
  text-align: right;
}
.send-row {
  padding-bottom: 50px;
}
.el-message-box__status.el-icon-warning {
  color: #e63c3c !important;
}
.direct-transfer i {
  font-size: 70px;
  color: #2c6d03;
  margin-bottom: 15px;
}

.direct-transfer p {
  font-size: 25px;
  color: #2c6d03;
  font-weight: 600;
  margin-top: 80px;
}
</style>
<style>
#myorder .myorder .el-loading-mask {
  z-index: 9 !important;
}
#myorder .modal__content .el-loading-mask {
  z-index: 9 !important;
}
#myorder .modal-content {
  margin-top: 80px;
}
#myorder .modal-content .content {
  border-bottom: 1px solid #ababab;
}
#myorder .img-product img {
  width: auto;
  max-height: 110px !important;
  margin-left: -15px;
}
#myorder .product_info h4 {
  font-size: 15px;
}
#myorder .product_info p {
  margin-bottom: 0.5rem;
}
.avaliar-body {
  position: fixed;
  background: rgb(0 0 0 / 61%);
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999999999;
}
.Avaliar {
  width: 70%;
  padding: 0vw 3vw;
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  height: 220px;
}
</style>
<style scoped>
.el-radio__input {
  display: none;
}
.myorders {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  align-content: space-between;
}
</style>
<style>
#myorder .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 680px;
}
#myorder .el-menu--collapse {
  height: 680px;
}

.myorders .two {
  margin-bottom: 50px;
  padding-left: 1vw;
}

.myorders .two .contenttwo {
  overflow-y: scroll;
  height: 600px;
  padding-right: 1vw;
}
.el-collapse-item__header {
  padding: 1vw 2vw;
}
.el-collapse-item__header .icone {
  font-size: 20px;
  margin-left: 15px;
}
.credit-card {
  padding: 1vw 2vw;
}
.BrowsingHistory {
  margin-top: 50px;
}
.ejAnCG .qr-code-wrapper {
  margin-left: 0px;
}
.cdYEHE {
  display: flex;
  width: 100%;
  --qrCodeImgSize: 210px;
  padding: 0vw 10vw;
}
.cdYEHE > .ame-qr-code-container {
  width: var(--qrCodeImgSize);
  height: var(--qrCodeImgSize);
  margin-left: calc(var(--qrCodeImgMargin) * -1);
  flex-shrink: 0;
}
.cdYEHE > .ame-qr-code-container > img {
  width: 100%;
  height: 100%;
}
.izlmnd {
  width: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  color: rgb(102, 102, 102);
}
.izlmnd li {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.izlmnd > li {
  margin-bottom: 0.5rem;
}
.gVqMhg {
  --iconWidth: 2rem;
  min-height: var(--iconWidth);
  display: flex;
  min-width: var(--iconWidth);
  background-color: rgb(119, 182, 168);
  border-radius: calc(var(--iconWidth) / 2);
  padding: 1px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}
.gVqMhg > img {
  margin: auto;
}
.gXKmMR {
  color: rgb(51, 51, 51);
  font-size: 1.5rem;
  margin-top: 1.5rem;
  font-weight: bold;
  width: 100%;
  max-width: 100%;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border-top: 1px solid rgb(230, 229, 230);
  padding-top: 1rem;
  padding: 1vw 12vw;
}
.gXKmMR strong {
  text-transform: capitalize;
}

.sc-heOwwK span {
  font-size: 15px;
  text-align: left;
  line-height: 20px;
}
</style>

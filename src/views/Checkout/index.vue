<template>
  <div id="checkout">
    <Header></Header>
    <div class="container" v-if="productsCart.length == 0">
      <h1 style="text-align: center; font-size: 50px; margin-top: 300px">
        Carrinho Vazio
      </h1>
    </div>
    <div class="container" v-else v-loading="globalLoading">
      <div class="px-4 px-lg-0">
        <!-- For demo purpose -->
        <div class="container py-5 text-center">
          <h1 class="display-4">Finalizar Compra</h1>
        </div>
        <!-- End -->

        <div class="pb-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                <!-- Shopping cart table -->
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" class="border-0 bg-light">
                          <div class="p-2 px-3 text-uppercase"></div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                          <div class="p-2 px-3 text-uppercase">Produto</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                          <div class="py-2 text-uppercase">Preço</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                          <div class="py-2 text-uppercase">Quantidade</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                          <div class="py-2 text-uppercase">Remover</div>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="(product, index) in productsCart"
                        :key="index"
                        style="
                          background: rgb(248 249 250 / 14%);
                          border-bottom: 1px solid #eeeeee;
                        "
                      >
                        <th
                          scope="row"
                          class="border-0"
                          style="text-align: center"
                        >
                          <img
                            v-if="product.IMAGE_LIST"
                            class="product-image__img img-"
                            style="width: auto; max-height: 70px !important"
                            :src="
                              product.IMAGE_LIST != null
                                ? product.IMAGE_LIST[0]
                                : ''
                            "
                            alt=""
                          />
                          <img
                            v-else
                            style="width: auto; max-height: 70px !important"
                            src="../../assets/images/default.png"
                            alt=""
                          />
                        </th>
                        <th scope="row" class="border-0">
                          <div class="p-2">
                            <div class="ml-3 d-inline-block align-middle">
                              <h5 class="mb-0">
                                <a
                                  href="#"
                                  class="text-dark d-inline-block align-middle"
                                  >{{ product.PRODUCT_NAME }}</a
                                >
                              </h5>
                              <span
                                class="
                                  text-muted
                                  font-weight-normal font-italic
                                  d-block
                                "
                              >
                               <div class="" v-if="product.VARIATIONS">
                              {{ getVariations(product.VARIATIONS, index)}}
                              <ul style="display: block; list-style-type: none; margin-block-start: 0; margin-block-end: 0; margin-inline-start: 0px; margin-inline-end: 0px; padding-inline-start: 0;">
                                <li  v-for="(item, index) in transferVariation(globalVariations[index])" :key="index" >
                                  <p style="margin-bottom: 0; font-size: 10px;     position: relative;" v-if="item.NAME == 'COR'"> <b>{{item.NAME}}: </b> <div
                                    :style="
                                    'background:' +
                                   item.VARIATION +
                                    ';color:' +
                                    item.VARIATION +
                                    ';border: 1px solid #19192894; width: 15px; display: inline; height: 15px; border-radius: 50%; display: inline; position: absolute; left: 30px; top: 0px;'
                                  "
                                  ></div>  </p>
                                  <p style="margin-bottom: 0; font-size: 10px;"  v-else> <b>{{item.NAME}}: </b>  {{item.VARIATION}}</p>
                                </li>
                              </ul>
                            </div>
                              </span>
                            </div>
                          </div>
                        </th>
                        <td class="border-0 align-middle">
                          <strong
                            v-if="
                              product.SALE_PRICE == product.SALE_PRICE_DISCOUNT
                            "
                          >
                            {{
                              currencyBRL(product.SALE_PRICE * product.amount)
                            }}</strong
                          >
                          <strong v-else>
                            {{
                              currencyBRL(
                                product.SALE_PRICE_DISCOUNT * product.amount
                              )
                            }}</strong
                          >
                        </td>
                        <td class="border-0 align-middle">
                          <el-input-number v-if="freeButton"
                            v-model="product.amount"
                            @change="ChangeAmount(product)"
                            :min="1"
                            :max="99"
                          ></el-input-number>
                          <el-input-number v-else
                            disabled
                            v-model="product.amount"
                            :min="1"
                            :max="99"
                          ></el-input-number>
                        </td>
                        <td class="border-0 align-middle">
                          <a v-if="freeButton"
                            href="#"
                            class="text-dark"
                            @click.prevent="removeFromCart(index)"
                            ><i class="fa fa-trash"></i
                          ></a>
                           <a v-else
                       style="pointer-events: none; color: #797979!important;"
                            href="#"
                            class="text-dark"
                            ><i class="fa fa-trash"></i
                          ></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- End -->
              </div>
            </div>

            <div
              class="row py-5 p-4 bg-white rounded shadow-sm"
              v-loading="loadShipping"
            >
              <div class="col-lg-6">
                <div
                  class="
                    bg-light
                    rounded-pill
                    px-4
                    py-3
                    text-uppercase
                    font-weight-bold
                  "
                >
                  Frete
                </div>

                <!--
                <el-alert
                  v-if="loginStatus == false"
                  title="Aviso"
                  type="success"
                  description="Frete grátis disponível para algumas regiões, faça login ou cadastre-se !"
                  :closable="false"
                  show-icon
                >
                </el-alert>
                <el-alert
                  v-else
                  title="Frete Grátis"
                  type="success"
                  :closable="false"
                  description="Para PR, RS, SC e SP frete grátis a partir de R$ 300,00 reais, MG e RJ a partir de R$ 350,00  reais. Envios acima de 4kg não se aplicam para o frete grátis."
                  show-icon
                >
                </el-alert>
                -->
                <div class="p-4">
                  <div class="address-card__row" v-if="userDATA">
                    <h5>Endereço:</h5>
                    Rua: {{ userDATA.ADDRESS }}<br />
                    Número:{{ userDATA.NUMBER }} <br />
                    CEP: {{ userDATA.ZIP_CODE }}<br /><br />
                  </div>
                  <div
                    class="input-group mb-4 border rounded-pill p-2"
                    v-if="!loginStatus"
                  >
                    <input
                      v-model="zipCode"
                      type="number"
                      placeholder="CEP"
                      aria-describedby="button-addon3"
                      class="form-control border-0"
                      maxlength="8"
                    />
                    <div class="input-group-append border-0">
                      <button
                        v-if="zipCode.length >= 8"
                        id="button-addon3"
                        type="button"
                        class="btn btn-info px-4 rounded-pill"
                        @click="shippingCalc()"
                      >
                        Calcular Frete
                      </button>
                      <button
                        v-else
                        disabled
                        id="button-addon3"
                        type="button"
                        class="btn btn-dark px-4 rounded-pill"
                      >
                        Calcular Frete
                      </button>
                    </div>
                  </div>
                  <div class="result" v-if="loginStatus">
                    <div
                      class="fretes text-left row"
                      v-for="(item, index) in ResultShopping.ORDER_ITEMS"
                      :key="index"
                    >
                      <div
                        class="main"
                        v-if="
                          estado == 'SP' ||
                          estado == 'SC' ||
                          estado == 'PR' ||
                          (estado == 'RS' && parseInt(item.WEIGHT) < 4)
                        "
                      >
                        <!-- free API true-->
                        <div class="main-header" v-if="item.FREE_SHIPPING != 0">
                          <div
                            class="header"
                            v-if="item.PRICE >= 300"
                            style="width: 100%"
                          >
                            <div class="bar"><span>100%</span></div>
                          </div>

                          <div
                            class="header-text"
                            v-if="item.FREE_SHIPPING != 0"
                          >
                            <p class="one" style="font-size: 14px">
                              Parabéns você atingiu o
                              <b>Frete Grátis</b>
                            </p>
                          </div>
                        </div>
                        <!-- free API true end -->
                        <!-- free API false-->
                        <div class="main-header" v-else>
                          <div
                            class="header"
                            v-if="item.PRICE >= 300"
                            style="width: 100%"
                          >
                            <div class="bar"><span>100%</span></div>
                          </div>

                          <div
                            class="header"
                            v-else
                            :style="calcPercentStyle(item)"
                          >
                            <div class="bar">
                              <span> {{ calcPercent(item) + "%" }}</span>
                            </div>
                          </div>

                          <div
                            class="header-text"
                            v-if="item.FREE_SHIPPING != 0"
                          >
                            <p class="one" style="font-size: 14px">
                              Parabéns você atingiu o
                              <b>Frete Grátis</b>
                            </p>
                          </div>
                          <div class="header-text" v-else>
                            <p
                              class="one"
                              style="font-size: 14px"
                              v-if="item.PRICE >= 300"
                            >
                              Faltam
                              <b> {{ currencyBRL(300 - item.PRICE) }}</b> em
                              produtos para atingir o
                              <b>Frete Grátis</b>
                            </p>
                            <p class="one" style="font-size: 14px" v-else>
                              Faltam
                              <b> {{ currencyBRL(300 - item.PRICE) }}</b> em
                              produtos para atingir o
                              <b>Frete Grátis</b>
                            </p>
                            <p class="two">
                              <b
                                style="color: #17a2b8; cursor: pointer"
                                @click.prevent="
                                  goTO(
                                    '/search-distribution-center/' +
                                      item.SUPPLIER_ID
                                  )
                                "
                                >Ver mais
                              </b>
                              produtos desse fornecedor
                            </p>
                          </div>
                        </div>
                        <!-- free API false end -->
                        <div class="produtos">
                          <p style="font-weight: bold">PRODUTOS:</p>
                          <p
                            v-for="(list, index) in item.PRODUCT_LIST"
                            :key="index"
                          >
                            - {{ list.NAME }} ( {{ list.UNITS }} )
                          </p>
                        </div>
                        <div class="item footer" style="padding: 0px 15px">
                          <div
                            class="one text-left"
                            style="width: 50%; float: left"
                          >
                            <b>Data Estimada Entrega: </b>
                            <p>{{ dateFormat(item.DT_ESTIMATED_DELIVERY) }}</p>
                          </div>
                          <div
                            class="two text-right"
                            style="width: 50%; float: left"
                          >
                            <b>Preço: </b>
                            <p
                              style="margin-bottom: 0; color: #17a2b8"
                              v-if="item.FREE_SHIPPING != 0"
                            >
                              Grátis
                            </p>
                            <p v-else>
                              {{ currencyBRL(item.SHIPPING_PRICE) }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="main"
                        v-else-if="
                          estado == 'RJ' ||
                          (estado == 'MG' && parseInt(item.WEIGHT) < 4)
                        "
                      >
                        <!-- free API true-->
                        <div class="main-header" v-if="item.FREE_SHIPPING != 0">
                          <div
                            class="header"
                            v-if="item.PRICE >= 300"
                            style="width: 100%"
                          >
                            <div class="bar"><span>100%</span></div>
                          </div>
                          <div
                            class="header"
                            v-else
                            :style="calcPercentStyle(item)"
                          >
                            <div class="bar">
                              <span> {{ calcPercent(item) + "%" }}</span>
                            </div>
                          </div>

                          <div
                            class="header-text"
                            v-if="item.FREE_SHIPPING != 0"
                          >
                            <p class="one" style="font-size: 14px">
                              Parabéns você atingiu o
                              <b>Frete Grátis</b>
                            </p>
                          </div>
                        </div>
                        <!-- free API true end -->
                        <!-- free API false-->
                        <div class="main-header" v-else>
                          <div
                            class="header"
                            v-if="item.PRICE >= 300"
                            style="width: 100%"
                          >
                            <div class="bar"><span>100%</span></div>
                          </div>
                          <div class="header" v-else>
                            <div class="bar"><span>50%</span></div>
                          </div>

                          <div
                            class="header-text"
                            v-if="item.FREE_SHIPPING != 0"
                          >
                            <p class="one" style="font-size: 14px">
                              Parabéns você atingiu o
                              <b>Frete Grátis</b>
                            </p>
                          </div>
                          <div class="header-text" v-else>
                            <p
                              class="one"
                              style="font-size: 14px"
                              v-if="item.PRICE >= 300"
                            >
                              Faltam
                              <b> {{ currencyBRL(300 - item.PRICE) }}</b> em
                              produtos para atingir o
                              <b>Frete Grátis</b>
                            </p>
                            <p class="one" style="font-size: 14px" v-else>
                              Faltam
                              <b> {{ currencyBRL(300 - item.PRICE) }}</b> em
                              produtos para atingir o
                              <b>Frete Grátis</b>
                            </p>
                            <p class="two">
                              <b
                                style="color: #17a2b8; cursor: pointer"
                                @click.prevent="
                                  goTO(
                                    '/search-distribution-center/' +
                                      item.SUPPLIER_ID
                                  )
                                "
                                >Ver mais
                              </b>
                              produtos desse fornecedor
                            </p>
                          </div>
                        </div>
                        <!-- free API false end -->
                        <div class="produtos">
                          <p style="font-weight: bold">PRODUTOS:</p>
                          <p
                            v-for="(list, index) in item.PRODUCT_LIST"
                            :key="index"
                          >
                            - {{ list.NAME }} ( {{ list.UNITS }} )
                          </p>
                        </div>
                        <div class="item footer" style="padding: 0px 15px">
                          <div
                            class="one text-left"
                            style="width: 50%; float: left"
                          >
                            <b>Data Estimada Entrega: </b>
                            <p>{{ dateFormat(item.DT_ESTIMATED_DELIVERY) }}</p>
                          </div>
                          <div
                            class="two text-right"
                            style="width: 50%; float: left"
                          >
                            <b>Preço: </b>
                            <p
                              style="margin-bottom: 0; color: #17a2b8"
                              v-if="item.FREE_SHIPPING != 0"
                            >
                              Grátis
                            </p>
                            <p v-else>
                              {{ currencyBRL(item.SHIPPING_PRICE) }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- peso acima dos 4 kilos ou estado fora da regra -->
                      <div class="main fora" v-else>
                        <el-alert
                          v-if="item.WEIGHT >= 4"
                          title="Limite de peso excedido para o frete grátis."
                          type="warning"
                          show-icon
                          :closable="false"
                        >
                        </el-alert>
                        <div class="produtos">
                          <p style="font-weight: bold">PRODUTOS:</p>
                          <p
                            v-for="(list, index) in item.PRODUCT_LIST"
                            :key="index"
                          >
                            - {{ list.NAME }} ( {{ list.UNITS }} )
                          </p>
                        </div>
                        <div class="item footer" style="padding: 0px 15px">
                          <div
                            class="one text-left"
                            style="width: 50%; float: left"
                          >
                            <b>Data Estimada Entrega: </b>
                            <p>{{ dateFormat(item.DT_ESTIMATED_DELIVERY) }}</p>
                          </div>
                          <div
                            class="two text-right"
                            style="width: 50%; float: left"
                          >
                            <b>Preço: </b>
                            <p
                              style="margin-bottom: 0; color: #17a2b8"
                              v-if="item.FREE_SHIPPING != 0"
                            >
                              Grátis
                            </p>
                            <p v-else>
                              {{ currencyBRL(item.SHIPPING_PRICE) }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="result" v-else>
                    <br />
                    <el-alert style="margin-bottom: 25px;"
                      v-if="loginStatus == false"
                      title="Aviso"
                      type="success"
                      description="Frete grátis disponível para algumas regiões, faça login ou cadastre-se !"
                      :closable="false"
                      show-icon
                    >
                    </el-alert>
                    <div
                      class="fretes text-left row"
                      v-for="(item, index) in ResultShopping.ORDER_ITEMS"
                      :key="index"
                    >
                      <div class="main fora">
                        <div class="produtos">
                          <p style="font-weight: bold">PRODUTOS:</p>
                          <p
                            v-for="(list, index) in item.PRODUCT_LIST"
                            :key="index"
                          >
                            - {{ list.NAME }} ( {{ list.UNITS }} )
                          </p>
                        </div>
                        <div class="item footer" style="padding: 0px 15px">
                          <div
                            class="one text-left"
                            style="width: 50%; float: left"
                          >
                            <b>Data Estimada Entrega: </b>
                            <p>{{ dateFormat(item.DT_ESTIMATED_DELIVERY) }}</p>
                          </div>
                          <div
                            class="two text-right"
                            style="width: 50%; float: left"
                          >
                            <b>Preço: </b>
                            <p
                              style="margin-bottom: 0; color: #17a2b8"
                              v-if="item.FREE_SHIPPING != 0"
                            >
                              Grátis
                            </p>
                            <p v-else>
                              {{ currencyBRL(item.SHIPPING_PRICE) }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div
                  class="
                    detalhes
                    bg-light
                    rounded-pill
                    px-4
                    py-3
                    text-uppercase
                    font-weight-bold
                  "
                >
                  Detalhes do Pedido
                </div>
                <div class="p-4">
                  <!--
                <p class="font-italic mb-4" v-if="loginStatus">
                  Nickname escolhido: {{ getNickname() }}
                </p>
                -->
                  <ul class="list-unstyled mb-4">
                    <li
                      class="d-flex justify-content-between py-3 border-bottom"
                    >
                      <strong class="text-muted"> Subtotal </strong
                      ><strong>{{ formatMoney(Subtotal) }}</strong>
                    </li>

                    <li
                      class="d-flex justify-content-between py-3 border-bottom"
                    >
                      <strong class="text-muted"> Pontuação </strong
                      ><strong>{{ formatScore(Score) }}</strong>
                    </li>

                    <li
                      class="d-flex justify-content-between py-3 border-bottom"
                    >
                      <strong class="text-muted">Custo Envio</strong>
                      <strong v-if="ResultShoppingFinal">{{
                        currencyBRL(ResultShoppingFinal)
                      }}</strong>
                      <strong v-else>0</strong>
                    </li>
                    <li
                      class="d-flex justify-content-between py-3 border-bottom"
                    >
                      <strong class="text-muted">Total</strong>
                      <h5
                        class="font-weight-bold total"
                        v-if="ResultShoppingFinal"
                      >
                        {{ currencyBRL(ResultShoppingFinal + Subtotal) }}
                      </h5>
                      <h5 class="font-weight-bold total" v-else>
                        {{ currencyBRL(Subtotal) }}
                      </h5>
                    </li>
                  </ul>
                  <div class="text-center" v-if="loginStatus == false">
                    <p>Você precisa estar logado para continuar</p>
                    <button
                      id="button-addon3"
                      type="button"
                      class="btn btn-info rounded-pill"
                      style="width: 100%"
                      @click="showModal = true"
                    >
                      LOGIN
                    </button>
                  </div>

                  <div class="" v-else>
                    <button
                      id="button-addon3"
                      type="button"
                      class="btn btn-info rounded-pill"
                      style="width: 100%"
                      @click="sendOrder()"
                    >
                      Finalizar Pedido
                    </button>
                    <el-alert
                      v-if="
                        (freeShipping =
                          false && ResultShopping.SHIPPING_PRICE == 0)
                      "
                      type="error"
                      show-icon
                    >
                      Encontramos um problema com frete para sua região, por
                      favor entre em contato com nosso suporte no e-mail:
                      <a href="mailto:suporte@vg.company">suporte@vg.company</a>
                    </el-alert>
                  </div>
                </div>
              </div>
            </div>
            <!-- .block-products-carousel -->
            <br />
            <br />
            <div
              v-if="ONshipping"
              v-loading="load"
              class="
                row
                Carousel
                bg-white
                rounded
                shadow-sm
                block block-products-carousel
                recentsproducts
              "
              style="min-height: 400px"
              data-layout="grid-4"
              data-mobile-grid-columns="2"
            >
              <div class="container">
                <div class="block-header">
                  <br />
                  <br />
                  <h3 class="block-header__title">
                    PRODUTOS - {{ SUPPLIER_NAME }}
                  </h3>
                  <div class="block-header__divider"></div>
                  <ul class="block-header__groups-list">
                    <li
                      v-for="category in categories"
                      :key="category.id"
                      hidden
                    >
                      <button
                        type="button"
                        class="block-header__group"
                        v-on:click="activateCategory(category.id)"
                        v-bind:class="[
                          category.id == categoryActive
                            ? 'block-header__group--active'
                            : '',
                        ]"
                      >
                        {{ category.description }}
                      </button>
                    </li>
                    <li hidden>
                      <button
                        type="button"
                        class="block-header__group"
                        v-on:click="activateCategory(0)"
                        v-bind:class="[
                          categoryActive == 0
                            ? 'block-header__group--active'
                            : '',
                        ]"
                      >
                        TODOS
                      </button>
                    </li>
                  </ul>
                </div>

                <splide :options="options" :slides="products">
                  <splide-slide
                    v-for="product in products"
                    :key="product.VS_PRODUCT_ID"
                  >
                    <div>
                      <div class="block-products-carousel__column">
                        <div class="block-products-carousel__cell">
                          <div
                            class="product-card product-card--hidden-actions"
                          >
                        
                            <div
                              class="product-card__badges-list"
                              v-if="
                                product.SALE_PRICE !==
                                product.SALE_PRICE_DISCOUNT
                              "
                            >
                              <div
                                class="
                                  product-card__badge product-card__badge--sale
                                "
                              >
                                <p
                                  style="transform: rotate( 314deg ); position: absolute; top: 28px; left: 8px; font-weight: bold; font-size: 18px; }"
                                >
                                  {{ getPercent(product) + "%" }} OFF
                                </p>
                              </div>
                            </div>
                            <div class="product-card__image product-image">
                              <a
                                href="#"
                                class="product-image__body"
                                @click.prevent="
                                  goTO(
                                    '/product/' +
                                      product.VS_PRODUCT_ID * 255 +
                                      '/' +
                                      transformName(product)
                                  )
                                "
                                ><img
                                  v-if="product.IMAGE_LIST"
                                  class="product-image__img"
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
                              </a>
                            </div>

                            <div class="product-card__info">
                              <div class="product-card__name">
                                <a
                                  href="#"
                                  @click.prevent="
                                    goTO(
                                      '/product/' +
                                        product.VS_PRODUCT_ID * 255 +
                                        '/' +
                                        transformName(product)
                                    )
                                  "
                                  >{{ product.PRODUCT_NAME }}</a
                                >
                              </div>
                              <div class="product-card__rating">
                                <div class="product-card__rating-stars">
                                  <div class="rating">
                                    <!--Nao achei a info-->
                                    <div class="rating__body">
                                      <star-rating
                                        :rating="product.STAR_EVALUATION"
                                        read-only="false"
                                        :round-start-rating="false"
                                        inactive-color="#eaeaea"
                                        active-color="#ffd333"
                                        :show-rating="false"
                                        v-bind:star-size="18"
                                      >
                                      </star-rating>
                                    </div>
                                  </div>
                                </div>
                                <div class="product-card__rating-legend">
                                  {{ product.TOTAL_EVALUATION }} Avaliações
                                </div>
                              </div>
                            </div>

                            <div class="product-card__actions">
                              <div
                                class="discount"
                                v-if="
                                  product.SALE_PRICE !==
                                  product.SALE_PRICE_DISCOUNT
                                "
                              >
                                <div
                                  class="desconto"
                                  style="
                                    color: rgb(125, 125, 125);
                                    position: absolute;
                                    margin-top: -20px;
                                    font-size: 13px;
                                    font-weight: bold;
                                  "
                                >
                                  DE {{ currencyBRL(product.SALE_PRICE) }} POR
                                </div>
                                <div class="normal-price product-card__prices">
                                  {{ currencyBRL(product.SALE_PRICE_DISCOUNT) }}
                                </div>
                              </div>
                              <div
                                class="normal-price product-card__prices"
                                v-else
                              >
                                {{ currencyBRL(product.SALE_PRICE) }}
                              </div>

                              <div class="product-card__buttons">
                                <button
                                  v-if="product.VARIATIONS_JSON"
                                  class="
                                    btn btn-primary
                                    product-card__addtocart
                                  "
                                  type="button"
                                  @click.prevent="
                                    goTO(
                                      '/product/' +
                                        product.VS_PRODUCT_ID * 255 +
                                        '/' +
                                        transformName(product)
                                    )
                                  "
                                >
                                  Mais Informações
                                </button>
                                <button
                                  v-else
                                  @click="addToCart(product)"
                                  class="
                                    btn btn-primary
                                    product-card__addtocart
                                  "
                                  type="button"
                                >
                                  Adicionar ao Carrinho
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </splide-slide>
                </splide>
              </div>
            </div>
            <!-- .block-products-carousel / end -->
          </div>
        </div>
      </div>
    </div>

    <div class="newCart" v-if="onCart">
      <div class="content">
							<div class="top">
								<h3>Carrinho anterior encontrado</h3>
							</div>
							<div class="footer">
									<p>Identificamos um carrinho salvo para seu usuário</p>
									<el-button type="primary" @click="ExcluideOldCart()">Excluir Carrinho</el-button>
									<el-button type="success" @click="addOldCart()">Mesclar Carrinho</el-button>
							</div>
      </div>
    </div>
   
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
    >
      <button class="modal__close" @click="showModal = false">
        <i class="far fa-times-circle"></i>
      </button>

      <div class="modal__content">
        <CartLogin></CartLogin>
      </div>
    </vue-final-modal>
  </div>
</template>

<style scoped>
.newCart .mid ul {
  padding: 2vw 0vw;
  display: block;
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.newCart .mid li {
  border-bottom: 1px solid #fafafa;
  margin-bottom: 15px;
  text-align: left;
  padding: 1vw 2vw;
}
.newCart .mid p {
  color: #666464;
  margin: 0;
}
.newCart .content {
  background: white;
  width: 45vw;
  height: fit-content;
  margin: auto;
  inset: 5vw 0px 0px 0px;
  position: absolute;
  text-align: center;
}
.newCart .content .top {
  font-weight: bold;
  text-transform: uppercase;
  color: #191928;
  padding: 1vw 0vw;
  border-bottom: 1px solid rgb(216 216 216 / 23%);
}
.newCart .content .footer {
  border-top: 1px solid rgb(216 216 216 / 23%);
  padding: 2vw 0vw;
}
.newCart .content h3 {
  margin-bottom: 0rem;
}
.newCart .content .mid {
  height: 25vw;
  overflow-y: scroll;
}
.newCart {
  position: fixed;
  background: rgb(0 0 0 / 72%);
  inset: 0px 0px 0px 0px;
  margin: auto;
  z-index: 99999999999999999999999999999999999;
}
.margin__top {
  margin-top: 24px;
}
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

<style>
.shadow-sm {
  box-shadow: 0 0.445rem 0.55rem rgba(0, 0, 0, 0.25) !important;
}
body {
  background: #f8f9fa;
}
</style>

<script>
// @ is an alias to /src
import { reactive, ref } from "vue";
import Auth from "../../services/Auth";
import Header from "../../components/Header/index.vue";
import CartLogin from "../../components/CartLogin/index.vue";
import Products from "../../services/Products";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import StarRating from "vue-star-rating";
import * as moment from "moment";

export default {
  name: "ResearchCatalog",
  components: {
    Header,
    CartLogin,
    StarRating,
    Splide,
    SplideSlide,
  },
  methods: {
    ExcluideOldCart() {
      let data = {
        USER_ID: JSON.parse(localStorage.getItem("userID")),
      };
      Products.deleteUserCart(data)
        .then((r) => {
          this.onCart = false;
          location.reload();
        })
        .catch((e) => {
          console.log("erro:", e);
          this.onCart = false;
          location.reload();
        });
    },
    addOldCart() {
      if (localStorage.getItem("@APP:cart") !== null) {
        let cart = JSON.parse(localStorage.getItem("@APP:cart"));
        var g = 0;
        for (; g < this.newCartProducts.length; g++) {
          let atual = "";
          atual = this.newCartProducts[g];
          cart.push(atual);
        }
        localStorage.setItem("@APP:cart", JSON.stringify(cart));
      } else {
        let cart = [];
        var g = 0;
        for (; g < this.newCartProducts.length; g++) {
          let atual = "";
          atual = this.newCartProducts[g];
          cart.push(atual);
        }
        localStorage.setItem("@APP:cart", JSON.stringify(cart));
      }
      let dataEXCLUDE = {
        USER_ID: JSON.parse(localStorage.getItem("userID")),
      };
      Products.deleteUserCart(dataEXCLUDE)
        .then((r) => {
          console.log("excluido");
          if (localStorage.getItem("@APP:cart") !== null) {
            let productsCart = JSON.parse(localStorage.getItem("@APP:cart"));
            var g = 0;
            for (; g < productsCart.length; g++) {
              let data = {
                USER_ACCOUNT_ID: JSON.parse(
                  localStorage.getItem("SELECTED_ACCOUNT_ID")
                )
                  ? JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
                  : 0,
                USER_ID: JSON.parse(localStorage.getItem("userID")),
                VS_PRODUCT_ID: productsCart[g].VS_PRODUCT_ID,
                VS_PRODUCT_PRICE_ID: productsCart[g].VS_PRODUCT_PRICE_ID,
                UNITS: productsCart[g].amount,
                VARIATIONS_JSON: productsCart[g].VARIATIONS,
              };
              Products.CreateCartProducts(data)
                .then((r) => {})
                .catch((e) => {
                  console.log("erro:", e);
                });
            }
          }
        })
        .catch((e) => {
          console.log("erro:", e);
        });
      (this.onCart = false),
        setTimeout(function () {
          location.reload();
        }, 1000);
    },
    changeActive: function () {
      let count = 0;
      var x = setInterval(() => {
        this.freeButton = true;
        count++;
        if (count == this.ratings.length) clearInterval(x);
      }, 2000);
    },
    updateOldCart() {
      if (localStorage.getItem("token") !== null) {
        this.freeButton = false;
        this.changeActive();
        let dataEXCLUDE = {
          USER_ID: JSON.parse(localStorage.getItem("userID")),
        };
        Products.deleteUserCart(dataEXCLUDE)
          .then((r) => {
            console.log("excluido");
            if (localStorage.getItem("@APP:cart") !== null) {
              let productsCart = JSON.parse(localStorage.getItem("@APP:cart"));
              var g = 0;
              for (; g < productsCart.length; g++) {
                let data = {
                  USER_ACCOUNT_ID: JSON.parse(
                    localStorage.getItem("SELECTED_ACCOUNT_ID")
                  )
                    ? JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
                    : 0,
                  USER_ID: JSON.parse(localStorage.getItem("userID")),
                  VS_PRODUCT_ID: productsCart[g].VS_PRODUCT_ID,
                  VS_PRODUCT_PRICE_ID: productsCart[g].VS_PRODUCT_PRICE_ID,
                  UNITS: productsCart[g].amount,
                  VARIATIONS_JSON: productsCart[g].VARIATIONS,
                };
                Products.CreateCartProducts(data)
                  .then((r) => {})
                  .catch((e) => {
                    console.log("erro:", e);
                  });
              }
            }
          })
          .catch((e) => {
            console.log("erro:", e);
          });
      }
    },
    SaveCartUser() {
      if (localStorage.getItem("@APP:cart") !== null) {
        let productsCart = JSON.parse(localStorage.getItem("@APP:cart"));
        var g = 0;
        for (; g < productsCart.length; g++) {
          let data = {
            USER_ACCOUNT_ID: JSON.parse(
              localStorage.getItem("SELECTED_ACCOUNT_ID")
            )
              ? JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
              : 0,
            USER_ID: JSON.parse(localStorage.getItem("userID")),
            VS_PRODUCT_ID: productsCart[g].VS_PRODUCT_ID,
            VS_PRODUCT_PRICE_ID: productsCart[g].VS_PRODUCT_PRICE_ID,
            UNITS: productsCart[g].amount,
            VARIATIONS_JSON: productsCart[g].VARIATIONS,
          };
          Products.CreateCartProducts(data)
            .then((r) => {})
            .catch((e) => {
              console.log("erro:", e);
            });
        }
      }
    },
    CartUserConvert() {
      this.loadCartProducts = true;
      var g = 0;
      for (; g < this.newCart.length; g++) {
        let atual = "";
        var dual = false;
        let data = {
          ID: `${this.newCart[g].VS_PRODUCT_ID}`,
        };
        atual = this.newCart[g];
        Products.SearchProducts(data)
          .then((r) => {
            if (r.data.DATA[0] != null) {
              let item = r.data.DATA[0];
              item.amount = atual.UNITS;
              item.VARIATIONS =
                atual.VARIATIONS_JSON != "NULL" ? atual.VARIATIONS_JSON : null;
              this.newCartProducts.push(item);
            }
          })
          .catch((e) => {
            console.log("erro:", e);
          });
      }
    },
    isEquivalent(a, b) {
      // Create arrays of property names
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);
      // If number of properties is different,
      // objects are not equivalent
      if (aProps.length != bProps.length) {
        return false;
      }
      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
          return false;
        }
      }
      // If we made it this far, objects
      // are considered equivalent
      return true;
    },
    verificaIgual(newCart) {
      console.log("Resultado:", newCart.length);
      return true;
      // if (localStorage.getItem("@APP:cart") !== null) {
      //   let oldCart = JSON.parse(localStorage.getItem("@APP:cart"));
      //   var h = 0;
      //   var globalG = [];
      //   for (; h < oldCart.length; h++) {
      //     let item3 = {};
      //     item3.VS_PRODUCT_ID = oldCart[h].VS_PRODUCT_ID;
      //     item3.amount = oldCart[h].amount;
      //     item3.VARIATIONS = oldCart[h].VARIATIONS;
      //     item3.VARIATIONS_JSON = oldCart[h].VARIATIONS_JSON;
      //     globalG.push(item3);
      //   }
      //   oldCart = globalG;
      //   var dados = newCart;
      //   var k = 0;
      //   var globalI = [];
      //   for (; k < dados.length; k++) {
      //     let item2 = {};
      //     item2.VS_PRODUCT_ID = dados[k].VS_PRODUCT_ID;
      //     item2.amount = dados[k].amount;
      //     item2.VARIATIONS = dados[k].VARIATIONS;
      //     item2.VARIATIONS_JSON = dados[k].VARIATIONS_JSON;
      //     globalI.push(item2);
      //   }
      //   let newCart = globalI;

      //   oldCart = oldCart.toString();
      //   newCart = newCart.toString();

      //   if (this.isEquivalent(oldCart, newCart)) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // }
    },
    getUserCart() {
      let data = {
        USER_ACCOUNT_ID: JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
          ? JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
          : 0,
        USER_ID: JSON.parse(localStorage.getItem("userID")),
      };
      Products.getUserCart(data)
        .then((r) => {
          this.newCart = r.data.DATA;
          if (r.data.DATA[0] != null) {
            this.CartUserConvert();
            let date = r.data.DATA[r.data.DATA.length - 1].DT_REGISTER;
            let finalDate = moment.utc().diff(date, "minutes");
            finalDate = Math.abs(finalDate);
            finalDate = Math.abs(finalDate - 180);
            console.log("minutos: ", finalDate);
            if (finalDate >= 15) {
              this.onCart = true;
            } else {
              this.onCart = false;
            }
          } else {
            this.onCart = false;
            this.SaveCartUser();
          }
          //return r.data.DATA;
        })
        .catch((e) => {
          console.log("erro:", e);
        });
    },
    transferVariation(variations) {
      var html = [];
      for (var obj in variations) {
        var item = {};
        item.NAME = obj;
        item.VARIATION = variations[obj][0];
        html.push(item);
      }
      return html;
    },
    getVariations(product, index) {
      this.globalVariations[index] = JSON.parse(product);
    },
    open() {
      this.$alert("This is a message", "Frete Grátis", {
        confirmButtonText: "Entendi ",
      });
    },
    goTO(url) {
      this.$router.push(url);
    },
    calcPercent(item) {
      let mount = Math.abs((item.PRICE - 300) / 300) * 100;
      mount = 100 - mount;
      let val = (mount / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    calcPercentStyle(item) {
      let mount = Math.abs((item.PRICE - 300) / 300) * 100;
      mount = 100 - mount;
      let val = (mount / 1).toFixed(2).replace(".", ",");
      let value = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return "width:" + parseInt(value) + "%;";
    },

    getNickname() {
      if (localStorage.getItem("token") !== null) {
        const userID = parseInt(localStorage.getItem("SELECTED_ACCOUNT_ID"));
        const accounts = JSON.parse(localStorage.getItem("ACCOUNTS"));
        var i = 0;
        for (; i < accounts.length; i++) {
          if ((accounts[i].ID = userID)) {
            return accounts[i] + "R" + userID;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    },
    sendOrder() {
      this.globalLoading = true;
      let data = {
        DELIVERY_ADDRESS: 0,
        USER_ACCOUNT_ID: JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
          ? JSON.parse(localStorage.getItem("SELECTED_ACCOUNT_ID"))
          : 0,
        USER_ID: JSON.parse(localStorage.getItem("userID")),
        ORDER_ITEMS: this.ResultShopping.ORDER_ITEMS,
      };
      Products.SendOrder(data)
        .then((r) => {
          this.$notify({
            title: "Sucesso",
            message: "Ordem Criada com sucesso!",
            type: "success",
          });
        })
        .catch((e) => {
          this.$notify.error({
            title: "Error",
            message: "Tente Novamente!",
          });
        })
        .finally(() => {
          let data = {
            USER_ID: JSON.parse(localStorage.getItem("userID")),
          };
          Products.deleteUserCart(data)
            .then((r) => {
              localStorage.removeItem("@APP:cart");
              localStorage.setItem("@APP:cart", "[]");
              this.$store.state.total = localStorage.getItem("@APP:cart");
              this.globalLoading = false;
              this.$router.push("/myorders");
            })
            .catch((e) => {
              console.log("erro:", e);
            });
        });
    },
    dateFormat(data) {
      return data.split("-").reverse().join("/");
    },
    currencyBRL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "R$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    removeFromCart(index) {
      let products = JSON.parse(localStorage.getItem("@APP:cart") || "[]");
      products.splice(index, 1);
      localStorage.setItem("@APP:cart", JSON.stringify(products));
      this.putTotals();
      this.$store.state.total = localStorage.getItem("@APP:cart");
      if (this.zipCode | this.UserCode) {
        this.shippingCalc();
      }
      this.putTotals();
      this.getProductsCart();
      this.updateOldCart();
    },
    clearCart: function () {
      this.productsCart = [];
      localStorage.removeItem("@APP:cart");
      this.$store.state.total = "[]";
    },
    formatMoney: function (value) {
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value || 0);
    },
    formatScore: function (value) {
      return Intl.NumberFormat("pt-BR", {}).format(value || 0);
    },
    putTotals: function () {
      this.Subtotal = 0;
      this.Score = 0;
      this.productsCart.map((item) => {
        if (item.SALE_PRICE == item.SALE_PRICE_DISCOUNT) {
          this.Subtotal += Number(item.SALE_PRICE) * item.amount;
          this.Score += Number(item.SCORE) * item.amount;
        } else {
          //  Logica antiga
          // var number = (item.SALE_PRICE - (item.PERCENT_LIST_DISCOUNT * item.SALE_PRICE / 100));
          // var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
          // var result =  number.toString().match(re)[0];
          // this.totals.subtotal += result * item.amount;
          this.Subtotal += Number(item.SALE_PRICE_DISCOUNT) * item.amount;
          this.Score += Number(item.SCORE) * item.amount;
        }
      });
    },
    ChangeAmount(product) {
      let products = JSON.parse(localStorage.getItem("@APP:cart") || "[]");
      let exists = null;
      products.map((item, key) => {
        if (product.VARIATIONS) {
          if (item.VS_PRODUCT_ID === product.VS_PRODUCT_ID) {
            if (
              JSON.stringify(product.VARIATIONS) ===
              JSON.stringify(item.VARIATIONS)
            ) {
              exists = key;
            } else {
              exists = null;
            }
          }
        } else {
          if (item.VS_PRODUCT_ID === product.VS_PRODUCT_ID) {
            exists = key;
          }
        }
      });
      if (exists !== null) {
        products[exists].amount = product.amount;
        localStorage.setItem("@APP:cart", JSON.stringify(products));
      }
      exists = null;
      this.$store.state.total = localStorage.getItem("@APP:cart");
      if (this.zipCode | this.UserCode) {
        this.shippingCalc();
      }
      this.putTotals();
      this.updateOldCart();
    },
    shippingCalc() {
       this.loadShipping = true;
      this.items = [];
      JSON.parse(localStorage.getItem("@APP:cart")).map((item) => {
        if (item.VARIATIONS_JSON) {
          var variations = JSON.parse(item.VARIATIONS);
          for (var obj in variations) {
            variations[obj] = variations[obj][0];
          }
          this.items.push({
            ID: item.VS_PRODUCT_ID,
            NAME: item.PRODUCT_NAME,
            UNITS: item.amount,
            VARIATIONS: variations,
          });
        } else {
          this.items.push({
            ID: item.VS_PRODUCT_ID,
            NAME: item.PRODUCT_NAME,
            UNITS: item.amount,
          });
        }
      });
      let data = {
        DESTINO: this.UserCode ? this.UserCode : this.zipCode,
        PRODUCT_LIST: this.items,
      };
      this.ResultShoppingFinal = 0;
      Products.ShippingCalc(data)
        .then((r) => {
          this.ONshipping = true;
          this.ResultShopping = r.data;
          this.SupplierID = this.ResultShopping.ORDER_ITEMS[0].SUPPLIER_ID;
          this.SUPPLIER_NAME = this.ResultShopping.ORDER_ITEMS[0].SUPPLIER_NAME;
          this.load = true;
          let data = {
            DISTRIBUTION_CENTER_VS_SUPPLIER_ID: this.SupplierID,
          };
          this.load = true;
          Products.SearchProducts(data)
            .then((r) => {
              this.products = r.data.DATA;
              this.load = false;
            })
            .catch((e) => {
              this.load = false;
              console.log("erro:", e);
            });
          this.ResultShopping.ORDER_ITEMS.map((item) => {
            if (item.FREE_SHIPPING == 1) {
              this.freeShipping = true;
              this.ResultShoppingFinal += Number(0);
            } else {
              this.ResultShoppingFinal += Number(item.SHIPPING_PRICE);
            }
          });
          this.loadShipping = false;
        })
        .catch((e) => {})
        .finally(() => {
          this.loadShipping = false;
        });
    },
    getProductsCart() {
      if (localStorage.getItem("@APP:cart") !== null) {
        this.productsCart = JSON.parse(localStorage.getItem("@APP:cart"));
        var g = 0;
        for (; g < this.productsCart.length; g++) {
          let data = {
            ID: `${this.productsCart[g].VS_PRODUCT_ID}`,
          };
          Products.SearchProducts(data)
            .then((r) => {
              let lista = this.productsCart;
              for (var h = 0; h < lista.length; h++) {
                if (lista[h].VS_PRODUCT_ID == r.data.DATA[0].VS_PRODUCT_ID) {
                  lista[h].SALE_PRICE = r.data.DATA[0].SALE_PRICE;
                  lista[h].SALE_PRICE_DISCOUNT =
                    r.data.DATA[0].SALE_PRICE_DISCOUNT;
                  lista[h].SCORE = r.data.DATA[0].SCORE;
                }
              }
              //end
              this.productsCart = JSON.parse(JSON.stringify(lista));
              this.putTotals();
              localStorage.setItem(
                "@APP:cart",
                JSON.stringify(this.productsCart)
              );
              this.$store.state.total = localStorage.getItem("@APP:cart");
            })
            .catch((e) => {
              console.log("erro:", e);
            });
        }
      }
    },
    getProduct(id) {
      let data = {
        ID: `${id}`,
      };
      Products.SearchProducts(data)
        .then((r) => {
          return r.data.DATA[0];
        })
        .catch((e) => {
          console.log("erro:", e);
        });
    },
    getUser() {
      const userID = localStorage.getItem("userID");
      const token = localStorage.getItem("token");
      Auth.userInformation(userID, token)
        .then((r) => {
          this.userDATA = r.data.DATA;
          this.estado = r.data.DATA.STATE;
          this.UserCode = r.data.DATA.ZIP_CODE;
          this.shippingCalc();
        })
        .catch((e) => {
          if (e.response.status == 403) {
            this.loginStatus = false;
            if (this.$route.path == "/checkout") {
              location.reload();
              this.onCart = false;
              Auth.ClearUser();
            }
          }
        });
    },
    getPercent(product) {
      return parseInt(
        100 - (product.SALE_PRICE_DISCOUNT * 100) / product.SALE_PRICE
      );
    },
    transformName(name) {
      if (name.TITLE_SEO != null) {
        name = name.TITLE_SEO;
      } else {
        name = name.PRODUCT_NAME;
      }
      let newname = name.split(" ").join("-");
      return newname.normalize("NFD");
    },
    getProduct(id) {
      let data = {
        ID: `${id}`,
      };
      this.load = true;
      Products.SearchProducts(data)
        .then((r) => {
          this.product = r.data.DATA[0];
          this.load = false;
        })
        .catch((e) => {
          this.load = false;
          console.log("erro:", e);
        });
    },
    goTO(url) {
      this.$router.push(url);
    },
    addToCart: function (product) {
      var amount = 1;
      let products = JSON.parse(localStorage.getItem("@APP:cart") || "[]");
      let exists = null;
      products.map((item, key) => {
        if (product.VARIATIONS) {
          if (item.VS_PRODUCT_ID === product.VS_PRODUCT_ID) {
            if (
              JSON.stringify(product.VARIATIONS) ===
              JSON.stringify(item.VARIATIONS)
            ) {
              exists = key;
            } else {
              exists = null;
            }
          }
        } else {
          if (item.VS_PRODUCT_ID === product.VS_PRODUCT_ID) {
            exists = key;
          }
        }
      });
      if (exists !== null) {
        // if (!products[exists].amount) products[exists].amount = amount;
        // else products[exists].amount = products[exists].amount + amount;
        products[exists].amount = products[exists].amount + 1;
        localStorage.setItem("@APP:cart", JSON.stringify(products));
        this.$message({
          message: " Adicionado ao carrinho: " + product.PRODUCT_NAME + "!",
          customClass: "customADD",
          duration: 1500,
          offset: 200,
          type: "success",
        });
      } else {
        product.amount = amount;
        products.push(product);
        localStorage.setItem("@APP:cart", JSON.stringify(products));
        this.$message({
          message: " Adicionado ao carrinho: " + product.PRODUCT_NAME + "!",
          customClass: "customADD",
          duration: 1500,
          offset: 200,
          type: "success",
        });
      }
      exists = null;
      this.$store.state.total = localStorage.getItem("@APP:cart");
      this.getProductsCart();
      location.reload();
    },
    openModal(product) {
      this.product = product;
      this.showModal = true;
    },
    activateCategory(id) {
      if (id != 0) {
        let category = this.categories.find((category) => category.id == id);
        this.products = category.list;
      } else {
        this.products = this.allProducts;
      }
      this.categoryActive = id;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    //verifica login
    if (localStorage.getItem("token") !== null) {
      this.getUser();
      this.loginStatus = true;
      this.getUserCart();
    } else {
      this.loginStatus = false;
    }
    if (JSON.parse(localStorage.getItem("@APP:cart")) == 0) {
      this.$router.push("/");
    }

    this.getProductsCart();
    this.putTotals();
  },
  data() {
    return {
      freeButton: true,
      newCart: [],
      newCartProducts: [],
      loadCartProducts: false,
      onCart: false,
      globalVariations: [],
      Variations: {},
      SUPPLIER_NAME: null,
      SupplierID: null,
      estado: null,
      ResultShoppingFinal: 0,
      freeShipping: false,
      loadShipping: false,
      items: "",
      productsCart: [],
      ONshipping: false,
      ResultShopping: "",
      zipCode: "",
      UserCode: null,
      num: 1,
      Subtotal: "",
      Score: "",
      loginStatus: false,
      showModal: false,
      globalLoading: false,
      load: false,
      categories: [],
      allProducts: [],
      products: [],
      product: {},
      categoryActive: 0,
      showModal: false,
      options: {
        type: "loop",
        autoplay: true,
        speed: 400,
        rewind: true,
        gap: "15px",
        margin: "0",
        perPage: 4,
        perMove: 1,
        arrows: true,
        width: "100vw",
        pagination: false,
        breakpoints: {
          640: {
            perPage: 2,
          },
        },
        classes: {
          arrows: "splide__arrows  arrows-list",
          prev: "splide__arrow--prev  arrowLeft",
          next: "splide__arrow--next arrowRight",
        },
      },
    };
  },
  setup() {
    const state = reactive({
      testes: "dCasa",
      numero: ref(0),
    });

    return {
      state,
    };
  },
};
</script>

<style  scoped>
.fretes {
  border-left: 3px solid #a1a1a1;
  margin-bottom: 5px;
  padding-bottom: 10px;
  padding-top: 15px;
  margin-bottom: 10px;
  background: #e8e8e8;
  position: relative;
  padding-top: 25px;
}
.fretes .header {
  width: 50%;
  background: #2f8205;
  position: absolute;
  top: 0;
  transition: 1s;
  text-align: right;
  padding: 0px 10px;
  color: white;
  font-size: 12px;
  text-align: right;
}
.fretes p {
  margin-bottom: 0rem;
}
.fretes .header-text {
  margin: 0;
  width: 100%;
  text-align: right;
  padding: 0px 15px;
}
.fretes .header-text b {
  color: #67c23a;
}
.fretes .header-text {
  margin: 10px 0px 0px 0px;
}
.fretes .header-text .two {
  margin: 0;
  font-size: 12px;
}
.fretes .produtos {
  width: 100%;
  padding: 15px;
}
.fretes .item {
  width: 100%;
  font-size: 12px;
}
table.cart-product-list tr:hover {
  background-color: rgba(0, 0, 0, 0s) !important;
}
.fretes .produtos p {
  font-size: 12px;
  line-height: 1;
  margin-bottom: 5px;
}
.vg-modal-body.bg-white.bordered {
  overflow: hidden !important;
  height: inherit !important;
  height: 90% !important;
}
</style>
<style scoped>
.bg-light {
  background-color: #f2f2f2 !important;
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
  max-width: max-content;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
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
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
}
</style>
<style scoped>
.dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}

.vfm--inset {
  z-index: 9 !important;
}

.modal__close {
  border: none;
  background: none;
}
.el-loading-mask {
  z-index: 1029 !important;
}

.info-frete {
  background: #f2f6fb;
  border: 2px solid #e3e4e6;
  border-radius: 3px;
  width: 100%;
  padding: 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  max-width: 100%;
  text-align: center;
}
.info-frete b {
  color: #2f8205;
}
.info-frete .one {
  margin: 10px 0px 0px 0px;
}
.info-frete .two {
  margin: 0;
  font-size: 12px;
}
</style>
<style >
.info-frete span {
  color: #2f8205 !important;
}
.main {
  width: 100%;
}
.fora {
  padding-top: 0px;
  margin-top: -25px;
}
</style>


<style scoped>
.product-card__badges-list {
  left: 0;
  top: 0;
}
.product-card__badge--sale {
  background: #4466a1;
  background: url(../../assets/images/discount3.svg);
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 100px;
  text-align: center;
  padding: 0;
  font-size: 20px;
  font-weight: bold;
}
span.product-card__old-price {
  padding-left: 10px;
}
.splide {
  padding: 0;
}

.product-card {
  margin-bottom: 90px;
}

.block {
  margin-bottom: 0;
}

.product-card {
  min-height: 415px;
}

.block-header__groups-list {
  padding-right: 80px;
}
</style>
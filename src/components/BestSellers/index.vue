<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <button class="modal__close" @click="showModal = false">X</button>

    <div class="modal__content">
      <ProductView :product="product"></ProductView>
    </div>
  </vue-final-modal>
  <!-- .block-products -->
  <div
    class="block block-products block-products--layout--large-last bestsellers"
    v-loading="load"
  >
    <div class="container" v-if="Products">
      <div class="block-header">
        <h3 class="block-header__title">MAIS VENDIDOS</h3>
        <div class="block-header__divider"></div>
      </div>

      <div class="block-products__body">
        <div class="block-products__featured" v-loading="load">
          <div class="block-products__featured-item top">
            <div class="product-card">
              <button
                class="product-card__quickview"
                type="button"
                @click="openModal(Products[0])"
              >
                <svg
                  widht="16px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="quickview-16"
                >
                  <path
                    d="M14 15h-4v-2h3v-3h2v4c0 .6-.4 1-1 1zM13 3h-3V1h4c.6 0 1 .4 1 1v4h-2V3zM6 3H3v3H1V2c0-.6.4-1 1-1h4v2zM3 13h3v2H2c-.6 0-1-.4-1-1v-4h2v3z"
                  ></path>
                </svg>
                <span class="fake-svg-icon"></span>
              </button>
              <div
                class="product-card__badges-list"
                v-if="
                  Products[0].SALE_PRICE !== Products[0].SALE_PRICE_DISCOUNT
                "
              >
                <div class="product-card__badge product-card__badge--sale">
                  PROMOÇÃO
                </div>
              </div>
              <div class="product-card__image">
                <a
                  href="#"
                  class="product-image__body"
                  @click.prevent="
                    goTO('/product/' + Products[0].VS_PRODUCT_ID * 255)
                  "
                >
                  <img
                    v-if="Products[0].IMAGE_LIST"
                    class="product-image__img"
                    :src="
                      Products[0].IMAGE_LIST != null
                        ? Products[0].IMAGE_LIST[0]
                        : ''
                    "
                    alt=""
                  />
                  <img v-else src="../../assets/images/default.png" alt="" />
                </a>
              </div>

              <div class="product-card__info">
                <div class="product-card__name">
                  <a
                    href="#"
                    @click.prevent="
                      goTO('/product/' + Products[0].VS_PRODUCT_ID * 255)
                    "
                    >{{ Products[0].PRODUCT_NAME }}</a
                  >
                </div>
                <div class="product-card__rating">
                  <div class="rating">
                    <div class="rating__body">
                      <star-rating
                        :rating="Products[0].STAR_EVALUATION"
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
                  <div class="product-card__rating-legend">
                    {{ Products[0].TOTAL_EVALUATION }} Avaliações
                  </div>
                </div>
              </div>
              <div class="product-card__actions">
                <div class="product-card__prices">
                  <div
                    v-if="
                      Products[0].SALE_PRICE == Products[0].SALE_PRICE_DISCOUNT
                    "
                  >
                    {{ currencyBRL(Products[0].SALE_PRICE) }}
                  </div>
                  <div v-else>
               
                     <div
                        style="
                          color: rgb(125, 125, 125);
                          position: absolute;
                          margin-top: -20px;
                          font-size: 13px;
                          font-weight: bold;
                        "
                      >
                        DE {{ currencyBRL(Products[0].SALE_PRICE) }} POR
                      </div>
                      <div class="normal-price product-card__prices">
                        {{ currencyBRL(Products[0].SALE_PRICE_DISCOUNT) }}
                      </div>
                  </div>
                </div>

                <div class="product-card__buttons">
                  <button
                    v-if="Products[0].VARIATIONS_JSON"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                    @click.prevent="
                      goTO('/product/' + Products[0].VS_PRODUCT_ID * 255)
                    "
                  >
                    Mais Informações
                  </button>
                  <button
                    v-else
                    @click="addToCart(Products[0])"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block-products__list">
          <div class="block-products__list-item">
            <div class="product-card">
              <button
                class="product-card__quickview"
                type="button"
                @click="openModal(Products[1])"
              >
                <svg
                  widht="16px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="quickview-16"
                >
                  <path
                    d="M14 15h-4v-2h3v-3h2v4c0 .6-.4 1-1 1zM13 3h-3V1h4c.6 0 1 .4 1 1v4h-2V3zM6 3H3v3H1V2c0-.6.4-1 1-1h4v2zM3 13h3v2H2c-.6 0-1-.4-1-1v-4h2v3z"
                  ></path>
                </svg>
                <span class="fake-svg-icon"></span>
              </button>
              <div
                class="product-card__badges-list"
                v-if="
                  Products[1].SALE_PRICE !== Products[1].SALE_PRICE_DISCOUNT
                "
              >
                <div class="product-card__badge product-card__badge--sale">
                  PROMOÇÃO
                </div>
              </div>
              <div class="product-card__image">
                <a
                  href="#"
                  class="product-image__body"
                  @click.prevent="
                    goTO('/product/' + Products[1].VS_PRODUCT_ID * 255)
                  "
                >
                  <img
                    v-if="Products[1].IMAGE_LIST"
                    class="product-image__img"
                    :src="
                      Products[1].IMAGE_LIST != null
                        ? Products[1].IMAGE_LIST[0]
                        : ''
                    "
                    alt=""
                  />
                  <img v-else src="../../assets/images/default.png" alt="" />
                </a>
              </div>

              <div class="product-card__info">
                <div class="product-card__name">
                  <a
                    href="#"
                    @click.prevent="
                      goTO('/product/' + Products[1].VS_PRODUCT_ID * 255)
                    "
                    >{{ Products[1].PRODUCT_NAME }}</a
                  >
                </div>
                <div class="product-card__rating">
                  <div class="rating">
                    <div class="rating__body">
                      <star-rating
                        :rating="Products[1].STAR_EVALUATION"
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
                  <div class="product-card__rating-legend">
                    {{ Products[1].TOTAL_EVALUATION }} Avaliações
                  </div>
                </div>
              </div>
              <div class="product-card__actions">
                <div class="product-card__prices">
                  <div
                    v-if="
                      Products[1].SALE_PRICE == Products[1].SALE_PRICE_DISCOUNT
                    "
                  >
                    {{ currencyBRL(Products[1].SALE_PRICE) }}
                  </div>
                  <div v-else>
                      <div
                        style="
                          color: rgb(125, 125, 125);
                          position: absolute;
                          margin-top: -20px;
                          font-size: 13px;
                          font-weight: bold;
                        "
                      >
                        DE {{ currencyBRL(Products[1].SALE_PRICE) }} POR
                      </div>
                      <div class="normal-price product-card__prices">
                        {{ currencyBRL(Products[1].SALE_PRICE_DISCOUNT) }}
                      </div>
                  </div>
                </div>

                <div class="product-card__buttons">
                  <button
                    v-if="Products[1].VARIATIONS_JSON"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                    @click.prevent="
                      goTO('/product/' + Products[1].VS_PRODUCT_ID * 255)
                    "
                  >
                    Mais Informações
                  </button>
                  <button
                    v-else
                    @click="addToCart(Products[1])"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="block-products__list-item">
            <div class="product-card">
              <button
                class="product-card__quickview"
                type="button"
                @click="openModal(Products[2])"
              >
                <svg
                  widht="16px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="quickview-16"
                >
                  <path
                    d="M14 15h-4v-2h3v-3h2v4c0 .6-.4 1-1 1zM13 3h-3V1h4c.6 0 1 .4 1 1v4h-2V3zM6 3H3v3H1V2c0-.6.4-1 1-1h4v2zM3 13h3v2H2c-.6 0-1-.4-1-1v-4h2v3z"
                  ></path>
                </svg>
                <span class="fake-svg-icon"></span>
              </button>
              <div
                class="product-card__badges-list"
                v-if="
                  Products[2].SALE_PRICE !== Products[2].SALE_PRICE_DISCOUNT
                "
              >
                <div class="product-card__badge product-card__badge--sale">
                  PROMOÇÃO
                </div>
              </div>
              <div class="product-card__image">
                <a
                  href="#"
                  class="product-image__body"
                  @click.prevent="
                    goTO('/product/' + Products[2].VS_PRODUCT_ID * 255)
                  "
                >
                  <img
                    v-if="Products[2].IMAGE_LIST"
                    class="product-image__img"
                    :src="
                      Products[2].IMAGE_LIST != null
                        ? Products[2].IMAGE_LIST[0]
                        : ''
                    "
                    alt=""
                  />
                  <img v-else src="../../assets/images/default.png" alt="" />
                </a>
              </div>

              <div class="product-card__info">
                <div class="product-card__name">
                  <a
                    href="#"
                    @click.prevent="
                      goTO('/product/' + Products[2].VS_PRODUCT_ID * 255)
                    "
                    >{{ Products[2].PRODUCT_NAME }}</a
                  >
                </div>
                <div class="product-card__rating">
                  <div class="rating">
                    <div class="rating__body">
                      <star-rating
                        :rating="Products[2].STAR_EVALUATION"
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
                  <div class="product-card__rating-legend">
                    {{ Products[2].TOTAL_EVALUATION }} Avaliações
                  </div>
                </div>
              </div>
              <div class="product-card__actions">
                <div class="product-card__prices">
                  <div
                    v-if="
                      Products[2].SALE_PRICE == Products[2].SALE_PRICE_DISCOUNT
                    "
                  >
                    {{ currencyBRL(Products[2].SALE_PRICE) }}
                  </div>
                  <div v-else>
                     <div
                        style="
                          color: rgb(125, 125, 125);
                          position: absolute;
                          margin-top: -20px;
                          font-size: 13px;
                          font-weight: bold;
                        "
                      >
                        DE {{ currencyBRL(Products[2].SALE_PRICE) }} POR
                      </div>
                      <div class="normal-price product-card__prices">
                        {{ currencyBRL(Products[2].SALE_PRICE_DISCOUNT) }}
                      </div>
                  </div>
                </div>

                <div class="product-card__buttons">
                  <button
                    v-if="Products[2].VARIATIONS_JSON"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                    @click.prevent="
                      goTO('/product/' + Products[2].VS_PRODUCT_ID * 255)
                    "
                  >
                    Mais Informações
                  </button>
                  <button
                    v-else
                    @click="addToCart(Products[2])"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="block-products__list-item">
            <div
              class="product-card"
          
            >
              <button
                class="product-card__quickview"
                type="button"
                @click="openModal(Products[3])"
              >
                <svg
                  widht="16px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="quickview-16"
                >
                  <path
                    d="M14 15h-4v-2h3v-3h2v4c0 .6-.4 1-1 1zM13 3h-3V1h4c.6 0 1 .4 1 1v4h-2V3zM6 3H3v3H1V2c0-.6.4-1 1-1h4v2zM3 13h3v2H2c-.6 0-1-.4-1-1v-4h2v3z"
                  ></path>
                </svg>
                <span class="fake-svg-icon"></span>
              </button>
              <div
                class="product-card__badges-list"
                v-if="
                  Products[3].SALE_PRICE !== Products[3].SALE_PRICE_DISCOUNT
                "
              >
                <div class="product-card__badge product-card__badge--sale">
                  PROMOÇÃO
                </div>
              </div>
              <div class="product-card__image">
                <a
                  href="#"
                  class="product-image__body"
                  @click.prevent="
                    goTO('/product/' + Products[3].VS_PRODUCT_ID * 255)
                  "
                >
                  <img
                    v-if="Products[3].IMAGE_LIST"
                    class="product-image__img"
                    :src="
                      Products[3].IMAGE_LIST != null
                        ? Products[3].IMAGE_LIST[0]
                        : ''
                    "
                    alt=""
                  />
                  <img v-else src="../../assets/images/default.png" alt="" />
                </a>
              </div>

              <div class="product-card__info">
                <div class="product-card__name">
                  <a
                    href="#"
                    @click.prevent="
                      goTO('/product/' + Products[3].VS_PRODUCT_ID * 255)
                    "
                    >{{ Products[3].PRODUCT_NAME }}</a
                  >
                </div>
                <div class="product-card__rating">
                  <div class="rating">
                    <div class="rating__body">
                      <star-rating
                        :rating="Products[3].STAR_EVALUATION"
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

                  <div class="product-card__rating-legend">
                    {{ Products[3].TOTAL_EVALUATION }} Avaliações
                  </div>
                </div>
              </div>
              <div class="product-card__actions">
                <div class="product-card__prices">
                  <div
                    v-if="
                      Products[3].SALE_PRICE == Products[3].SALE_PRICE_DISCOUNT
                    "
                  >
                    {{ currencyBRL(Products[3].SALE_PRICE) }}
                  </div>
                  <div v-else>
                  <div
                        style="
                          color: rgb(125, 125, 125);
                          position: absolute;
                          margin-top: -20px;
                          font-size: 13px;
                          font-weight: bold;
                        "
                      >
                        DE {{ currencyBRL(Products[3].SALE_PRICE) }} POR
                      </div>
                      <div class="normal-price product-card__prices">
                        {{ currencyBRL(Products[3].SALE_PRICE_DISCOUNT) }}
                      </div>
                  </div>
                </div>

                <div class="product-card__buttons">
                  <button
                    v-if="Products[3].VARIATIONS_JSON"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                    @click.prevent="
                      goTO('/product/' + Products[3].VS_PRODUCT_ID * 255)
                    "
                  >
                    Mais Informações
                  </button>
                  <button
                    v-else
                    @click="addToCart(Products[3])"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="block-products__list-item">
            <div
              class="product-card"
         
            >
              <button
                class="product-card__quickview"
                type="button"
                @click="openModal(Products[4])"
              >
                <svg
                  widht="16px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="quickview-16"
                >
                  <path
                    d="M14 15h-4v-2h3v-3h2v4c0 .6-.4 1-1 1zM13 3h-3V1h4c.6 0 1 .4 1 1v4h-2V3zM6 3H3v3H1V2c0-.6.4-1 1-1h4v2zM3 13h3v2H2c-.6 0-1-.4-1-1v-4h2v3z"
                  ></path>
                </svg>
                <span class="fake-svg-icon"></span>
              </button>
              <div
                class="product-card__badges-list"
                v-if="
                  Products[4].SALE_PRICE !== Products[4].SALE_PRICE_DISCOUNT
                "
              >
                <div class="product-card__badge product-card__badge--sale">
                  PROMOÇÃO
                </div>
              </div>
              <div class="product-card__image">
                <a
                  href="#"
                  class="product-image__body"
                  @click.prevent="
                    goTO('/product/' + Products[4].VS_PRODUCT_ID * 255)
                  "
                >
                  <img
                    v-if="Products[4].IMAGE_LIST"
                    class="product-image__img"
                    :src="
                      Products[4].IMAGE_LIST != null
                        ? Products[4].IMAGE_LIST[0]
                        : ''
                    "
                    alt=""
                  />
                  <img v-else src="../../assets/images/default.png" alt="" />
                </a>
              </div>

              <div class="product-card__info">
                <div class="product-card__name">
                  <a
                    href="#"
                    @click.prevent="
                      goTO('/product/' + Products[4].VS_PRODUCT_ID * 255)
                    "
                    >{{ Products[4].PRODUCT_NAME }}</a
                  >
                </div>
                <div class="product-card__rating">
                  <div class="rating">
                    <div class="rating__body">
                      <star-rating
                        :rating="Products[4].STAR_EVALUATION"
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
                  <div class="product-card__rating-legend">
                    {{ Products[4].TOTAL_EVALUATION }} Avaliações
                  </div>
                </div>
              </div>
              <div class="product-card__actions">
                <div class="product-card__prices">
                  <div
                    v-if="
                      Products[4].SALE_PRICE == Products[4].SALE_PRICE_DISCOUNT
                    "
                  >
                    {{ currencyBRL(Products[4].SALE_PRICE) }}
                  </div>
                  <div v-else>
                   <div
                        style="
                          color: rgb(125, 125, 125);
                          position: absolute;
                          margin-top: -20px;
                          font-size: 13px;
                          font-weight: bold;
                        "
                      >
                        DE {{ currencyBRL(Products[4].SALE_PRICE) }} POR
                      </div>
                      <div class="normal-price product-card__prices">
                        {{ currencyBRL(Products[4].SALE_PRICE_DISCOUNT) }}
                      </div>
                  </div>
                </div>

                <div class="product-card__buttons">
                  <button
                    v-if="Products[4].VARIATIONS_JSON"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                    @click.prevent="
                      goTO('/product/' + Products[4].VS_PRODUCT_ID * 255)
                    "
                  >
                    Mais Informações
                  </button>
                  <button
                    v-else
                    @click="addToCart(Products[4])"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="block-products__list-item">
            <div
              class="product-card"
            >
              <button
                class="product-card__quickview"
                type="button"
                @click="openModal(Products[5])"
              >
                <svg
                  widht="16px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="quickview-16"
                >
                  <path
                    d="M14 15h-4v-2h3v-3h2v4c0 .6-.4 1-1 1zM13 3h-3V1h4c.6 0 1 .4 1 1v4h-2V3zM6 3H3v3H1V2c0-.6.4-1 1-1h4v2zM3 13h3v2H2c-.6 0-1-.4-1-1v-4h2v3z"
                  ></path>
                </svg>
                <span class="fake-svg-icon"></span>
              </button>
              <div
                class="product-card__badges-list"
                v-if="
                  Products[5].SALE_PRICE !== Products[5].SALE_PRICE_DISCOUNT
                "
              >
                <div class="product-card__badge product-card__badge--sale">
                  PROMOÇÃO
                </div>
              </div>
              <div class="product-card__image">
                <a
                  href="#"
                  class="product-image__body"
                  @click.prevent="
                    goTO('/product/' + Products[5].VS_PRODUCT_ID * 255)
                  "
                >
                  <img
                    v-if="Products[5].IMAGE_LIST"
                    class="product-image__img"
                    :src="
                      Products[5].IMAGE_LIST != null
                        ? Products[5].IMAGE_LIST[0]
                        : ''
                    "
                    alt=""
                  />
                  <img v-else src="../../assets/images/default.png" alt="" />
                </a>
              </div>

              <div class="product-card__info">
                <div class="product-card__name">
                  <a
                    href="#"
                    @click.prevent="
                      goTO('/product/' + Products[5].VS_PRODUCT_ID * 255)
                    "
                    >{{ Products[5].PRODUCT_NAME }}</a
                  >
                </div>
                <div class="product-card__rating">
                  <div class="rating">
                    <div class="rating__body">
                      <star-rating
                        :rating="Products[5].STAR_EVALUATION"
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

                  <div class="product-card__rating-legend">
                    {{ Products[5].TOTAL_EVALUATION }} Avaliações
                  </div>
                </div>
              </div>
              <div class="product-card__actions">
                <div class="product-card__prices">
                  <div
                    v-if="
                      Products[5].SALE_PRICE == Products[5].SALE_PRICE_DISCOUNT
                    "
                  >
                    {{ currencyBRL(Products[5].SALE_PRICE) }}
                  </div>
                  <div v-else>
                    <div
                        style="
                          color: rgb(125, 125, 125);
                          position: absolute;
                          margin-top: -20px;
                          font-size: 13px;
                          font-weight: bold;
                        "
                      >
                        DE {{ currencyBRL(Products[5].SALE_PRICE) }} POR
                      </div>
                      <div class="normal-price product-card__prices">
                        {{ currencyBRL(Products[5].SALE_PRICE_DISCOUNT) }}
                      </div>
                  </div>
                </div>

                <div class="product-card__buttons">
                  <button
                    v-if="Products[5].VARIATIONS_JSON"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                    @click.prevent="
                      goTO('/product/' + Products[5].VS_PRODUCT_ID * 255)
                    "
                  >
                    Mais Informações
                  </button>
                  <button
                    v-else
                    @click="addToCart(Products[5])"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="block-products__list-item">
            <div
              class="product-card"
         
            >
              <button
                class="product-card__quickview"
                type="button"
                @click="openModal(Products[6])"
              >
                <svg
                  widht="16px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="quickview-16"
                >
                  <path
                    d="M14 15h-4v-2h3v-3h2v4c0 .6-.4 1-1 1zM13 3h-3V1h4c.6 0 1 .4 1 1v4h-2V3zM6 3H3v3H1V2c0-.6.4-1 1-1h4v2zM3 13h3v2H2c-.6 0-1-.4-1-1v-4h2v3z"
                  ></path>
                </svg>
                <span class="fake-svg-icon"></span>
              </button>
              <div
                class="product-card__badges-list"
                v-if="
                  Products[6].SALE_PRICE !== Products[6].SALE_PRICE_DISCOUNT
                "
              >
                <div class="product-card__badge product-card__badge--sale">
                  PROMOÇÃO
                </div>
              </div>
              <div class="product-card__image">
                <a
                  href="#"
                  class="product-image__body"
                  @click.prevent="
                    goTO('/product/' + Products[6].VS_PRODUCT_ID * 255)
                  "
                >
                  <img
                    v-if="Products[6].IMAGE_LIST"
                    class="product-image__img"
                    :src="
                      Products[6].IMAGE_LIST != null
                        ? Products[6].IMAGE_LIST[0]
                        : ''
                    "
                    alt=""
                  />
                  <img v-else src="../../assets/images/default.png" alt="" />
                </a>
              </div>

              <div class="product-card__info">
                <div class="product-card__name">
                  <a
                    href="#"
                    @click.prevent="
                      goTO('/product/' + Products[6].VS_PRODUCT_ID * 255)
                    "
                    >{{ Products[6].PRODUCT_NAME }}</a
                  >
                </div>
                <div class="product-card__rating">
                  <div class="rating">
                    <div class="rating__body">
                      <star-rating
                        :rating="Products[6].STAR_EVALUATION"
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
                  <div class="product-card__rating-legend">
                    {{ Products[6].TOTAL_EVALUATION }} Avaliações
                  </div>
                </div>
              </div>
              <div class="product-card__actions">
                <div class="product-card__prices">
                  <div
                    v-if="
                      Products[6].SALE_PRICE == Products[6].SALE_PRICE_DISCOUNT
                    "
                  >
                    {{ currencyBRL(Products[6].SALE_PRICE) }}
                  </div>
                  <div v-else>
                     <div
                        style="
                          color: rgb(125, 125, 125);
                          position: absolute;
                          margin-top: -20px;
                          font-size: 13px;
                          font-weight: bold;
                        "
                      >
                        DE {{ currencyBRL(Products[6].SALE_PRICE) }} POR
                      </div>
                      <div class="normal-price product-card__prices">
                        {{ currencyBRL(Products[6].SALE_PRICE_DISCOUNT) }}
                      </div>
                  </div>
                </div>

                <div class="product-card__buttons">
                  <button
                    v-if="Products[6].VARIATIONS_JSON"
                    class="btn btn-primary product-card__addtocart"
                    type="button"
                    @click.prevent="
                      goTO('/product/' + Products[6].VS_PRODUCT_ID * 255)
                    "
                  >
                    Mais Informações
                  </button>
                  <button
                    v-else
                    @click="addToCart(Products[6])"
                    class="btn btn-primary product-card__addtocart"
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
    </div>
  </div>
  <!-- .block-products / end -->
</template>
<style scoped>
.product-card__old-price {
  color: #b3b3b3;
  font-weight: 400;
  font-size: 13px;
  text-decoration: line-through;
  padding-left: 10px;
}
</style>
<script>
import ProductView from "../../components/ProductView/index.vue";
import Products from "../../services/Products";
import StarRating from "vue-star-rating";

export default {
  mounted() {
    this.load = true;
    Products.getDashboardInfo().then((response) => {
      this.Products = response.data.DATA.BEST_SELLERS;
      this.load = false;
    });
  },
  data() {
    return {
      load: false,
      Products: false,
      product: {},
      showModal: false,
    };
  },
  components: {
    ProductView,
    StarRating,
  },
  methods: {
      getPercent(product) {
      return parseInt(Math.abs(((product.SALE_PRICE_DISCOUNT - product.SALE_PRICE) / product.SALE_PRICE) *100 ))+ "%";
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
    },
    openModal(product) {
      this.product = product;
      this.showModal = true;
    },
    currencyBRL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "R$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>



<style scoped>
.product-card__badge--sale {
  display: none;
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
  max-width: 75%;
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
}
</style>
<style scoped>
.dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}

.vfm--inset {
  z-index: 9999999999999999 !important;
}

.modal__close {
  border: none;
  background: none;
}
.product-card__name {
  height: auto !important;
}
</style>
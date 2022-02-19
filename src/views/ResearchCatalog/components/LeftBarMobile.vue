<template>
<div class="container">
<div  class="padding_left_box p_top d-lg-none adjust__filter">
        <vue-final-modal v-model="showFilter" classes="modal-container" content-class="modal-content">
    <button class="modal__close" @click="showFilter = false">
        X
    </button>

    <div class="modal__content">
          <div class="bg-color">
    <div class="padding_left_box p_top">
      <h6>Avaliação dos clientes</h6>
      <div class="product-card__rating" data-v-37a892bf="">
        <div class="rating" data-v-37a892bf="">
            <div class="rating__body" data-v-37a892bf="">
              <span class="fa fa-star checked" data-v-37a892bf=""></span>
              <span class="fa fa-star" data-v-37a892bf=""></span>
              <span class="fa fa-star" data-v-37a892bf=""></span>
              <span class="fa fa-star" data-v-37a892bf=""></span>
              <span class="fa fa-star" data-v-37a892bf=""></span></div>
        </div>
        <div class="product-card__rating-legend" data-v-37a892bf="">e acima</div>
      </div>
            <div class="product-card__rating" data-v-37a892bf="">
        <div class="rating" data-v-37a892bf="">
            <div class="rating__body" data-v-37a892bf="">
              <span class="fa fa-star checked" data-v-37a892bf=""></span>
              <span class="fa fa-star checked" data-v-37a892bf=""></span>
              <span class="fa fa-star" data-v-37a892bf=""></span>
              <span class="fa fa-star" data-v-37a892bf=""></span>
              <span class="fa fa-star" data-v-37a892bf=""></span></div>
        </div>
        <div class="product-card__rating-legend" data-v-37a892bf="">e acima</div>
      </div>
            <div class="product-card__rating" data-v-37a892bf="">
        <div class="rating" data-v-37a892bf="">
            <div class="rating__body" data-v-37a892bf="">
              <span class="fa fa-star checked" data-v-37a892bf=""></span>
              <span class="fa fa-star checked" data-v-37a892bf=""></span>
              <span class="fa fa-star checked" data-v-37a892bf=""></span>
              <span class="fa fa-star " data-v-37a892bf=""></span>
              <span class="fa fa-star" data-v-37a892bf=""></span></div>
        </div>
        <div class="product-card__rating-legend" data-v-37a892bf="">e acima</div>
      </div>
            <div class="product-card__rating" data-v-37a892bf="">
        <div class="rating" data-v-37a892bf="">
            <div class="rating__body" data-v-37a892bf="">
              <span class="fa fa-star checked" data-v-37a892bf=""></span>
              <span class="fa fa-star checked" data-v-37a892bf=""></span>
              <span class="fa fa-star checked" data-v-37a892bf=""></span>
              <span class="fa fa-star checked" data-v-37a892bf=""></span>
              <span class="fa fa-star" data-v-37a892bf=""></span></div>
        </div>
        <div class="product-card__rating-legend" data-v-37a892bf="">e acima</div>
      </div>
     </div>
    <div class="padding_left_box">
      <!-- column1, Vertical Dropdown Menu -->
      <h6>Marca</h6>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label class="form-check-label" for="flexCheckDefault">
           PART.B
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          Speedo
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          Polo Marine
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          Umbro
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          CALVINKLEIN
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          Adidas
        </label>
      </div>
    </div>
    <div class="padding_left_box">
      <h6>Preço</h6>
      <ul class="no_list_style">
        <li class="color_link"><a href="#sub-menu" class=""> Até R$50 </a> </li>
        <li class="color_link"><a href="#sub-menu" class=""> R$50 a R$150 </a> </li>
        <li class="color_link"><a href="#sub-menu" class=""> R$150 a R$300 </a> </li>
        <li class="color_link"><a href="#sub-menu" class=""> R$300 a R$500 </a> </li>
        <li class="color_link"><a href="#sub-menu" class=""> Mais de R$500 </a> </li>
      </ul>
      <form class="search__form" action="">
          <input class="search__input" name="search" placeholder="R$Min." aria-label="Site search" type="text" autocomplete="off">
          <input class="search__input" name="search" placeholder="R$Max." aria-label="Site search" type="text" autocomplete="off">
          <button class="search__button search__button--type--submit" type="submit">Ir</button>
          <div class="search__border"></div>
      </form>
    </div>
    <div class="padding_left_box">
      <h6>Ofertas</h6>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label class="form-check-label" for="flexCheckDefault">
           Ofertas do Dia
        </label>
      </div>
    </div> 
    <div class="padding_left_box">
      <h6>Cor</h6>
      <div class="filter-color__list"><label class="filter-color__item"><span
            class="filter-color__check input-check-color input-check-color--white" style="color: #fff;"><label
                class="input-check-color__body"><input class="input-check-color__input" type="checkbox"> <span
                    class="input-check-color__box"></span> <svg class="input-check-color__icon" width="12px"
                    height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color input-check-color--light"
            style="color: #d9d9d9;"><label class="input-check-color__body"><input class="input-check-color__input"
                    type="checkbox"> <span class="input-check-color__box"></span> <svg class="input-check-color__icon"
                    width="12px" height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color" style="color: #b3b3b3;"><label
                class="input-check-color__body"><input class="input-check-color__input" type="checkbox"> <span
                    class="input-check-color__box"></span> <svg class="input-check-color__icon" width="12px"
                    height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color" style="color: #808080;"><label
                class="input-check-color__body"><input class="input-check-color__input" type="checkbox"> <span
                    class="input-check-color__box"></span> <svg class="input-check-color__icon" width="12px"
                    height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color" style="color: #666;"><label
                class="input-check-color__body"><input class="input-check-color__input" type="checkbox"> <span
                    class="input-check-color__box"></span> <svg class="input-check-color__icon" width="12px"
                    height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color" style="color: #4d4d4d;"><label
                class="input-check-color__body"><input class="input-check-color__input" type="checkbox"> <span
                    class="input-check-color__box"></span> <svg class="input-check-color__icon" width="12px"
                    height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color" style="color: #262626;"><label
                class="input-check-color__body"><input class="input-check-color__input" type="checkbox"> <span
                    class="input-check-color__box"></span> <svg class="input-check-color__icon" width="12px"
                    height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color" style="color: #ff4040;"><label
                class="input-check-color__body"><input class="input-check-color__input" type="checkbox"
                    checked="checked"> <span class="input-check-color__box"></span> <svg class="input-check-color__icon"
                    width="12px" height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color" style="color: #ff8126;"><label
                class="input-check-color__body"><input class="input-check-color__input" type="checkbox"> <span
                    class="input-check-color__box"></span> <svg class="input-check-color__icon" width="12px"
                    height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color input-check-color--light"
            style="color: #ffd440;"><label class="input-check-color__body"><input class="input-check-color__input"
                    type="checkbox"> <span class="input-check-color__box"></span> <svg class="input-check-color__icon"
                    width="12px" height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color input-check-color--light"
            style="color: #becc1f;"><label class="input-check-color__body"><input class="input-check-color__input"
                    type="checkbox"> <span class="input-check-color__box"></span> <svg class="input-check-color__icon"
                    width="12px" height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color" style="color: #8fcc14;"><label
                class="input-check-color__body"><input class="input-check-color__input" type="checkbox"
                    checked="checked"> <span class="input-check-color__box"></span> <svg class="input-check-color__icon"
                    width="12px" height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color" style="color: #47cc5e;"><label
                class="input-check-color__body"><input class="input-check-color__input" type="checkbox"> <span
                    class="input-check-color__box"></span> <svg class="input-check-color__icon" width="12px"
                    height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> <label
        class="filter-color__item"><span class="filter-color__check input-check-color" style="color: #47cca0;"><label
                class="input-check-color__body"><input class="input-check-color__input" type="checkbox"> <span
                    class="input-check-color__box"></span> <svg class="input-check-color__icon" width="12px"
                    height="9px">
                    <use xlink:href="images/sprite.svg#check-12x9"></use>
                </svg> <span class="input-check-color__stick"></span></label></span></label> </div>
    </div>
        <div class="padding_left_box">
      <h6>Avaliação dos clientes</h6>
      <!-- column1, Vertical Dropdown Menu -->
      <h6>Tamanho Internacional</h6>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label class="form-check-label" for="flexCheckDefault">
           PPPPPP
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          PPPPP
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          PPPPP
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          PPPP
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          PPP
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          PP
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          P
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          M
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          G
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          GG
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          XGG
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          XGGG
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          XGGGG
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          XGGGGG
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          XGGGGGG
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
        <label class="form-check-label" for="flexCheckChecked">
          Tamanho Único
        </label>
      </div>
    </div>
    <div class="padding_left_box">
      <h6>Lançamento</h6>
      <ul class="no_list_style">
        <li class="color_link"><a href="#sub-menu" class=""> Últimos 7 dias </a> </li>
        <li class="color_link"><a href="#sub-menu" class=""> Últimos 30 dias </a> </li>
        <li class="color_link"><a href="#sub-menu" class=""> Últimos 90 dias </a> </li>
      </ul>
    </div>
  </div>
    </div>

</vue-final-modal>
    <button class="modal__open filters-button" @click="showFilter = true">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191928" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="arcs"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
       <span class="filters-button__title">Filtros</span>
    </button>
</div>
  <!-- End Left Bar My Account -->
</div>
</template>
<style scoped>
.padding_left_box.p_top.d-lg-none.adjust__filter {
    padding: 9px 10px 0px 14px;
}
button.modal__open.filters-button {
    background-color: #fff;
    border: 1px solid #ededed;
    border-radius: 2px;
}
span.filters-button__title {
    padding-left: 10px;
}
.bg-color {
    border: none;
    min-height: auto;
    border-radius: 2px;
}
.p_top{
  margin-top: 10px;
}
.product-card__rating-legend {
    font-size: 13px;
    line-height: 1.4;
    color: #191928;
    margin-left: 9px;
    padding-top: 1px;
}

.search__input {
    border: 1px solid #191928;
    padding: 0 17px;
    background: #fff;
    width: 1px;
    flex-grow: 1;
    font-size: 15px;
    transition: color 0.15s;
    color: inherit;
}
input.search__input {
    border: 1px solid #191928;
    padding: 0px 5px;
    background: #fff;
    width: 1px;
    flex-grow: 1;
    font-size: 15px;
    transition: color 0.15s;
    color: inherit;
    margin: 0px 13px 0px 0px;
    border-radius: 5px;
}
button.search__button.search__button--type--submit {
    border: 1px solid #191928;
    border-radius: 5px;
}
form.search__form {
    background-color: #fff;
}
.search__form {
    position: relative;
    height: 32px;
    display: flex;
}
.padding_left_box {
    padding: 0px 10px 15px 10px;
}
ul.no_list_style {
    list-style: none;
    padding: 0;
}
li.color_link a {
    color: #191928;
}
li.color_link a:hover {
    color: #4dcbf7;
}
</style>
<style scoped>
::v-deep(.modal-container) {
    display: flex;

    align-items: center;
}

::v-deep(.modal-content) {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    max-width: 75%;
    margin: 0 ;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
    overflow: scroll;
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
</style><style scoped>
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

</style>

<script>
export default {
  mounted() {
  },
  data(){
    return{
      showFilter:false,
    }
  }
};
</script>

<template>
  <div
    class="block block--highlighted block-categories block-categories--layout--compact"
  >
    <div class="container">
      <div class="block-header">
        <h3 class="block-header__title">Categorias</h3>
        <div class="block-header__divider"></div>
      </div>
      <div class="block-categories__list">
        <div
          class="block-categories__item category-card category-card--layout--compact"
        >
          <div class="category-card__body">
            <!-- <div class="category-card__image">
              <a href="#"
                ><img
                  src="../../assets/images/categories/category-1.jpg"
                  alt=""
                />
              </a>
            </div> -->
            <div class="category-card__content">
              <div class="category-card__name"><a href="#">Todas</a></div>
              <ul class="category-card__links">
                <li><a href="#">Screwdrivers</a></li>
                <li><a href="#">Milling Cutters</a></li>
                <li><a href="#">Sanding Machines</a></li>
                <li><a href="#">Wrenches</a></li>
                <li><a href="#">Drills</a></li>
              </ul>
              <div class="category-card__all"><a href="#">Show All</a></div>
              <div class="category-card__products">572 Produtos</div>
            </div>
          </div>
        </div>
        <div
          class="block-categories__item category-card category-card--layout--compact"
        >
          <div class="category-card__body">
            <!-- <div class="category-card__image">
              <a href="#"
                ><img
                  src="../../assets/images/categories/category-2.jpg"
                  alt=""
              /></a>
            </div> -->
            <div class="category-card__content">
              <div class="category-card__name"><a href="#">Beleza</a></div>
              <ul class="category-card__links">
                <li><a href="#">Screwdrivers</a></li>
                <li><a href="#">Hammers</a></li>
                <li><a href="#">Spanners</a></li>
                <li><a href="#">Handsaws</a></li>
                <li><a href="#">Paint Tools</a></li>
              </ul>
              <div class="category-card__all"><a href="#">Show All</a></div>
              <div class="category-card__products">134 Produtos</div>
            </div>
          </div>
        </div>
        <div
          class="block-categories__item category-card category-card--layout--compact"
        >
          <div class="category-card__body">
            <!-- <div class="category-card__image">
              <a href="#"
                ><img
                  src="../../assets/images/categories/category-4.jpg"
                  alt=""
              /></a>
            </div> -->
            <div class="category-card__content">
              <div class="category-card__name">
                <a href="#">Moda</a>
              </div>
              <ul class="category-card__links">
                <li><a href="#">Lathes</a></li>
                <li><a href="#">Milling Machines</a></li>
                <li><a href="#">Grinding Machines</a></li>
                <li><a href="#">CNC Machines</a></li>
                <li><a href="#">Sharpening Machines</a></li>
              </ul>
              <div class="category-card__all"><a href="#">Show All</a></div>
              <div class="category-card__products">301 Produtos</div>
            </div>
          </div>
        </div>
        <div
          class="block-categories__item category-card category-card--layout--compact"
        >
          <div class="category-card__body">
            <!-- <div class="category-card__image">
              <a href="#"
                ><img
                  src="../../assets/images/categories/category-3.jpg"
                  alt=""
              /></a>
            </div> -->
            <div class="category-card__content">
              <div class="category-card__name">
                <a href="#">Perfumaria</a>
              </div>
              <ul class="category-card__links">
                <li><a href="#">Generators</a></li>
                <li><a href="#">Compressors</a></li>
                <li><a href="#">Winches</a></li>
                <li><a href="#">Plasma Cutting</a></li>
                <li><a href="#">Electric Motors</a></li>
              </ul>
              <div class="category-card__all"><a href="#">Show All</a></div>
              <div class="category-card__products">79 Produtos</div>
            </div>
          </div>
        </div>
        <div
          class="block-categories__item category-card category-card--layout--compact"
        >
          <div class="category-card__body">
            <!-- <div class="category-card__image">
              <a href="#"
                ><img
                  src="../../assets/images/categories/category-5.jpg"
                  alt=""
              /></a>
            </div> -->
            <div class="category-card__content">
              <div class="category-card__name"><a href="#">Mais Vendidos</a></div>
              <ul class="category-card__links">
                <li><a href="#">Tape Measure</a></li>
                <li><a href="#">Theodolites</a></li>
                <li><a href="#">Thermal Imagers</a></li>
                <li><a href="#">Calipers</a></li>
                <li><a href="#">Levels</a></li>
              </ul>
              <div class="category-card__all"><a href="#">Show All</a></div>
              <div class="category-card__products">366 Produtos</div>
            </div>
          </div>
        </div>
        <div
          class="block-categories__item category-card category-card--layout--compact"
        >
          <div class="category-card__body">
            <!-- <div class="category-card__image">
              <a href="#"
                ><img
                  src="../../assets/images/categories/category-6.jpg"
                  alt=""
              /></a>
            </div> -->
            <div class="category-card__content">
              <div class="category-card__name">
                <a href="#">Ofertas do Dia</a>
              </div>
              <ul class="category-card__links">
                <li><a href="#">Winter Workwear</a></li>
                <li><a href="#">Summer Workwear</a></li>
                <li><a href="#">Helmets</a></li>
                <li><a href="#">Belts and Bags</a></li>
                <li><a href="#">Work Shoes</a></li>
              </ul>
              <div class="category-card__all"><a href="#">Show All</a></div>
              <div class="category-card__products">81 Produtos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- .block-categories / end -->
</template>
<script>
export default {};
</script>

<style scoped>
.category-card__body {
  border: 1px solid transparent;
}
@media (min-width: 1024px) {
  .category-card__body:hover {
    cursor: pointer;
    transform: scale(1.05);
    border: 1px solid #191928;
  }
}
</style>
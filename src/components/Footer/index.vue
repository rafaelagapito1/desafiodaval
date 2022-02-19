<template>
  <div class="site">
    <!-- site__footer -->
    <footer class="site__footer">
      <div class="site-footer">
        <div class="container">
          <div class="site-footer__widgets">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-4">
                <div class="site-footer__widget footer-contacts">
                  <h5 class="footer-contacts__title color__white">
                    VG COMPANY S.A.S.
                    <p style="font-size: 15px">
                      inscrita sob o Nº de RUT 218814010011
                    </p>
                  </h5>
                  <div class="footer-contacts__text color__white"></div>
                  <ul class="footer-contacts__contacts">
                    <li class="color__white">
                      <i
                        class="
                          footer-contacts__icon
                          fas
                          fa-globe-americas
                          color__white
                        "
                      ></i>
                      R Plaza Independencia, 848. <br />
                      Montevideo, Uruguay
                    </li>
                    <li class="color__white">
                      <i
                        class="
                          footer-contacts__icon
                          far
                          fa-envelope
                          color__white
                        "
                      ></i>
                      suporte@vg.company
                    </li>

                    <li class="color__white">
                      <i
                        class="footer-contacts__icon far fa-clock color__white"
                      ></i>
                      9:00 - 17:00
                    </li>
                  </ul>
                </div>
              </div>
        
              <div class="col-12 col-md-6 col-lg-4">
                <div class="site-footer__widget footer-links">
                    <ul class="footer-links__list">
                    <li class="footer-links__item color__white">
                      <a href="#"   @click.prevent="goTO('/search/default/1')" class="footer-links__link">SUPLEMENTOS ALIMENTARES</a>
                    </li>
                    <li class="footer-links__item color__white">
                      <a href="#"   @click.prevent="goTO('/search/default/2')" class="footer-links__link"
                        >BELEZA E PERFUMARIA</a
                      >
                    </li>
                    <li class="footer-links__item color__white">
                      <a href="#"  @click.prevent="goTO('/search/default/3')" class="footer-links__link">INFANTIL / BEBÊS</a>
                    </li>
                    <li class="footer-links__item color__white">
                      <a href="#"  @click.prevent="goTO('/search/default/4')" class="footer-links__link">SAÚDE E CUIDADOS PESSOAIS</a>
                    </li>
                    <li class="footer-links__item color__white">
                      <a href="#"  @click.prevent="goTO('/search/default/5')" class="footer-links__link">"MERCADO"</a>
                    </li>
                    <li class="footer-links__item color__white">
                      <a href="#"  @click.prevent="goTO('/search/default/6')" class="footer-links__link">MODA</a>
                    </li>
                    <li class="footer-links__item color__white">
                      <a href="#"   @click.prevent="goTO('/search/default/7')" class="footer-links__link">CAMA, MESA E BANHO</a>
                    </li>
                        <li class="footer-links__item color__white">
                      <a href="#"  @click.prevent="goTO('/search/default/8')" class="footer-links__link">FARMÁCIA / MEDICAMENTOS</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-12 col-md-12 col-lg-4">
                <div class="site-footer__widget footer-newsletter">
                  <h5 class="footer-newsletter__title color__white">
                    Newsletter
                  </h5>
                  <div class="footer-newsletter__text color__white">
                    SAIBA MAIS SOBRE NOSSO NEGÓCIO E FAÇA PARTE DE NOSSA REDE DE
                    CONSUMO INTELIGENTE!
                  </div>
                  <form action="#" class="footer-newsletter__form">
                    <label class="sr-only" for="footer-newsletter-address"
                      >Email</label
                    >
                    <input
                      type="text"
                      class="footer-newsletter__form-input form-control"
                      id="footer-newsletter-address"
                      placeholder="Email"
                    />
                    <button
                      class="
                        footer-newsletter__form-button
                        btn btn-primary
                        color__white
                      "
                    >
                      Enviar
                    </button>
                  </form>
                  <div
                    class="
                      footer-newsletter__text footer-newsletter__text--social
                      color__white
                    "
                  >
                    Nos siga nas redes sociais
                  </div>
                  <ul class="footer-newsletter__social-links">
                    <li
                      class="
                        footer-newsletter__social-link
                        footer-newsletter__social-link--instagram
                      "
                    >
                      <a
                        href="https://www.instagram.com/vg.company/"
                        target="_blank"
                        ><i class="fab fa-instagram"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="site-footer__bottom">
            <div class="site-footer__copyright color__white">
              © Copyright 2021 - Todos os Direitos Reservados
            </div>
            <!-- <div class="site-footer__payments"><img src="images/payments.png" alt=""></div> -->
          </div>
        </div>
      </div>
    </footer>
    <!-- site__footer / end -->
  </div>
</template>
<script>
export default {
  methods: {
   goTO(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style scoped>
</style>
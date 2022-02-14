<template>
  <!-- .block-banner -->
  <div class="block block-banner border_line">
    <div class="container">
      <div class="row">
        <div class="col-md-12 one d-inline-flex">
          <div class="ResultLeft">
            17 resultados para <span class="change_color">"Camisa VG"</span>
          </div>
          <div class="ResultRight d-flex flex-row-reverse">
            <div class="view-options__control style__button">
              <label for="">Ordernar Por:</label>
              <div>
                <select class="form-control form-control-sm adjust_button" name="" id="">
                  <option value="">Destaque</option>
                  <option value="">Nome (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- .block-banner / end -->
</template>


<style>
.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: none;
}
select.form-control.form-control-sm.adjust_button {
    background-position: right 0.5rem center;
    padding-left: 0px;
}
.style__button{
    background-color: #dee2e6;
    padding: 0px 10px 0px 10px;
    border-radius: 5px;
}
select.form-control.form-control-sm.adjust_button {
    border: none;
    background-color: #dee2e6;
}
form-control:focus {
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 0%);
}
.change_color {
  color: #4dcbf7;
}
.block.block-banner.border_line {
  border-bottom: 1px solid #ebebeb;
}
.ResultLeft {
    width: 50%;
    padding: 5px 0px 5px 0px;
    font-size: 13px;
    margin-top: 0.3rem;
}
.ResultRight {
  width: 50%;
  padding: 5px 0px 5px 0px;
  font-size: 13px;
}
.CarouselSingle .splide__slide img {
  width: 100%;
  height: 175px;
  background-size: contain;
  background-position: center;
}

.block.block-banner {
  margin-bottom: 15px;
}
</style>

<template>
  <div class="musculo conteudo-interno">
    <div class="text-center">
      <!-- <el-button type="primary" round @click="showModal = true">
        Cadastrar Exercício
        <i class="fas fa-plus"></i>
      </el-button> -->
    </div>
    <h4>Exercícios Cadastrados</h4>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="expand">
        <template #default="props">
          <div class="musculo">
            <b>Musculos Cadastrados:</b><br /><br />
            <ul id="lista-musculos">
              <li v-for="item in props.row.musculos" :key="item.message">
                <img :src="item.imagem" alt />
                <p>{{ item.nome }}</p>
              </li>
            </ul>
          </div>
          <div class="musculo">
            <b>equipamentos Cadastrados:</b><br /><br />
            <ul id="lista-musculos">
              <li v-for="item in props.row.equipamentos" :key="item.message">
                <img :src="item.imagem" alt />
                <p>{{ item.nome }}</p>
              </li>
            </ul>
          </div>
          <div class="descricao">
            <br /><br />
            <b>Descrição :</b>
            <p>{{ props.row.descricao }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Nome" prop="nome"></el-table-column>
      <el-table-column label="Categoria">
        <template #default="props">
          {{ props.row.categoria[0].nome }}
        </template>
      </el-table-column>
      <el-table-column label="ID">
        <template #default="props">
          {{ props.row.Referencia }}
        </template>
      </el-table-column>
    </el-table>
    <div class="text-center">
      <br />
      <br />
      <b>Total de registros:</b>
      {{ tableData.length }}
    </div>
  </div>

  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <button class="modal__close" @click="showModal = false">X</button>

    <div class="modal__content" v-loading="load">
      <div class>
        <form @submit.prevent="SendImage()">
          <div class="col-md-12">
            <h4>Cadastro de Equipamento</h4>
          </div>

          <div class="col-md-12">
            <span>Nome do Equipamento</span>
            <el-input placeholder="Triceps" v-model="nome_musculo"></el-input>
          </div>
          <br />
          <div class="col-md-12">
            <span>Imagem do Equipamento</span>
            <br />
            <label
              for="fileImage"
              style="
                background: #204f7f;
                color: white;
                padding: 1vw;
                border-radius: 5px;
                margin: 10px 2px 6px 5px;
              "
              >Escolha o Arquivo</label
            >

            <input
              style="display: none"
              id="fileImage"
              type="file"
              class="form-control form-control-sm mb-2 custom-file-upload"
              ref="loadImage"
              accept="image/*"
              @change="showFile()"
            />
            <br />

            <img
              v-if="render"
              :src="render"
              width="150"
              alt="Thumb preview..."
            />
          </div>
          <div class="col-md-12 text-center">
            <br />
            <button
              v-if="(this.nome_musculo != null) & (this.render != false)"
              style="background: #19ad39; border: 1px solid #19ad39"
              class="btn btn-secondary ml-3"
              type="submit"
            >
              <i class="el-icon-upload2"></i>
              Cadastrar
            </button>
            <button
              v-else
              style="background: #19ad39; border: 1px solid #19ad39"
              class="btn btn-secondary ml-3"
              disabled
            >
              <i class="el-icon-upload2"></i>
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
// @ is an alias to /src test env
import { reactive, ref } from "vue";
import * as moment from "moment";
import Swal from "sweetalert2";
import Auth from "../../services/routes";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      render: false,
      fileImage: null,
      showModal: false,
      fileName: false,
      activetab: 1,
      nome_musculo: null,
      imagem_musculo: null,
      load: false,
      tableData: [
        {
          nome: "Nome do Exercício",
          descricao:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          Referencia: "COD6546546464",
          Link_video_yt: "link",
          Arquivo_video: "arquivo",
          musculos: [
            {
              nome: "nome_musculo",
              imagem:
                "https://img.vixdata.io/pd/jpg-large/pt/sites/default/files/bbr/cuantos-musculos-tiene-el-cuerpo-humano.jpg",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://img.vixdata.io/pd/jpg-large/pt/sites/default/files/bbr/cuantos-musculos-tiene-el-cuerpo-humano.jpg",
            },
          ],
          equipamentos: [
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
          ],
          categoria: [
            {
              nome: "Yoga",
            },
            {
              nome: "Yoga",
            },
            {
              nome: "Yoga",
            },
          ],
        },
        {
          nome: "Nome do Exercício",
          descricao:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          Referencia: "COD6546546464",
          Link_video_yt: "link",
          Arquivo_video: "arquivo",
          musculos: [
            {
              nome: "nome_musculo",
              imagem:
                "https://img.vixdata.io/pd/jpg-large/pt/sites/default/files/bbr/cuantos-musculos-tiene-el-cuerpo-humano.jpg",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://img.vixdata.io/pd/jpg-large/pt/sites/default/files/bbr/cuantos-musculos-tiene-el-cuerpo-humano.jpg",
            },
          ],
          equipamentos: [
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
          ],
          categoria: [
            {
              nome: "Yoga",
            },
            {
              nome: "Yoga",
            },
            {
              nome: "Yoga",
            },
          ],
        },
        {
          nome: "Nome do Exercício",
          descricao:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          Referencia: "COD6546546464",
          Link_video_yt: "link",
          Arquivo_video: "arquivo",
          musculos: [
            {
              nome: "nome_musculo",
              imagem:
                "https://img.vixdata.io/pd/jpg-large/pt/sites/default/files/bbr/cuantos-musculos-tiene-el-cuerpo-humano.jpg",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://img.vixdata.io/pd/jpg-large/pt/sites/default/files/bbr/cuantos-musculos-tiene-el-cuerpo-humano.jpg",
            },
          ],
          equipamentos: [
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
          ],
          categoria: [
            {
              nome: "Yoga",
            },
            {
              nome: "Yoga",
            },
            {
              nome: "Yoga",
            },
          ],
        },
        {
          nome: "Nome do Exercício",
          descricao:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          Referencia: "COD6546546464",
          Link_video_yt: "link",
          Arquivo_video: "arquivo",
          musculos: [
            {
              nome: "nome_musculo",
              imagem:
                "https://img.vixdata.io/pd/jpg-large/pt/sites/default/files/bbr/cuantos-musculos-tiene-el-cuerpo-humano.jpg",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://img.vixdata.io/pd/jpg-large/pt/sites/default/files/bbr/cuantos-musculos-tiene-el-cuerpo-humano.jpg",
            },
          ],
          equipamentos: [
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
          ],
          categoria: [
            {
              nome: "Yoga",
            },
            {
              nome: "Yoga",
            },
            {
              nome: "Yoga",
            },
          ],
        },
        {
          nome: "Nome do Exercício",
          descricao:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          Referencia: "COD6546546464",
          Link_video_yt: "link",
          Arquivo_video: "arquivo",
          musculos: [
            {
              nome: "nome_musculo",
              imagem:
                "https://img.vixdata.io/pd/jpg-large/pt/sites/default/files/bbr/cuantos-musculos-tiene-el-cuerpo-humano.jpg",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://img.vixdata.io/pd/jpg-large/pt/sites/default/files/bbr/cuantos-musculos-tiene-el-cuerpo-humano.jpg",
            },
          ],
          equipamentos: [
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
            {
              nome: "nome_musculo",
              imagem:
                "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9j6Ye4WH9k7raa6nqgtdIptPJHkeNDxZYF1yAifyX-cKxMvO-15Zp25E1mRZLOOC2YeX8NfWXG478vgafldcBGJ3va07OzT6DGwz-Gj8&usqp=CAE",
            },
          ],
          categoria: [
            {
              nome: "Yoga",
            },
            {
              nome: "Yoga",
            },
            {
              nome: "Yoga",
            },
          ],
        },
      ],
    };
  },
  methods: {
    showFile() {
      var file = this.$refs.loadImage.files[0];
      const getBase64 = (file) =>
        new Promise(function (resolve, reject) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject("Error: ", error);
        });
      getBase64(file)
        .then((result) => {
          this.render = result;
        })
        .catch((e) => console.log("deu erro:", e));
    },

    SendImage() {
      this.load = true;
      let data = {
        nome_musculo: this.nome_musculo,
        imagem_musculo: this.render,
      };
      Auth.CadastroEquipamento(data)
        .then((r) => {
          this.$notify({
            message: "Cadastrado com Sucesso!",
            title: "Sucesso",
            type: "success",
          });
        })
        .catch((e) => {
          this.$notify({
            message: "Não foi possivel fazer esta ação",
            title: "Erro",
            type: "danger",
          });
        })
        .finally(() => {
          this.showModal = false;
          this.load = false;
          this.render = false;
          this.nome_musculo = null;
        });
    },
  },
  mounted() {},
  created() {},
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


<style scoped>
.conteudo-interno {
  padding: 2vw;
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
  max-width: 55%;
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
#lista-musculos {
  list-style-type: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  display: flex;
}

#lista-musculos img {
  width: 100px;
}
#lista-musculos li {
  width: 33%;
  border-bottom: 1px solid rgb(229 229 229);
}
</style>
<template>
<Header></Header>
<Results></Results>
<LeftBarMobile></LeftBarMobile>   

<!-- .block-banner -->
<div class="block block-banner">
    <div class="container">
        <div class="row">
            <div class="col-md-3 one d-none d-sm-none d-md-none d-lg-block">
                <LeftBar></LeftBar> 
            </div>
            <div class="col-md-12 col-lg-9 two">
                <ResultProducts></ResultProducts>
            </div>
            <div class="col-md-12 tree ">
                <BrowsingHistory></BrowsingHistory>
            </div>
        </div>
    </div>
</div>
<!-- .block-banner / end -->
<Footer></Footer>
</template>

<style scoped>

.margin__top{
    margin-top: 24px;
}
.breadcrumb-item+.breadcrumb-item:before {
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
// @ is an alias to /src
import {
    reactive,
    ref
} from "vue";

import Header from "../../components/Header/index.vue";
import Results from "./components/Results.vue";
import LeftBar from "./components/LeftBar.vue";
import LeftBarMobile from "./components/LeftBarMobile.vue";
import ResultProducts from "./components/ResultProducts.vue";
import Footer from "../../components/Footer/index.vue";
import BrowsingHistory from "../../components/BrowsingHistory/index.vue";

export default {
    name: "ResearchCatalog",
    components: {
        Header,
        Results,
        LeftBar,
        LeftBarMobile,
        ResultProducts,
        Footer,
        BrowsingHistory
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

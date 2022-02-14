<template>
<!-- Content Dashboard -->
<div>
    <div class="row">
        <div class="col">
            <div class="dashboard__profile card profile-card">
                <div class="card-body profile-card__body">
                    <div class="profile-card__avatar">
                        <img src="https://stroyka.html.themeforest.scompiler.ru/themes/default-ltr/images/avatars/avatar-3.jpg" alt="" />
                    </div>
                    <div class="profile-card__name">
                        <h5 class="text-center">Bem Vindo: <br>{{user.User.NAME}}</h5>
                    </div>
                    <div class="profile-card__edit">
                        <a href="account-profile.html" class="btn btn-secondary btn-sm">Editar Informações</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="dashboard__address card address-card address-card--featured">
                <div class="address-card__body">
                    <div class="address-card__name">
                        <h5>Endereço:</h5>
                    </div>
                    <div class="address-card__row">
                        {{user.User.ADDRESS}}, n°{{user.User.NUMBER}} , {{user.User.NEIGHBORHOOD}}<br> COMPLEMENTO: {{user.User.COMPLEMENT}}<br>{{user.User.CITY}} - {{user.User.STATE}}
                        {{user.User.ZIP_CODE}}
                    </div>
                    <div class="address-card__row margin_top">
                        <div class="address-card__row-title">
                            <h5>Telefone:</h5>
                        </div>
                        <div class="address-card__row-content">{{user.User.PHONE}}</div>
                    </div>
                    <div class="address-card__row margin_top">
                        <div class="address-card__row-title">
                            <h5>Email:</h5>
                        </div>
                        <div class="address-card__row-content">{{user.User.EMAIL}}</div>
                    </div>
                    <div class="address-card__footer margin_top">
                        <a href="account-edit-address.html">Editar Endereço</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row space-top">
        <div class="col">
            <table class="table able-striped table-hover border-table">
                <thead>
                    <tr class="card-header">
                        <th colspan="4">
                            <h2>Pedidos Recentes</h2>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Order</th>
                        <td>Date</td>
                        <td>Status</td>
                        <td>Total</td>
                    </tr>
                    <tr>
                        <th scope="row">#8132</th>
                        <td>02 April, 2019</td>
                        <td>Pending</td>
                        <td>P2719.00 for 5 items(s)</td>
                    </tr>
                    <tr>
                        <th scope="row">#8132</th>
                        <td>02 April, 2019</td>
                        <td>Pending</td>
                        <td>P2719.00 for 5 items(s)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<!-- End Dashboard -->
</template>

<style scoped>
.address-card {
    position: relative;
}
.card {
    border: 2px solid #dee2e6;
    border-radius: 2px;
}
.card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 2px solid #dee2e6 !important;
    border-radius: .25rem;
}
.address-card__badge {
    position: absolute;
    background-color: #6a8da5;
    color: #fff;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 4px 8px 2px;
    top: -2px;
    right: .75rem;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
}
.address-card--featured .address-card__body {
    padding: 2rem;
}
.profile-card__avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-bottom: 16px;
}
.profile-card__avatar img {
    border-radius: 50%;
    max-width: 100%;
}
table.table.able-striped.table-hover.border-table {
    border: 2px solid #dee2e6;
}
.card {
    border: 2px solid #f0f0f0;
    border-radius: 2px;
}
.card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
}
.profile-card__body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.card-body {
    padding: 2rem;
}
.card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 24.62rem;
    padding: 4rem;
}
.profile-card__email {
    font-size: 15px;
    margin-bottom: 24px;
}
.row.space-top {
    margin-top: 50px;
}
.margin_top {
    margin-top: 30px;
}
</style>

<script>
import {
    mapState
} from 'vuex';
export default {
    computed: {
        ...mapState('auth', ['user'])
    },
    mounted() {
    },
};
</script>
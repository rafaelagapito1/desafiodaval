
import axios from 'axios'
import Format from '../../src/helpers/FormatDate'



let defaultW = null;
//Logica pega api do webservice do arquivo .env e tira o /api do final-teste
let env;
try {
	env = require("../env.local.js").default;
} catch (err) {
	if (err instanceof Error) {
		env = require("../env.prod.js").default;
	}
}

let url = env.WS.URL;
defaultW = url.substr(0, url.length - 4); // <= seta o resultado no atributo default

//Logica pega api do webservice do arquivo .env e tira o /api do final




const Products = {
	async defaultW() {
		return  defaultW 
	},
	//Busca informações do Dashbord home
	async getDashboardInfo() {
		return await axios.get(defaultW + '/market/dashboard-values')
	},
	async getEnv() {
		return defaultW 
	},
	async getBanner(id) {
		return await axios.get(defaultW +'/market/get-banner/' + id)
	},
	
	async payPix(data) {
		return await axios.post(defaultW + '/api/pix-generate-store', data);
	},
	//Busca  e filtra os produtos
	async SearchProducts(data) {
		return await axios.post(defaultW + '/market/search-products/', data);

	},

	async ShippingCalc(data) {
		return await axios.post(defaultW + '/store/shipping-calculate', data);

	},

	async BilletGenerate(data) {
		return await axios.post(defaultW + '/store/external-order-store', data);

	},

	
	async SendRating(data) {
		return await axios.post(defaultW + '/market/add-product-evaluation ', data);

	},
	async TransferGenerate(data) {
		return await axios.post(defaultW + '/store/order-get-transfer-external', data);

	},

	async boletoCancel(id, dado) {
		return await axios
			.delete(defaultW + '/store/order-boleto-cancel/' + id,
				{
					data: dado
				},
				{ 'Content-Type': 'application/x-www-form-urlencoded' }
			)
	},
	async setSend(data) {
        return await axios.post(defaultW + '/store/confirm-delivery-to-client', data);
    },
	async resetCard(data) {
        return await axios.post(defaultW + '/api/mercado-pago/clean-fields ', data);
    },
	
	
	
	async getTracking(data) {
        return await axios
            .get(defaultW + '/store/track-package/'+data)
    },
	async getTokenMercadoPago() {
        return await axios
            .get(defaultW + '/api/mercado-pago/get-public-key')
    },
	
	async getUserImage(data) {
        return await axios
            .get(defaultW + `/api/user/get-profile-image/${data}`)
    },

    async Digitaplatforms(token) {
		axios.defaults.headers.common = {
			'Authorization': 'Bearer ' + token
		};
        return await axios
            .get(defaultW + `/api/digital-platforms`)
    },
	async methodsStore() {
        return await axios
            .get(defaultW + `/api/payment-methods-store`)
    },

	
	async RemoveImage(id) {
        return await axios
            .delete(defaultW + `/api/user/remove-profile-image/${id}`)
    },
	async getComments(data) {
        return await axios
            .get(defaultW + '/market/get-product-evaluation/'+data)
    },
	//CANCELA UM PEDIDO EM ABERTO
	async CancelOrder(USER_ACCOUNT_ID, VS_ORDER_ID) {
		return axios
			.post(defaultW +'/store/cancel-order', {
				USER_ACCOUNT_ID: USER_ACCOUNT_ID,
				VS_ORDER_ID: VS_ORDER_ID
			})
	},
	async GetOrders(data) {
		return await axios.post(defaultW + '/store/get-vs-order-list', data);

	},
	async GetOrderDetails(data) {
		return await axios.post(defaultW + '/store/get-order-data', data);
	},

	async SendOrder(data) {
		return await axios.post(defaultW + '/store/order', data);

	},
	async getCategories() {
		return await axios
			.get(defaultW + '/store/categories')
	},
	async verifyLoginToken(token) {
        return await axios
            .get(defaultW+'/api/validate-access-token/' +token)
    },

	async getSubCategories(id) {
		return await axios
			.get(defaultW + '/store/get-sub-categories/' + id)
	},
	async getUserCart(data) {
		return await axios
			.post(defaultW + '/store/get-user-shopping-cart' , data)
	},
	async deleteUserCart(data) {
		return await axios
			.put(defaultW + '/store/inactive-shopping-cart-by-user' , data)
	},
	async CreateCartProducts(data) {
		return await axios
			.post(defaultW + '/store/shopping-cart' , data)
	},
	
	

}



export default Products


import axios from 'axios'
import Format from '../helpers/FormatDate'

let defaultW = null;
//Logica pega api do webservice do arquivo .env e tira o /api do final-teste
let env;
try {
	env = require("../env.js").default;
} catch (err) {
	if (err instanceof Error) {
		env = require("../env.js").default;
	}
}

defaultW = env.WS.URL





async function getIp() {
	try {
		const ip = await axios.get('https://api.ipify.org?format=json')
		if (ip && ip.data) return ip.data.ip
	} catch (err) {
		return 1;
	}
}


const Auth = {
	async defaultW() {
		return defaultW
	},
	async getCountry() {
		return await axios.get(url + '/country')
	},
	async getGenres() {
		return await axios.get(url + '/genres')
	},



	///////LOGIN
	async login(data) {
		return await axios.post('hhttps://mentoriain.000webhostapp.com/api_login.php', {
			email: data.EMAIL,
			senha: data.PASSWORD,
		});
	},

	async CadastroMusculo(data) {
		return await axios.post(defaultW + '/cadastro_musculo', data);
	},
	async CadastroEquipamento(data) {
		return await axios.post(defaultW + '/cadastro_equipamento', data);
	},
	async CadastroCategoria(data) {
		return await axios.post(defaultW + '/cadastro_categoria', data);
	},
	async getCategoria() {
		return await axios.post(defaultW + '/lista_categorias');
	},
	async getMusculo() {
		return await axios.post(defaultW + '/lista_musculos');
	},
	async getEquipamento() {
		return await axios.post(defaultW + '/lista_equipamentos');
	},

	async verifyEmailExisting(email) {
		return await axios.post(url + '/existing-email', {
			email: email
		})
	},

	async ResendEmail(email) {
		return await axios.get(url + '/registration-requests/resend/' + email)
	},


	async verifyDocumentExisting(Numdocument) {
		return await axios.post(url + '/existing-document', {
			document: Numdocument
		})
	},
	////////REGISTER 
	async register(data) {
		console.log(data)
		return await axios.post(defaultW + '/market/registration-request', data)
	},





}

export default Auth
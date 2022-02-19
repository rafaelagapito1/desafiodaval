import Axios from 'axios'
import VueAxios from 'vue-axios'


const ApiAddressHelper = {

	seachZipCode(zipCode){
		return fetch('https://viacep.com.br/ws/'+zipCode+'/json/')
			
	}

}

export default ApiAddressHelper
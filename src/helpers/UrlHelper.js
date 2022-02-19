import Axios from 'axios'
import VueAxios from 'vue-axios'


const UrlHelper = {
	baseUrl () {
		let url = window.location.href;
		//url = "https://dev.google.com.br/login/testes/localhost?testes=14"
		if(url.substring(5, -6) == 'http:'){
			url = url.split('http://');
			prefix = "http://"
		}else{
			url = url.split('https://');
			prefix = "https://"
		}
        
        url = url[1].split('/');

        return prefix+url[0]+"/"
	},
	redirectTo(from="/"){
		 window.location.href = "#"+from;
	}

}

export default UrlHelper
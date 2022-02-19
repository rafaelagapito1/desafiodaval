


const FormatDate = {
	format(date = null){
      if(date == null) return null
      
	  if(date.slice(4,5) == '-' && date.length == 10){
	  	return date.slice(8,10)+'/'+date.slice(5,7)+'/'+date.slice(0,4)
	  }else if(date.slice(4,5) == '-' && date.length == 19){
	  	return date.slice(8,10)+'/'+date.slice(5,7)+'/'+date.slice(0,4)+' '+date.slice(11)
	  }
		else if(date.slice(2,3) == '/' && date.length == 10){
	  	return date.slice(6,10)+'-'+date.slice(3,5)+'-'+date.slice(0,2)
	  }
	  else if(date.slice(2,3) == '/' && date.length == 19){
	    return date.slice(6,10)+'-'+date.slice(3,5)+'-'+date.slice(0,2)+' '+date.slice(11)
	  }
	  else{
	  	return null
	  }
	},
	saveDateLocalStorage(){
		// Obtém a data/hora atual
		var data = new Date();

		// Guarda cada pedaço em uma variável
		var dia     = data.getDate();           // 1-31
		var dia_sem = data.getDay();            // 0-6 (zero=domingo)
		var mes     = data.getMonth();          // 0-11 (zero=janeiro)
		var ano2    = data.getYear();           // 2 dígitos
		var ano4    = data.getFullYear();       // 4 dígitos
		var hora    = data.getHours();          // 0-23
		var min     = data.getMinutes();        // 0-59
		var seg     = data.getSeconds();        // 0-59
		var mseg    = data.getMilliseconds();   // 0-999
		var tz      = data.getTimezoneOffset(); // em minutos

		if(dia.toString().length == 1) dia = '0'+dia.toString()
		if(mes.toString().length == 1) mes = '0'+mes.toString()
		if(hora.toString().length == 1) hora = '0'+hora.toString()
		if(min.toString().length == 1) min = '0'+min.toString()

		var dtStart = ano4+""+(0+(parseInt(mes)+1).toString())+""+dia+""+hora+""+min;
		localStorage.setItem("@APP:dateAuth", dtStart)
		//var dtChegada = ano4+""+(mes+1)+""+dia+""+hora+""+min;
	},
	compareDateAuth(dtPartida, dtChegada){
		var date1 = new Date(dtPartida.slice(0,4), dtPartida.slice(4,6),dtPartida.slice(6,8), dtPartida.slice(8,10), dtPartida.slice(10,12)),
		    date2 = new Date(dtChegada.slice(0,4), dtChegada.slice(4,6),dtChegada.slice(6,8), dtChegada.slice(8,10), dtChegada.slice(10,12));
		//new Date(ano, mês, dia, hora, minuto, segundo, milissegundo); 2021011090725
		var diffMs = (date2 - date1);
		var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
		var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
		//var diff = diffHrs + 'h ' + diffMins + 'm';
		var diff = diffMins;
		return parseInt(diff);
	},
	generateDateNow(){
		var data = new Date();

		// Guarda cada pedaço em uma variável
		var dia     = data.getDate();           // 1-31
		var dia_sem = data.getDay();            // 0-6 (zero=domingo)
		var mes     = data.getMonth();          // 0-11 (zero=janeiro)
		var ano2    = data.getYear();           // 2 dígitos
		var ano4    = data.getFullYear();       // 4 dígitos
		var hora    = data.getHours();          // 0-23
		var min     = data.getMinutes();        // 0-59
		var seg     = data.getSeconds();        // 0-59
		var mseg    = data.getMilliseconds();   // 0-999
		var tz      = data.getTimezoneOffset(); // em minutos

		if(dia.toString().length == 1) dia = '0'+dia.toString()
		if(mes.toString().length == 1) mes = '0'+mes.toString()
		if(hora.toString().length == 1) hora = '0'+hora.toString()
		if(min.toString().length == 1) min = '0'+min.toString()

		let dtPartida = ano4+""+(0+(parseInt(mes)+1).toString())+""+dia+""+hora+""+min;

		return dtPartida;
	},

	generateDateTradNow(){
		var data = new Date();

		// Guarda cada pedaço em uma variável
		var dia     = data.getDate();           // 1-31
		var dia_sem = data.getDay();            // 0-6 (zero=domingo)
		var mes     = data.getMonth();          // 0-11 (zero=janeiro)
		var ano2    = data.getYear();           // 2 dígitos
		var ano4    = data.getFullYear();       // 4 dígitos
		var hora    = data.getHours();          // 0-23
		var min     = data.getMinutes();        // 0-59
		var seg     = data.getSeconds();        // 0-59
		var mseg    = data.getMilliseconds();   // 0-999
		var tz      = data.getTimezoneOffset(); // em minutos

		

		if(dia.toString().length == 1) dia = '0'+dia.toString()
		if(mes.toString().length == 1) {
			mes++
			mes = '0'+mes.toString()
		}
		else{
			mes++
		}
		if(hora.toString().length == 1) hora = '0'+hora.toString()
		if(min.toString().length == 1) min = '0'+min.toString()
		if(seg.toString().length == 1) seg = '0'+seg.toString()

		let dtPartida = ano4+"-"+mes+"-"+dia+" "+hora+":"+min+":"+seg;

		return dtPartida;

	},

	diferencaMilisegundos(data1, data2){ //em formato trad  - data agora, data base

	  let ano1 = data1.slice(0,4)
	  let mes1 = data1.slice(5,7)
	  let dia1 = data1.slice(8,10)
	  let hora1 = data1.slice(11,13)
	  let min1 = data1.slice(14,16)
	  let seg1 = data1.slice(17,19)
	  
	  let ano2 = data2.slice(0,4)
	  let mes2 = data2.slice(5,7)
	  let dia2 = data2.slice(8,10)
	  let hora2 = data2.slice(11,13)
	  let min2 = data2.slice(14,16)
	  let seg2 = data2.slice(17,19)
	  
	  var data1 = new Date(ano1, mes1, dia1, hora1, min1, seg1);
	  var data2 = new Date(ano2, mes2, dia2, hora2, min2, seg2);
	  //console.log(data1-data2)

	  return data1-data2
	  //var diferenca = parseInt((data1-data2)/(24*3600*1000));
	  //return diferenca
	},

	compareDateReturnMiliseconds(dateInitial, dateFinal){
		//Format "YYYY-MM-DD HH:ii:ss"
		var date1 = new Date(dateInitial);
		var date2 = new Date(dateFinal);
		
		var diffMs = (date2 - date1);
		return diffMs;
	},

	formatDateString(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
	
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
	
		return [year, month, day].join('-');
	}
	
}

export default FormatDate

/*
const ApiAddressHelper = {

	seachZipCode(zipCode){
		return fetch('https://viacep.com.br/ws/'+zipCode+'/json/')
			
	}

}

export default ApiAddressHelper

*/
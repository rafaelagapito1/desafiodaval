import Axios from 'axios'
import VueAxios from 'vue-axios'
import UrlHelper from 'src/helpers/UrlHelper'

const UserAccount = {
    //RETORNA A ARVORE BINARIA
    async getNetworkList(P_USER_ACCOUNT_ID, P_REF_USER_ACCOUNT_ID) {
        return await Axios
            .post('/get-network-list', {
                P_USER_ACCOUNT_ID: P_USER_ACCOUNT_ID,
                P_REF_USER_ACCOUNT_ID: P_REF_USER_ACCOUNT_ID
            })
    },
    //REGISTRA UMA NOVA USER ACCOUNT
    async newUserAccount(data) {
        return await Axios
            .post('/user-account', data)
    },
    //ENVIA SOLICITACAO PARA EMAIL DE TERCEIRO PARA REGI
    async newUserAccountRequest(data) {
        return await Axios
            .post('/user-account-request', data)
    },
    //RETORNA A LISTA DE USUARIOS NO QUAL SOU PATROCINADOR
    async getSponsorsList(userAccountId) {
        return await Axios
            .get('/get-sponsors-list/' + userAccountId)
    },
    //ALTERA A CHAVE BINARIA DO USUARIO
    async upPreferentialSide(userAccountId, side) {
        return await Axios
            .post('/up-preferential-side', {
                P_USER_ACCOUNT_ID: userAccountId,
                P_SIDE: side
            })
    },
    //RETORNA O ESTRATO DO USUARIO
    async getStatementList(userAccountId, date) {
        return await Axios
            .post('/get-statement-list', {
                P_USER_ACCOUNT_ID: userAccountId,
                P_DATE: date
            })
    },
    //LISTA AS SEMANAS PARA VALIDAÇÃO E LANÇAMENTO DO CASHBACK
    async getCashBackWeekValidateList(userAccountId) {
        return await Axios
            .get('/get-cashback-week-validate-list/' + userAccountId)
    },
    //LISTA TODAS AS VALIDAÇÕES SEMANAIS DO USUARIO
    async getCashBackWeekList(userAccountId) {
        return await Axios
            .get('/get-cashback-week-list/' + userAccountId)
    },
    //VALIDA / INSERE A SEMANA PARA LANÇAMENTO DO CASHBACK
    async newCashBackWeek(userAccountId, cashbackWeekId) {
        return await Axios
            .post('/new-cashback-week', {
                P_USER_ACCOUNT_ID: userAccountId,
                P_CASHBACK_WEEK_ID: cashbackWeekId
            })
    },
    //RETORNA O GRAFICO BINARIO PARA O DASHBOARD
    async getBinaryChartList(userAccountId, days) {
        return await Axios
            .post('/get-binary-chart-list', {
                P_USER_ACCOUNT_ID: userAccountId,
                P_DAYS: days
            })
    },
    //LISTA O USUARIO ABAIXO DE DETERMINADA PERNA
    async getLastNetworkLeg(userAccountId, side) {
        return await Axios
            .post('/get-last-network-leg', {
                P_USER_ACCOUNT_ID: userAccountId,
                P_SIDE: side
            })
    },
    //RETORNA A LISTA DE CASHBACK BLOQUEADO DO USUARIO
    async blockedCashBackList(userAccountId) {
        return await Axios
            .get('/blocked-cashback-list/' + userAccountId)
    },
    //RETORNA TODOS OS DADOS DO USUARIO
    async getAllInformationUser(userAccountId) {
        return await Axios
            .get('/user-account-information/' + userAccountId)
    },
    async getAccountData(userAccountId) {
        try {
            const result = await Axios.get(`/get-user-account-information-all/${userAccountId}`);
            if (result) return {
                success: true,
                data: result.data.DATA
            }
        } catch (error) {
            return {
                success: false,
                data: error,
            }
        }
    },
    async getIdByNickname(nickname) {
        return await Axios
            .get('/get-id-by-nickname/' + nickname)
    },
    async getNicknameById(id) {
        return await Axios
            .get('/get-nickname-by-id/' + id)
    },
    async getScoreList(id, data, year) {
        let date = 0;
        switch (data) {
          case 'Jan':
            date = year+"-01-01"
            break;
          case 'Fev':
            date = year+"-02-01"
            break;
          case 'Mar':
            date = year+"-03-01"
            break;
          case 'Abr':
            date = year+"-04-01"
            break;
          case 'Mai':
            date = year+"-05-01"
            break;
          case 'Jun':
            date = year+"-06-01"
            break;
          case 'Jul':
            date = year+"-07-01"
            break;
          case 'Ago':
            date = year+"-08-01"
            break;
          case 'Set':
            date = year+"-09-01"
            break;
          case 'Out':
            date = year+"-10-01"
            break;
          case 'Nov':
            date = year+"-11-01"
            break;
          case 'Dez':
            date = year+"-12-01"
            break;
        }
        return await Axios
            .post('/user-account-score-list/'+id,{
                DATE:date
            })
    },

    async getScoreStoreList(id, data, year) {
      let date = 0;
      switch (data) {
        case 'Jan':
          date = year+"-01-01"
          break;
        case 'Fev':
          date = year+"-02-01"
          break;
        case 'Mar':
          date = year+"-03-01"
          break;
        case 'Abr':
          date = year+"-04-01"
          break;
        case 'Mai':
          date = year+"-05-01"
          break;
        case 'Jun':
          date = year+"-06-01"
          break;
        case 'Jul':
          date = year+"-07-01"
          break;
        case 'Ago':
          date = year+"-08-01"
          break;
        case 'Set':
          date = year+"-09-01"
          break;
        case 'Out':
          date = year+"-10-01"
          break;
        case 'Nov':
          date = year+"-11-01"
          break;
        case 'Dez':
          date = year+"-12-01"
          break;
      }
        return await Axios
            .post('/vs-user-account-score-list/'+id,{
                DATE:date
            })
    },

    async getNetworkByNicknameSearch(data) {
        return await Axios
            .post('/get-network-list-by-nickname', data)
    },

    async getMyDirectsPending(data) {
        return await Axios
            .post('/pending-requests', data)
    },

    


}

export default UserAccount
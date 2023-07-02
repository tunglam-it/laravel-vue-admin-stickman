export default {
   methods: {
      /***
       * get login coc
       */
      getToken() {
         return localStorage.getItem('token');
      }
   }
}
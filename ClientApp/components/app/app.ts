import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';
import FatalModalComponent from '../modal/fatalmodal';

@Component({
    components: {
        MenuComponent: require('../navmenu/navmenu.vue.html'),
        FatalModal: require('../modal/fatalmodal.vue.html')
    }
})
export default class AppComponent extends Vue {
  showModal: boolean = false;
    mounted() {
        axios.interceptors.response.use((response) => {
            return response;
          }, (error) => {
            this.showModal = true;
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
            return Promise.reject(error);
          });
    }
}

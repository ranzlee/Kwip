import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  components: {
    EntityGroup: require("./entitygroup.vue.html")
  }
})
export default class FetchEntityComponent extends Vue {
  rootId: number = 0;
}

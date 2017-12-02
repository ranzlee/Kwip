import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';

@Component({
  components: {
    EntityItem: require("./entityitem.vue.html")
  }
})
export default class FetchEntityComponent extends Vue {
  entities: Kwip.Domain.IFakeEntity[] = [];
  newEntity: Kwip.Domain.IFakeEntity = {};

  add(): void {
    
    axios
      .post("api/SampleData/AddOrUpdateFakeEntity", this.newEntity)
      .then(response => {
        this.entities.push(<Kwip.Domain.IFakeEntity>response.data);
        this.newEntity = {};
      });
  }

  mounted(): void {
    axios.get("api/SampleData/GetFakeEntities").then(response => {
      this.entities = <Kwip.Domain.IFakeEntity[]>response.data;
    });
  }
}

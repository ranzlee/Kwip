import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {
    EntityItem: require("./entityitem.vue.html")
  },
  props: {
    parentId: Number
  }
})
export default class FetchEntityComponent extends Vue {
  
    parentId: number;
    entities: Kwip.Domain.IFakeEntity[] = [];
    newEntity: Kwip.Domain.IFakeEntity = {};

    add(): void {
        if (this.parentId > 0){
            this.newEntity.parentId = this.parentId;
        }
        axios
        .post("api/SampleData/AddOrUpdateFakeEntity", this.newEntity)
        .then(response => {
            this.entities.push(<Kwip.Domain.IFakeEntity>response.data);
            this.newEntity = {};
        });
    }

    mounted(): void {
        axios.get("api/SampleData/GetFakeEntities?parentid=" + this.parentId).then(response => {
        this.entities = <Kwip.Domain.IFakeEntity[]>response.data;
        });
    }
}

import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from "axios";

@Component({
  props: {
    parent: Object
  }
})
export default class FetchEntityComponent extends Vue {
    parent: Kwip.Domain.IFakeEntity;
    entities: Kwip.Domain.IFakeEntity[] = [];
    newEntity: Kwip.Domain.IFakeEntity = {};

    add(): void {
        if (this.parent != null){
            this.newEntity.parentId = this.parent.id;
            this.newEntity.rootId = this.parent.rootId;
        }
        axios
        //add new entity - handle promise return since we need the ID from EF synced with client object
        .post("api/SampleData/AddOrUpdateFakeEntity", this.newEntity)
        .then(response => {
            this.entities.push(<Kwip.Domain.IFakeEntity>response.data);
            this.newEntity = {};
        });
    }

    remove(entity: Kwip.Domain.IFakeEntity): void {
        //remove the client object from the entities array
        this.entities = this.entities.filter(e => e !== entity);
    }

    mounted(): void {
        //load the current branch
        let parentId = this.parent == null ? "0" : this.parent.id;
        axios.get("api/SampleData/GetFakeEntities?parentid=" + parentId).then(response => {
            this.entities = <Kwip.Domain.IFakeEntity[]>response.data;
        });
    }

    beforeCreate(): void {
        //entitygroup and entityitem components are circular (each other's descendent and ancestor) so wait to register entityitem
        (<any>this.$options.components).EntityItem = require("./entityitem.vue.html");
    }
}

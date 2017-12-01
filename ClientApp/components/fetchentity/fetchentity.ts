import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class FetchEntityComponent extends Vue {
    
    entities: Kwip.Domain.IFakeEntity[] = [];
    newEntity: Kwip.Domain.IFakeEntity = {};

    add() {
        alert(this.newEntity.name);
    }

    mounted() {
        axios.get("api/SampleData/FakeEntities").then((response) => {
            this.entities = <Kwip.Domain.IFakeEntity[]>response.data;
        });
    }
}

import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class FetchEntityComponent extends Vue {
    
    entities: Kwip.Domain.IFakeEntity[] = [];
    newEntity: Kwip.Domain.IFakeEntity = {};

    add() {
        alert(this.newEntity.name);
    }

    mounted() {
        fetch('api/SampleData/FakeEntities')
            .then(response => response.json() as Promise<Kwip.Domain.IFakeEntity[]>)
            .then(data => {
                this.entities = data;
            });
    }
}

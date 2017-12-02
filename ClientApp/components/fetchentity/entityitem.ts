import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';
import { services } from '../../services/utilities';

@Component({
  props: {
    entity: Object
  }
})
export default class EntityItemComponent extends Vue {
  entity: Kwip.Domain.IFakeEntity;
  clone: Kwip.Domain.IFakeEntity;
  isEditMode: boolean = false;

  editMode(): void {
    this.clone = services.utilities.deepCopy(this.entity);
    this.isEditMode = true;
  }

  save(): void {
    axios.post("api/SampleData/AddOrUpdateFakeEntity", this.entity);
    this.isEditMode = false;
  }

  cancel(): void {
    this.entity.name = this.clone.name;
    this.isEditMode = false;
  }
}

import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';
import { services } from '../../services/utilities';

@Component({
  components: {
    EntityGroup: require("./entitygroup.vue.html")
  },
  props: {
    entity: Object
  }
})
export default class EntityItemComponent extends Vue {
  entity: Kwip.Domain.IFakeEntity;
  clone: Kwip.Domain.IFakeEntity;
  isEditMode: boolean = false;
  isGroupExpanded: boolean = false;
  rootId: number = 0;

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

  toggleGroup(): void {
    this.isGroupExpanded = !this.isGroupExpanded;
    if (this.entity.rootId && this.entity.rootId > 0){
      this.rootId = this.entity.rootId;
    }
  }
}

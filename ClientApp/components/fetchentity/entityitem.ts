import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';
import { services } from '../../services/utilities';
import FetchEntityComponent from './entitygroup';

@Component({
  components: {
    EntityGroup: require("./entitygroup.vue.html"),
    Modal: require("../modal/modal.vue.html")
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
  showModal: boolean = false;

  editMode(): void {
    //keep a pre-edit copy so we can restore state on cancel
    this.clone = services.utilities.deepCopy(this.entity);
    this.isEditMode = true;
  }

  save(): void {
    //don't wait for promise return - just do it!
    axios.post("api/SampleData/AddOrUpdateFakeEntity", this.entity);
    this.isEditMode = false;
  }

  cancel(): void {
    //restore pre-edit state
    this.entity.name = this.clone.name;
    this.isEditMode = false;
  }

  remove(): void {
    //don't wait for promise return - just do it!
    axios.post("api/SampleData/RemoveFakeEntity", this.entity);
    //call the parent component remove method since binding is one-way (parent -> child)
    (<FetchEntityComponent>this.$parent).remove(this.entity);
  }

  toggleGroup(): void {
    this.isGroupExpanded = !this.isGroupExpanded;
  }
}

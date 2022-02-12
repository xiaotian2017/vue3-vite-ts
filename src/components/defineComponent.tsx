import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'DefineComponentTsx',
  props: {
    msg: {
      type: String,
      default: 'test'
    },
  },
  data() {
    return {
      name: 'du',
    }
  },
  render() {
    return (<div>
      <h2>.tsx : defineComponent</h2>
      <p>this.msg : { this.msg }</p>
      <p>data this.name : { this.name }</p>
    </div>);
  }
});

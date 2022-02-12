import { defineComponent, ref } from '@vue/runtime-core';

export default defineComponent({
  props: {
    msg: {
      type: String,
      default: 'test setup'
    },
  },

  setup(props) {
    const name = ref('du');
    const count = ref(0);

    return () => (<div>
      <h2>.tsx : defineComponent setup(props)</h2>
      <p>props.msg : { props.msg }</p>
      <p>ref name : { name.value }</p>
      <p>ref count : { count.value }</p>
    </div>);
  }
});

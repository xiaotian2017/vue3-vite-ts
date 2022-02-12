<template>
  <app-dialog-form
    title="回复内容"
    :confirm="handleSubmit"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
  >
    <el-form :model="formData" :rules="formRules" ref="form">
      <el-form-item prop="content">
        <el-input
          type="textarea"
          :rows="3"
          v-model="formData.content"
        ></el-input>
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { IElForm } from '@/types/element-plus';
import { reply } from '@/api/product-reply';

const props = defineProps({
  replyId: {
    type: Number,
    default: 0,
  },
});

const form = ref<IElForm | null>(null);
const formData = ref<{ content: string }>({
  content: '',
});

const formRules = {
  content: [{ required: true, message: '请输入回复内容', trigger: 'change' }],
};

const formLoading = ref(false);
const emit = defineEmits(['success']);

const handleDialogOpen = async () => {
  formLoading.value = true;
};

const handleDialogClosed = () => {
  form.value?.clearValidate(); // 清除验证结果
  form.value?.resetFields(); // 清除表单数据
};

const handleSubmit = async () => {
  const valid = await form.value?.validate();
  if (!valid) {
    return;
  }
  await reply(props.replyId, formData.value);
  emit('success');
  ElMessage.success('保存成功');
};
</script>

<style lang="scss" scoped></style>

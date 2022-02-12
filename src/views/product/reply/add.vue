<template>
  <app-dialog-form
    title="添加虚拟评论"
    :confirm="handleSubmit"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="122px"
    >
      <el-form-item label="商品：" prop="product_id">
        <div
          class="img-add-container"
          v-if="!formData.image.product_id"
          @click="visibleProduct = true"
        >
          <el-icon><plus /></el-icon>
        </div>
        <div class="img-container" v-else>
          <el-avatar
            shape="square"
            :size="50"
            :src="formData.image.image"
          ></el-avatar>
          <div class="img-cover">
            <el-icon @click="handleDeleteProduct"><delete /></el-icon>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="用户头像：" prop="avatar">
        <div
          class="img-add-container"
          v-if="!formData.avatar"
          @click="visibleAvatar = true"
        >
          <el-icon><plus /></el-icon>
        </div>
        <div v-else>
          <el-avatar
            shape="square"
            :size="50"
            :src="formData.avatar"
          ></el-avatar>
        </div> </el-form-item
      ><el-form-item label="用户名称：" prop="nickname">
        <el-input
          v-model="formData.nickname"
          placeholder="请输入用户名称"
        ></el-input> </el-form-item
      ><el-form-item label="评价文字：" prop="comment">
        <el-input
          type="textarea"
          :rows="2"
          v-model="formData.comment"
          placeholder="请输入评价文字"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品分数：" prop="product_score">
        <el-rate v-model="formData.product_score"></el-rate> </el-form-item
      ><el-form-item label="服务分数：" prop="service_score">
        <el-rate v-model="formData.service_score"></el-rate> </el-form-item
      ><el-form-item label="评价图片：" prop="pics">
        <div v-if="!selectedRatePics.length"></div>
      </el-form-item>
      <el-form-item label="评论时间：" prop="add_time">
        <el-date-picker
          v-model="formData.add_time"
          type="datetime"
          placeholder="请选择评论时间（不选择默认当前时间）"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <Product
      v-model="visibleProduct"
      title="请选择商品"
      @on-select="handleSelectProduct"
    />
  </app-dialog-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { IElForm } from '@/types/element-plus';
import type {
  /* IForm, */ IVirtualReply,
  IProduct,
} from '@/api/types/product-reply';
import {
  /* getVirtualReplyForm, */ addVirtualReply,
} from '@/api/product-reply';
import Product from './Product.vue';

const form = ref<IElForm | null>(null);

const visibleProduct = ref<boolean>(false);
const visibleAvatar = ref<boolean>(false);
const selectedRatePics = ref<IProduct[]>([]);
const formData = ref<IVirtualReply>({
  // 选中商品
  image: {
    product_id: null,
    image: '',
  },
  nickname: '',
  avatar: '',
  comment: '',
  pics: '', // selectedRatePics.image[]
  product_score: 0,
  service_score: 0,
  add_time: '',
});
const formRules = {
  rule_name: [{ required: true, message: '请输入规格名称', trigger: 'blur' }],
};
const formLoading = ref(false);
const emit = defineEmits(['success']);

// const formElements = ref<IForm>();
const handleDialogOpen = async () => {
  // const data = await getVirtualReplyForm();
  // console.log('getVirtualReplyForm data :', data);
  // formElements.value = data;
  formLoading.value = true;
};

const handleDialogClosed = () => {
  form.value?.clearValidate(); // 清除验证结果
  form.value?.resetFields(); // 清除表单数据
};

// product
const handleSelectProduct = (id: IProduct['id'], image: IProduct['image']) => {
  formData.value.image.product_id = id;
  formData.value.image.image = image;
};
const handleDeleteProduct = () => {
  formData.value.image.product_id = null;
  formData.value.image.image = '';
};

const handleSubmit = async () => {
  const valid = await form.value?.validate();
  if (!valid) {
    return;
  }
  await addVirtualReply(formData.value);
  emit('success');
  ElMessage.success('保存成功');
};
</script>

<style lang="scss" scoped>
.img-add-container,
.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 1px #ddd dashed;
  border-radius: 4px;
  cursor: pointer;
}

.img-cover {
  height: 48px;
  width: 48px;
  position: absolute;
  left: 1px;
  top: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 1;
  }
  .el-icon {
    color: #fff;
  }
}
::v-deep .el-rate__icon {
  vertical-align: middle;
}
</style>

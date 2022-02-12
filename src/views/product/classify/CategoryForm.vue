<template>
  <app-dialog-form
    :title="props.id ? '编辑分类' : '添加分类'"
    :confirm="handleSubmit"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="父级：">
        <el-select v-model="formData.pid" placeholder="请选择父级">
          <el-option
            v-for="item in topCategory"
            :key="item.id"
            :label="item.html + item.cate_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称：" prop="cate_name">
        <el-input v-model="formData.cate_name" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="排序：">
        <el-input
          type="number"
          v-model="formData.sort"
          placeholder="请输入排序"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.is_show">
          <el-radio :label="1"> 显示 </el-radio>
          <el-radio :label="0"> 隐藏 </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { PropType } from 'vue';
import type { IElForm, IFormRule } from '@/types/element-plus';
import type {
  ITopCategory,
  IAddCategoryForm,
} from '@/api/types/product-classify';
import { ElMessage } from 'element-plus';
import {
  getTopCategory,
  addCategory,
  updateCategory,
  getCategoryById,
} from '@/api/product-classify';

const props = defineProps({
  id: {
    // 编辑 ID
    type: Number as PropType<number | null>,
    default: null,
  },
});

interface EmitsType {
  (e: 'update:id', value: number | null): void;
  (e: 'success'): void;
}

const emit = defineEmits<EmitsType>();

const form = ref<IElForm | null>(null);
const formLoading = ref(false);
const formData = ref({
  pid: null as number | null,
  cate_name: '',
  sort: 0,
  pic: '',
  is_show: 0 as 0 | 1,
});

const formRules: IFormRule = {
  account: [{ required: true, message: '请输入管理员账号', trigger: 'blur' }],
  pwd: [{ required: true, message: '请输入管理员密码', trigger: 'blur' }],
  conf_pwd: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
  roles: [{ required: true, message: '请选择管理员角色', trigger: 'blur' }],
  real_name: [{ required: true, message: '请输入管理员姓名', trigger: 'blur' }],
};

const handleDialogOpen = () => {
  formLoading.value = true;
  Promise.all([loadTopCategory(), loadCategoryById()]).finally(() => {
    formLoading.value = false;
  });
};

const topCategory = ref<ITopCategory[]>([]);
const loadTopCategory = async () => {
  const list = await getTopCategory();
  topCategory.value = list;
};

const loadCategoryById = async () => {
  if (!props.id) {
    return;
  }
  const data = await getCategoryById(props.id);
  formData.value = {
    ...formData.value,
    ...(data.rules.reduce(
      (pre, cur) => ({ [cur.field]: cur.value, ...(pre as object) }),
      {}
    ) as IAddCategoryForm),
  };
};

const handleDialogClosed = () => {
  emit('update:id', null);
  form.value?.clearValidate(); // 清除验证结果
  form.value?.resetFields(); // 清除表单数据
};

const handleSubmit = async () => {
  const valid = await form.value?.validate();
  if (!valid) {
    return;
  }
  if (props.id) {
    // 更新
    await updateCategory(props.id, formData.value);
  } else {
    // 添加
    await addCategory(formData.value);
  }
  emit('success');
  ElMessage.success('保存成功');
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>

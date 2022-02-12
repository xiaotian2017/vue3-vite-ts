<template>
  <app-dialog-form
    :title="props.attrId ? '编辑' : '添加' + '规格'"
    :confirm="handleSubmit"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
  >
    <el-form
      ref="attrTplForm"
      :model="attrTpl"
      :rules="attrTplFormRules"
      label-width="122px"
    >
      <app-draggable
        v-model="attrTpl.spec"
        :options="{
          handle: '.draggable-label',
        }"
      >
        <el-form-item label="规格模板名称：" prop="rule_name">
          <el-input v-model="attrTpl.rule_name"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in attrTpl.spec"
          :key="item.value + index"
          :label="item.value"
        >
          <template #label>
            <el-icon class="draggable-label"><Menu /></el-icon>
          </template>
          <div>
            <el-tag
              closable
              effect="dark"
              @close="attrTpl.spec.splice(index, 1)"
            >
              {{ item.value }}
            </el-tag>
          </div>
          <div>
            <app-draggable style="display: inline-block" v-model="item.detail">
              <el-tag
                class="detail-item"
                v-for="(detail, detailIndex) in item.detail"
                :key="detail"
                closable
                effect="plain"
                @close="item.detail.splice(detailIndex, 1)"
              >
                {{ detail }}
              </el-tag>
            </app-draggable>
            <el-input
              class="input-new-tag"
              v-if="item.inputVisible"
              v-model="item.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.prevent="handleInputConfirm(item)"
              @blur.prevent="handleInputConfirm(item)"
            />
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput(item)"
            >
              + 添加
            </el-button>
          </div>
        </el-form-item>
      </app-draggable>
      <el-form-item v-if="!isAdd">
        <el-button type="primary" @click="isAdd = true"> 添加新规格 </el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-form :model="attrForm" :rules="formRules" ref="form" inline>
          <el-form-item label="规格名称" prop="value">
            <el-input v-model="attrForm.value" />
          </el-form-item>
          <el-form-item label="规格值" prop="detail">
            <el-input v-model="attrForm.detail[0]" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAddAttr"> 确认 </el-button>
            <el-button @click="isAdd = false"> 取消 </el-button>
          </el-form-item>
        </el-form>
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import type { AttrRuleValue } from '@/api/types/product';
import type { /* IAttrTplForm, */ IAttrTpl } from '@/api/types/product-attr';
import { saveAttrTpl, getAttrTpl } from '@/api/product-attr';
import type { IElForm } from '@/types/element-plus';
import { ElMessage } from 'element-plus';

const props = defineProps({
  attrId: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(['success', 'update:attr-id']);

const attrTplForm = ref<IElForm | null>(null);
const attrTpl = ref<IAttrTpl>({
  rule_name: '',
  spec: [],
});
const attrTplFormRules = {
  rule_name: [{ required: true, message: '请输入规格名称', trigger: 'blur' }],
};
const formLoading = ref(false);

const handleDialogOpen = async () => {
  formLoading.value = true;
  if (props.attrId) {
    loadAttrTpl();
  }
};

const handleDialogClosed = () => {
  emit('update:attr-id', 0);
  attrTplForm.value?.clearValidate(); // 清除验证结果
  attrTplForm.value?.resetFields(); // 清除表单数据
  attrTpl.value.spec = [];
  attrTpl.value.id = 0;
  attrTpl.value.rule_value = '';
};

const loadAttrTpl = async () => {
  const { info } = await getAttrTpl(props.attrId);
  attrTpl.value = info;
};

// 添加新规格
const form = ref<IElForm | null>(null);
const saveTagInput = ref<HTMLInputElement | null>(null);
const attrForm = ref({
  value: '',
  detail: [''],
});
const isAdd = ref(false);

const formRules = {
  value: [{ required: true, message: '请输入规则名称', trigger: 'change' }],
  detail: [{ required: true, message: '请输入规则值', trigger: 'change' }],
};

const handleInputConfirm = (item: AttrRuleValue) => {
  if (item.inputValue?.length) {
    item.detail.push(item.inputValue);
  }
  item.inputVisible = false;
  item.inputValue = '';
};

const showInput = async (item: AttrRuleValue) => {
  item.inputVisible = true;
  await nextTick();
  saveTagInput.value?.focus();
};

const handleAddAttr = async () => {
  const valid = await form.value?.validate();
  if (!valid) return;
  attrTpl.value.spec.push({
    value: attrForm.value.value,
    detail: attrForm.value.detail,
    inputVisible: false,
    inputValue: '',
  });
  isAdd.value = false;
  form.value?.resetFields();
};

const handleSubmit = async () => {
  const valid = await attrTplForm.value?.validate();
  if (!valid) {
    return;
  }
  await saveAttrTpl(props.attrId || 0, attrTpl.value);
  emit('success');
  ElMessage.success('保存成功');
};
</script>

<style lang="scss" scoped>
.draggable-label {
  font-size: 20px;
  cursor: move;
}
.detail-item {
  margin-right: 10px;
  cursor: move;
}

.el-form-item {
  align-items: center;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

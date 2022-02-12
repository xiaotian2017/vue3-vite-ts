<template>
  <page-container>
    <app-card>
      <el-form :inline="true" :model="formData">
        <el-form-item label="商品分类：">
          <el-select v-model="formData.pid" clearable @change="loadList">
            <el-option
              v-for="item in topCategory"
              :key="item.id"
              :label="item.html + item.cate_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="formData.is_show" clearable @change="loadList">
            <el-option label="隐藏" :value="0"></el-option>
            <el-option label="显示" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称：">
          <el-input v-model="formData.cate_name">
            <template #append>
              <el-icon @click="loadList">
                <search />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="formVisible = true">
        <el-icon class="el-icon--right"><Plus /></el-icon>
        添加分类
      </el-button>

      <vxe-table
        :data="listData"
        row-id="id"
        :tree-config="{ children: 'children' }"
        v-loading="listLoading"
      >
        <vxe-column field="id" title="ID" />
        <vxe-column field="cate_name" title="分类名称" tree-node />
        <vxe-column title="分类图标">
          <template #default="{ row }">
            <img :src="row.pic || '@/assets/no.png'" alt="分类图标" />
          </template>
        </vxe-column>
        <vxe-column field="sort" title="排序" />
        <vxe-column title="状态">
          <template #default="{ row }">
            <el-switch
              v-model="row.is_show"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏"
              inline-prompt
              :loading="row.statusLoading"
              @change="handleStatusChange(row)"
            />
          </template>
        </vxe-column>
        <vxe-column title="操作" min-width="100">
          <template #default="scope">
            <el-button type="text" @click="handleUpdate(scope.row.id)">
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="text"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </vxe-column>
      </vxe-table>
      <app-pagination
        v-model:page="formData.page"
        v-model:limit="formData.limit"
        :list-count="total"
        :load-list="loadList"
        :disabled="listLoading"
      />
    </app-card>
  </page-container>

  <CategoryForm
    v-model="formVisible"
    v-model:id="id"
    @success="handleFormSuccess"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import type {
  ITopCategory,
  IListForm,
  ICategory,
} from '@/api/types/product-classify';
import {
  getTopCategory,
  getCategoryList,
  changeShowStatus,
  deleteCategory,
} from '@/api/product-classify';
import CategoryForm from './CategoryForm.vue';

const topCategory = ref<ITopCategory[]>([]);
const loadTopCategory = async () => {
  const list = await getTopCategory();
  topCategory.value = list;
};

const formData = ref<IListForm>({
  pid: undefined,
  is_show: undefined,
  cate_name: '',
  page: 1,
  limit: 10,
});
const listData = ref<ICategory[]>([]);
const total = ref(0);
const listLoading = ref(true);
const loadList = async () => {
  console.log('formData.value :', formData.value);
  const { list, count } = await getCategoryList(formData.value).finally(() => {
    listLoading.value = false;
  });

  list.forEach((item) => {
    item.statusLoading = false; // 控制切换状态的 loading 效果
  });

  listData.value = list;
  total.value = count;
};

const handleStatusChange = async (item: ICategory) => {
  item.statusLoading = true;
  await changeShowStatus(item.id, item.is_show).finally(() => {
    item.statusLoading = false;
  });
  ElMessage.success(`${item.is_show === 1 ? '显示' : '隐藏'}成功`);
};

const handleUpdate = (ID: ICategory['id']) => {
  id.value = ID;
  formVisible.value = true;
};

const handleDelete = async (id: ICategory['id']) => {
  await deleteCategory(id);
  loadList();
  ElMessage.success('成功删除');
};

onMounted(() => {
  loadList();
  loadTopCategory();
});

/**
 * 添加
 */
const formVisible = ref(false);
const id = ref<number | null>(null);

const handleFormSuccess = () => {
  formVisible.value = false;
  loadList();
};
</script>

<style lang="scss" scoped></style>

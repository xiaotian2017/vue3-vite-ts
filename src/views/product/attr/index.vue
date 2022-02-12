<template>
  <page-container>
    <app-card>
      <el-form :inline="true" :model="formData">
        <el-form-item label="规格搜索：">
          <el-input v-model="formData.rule_name" size="medium">
            <template #append>
              <el-icon @click="loadList" :loading="listLoading">
                <search color="#2b85e4" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" size="small" @click="dialogVisible = true">
          <el-icon><Plus /></el-icon>
          添加商品规格
        </el-button>
        <el-button size="small" @click="handleBatchDelete">批量删除</el-button>
      </div>
      <el-table
        :data="listData"
        v-loading="listLoading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="rule_name" label="规格名称"> </el-table-column>
        <el-table-column prop="attr_name" label="商品规格" />
        <el-table-column label="商品属性">
          <template #default="scope">
            <p v-for="attr in scope.row.attr_value" :key="attr">{{ attr }}</p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="120px"
          label="操作"
          fixed="right"
          align="center"
        >
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row.id)">
              编辑
            </el-button>
            <el-button type="text" @click="handleDelete({ ids: row.id })">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <app-pagination
        v-model:page="formData.page"
        v-model:limit="formData.limit"
        :list-count="total"
        :load-list="loadList"
        :disabled="listLoading"
      />
    </app-card>
  </page-container>

  <AddEdit
    v-model="dialogVisible"
    v-model:attr-id="attrId"
    @success="handleFormSuccess"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type {
  IListForm,
  IAttr,
  IDeleteAttrsParams,
} from '@/api/types/product-attr';
import {
  getAttrList,
  // changeShowStatus,
  deleteAttrs,
} from '@/api/product-attr';
import AddEdit from './AddEdit.vue';

const formData = ref<IListForm>({
  rule_name: '',
  page: 1,
  limit: 10,
});
const listData = ref<IAttr[]>([]);
const total = ref(0);
const listLoading = ref(true);
const loadList = async () => {
  const { list, count } = await getAttrList(formData.value).finally(() => {
    listLoading.value = false;
  });

  list.forEach((item) => {
    item.statusLoading = false; // 控制切换状态的 loading 效果
  });

  listData.value = list;
  total.value = count;
};

onMounted(() => {
  loadList();
});

const handleDelete = async (params: IDeleteAttrsParams) => {
  const isBatch = Boolean(params.all);

  ElMessageBox.confirm(
    `确定要${isBatch ? '批量' : ''}删除规格吗？<br>${
      isBatch ? '批量' : ''
    }删除规格后将无法恢复，请谨慎操作！`,
    `${isBatch ? '批量' : ''}删除规格`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true,
    }
  )
    .then(async () => {
      await deleteAttrs(params);
      loadList();
      ElMessage({
        type: 'success',
        message: `${isBatch ? '批量' : ''}删除成功`,
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: `${isBatch ? '批量' : ''}删除取消`,
      });
    });
};

const selectionItems = ref<IAttr[]>([]);
const handleSelectionChange = (val: IAttr[]) => {
  selectionItems.value = val;
};

const handleBatchDelete = () => {
  if (!selectionItems.value.length) {
    return ElMessage({
      message: '请选择要删除的规格！',
      type: 'warning',
    });
  }
  handleDelete({
    ids: selectionItems.value.map((item) => item.id).join(','),
    all: 1,
  });
};

// 添加/编辑
const dialogVisible = ref<boolean>(false);
const attrId = ref<number>(0);
const handleEdit = (id: number) => {
  dialogVisible.value = true;
  attrId.value = id;
};
const handleFormSuccess = () => {
  dialogVisible.value = false;
  loadList();
};
</script>

<style lang="scss" scoped></style>

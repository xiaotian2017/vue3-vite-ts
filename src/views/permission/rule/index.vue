<template>
  <page-container>
    <app-card>
      <template #header> 数据筛选 </template>
      <el-form
        :inline="true"
        ref="form"
        :model="listParams"
        :disabled="listLoading"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="状态">
          <el-select
            v-model="listParams.is_show"
            placeholder="请选择"
            clearable
          >
            <el-option label="全部" value="" />
            <el-option label="显示" :value="1" />
            <el-option label="不显示" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="规则名称">
          <el-input
            v-model="listParams.keyword"
            clearable
            placeholder="请输入规则名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit"> 查询 </el-button>
        </el-form-item>
      </el-form>
    </app-card>
    <app-card>
      <template #header>
        <el-button type="primary" @click="formVisible = true">
          添加规则
        </el-button>
      </template>
      <!--
        [树形数据与懒加载](https://element-plus.gitee.io/zh-CN/component/table.html#%E6%A0%91%E5%BD%A2%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%87%92%E5%8A%A0%E8%BD%BD)
      -->
      <!-- <el-table
        :data="list"
        v-loading="listLoading"
        lazy
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :load="loadTree"
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="menu_name" label="名称" />
        <el-table-column label="接口路径">
          <template #default="{ row }">
            {{ row.api_url ? `[${row.methods}] ${row.api_url}` : '' }}
          </template>
        </el-table-column>
        <el-table-column prop="unique_auth" label="前端权限" />
        <el-table-column prop="menu_path" label="页面路由" />
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-switch
              v-model="row.is_show"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :loading="row.statusLoading"
              @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template #default="scope">
            <el-button type="text" @click="handleCreate(scope.row.id)">
              添加规则
            </el-button>
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
        </el-table-column>
      </el-table> -->
      <!--
        启用树菜单：
          1. data 数据需要是树结构
          2. 给 vxe-table 组件设置 row-id
          3. 给 vxe-column 设置 tree-node , 生成展开按钮
       -->
      <vxe-table
        :data="list"
        row-id="id"
        :tree-config="{ children: 'children' }"
        v-loading="listLoading"
      >
        <vxe-column field="id" title="ID" />
        <vxe-column field="menu_name" title="名称" tree-node />
        <vxe-column title="接口路径">
          <template #default="{ row }">
            {{ row.api_url ? `[${row.methods}] ${row.api_url}` : '' }}
          </template>
        </vxe-column>
        <vxe-column field="unique_auth" title="前端权限" />
        <vxe-column field="menu_path" title="页面路由" />
        <vxe-column title="状态">
          <template #default="{ row }">
            <el-switch
              v-model="row.is_show"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :loading="row.statusLoading"
              @change="handleStatusChange(row)"
            />
          </template>
        </vxe-column>
        <vxe-column title="操作" min-width="100">
          <template #default="scope">
            <el-button type="text" @click="handleCreate(scope.row.id)">
              添加规则
            </el-button>
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
    </app-card>
  </page-container>
  <rule-form
    v-model="formVisible"
    v-model:rule-id="ruleId"
    v-model:pid="pid"
    @success="handleFormSuccess"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { getMenus, deleteMenu, updateMenuStatus } from '@/api/menu';
import type { Menu } from '@/api/types/menu';
import { ElMessage } from 'element-plus';
import RuleForm from './RuleForm.vue';

const list = ref<Menu[]>([]); // 列表数据
const listLoading = ref(true);
const listParams = reactive({
  // 列表数据查询参数
  keyword: '',
  is_show: '' as 0 | 1 | '',
});
const formVisible = ref(false);
const ruleId = ref<number | null>(null);
const pid = ref<number | null>(null);

onMounted(() => {
  loadList();
});

const loadList = async () => {
  listLoading.value = true;
  const data = await getMenus(listParams).finally(() => {
    listLoading.value = false;
  });
  data.forEach((item) => {
    item.statusLoading = false; // 控制切换状态的 loading 效果
    if (item.children?.length) {
      item.hasChildren = true;
    }
  });
  list.value = data;
};

// const loadTree = (
//   row: any,
//   treeNode: Menu,
//   resolve: PromiseConstructor['resolve']
// ) => {
//   console.log('>>> loadTree :', row, treeNode);
//   resolve(treeNode.children);
// };

const handleQuery = async () => {
  loadList();
};

const handleDelete = async (id: number) => {
  await deleteMenu(id);
  ElMessage.success('删除成功');
  loadList();
};

const handleStatusChange = async (item: Menu) => {
  item.statusLoading = true;
  await updateMenuStatus(item.id, item.is_show).finally(() => {
    item.statusLoading = false;
  });
  ElMessage.success(`${item.is_show === 1 ? '启用' : '禁用'}成功`);
};

const handleUpdate = (id: number) => {
  ruleId.value = id;
  formVisible.value = true;
};

const handleFormSuccess = () => {
  formVisible.value = false;
  loadList();
};

const handleCreate = (id: number) => {
  pid.value = id;
  formVisible.value = true;
};
</script>

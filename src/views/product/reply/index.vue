<template>
  <page-container>
    <app-card>
      <el-form :inline="true" :model="formData" ref="attrTplForm">
        <el-form-item label="时间选择：">
          <el-radio-group v-model="formData.data" @change="loadList">
            <el-radio-button
              v-for="item in TIME_LIST"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="date"
            type="daterange"
            format="YYYY/MM/DD"
            value-format="YYYY/MM/DD"
            placeholder="自定义时间"
            @change="handleChangeDateRange"
          />
        </el-form-item>
        <el-form-item label="评价状态：">
          <el-select
            v-model="formData.is_reply"
            placeholder="请选择"
            @change="loadList"
          >
            <el-option
              v-for="(label, value) in REPLY_MAP"
              :key="value"
              :label="label"
              :value="value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品信息：">
          <el-input v-model="formData.store_name"></el-input>
        </el-form-item>
        <el-form-item label="用户名称：">
          <el-input v-model="formData.account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search">搜索</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="dialogAddVisible = true">
          <el-icon><Plus /></el-icon>
          添加虚拟评论
        </el-button>
      </div>
      <el-table
        :data="listData"
        v-loading="listLoading"
        style="width: 100%"
        @sort-change="handleSortChange"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="商品信息">
          <template #default="scope">
            <el-row class="td-store_name">
              <el-col :span="6"
                ><el-image
                  :src="scope.row.image"
                  class="pictrue"
                  lazy
                ></el-image
              ></el-col>
              <el-col :span="18"
                ><p class="info">{{ scope.row.store_name }}</p></el-col
              >
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="用户名称" />
        <el-table-column prop="score" label="评分" sortable="custom" />
        <el-table-column prop="comment" label="评价内容">
          <template #default="scope">
            <div class="blue">{{ scope.row.comment }}</div>
            <template v-if="scope.row.pics">
              <div class="picture" v-for="(pic, i) in scope.row.pics" :key="i">
                <el-image :src="pic" lazy></el-image>
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="merchant_reply_content" label="回复内容" />
        <el-table-column prop="rule_name" label="评价时间" sortable="custom">
          <template #default="scope">
            <p>{{ formatDate2S(scope.row.add_time) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="120px"
          label="操作"
          fixed="right"
          align="center"
        >
          <template #default="{ row }">
            <el-button type="text" @click="handleReply(row.id)">
              回复
            </el-button>
            <el-button type="text" @click="handleDelete(row.id)">
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

  <Reply
    v-model="dialogReplyVisible"
    :reply-id="replyId"
    @success="handleReplyFormSuccess"
  />
  <Add v-model="dialogAddVisible" @success="handleAddFormSuccess" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { IListForm, IReply } from '@/api/types/product-reply';
import { getReplyList, deleteReply } from '@/api/product-reply';
import Add from './Add.vue';
import Reply from './Reply.vue';
import { formatDate2S } from '@/utils/days';

const TIME_LIST = [
  {
    value: '',
    label: '全部',
  },
  {
    value: 'today',
    label: '今天',
  },
  {
    value: 'yesterday',
    label: '昨天',
  },
  {
    value: 'lately7',
    label: '最近7天',
  },
  {
    value: 'lately30',
    label: '最近30天',
  },
  {
    value: 'month',
    label: '本月',
  },
  {
    value: 'year',
    label: '本年',
  },
];

const REPLY_MAP = {
  0: '未回复',
  1: '已回复',
};

const formData = ref<IListForm>({
  account: '',
  store_name: '',
  data: '',
  is_reply: '',
  product_id: 0,
  page: 1,
  limit: 10,
});
const date = ref(['', '']);
const handleChangeDateRange = (date: string[]) => {
  formData.value.data = `${date[0]}-${date[1]}`;
  loadList();
};
const listData = ref<IReply[]>([]);
const total = ref(0);
const listLoading = ref(true);
const loadList = async () => {
  const { list, count } = await getReplyList(formData.value).finally(() => {
    listLoading.value = false;
  });

  listData.value = list;
  total.value = count;
};

onMounted(() => {
  loadList();
});

const handleSortChange = (column: any, prop: string, order: string) => {
  console.log(column, prop, order);
};

const handleDelete = async (id: number) => {
  ElMessageBox.confirm(
    `确定要删除评论吗？<br>删除评论后将无法恢复，请谨慎操作！`,
    `删除评论`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true,
    }
  )
    .then(async () => {
      await deleteReply(id);
      loadList();
      ElMessage({
        type: 'success',
        message: `删除成功`,
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: `删除取消`,
      });
    });
};

/**
 * 回复
 */
const replyId = ref<number>(0);
const dialogReplyVisible = ref<boolean>(false);
const handleReply = (id: number) => {
  dialogReplyVisible.value = true;
  replyId.value = id;
};

const handleReplyFormSuccess = () => {
  dialogReplyVisible.value = false;
  loadList();
};

/**
 * 添加
 */
const dialogAddVisible = ref<boolean>(false);
const handleAddFormSuccess = () => {
  dialogAddVisible.value = false;
  loadList();
};
</script>

<style lang="scss" scoped>
:deep(.td-store_name) {
  align-items: center;
}
:deep(.picture) {
  display: inline-block;
  cursor: pointer;

  .el-image {
    height: 36px;
  }

  img {
    height: 100%;
    display: block;
  }
}
:deep(.info) {
  margin-left: 10px;
}
</style>

<template>
  <el-dialog
    ref="dialog"
    width="50%"
    :title="props.title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form :model="formData" inline>
      <el-form-item label="商品分类：">
        <el-select
          v-model="formData.cate_id"
          class="m-2"
          placeholder="Select"
          @change="loadList"
        >
          <el-option
            v-for="item in productCates"
            :key="item.id"
            :label="item.html + item.cate_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品搜索：">
        <el-input
          v-model="formData.store_name"
          placeholder="请输入商品名称,关键字,编号"
          @change="loadList"
        >
          <template #append>
            <el-icon @click="loadList"><Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="listData"
      v-loading="listLoading"
      style="width: 100%"
      @row-click="handleClickRow"
    >
      <el-table-column label="#" width="80">
        <template #default="scope">
          <el-radio v-model="scope.row.selected"></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="商品ID" width="80" />
      <el-table-column label="图片">
        <template #default="scope">
          <el-image :src="scope.row.image" lazy></el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="store_name"> </el-table-column>
      <el-table-column label="商品分类" prop="cate_name" />
    </el-table>
    <app-pagination
      v-model:page="formData.page"
      v-model:limit="formData.limit"
      :list-count="total"
      :load-list="loadList"
      :disabled="listLoading"
    />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
// import type { PropType } from 'vue';
import type { IElDialog } from '@/types/element-plus';
import { getCategoryTree } from '@/api/product';
import { getProductList } from '@/api/product-reply';
import type { ProductCategory } from '@/api/types/product';
import type { IProductListForm, IProduct } from '@/api/types/product-reply';

const dialog = ref<IElDialog | null>(null);

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});

interface EmitsType {
  (e: 'on-select', id: IProduct['id'], image: IProduct['image']): void;
}
const emit = defineEmits<EmitsType>();

const productCates = ref<ProductCategory[]>([]); // 商品分类
const loadCates = async () => {
  const data = await getCategoryTree(1);
  productCates.value = data;
};

onMounted(() => {
  loadCates();
});

const formData = ref<IProductListForm>({
  page: 1,
  limit: 10,
  cate_id: '',
  store_name: '',
});
const listData = ref<IProduct[]>([]);
const total = ref(0);
const listLoading = ref(true);
const loadList = async () => {
  const { list, count } = await getProductList(formData.value).finally(() => {
    listLoading.value = false;
  });

  list.forEach((item) => {
    item.selected = false;
  });

  listData.value = list;
  total.value = count;
};

const handleClickRow = (currentRow: IProduct) => {
  console.log('currentRow :', currentRow);
  listData.value.forEach((item) => {
    item.selected = item.id === currentRow.id;
  });

  emit('on-select', currentRow.id, currentRow.image);
  if (dialog.value) {
    dialog.value.visible = false;
  }
};

watch(
  () => dialog.value?.visible,
  (val, preVal) => {
    console.log(val, preVal);
    if (val) {
      loadList();
    }
  }
);
</script>

<style lang="scss" scoped>
.el-table {
  margin-bottom: 1em;
}
::v-deep .el-image {
  height: 36px;
}
</style>

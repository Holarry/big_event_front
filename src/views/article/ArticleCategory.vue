<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([])

// 声明一个异步函数 查询文章分类
import { categoryListService, categoryAddService, categoryUpdateService, categoryDeleteService } from '@/api/category.js'
const categoryList = async () => {
    let result = await categoryListService();
    categorys.value = result.data;
}
categoryList();

//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    categoryName: '',
    categoryAlias: ''
})
//添加分类表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    categoryAlias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
    ]
}

// 添加文章分类
import { ElMessage } from 'element-plus'
const addCategory = async () => {
    let result = await categoryAddService(categoryModel.value);
    if (result.message.includes('java.sql.SQLIntegrityConstraintViolationException: Duplicate entry')) {
        ElMessage.error('该分类已存在');
    } else {
        ElMessage.success('添加分类成功');
    }

    // 调用查询文章分类函数
    categoryList();
    dialogVisible.value = false;
}

// 定义变量 控制标题展示
const title = ref('');

// 展示编辑弹窗
const showDialog = (row) => {
    dialogVisible.value = true;
    title.value = '编辑分类'
    // 数据拷贝
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.categoryAlias = row.categoryAlias;
    categoryModel.value.id = row.id;
}

// 清空模型数据
const clearCategoryModel = () => {
    categoryModel.value.categoryName = '';
    categoryModel.value.categoryAlias = '';
}

// 修改文章分类
const updateCategory = async () => {
    let result = await categoryUpdateService(categoryModel.value);
    if (result.message.includes('java.sql.SQLIntegrityConstraintViolationException: Duplicate entry')) {
        ElMessage.error('该分类已存在');
    } else {
        ElMessage.success('修改分类成功');
    }

    // 调用查询文章分类函数
    categoryList();
    dialogVisible.value = false;
}

// 删除文章分类
import { ElMessageBox } from 'element-plus';
const deleteCategory = (row) => {
    ElMessageBox.confirm(
        '您确认删除该分类吗?',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let result = await categoryDeleteService(row.id);
            if (result.message.includes('java.sql.SQLIntegrityConstraintViolationException: Cannot delete or update a parent row: a foreign key constraint fails')) {
                ElMessage.error('该分类下关联了文章,不能删除');
                return;
            } else {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
            }

            // 调用查询文章分类函数
            categoryList();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary"
                        @click="dialogVisible = true; title = '添加分类'; clearCategoryModel()">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title == '添加分类' ? addCategory() : updateCategory()"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
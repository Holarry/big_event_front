<script setup>
import { ref } from 'vue'
import { userPwdUpdateService } from "@/api/user.js";
import { ElMessage } from "element-plus";

const pwdData = ref({
    oldPwd: '',
    newPwd: '',
    rePwd: ''
})

import { useRouter } from 'vue-router';
let router = useRouter();
const updatePwdData = async () => {
    if (pwdData.value.oldPwd === '' || pwdData.value.newPwd === '' || pwdData.value.rePwd === '') {
        ElMessage.error('密码未完整输入');
        return;
    }
    if (pwdData.value.newPwd.length < 5 || pwdData.value.rePwd.length < 5) {
        ElMessage.error('新密码格式错误');
        return;
    }
    if (pwdData.value.newPwd != pwdData.value.rePwd) {
        ElMessage.error('两次密码输入不一致');
        return;
    }
    let result = await userPwdUpdateService(pwdData.value);
    if (result.code != 0) {
        ElMessage.error(result.message ? result.message : '修改密码失败');
    } else {
        ElMessage.success('修改密码成功');
        ElMessage.error('请重新登录');
        pwdData.value = {
            oldPwd: '',
            newPwd: '',
            rePwd: ''
        }
        router.push('/login');
    }
}
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入新密码'))
    } else if (value != pwdData.value.newPwd) {
        callback(new Error('两次密码输入不一致'))
    } else {
        callback()
    }
}
const rules = {
    oldPwd: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5-16位', trigger: 'blur' },
    ],
    newPwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5-16位', trigger: 'blur' },
    ],
    rePwd: [
        { required: true, message: '请确认新密码', trigger: 'blur' },
        { validator: checkRePassword, trigger: 'blur' },
    ]
}
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>重置密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="pwdData" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="旧密码" prop="oldPwd">
                        <el-input v-model="pwdData.oldPwd" type="password" placeholder="请输入旧密码"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPwd">
                        <el-input v-model="pwdData.newPwd" type="password" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="rePwd">
                        <el-input v-model="pwdData.rePwd" type="password" placeholder="请输入再次新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePwdData">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>
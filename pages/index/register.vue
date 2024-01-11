<template>
	<view>
		<view class="logo">
			<image src="@/static/logo.png"></image>
		</view>
		<uni-forms class="myForm" ref="myForm" :modelValue="registerModel" :rules="rules">
			<uni-forms-item name="email" required>
				<uni-easyinput class="input" inputmode="email" v-model="registerModel.email" placeholder="请输入电子邮箱"
					suffix-icon="email" />
			</uni-forms-item>
			<uni-forms-item name="userName" required>
				<uni-easyinput class="input" v-model="registerModel.userName" placeholder="请输入用户账号"
					suffix-icon="person" />
			</uni-forms-item>
			<uni-forms-item name="emailCode" required>
				<view class="myForm-emailCode">
					<uni-easyinput class="input" v-model="registerModel.emailCode" placeholder="请输入邮箱验证码" />
					<button type="default" size="mini" :loading="loading" @click="btnEmailCode">邮箱验证码</button>
				</view>
			</uni-forms-item>
			<uni-forms-item name="password" required>
				<uni-easyinput class="input" type="password" v-model="registerModel.password" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item name="repassword" required>
				<uni-easyinput class="input" type="password" v-model="registerModel.repassword" placeholder="请输入确认密码" />
			</uni-forms-item>
			<button type="primary" @click="btnRegister">用户注册</button>
		</uni-forms>

	</view>
</template>

<script>
	import { postRequest } from '@/http/index.js'
	export default {
		data() {
			return {
				registerModel:{
					email:'',
					userName:'',
					password:'',
					repassword:'',
					emailCode:''		
				},
				emailCode:'123456',
				loading:true,
				rules:{
					email:{
						rules:[
							{
								required:true,
								errorMessage:'必填项'
							},{
								validateFunction:function(rule,value,data,callback){
									let reg=/^([0-9a-zA-Z_.-])+@([0-9a-zA-Z_.-])+.([a-zA-Z]+)$/;
									if(value.match(reg)==null){
										callback("邮件格式不正确")
									}	
									
									return true;
								}
							},
							//验证是否邮件重复
						]
					},
					userName:{
						rules:[
							{
								required:true,
								errorMessage:'必填项'
							},
							{
								validateFunction:function(rule,value,data,callback){
									let reg=/^[a-zA-Z0-9_-]{8,20}$/;
									if(value.match(reg)==null){
										callback("用户账号长度8到20位（字母，数字，下划线，减号）")
									}	
									
									return true;
								}
								
							},
							//用户账号不能重复
						]
					},
					password:{
						rules:[
							{
								required:true,
								errorMessage:'必填项'
							},
							{
								validateFunction:function(rule,value,data,callback){
									let reg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
									if(value.match(reg)==null){
										callback("至少8-16个字符，1个大写字母，1个小写字母和1个数字")
									}	
									
									return true;
								}
								
							},
						]
					},
					repassword:{
						rules:[
							{
								required:true,
								errorMessage:'必填项'
							},
							{
								validateFunction:function(rule,value,data,callback){
									let psw=data.password;
									if(value!==psw){
										callback("两次输入密码不一致")
									}	
									
									return true;
								}
								
							},
						]
					},
					emailCode:{
						rules:[
							{
								required:true,
								errorMessage:'必填项'
							},
							{
								validateFunction:function(rule,value,data,callback){
									let emailCode=this.emailCode;
									if(value==emailCode){
										callback("邮件验证码不一致")
									}							
									return true;
								}
								
							},
						]
					}
				}
			}
		},
		onReady(){
			this.$refs.myForm.setRules(this.rules);
		},
		methods: {
			btnRegister(){
			    this.$refs.myForm.validate().then(() => {
			        // 表单验证通过，发送注册请求
			        postRequest('api/mobile/eregister', this.registerModel)
			            .then(response => {
			                // 处理注册成功的逻辑，例如跳转页面或显示注册成功的提示信息
			                console.log('注册成功', response);
			                // 例如跳转到注册成功页面
			                 uni.navigateTo({
			                   url: '/pages/index/login'
			                 });
			            })
			            .catch(error => {
			                // 处理注册失败的逻辑，例如显示注册失败的提示信息
			                console.error('注册失败', error);
			                // 例如显示注册失败的提示信息
			                this.$message.error('注册失败，请重试');
			            });
			    }).catch(errors => {
			        // 表单验证未通过，errors包含了每个字段的验证错误信息
			        console.log('表单验证未通过', errors);
			        // 可以根据具体情况处理验证未通过的逻辑，例如显示错误提示信息
			        this.$message.error('请填写正确的信息');
			    });
			},
			btnEmailCode(){
				
			}
		}
	}
	
</script>

<style>
	.myForm {
		padding: 40px 10px 0 10px;
		margin: 10px;
		height: calc(80vh - 140px);
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
		border-radius: 10px;
	}

	.myForm-emailCode {
		display: flex
	}

	.myForm-emailCode .input {
		width: 60%;
	}

	.myForm-emailCode button {
		width: 40%;
	}

	.logo {
		width: 100%;
		height: 140px;
		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 0 0 10px 10px;

	}

	image {
		width: 100px;
		height: 100px;

	}
</style>
<template>
  <div>
		<basic-container>
			<avue-crud  :data= "data" 
									:option= "option"
									:page.sync= "page"
									:table-loading= "loading"
									@on-load= "onLoad"
									@search-change = "searchChange"
									@size-change= "sizeChange"
									@current-change = "currentChange"
									@refresh-change = "refreshChange">
				<template slot-scope="scope" slot="menu">
					<el-button
						type= "text"
						icon= "el-icon-user-solid"
						size= "small"
						v-if="scope.row.status==0"
						@click="seecol(scope.row, 0)">审核
					</el-button>
					<el-button
						type="text"
						icon="el-icon-view"
						size="small"
						v-if="scope.row.status!=0"
						@click="seecol(scope.row, 1)">查看
					</el-button>
				</template>
			</avue-crud>
		</basic-container>
  </div>
</template>

<script>
import {getList} from "@/api/recipeManager/auditRecipe.js";

export default {
  data() {
		return {
			data: [],
			query: {
				status: 0,
			},
			page: {
				pageSize: 20,
				pagerCount: 5,
			},
			option:{
				index: true,
				align: 'center',
				addBtn: false,
				editBtn: false,
				delBtn: false,
				menuAlign: 'center',
				searchMenuSpan:8,
				height: "auto",
				border:true,
				column:[
					{
						label:'食谱名称',
						prop:'recipeName',
						search:true,
					},
					{
						label:'食谱周期',
						prop:'recipeDay'
					},
					{
						label:'创建机构',
						prop:'orgName',
						search:true,
					},
					{
						label:'提交人',
						prop:'createName',
						search:true,
					},
					{
						label:'联系电话',
						prop:'mobile',
						search:true,
					},										
					{
						label: "提交时间",
						prop: "createTime",
						type: "date",
						format: "yyyy-MM-dd hh:mm:ss",
						valueFormat: "yyyy-MM-dd hh:mm:ss",
					},
					{
						label:'营养评分',
						prop:'nutritionScore'
					},
					{
						label:'审核状态',
						prop:'status',
						search:true,
						type: "select",
						searchValue: 0,
						
						dicData: [
							{
								label: "全部",
							},
							{
								label: "待审核",
								value: 0
							},
							{
								label: "审核通过",
								value: 1
							},
							{
								label: "审核不通过",
								value: 2
							},
							{
								label: "无需审核",
								value: 3
							},							
						],
					},
				]
			}
		}
	},
	methods: {
		seecol(row,doType){
			this.$router.push({
				path: "/recipeManager/auditRecipeConfirm",
				query: {
					userid: row.id,
					tenantId: row.tenantId,
					doType: doType
				}
			});
		},
		searchReset() {
			this.query = {};
			this.onLoad();
		},
		//点击搜索按钮执行
		searchChange(params, done) {
			this.query = params;
			this.page.currentPage = 1;
			this.onLoad();
			done();
		},
		// selectionChange(list) {
		// 	this.selectionList = list;
		// },
		// selectionClear() {
		// 	this.selectionList = [];
		// 	this.$refs.crud.toggleSelection();
		// },
		handleEdit (row, index) {
        this.$refs.crud.rowEdit(row, index);
      },
		//当前页数变化
		currentChange(currentPage) {
			this.page.currentPage = currentPage;
		},
		//每页显示条目个数变化
		sizeChange(pageSize) {
			this.page.pageSize = pageSize;
		},
		refreshChange() {
			this.onLoad();
		},

		//分页初始化读取数据
		onLoad(){
			this.loading = true;
			getList(this.page.currentPage, this.page.pageSize, this.query).then(res => {
				const data = res.data.data;
				this.page.total = data.total;
				this.data = data.records;
				this.loading = false;
			});			
		}
	},
}
</script>

<style >
</style>

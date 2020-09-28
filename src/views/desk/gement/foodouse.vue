<template>
    <div class="often">
        <div class="coffee">
            <el-input
                style=" width: 250px;height: 35px;"
                placeholder="请输入内容"
                v-model="input"
                clearable
            ></el-input>
            <div class="import">
                <el-button type="success" plain size="mini">导入</el-button>
                <el-button type="success" plain size="mini">导出</el-button>
                <el-button type="success" plain size="mini">加分类</el-button>
                <el-button type="success" plain size="mini">加食材</el-button>
            </div>
            <div class="whole">
                <div class="export">全部(326)</div>
                <div class="export1">公开(320)</div>
                <div class="export2">隐藏(6)</div>
            </div>
            <!-- 全国查找 -->
            <div class="country">
                <div class="country1">
                    <template>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in examine"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </template>
                </div>
                <div class="country2">
                    <template>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in examine"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </template>
                </div>
                <div class="country2">
                    <template>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in examine"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </template>
                </div>
            </div>
            <!-- 结束 -->
            <div class="monly">
                <div class="block">
                    <p></p>
                    <el-tree
                        :data="data"
                        show-checkbox
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false"
                        :render-content="renderContent"
                    ></el-tree>
                </div>
            </div>
        </div>
        <div class="mation">
            <div class="mationtxt">食材主要信息</div>
            <div class="mationinput">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    :inline="true"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="菜品名字" prop="name" style=" width: 350px;">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品分类" prop="region" style=" width: 350px;">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="-1"></el-option>
                            <el-option label="区域二" value="-2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属区域" style=" width: 350px;">
                        <el-cascader v-model="value1" :options="options" @change="handleChange"></el-cascader>
                    </el-form-item>

                    <el-form-item label="所属季节" style=" width: 350px;">
                        <el-select v-model="value1" multiple placeholder="请选择">
                            <el-option
                                v-for="item in crashof"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="特点" style=" width: 350px; ">
                        <el-input type="textarea" style=" width: 250px; " v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="做法" style=" width: 350px; ">
                        <el-input type="textarea" style=" width: 250px; " v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" style=" width: 350px; ">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt />
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="公开" style="  ">
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                    </el-form-item>

                    <el-form-item label="常用" style="   ">
                        <el-switch v-model="ruleForm.delivery1"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 菜品所含食材信息 -->
            <div class="mationtxt">菜品所含食材信息</div>
            <div>
                <el-table :data="officeonce" border style="width: 100%">
                    <el-table-column prop="date" label="序号" width="100" align="center"></el-table-column>
                    <el-table-column prop="name" label="食品名称" width="160" align="center"></el-table-column>
                    <el-table-column prop="address" label="食品分类" width="160" align="center"></el-table-column>
                    <el-table-column prop="stats" label="用量(g)" width="100" align="center"></el-table-column>
                    <el-table-column prop="malloc" label="能量(kcal)" width="100" align="center"></el-table-column>
                    <!--操作格-->
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" style=" margin-left: 10px;">查看</el-button>
                            <el-button
                                type="text"
                                size="small"
                                style=" margin-left: 10px;"
                                @click="DeleteUser(scope.row)"
                            >删除</el-button>
                            <el-button
                                type="text"
                                size="small"
                                style=" margin-left: 10px;margin-top: 10px;"
                            >添加</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 菜品营养素信息 -->
            <div class="mationtxt">菜品营养素信息</div>
            <div class="saveas">
                <el-table
                    :data="tableData"
                    style="width: 100%;margin-bottom: 20px;"
                    row-key="id"
                    border
                    default-expand-all
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                >
                    <el-table-column prop="name" label="营养素" sortable width="180" align="center"></el-table-column>
                    <el-table-column prop="address" label="单位" sortable width="180" align="center"></el-table-column>

                    <el-table-column prop="address" label="含量" align="center">
                        <template slot-scope="scope">
                            <el-input
                                v-model="input1"
                                type="text"
                                placeholder="请输入内容"
                                v-if="scope.row.dients"
                            ></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="   text-align: center;">
                <el-button type="primary">保存</el-button>
                <el-button>保存并新增</el-button>
            </div>
        </div>
    </div>
</template>

<script>
let id = 1000;
export default {
    name: 'often',
    data() {
        const data = [
            //树形结构
            {
                id: 1,
                label: '一级 1',
                children: [
                    {
                        id: 4,
                        label: '二级 1-1',
                        children: [
                            {
                                id: 9,
                                label: '三级 1-1-1'
                            },
                            {
                                id: 10,
                                label: '三级 1-1-2'
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                label: '一级 2',
                children: [
                    {
                        id: 5,
                        label: '二级 2-1'
                    },
                    {
                        id: 6,
                        label: '二级 2-2'
                    }
                ]
            },
            {
                id: 3,
                label: '一级 3',
                children: [
                    {
                        id: 7,
                        label: '二级 3-1'
                    },
                    {
                        id: 8,
                        label: '二级 3-2'
                    }
                ]
            }
        ];
        return {
            input: '', //搜索
            examine: [
                //下拉框分类
                {
                    value: '选项1',
                    label: '全国'
                },
                {
                    value: '选项2',
                    label: '浙江'
                },
                {
                    value: '选项3',
                    label: '上海'
                }
            ],
            value: '',
            data: JSON.parse(JSON.stringify(data)), //树形结构
            ruleForm: {
                name: '',
                region: '',
                desc: '',
                delivery: false,
                delivery1: false
            },
            rules: {
                name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
                region: [{ required: true, message: '请选择菜品分类', trigger: 'change' }]
            },
            value1: [], //省市联动
            options: [{}], //省市联动
            crashof: [
                {
                    //所属季节多选
                    value: '选项1',
                    label: '春'
                },
                {
                    value: '选项2',
                    label: '夏'
                },
                {
                    value: '选项3',
                    label: '秋'
                },
                {
                    value: '选项4',
                    label: '冬'
                }
            ],
            value1: [],
            dialogImageUrl: '', //上传图片
            dialogVisible: false, //上传图片
            officeonce: [
                //菜品所含信息
                {
                    date: '1',
                    name: '西红柿',
                    address: '蔬菜',
                    stats: '100',
                    malloc: '5.46',
                    decls: '是'
                }
            ],
            tableData: [
                {
                    id: '1',
                    date: '2016-05-02',
                    name: '王1虎',
                    level: 1,
                    address: '上海市普陀区金沙江路 1518 弄',
                    dients: false,
                    children: [
                        {
                            id: '11',
                            date: '2016-05-02',
                            name: '王2虎',
                            level: 2,
                            address: '上海市普陀区金沙江路 1518 弄',
                            dients: true,
                            children: [
                                {
                                    id: '111',
                                    date: '2016-05-02',
                                    name: '王3虎',
                                    level: 3,
                                    address: '上海市普陀区金沙江路 1518 弄',
                                    dients: true
                                },
                                {
                                    id: '112',
                                    level: 3,
                                    date: '2016-05-02',
                                    name: '王4虎',
                                    address: '上海市普陀区金沙江路 1518 弄',
                                    dients: true
                                }
                            ]
                        },
                        {
                            id: '12',
                            level: 2,
                            date: '2016-05-02',
                            name: '王5虎',
                            address: '上海市普陀区金沙江路 1518 弄',
                            dients: true
                        }
                    ]
                },
                {
                    id: '2',
                    level: 1,
                    date: '2016-05-04',
                    name: '王6虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    dients: false
                }
            ]
        };
    },
    methods: {
        handleRemove(file, fileList) {
            //上传图片
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            //上传图片
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleChange(value) {
            console.log(value); //省市联动
        },
        //树形结构
        prepare(date) {
            console.log(date);
        },
        append(data) {
            const newChild = { id: id++, label: 'testtest', children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },
        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                        <el-button size="mini" type="text" on-click={() => this.prepare(data)}>
                            隐藏
                        </el-button>
                        <el-button size="mini" type="text" on-click={() => this.append(data)}>
                            常用
                        </el-button>
                        <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>
                            删除
                        </el-button>
                    </span>
                </span>
            );
        } //树形结构
    }
};
</script>

<style scoped>
.often {
    width: 100%;
    height: 1300px;
    /* background-color: #fff; */
}
.coffee {
    width: 29%;
    height: 1300px;
    background-color: #fff;
    float: left;
    border-right: 1px solid #5c5c5c;
    margin-bottom: 40px;
}
.mation {
    width: 70%;
    height: 100%;
    background-color: #fff;
    float: left;
    margin-bottom: 40px;
}
.import {
    width: 100%;
    height: 50px;
    /* background-color: red; */
    margin-top: 10px;
    line-height: 50px;
}
.country {
    width: 100%;
    height: 50px;
    /* background-color: red; */
    line-height: 50px;
}
.country1 {
    width: 90px;
    float: left;
}
.country2 {
    width: 90px;
    float: left;
    margin-left: 10px;
}
.whole {
    width: 100%;
    height: 40px;
    /* background-color: red; */
}
.export {
    width: 100px;
    height: 30px;
    /* background-color: yellow; */
    text-align: center;
    line-height: 30px;
    border-right: 1px solid #000;
    font-size: 14px;
    float: left;
}
.export1 {
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-right: 1px solid #000;
    font-size: 14px;
    float: left;
}
.export2 {
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    float: left;
}
.monly {
    width: 100%;
    height: 300px;

    margin-top: 10px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.mationtxt {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 16px;
    font-weight: bold;
}
.mationinput {
    width: 95%;
    /* height: 700px; */
    /* display: flex; */
    margin-left: 40px;
    margin-bottom: 20px;
}
.saveas {
    width: 95%;
    height: 500px;
    margin-left: 40px;
    /* background-color: red; */
}
</style>
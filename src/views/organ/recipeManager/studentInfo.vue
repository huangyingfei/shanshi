<template>
  <!-- 行模式 -->
  <basic-container class="studentInfo">
    <el-form class="r-stu" inline :rules="rules" ref="student" :model="student">
      <el-row>
        <el-col :span="8">
          <el-form-item label="班级" prop="classId">
            <select-tree
              ref="selectTreeId"
              :options="options"
              v-model="student.classId"
              @getClassById="getClassById"
              :props="defaultProps"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学号" prop="childNo">
            <el-input-number
              :controls="false"
              v-model="student.childNo"
              controls-position="right"
              :min="1"
              :max="1000000000000000"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="档案号">
            <el-input
              v-model="student.fileNumber"
              placeholder="请输入档案号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="student.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="student.sex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生日期" prop="birthDate">
            <el-date-picker
              v-model="student.birthDate"
              @change="computeAge"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="民族">
            <el-select v-model="student.nation" placeholder="请选择">
              <el-option
                v-for="item in nation"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户口所在地">
            <el-select v-model="student.location" placeholder="请选择">
              <el-option
                v-for="item in location"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年龄">
            <el-input-number
              :disabled="true"
              v-model="student.age"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="入校日期">
            <el-date-picker
              v-model="student.admissionDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="学级">
            <el-date-picker
              v-model="student.educationalCircles"
              type="year"
              :disabled="true"
              placeholder="选择年"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学段">
            <el-input
              v-model="student.classSection"
              :disabled="true"
              placeholder="请输入学段"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="国籍/地区">
            <el-select v-model="student.nationality" placeholder="请选择">
              <el-option
                v-for="item in nationality"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="所在省">
            <el-select v-model="student.province" placeholder="请选择">
              <el-option
                v-for="item in province"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现住址">
            <el-input
              v-model="student.address"
              placeholder="请输入现住址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="户口类型">
            <el-select v-model="student.accountType" placeholder="请选择">
              <el-option
                v-for="item in accountType"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="证件类型">
            <el-select v-model="student.cardType" placeholder="请选择">
              <el-option
                v-for="item in cardType"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码" prop="cardNo">
            <el-input
              v-model="student.cardNo"
              placeholder="请输入证件号码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="户口地址">
            <el-input
              v-model="student.accountAddress"
              placeholder="请输入户口地址"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="过敏">
            <el-select v-model="student.isAllergy" placeholder="请选择">
              <el-option
                v-for="item in isAllergy"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="疾病史">
            <el-input
              v-model="student.diseaseHistory"
              placeholder="请输入疾病史"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="接种所在省">
            <el-select
              v-model="student.vaccinationProvince"
              placeholder="请选择"
            >
              <el-option
                v-for="item in province"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="家庭电话">
            <el-input
              v-model="student.mobile"
              placeholder="请输入家庭电话"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话">
            <el-input
              v-model="student.tel"
              placeholder="请输入家庭电话"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="血型">
            <el-select v-model="student.bloodType" placeholder="请选择">
              <el-option
                v-for="item in bloodType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关系">
            <el-radio-group v-model="student.realtive">
              <el-radio v-for="item in realtive" :label="item.value">{{
                item.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="leaveFlag">
        <el-col :span="8">
          <el-form-item label="离校或毕业日期">
            <el-date-picker
              v-model="student.leaveDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="离校前所在班级">
            <el-input
              v-model="student.leaveClassName"
              placeholder=""
            ></el-input>
            <!--<el-date-picker-->
            <!--v-model="student.leaveClassName"-->
            <!--type="date"-->
            <!--placeholder="选择日期">-->
            <!--</el-date-picker>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="离校原因">
            <el-input v-model="student.reason" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" v-if="leaveFlag">
          <el-form-item label="状态">
            <el-select v-model="student.isDelete" placeholder="请选择">
              <el-option
                v-for="item in state"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <h3>父亲档案信息</h3>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input
              v-model="student.fatherName"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号">
            <el-input
              v-model="student.fatherTel"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民族">
            <el-select v-model="student.fatherNation" placeholder="请选择">
              <el-option
                v-for="item in nation"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="国籍">
            <el-select v-model="student.fatherNationlity" placeholder="请选择">
              <el-option
                v-for="item in nationality"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="证件类型">
            <el-select v-model="student.fatherCardType" placeholder="请选择">
              <el-option
                v-for="item in cardType"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码" prop="fatherCardNo">
            <el-input
              v-model="student.fatherCardNo"
              placeholder="请输入证件号码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="户口所在地">
            <el-select v-model="student.fatherLocation" placeholder="请选择">
              <el-option
                v-for="item in location"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户口类型">
            <el-select v-model="student.fatherAccountType" placeholder="请选择">
              <el-option
                v-for="item in accountType"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作单位">
            <el-input
              v-model="student.fatherWorkunit"
              placeholder="请输入工作单位"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="学历">
            <el-select v-model="student.fatherEducation" placeholder="请选择">
              <el-option
                v-for="item in education"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <h3>母亲档案信息</h3>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input
              v-model="student.momName"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号">
            <el-input
              v-model="student.momTel"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民族">
            <el-select v-model="student.momNation" placeholder="请选择">
              <el-option
                v-for="item in nation"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="国籍">
            <el-select v-model="student.momNationlity" placeholder="请选择">
              <el-option
                v-for="item in nationality"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="证件类型">
            <el-select v-model="student.momCardType" placeholder="请选择">
              <el-option
                v-for="item in cardType"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码" prop="momCardNo">
            <el-input
              v-model="student.momCardNo"
              placeholder="请输入证件号码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="户口所在地">
            <el-select v-model="student.momLocation" placeholder="请选择">
              <el-option
                v-for="item in location"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户口类型">
            <el-select v-model="student.momAccountType" placeholder="请选择">
              <el-option
                v-for="item in accountType"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作单位">
            <el-input
              v-model="student.momWorkunit"
              placeholder="请输入工作单位"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="学历">
            <el-select v-model="student.momEducation" placeholder="请选择">
              <el-option
                v-for="item in education"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <h3>第一监护人信息</h3>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input
              v-model="student.oneName"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="与孩子关系">
            <el-select v-model="student.oneChildRelation" placeholder="请选择">
              <el-option
                v-for="item in childRelation"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-select v-model="student.oneSex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="国籍/地区">
            <el-select v-model="student.oneNationlity" placeholder="请选择">
              <el-option
                v-for="item in nationality"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件类型">
            <el-select v-model="student.oneCardType" placeholder="请选择">
              <el-option
                v-for="item in cardType"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码" prop="oneCardNo">
            <el-input
              v-model="student.oneCardNo"
              placeholder="请输入证件号码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="民族">
            <el-select v-model="student.oneNation" placeholder="请选择">
              <el-option
                v-for="item in nation"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="student.oneBirthDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系地址">
            <el-input
              v-model="student.oneAddress"
              placeholder="请输入联系地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="学历">
            <el-select v-model="student.oneEducation" placeholder="请选择">
              <el-option
                v-for="item in education"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作单位">
            <el-input
              v-model="student.oneWorkunit"
              placeholder="请输入工作单位"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职务">
            <el-input
              v-model="student.oneJob"
              placeholder="请输入职务"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系电话">
            <el-input
              v-model="student.oneMobile"
              placeholder="请输入联系电话"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号">
            <el-input
              v-model="student.oneTel"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电子信箱">
            <el-input
              v-model="student.oneEmail"
              placeholder="请输入电子信箱"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="法定监护人">
            <el-select v-model="student.oneIsLegal" placeholder="请选择">
              <el-option
                v-for="item in oneIsLegal"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <h3>第二监护人信息</h3>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input
              v-model="student.twoName"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="与孩子关系">
            <el-select v-model="student.twoChildRelation" placeholder="请选择">
              <el-option
                v-for="item in childRelation"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-select v-model="student.twoSex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="国籍/地区">
            <el-select v-model="student.twoNationlity" placeholder="请选择">
              <el-option
                v-for="item in nationality"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件类型">
            <el-select v-model="student.twoCardType" placeholder="请选择">
              <el-option
                v-for="item in cardType"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码" prop="twoCardNo">
            <el-input
              v-model="student.twoCardNo"
              placeholder="请输入证件号码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="民族">
            <el-select v-model="student.twoNation" placeholder="请选择">
              <el-option
                v-for="item in nation"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="student.twoBirthDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系地址">
            <el-input
              v-model="student.twoAddress"
              placeholder="请输入联系地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="学历">
            <el-select v-model="student.twoEducation" placeholder="请选择">
              <el-option
                v-for="item in education"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作单位">
            <el-input
              v-model="student.twoWorkunit"
              placeholder="请输入工作单位"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职务">
            <el-input
              v-model="student.twoJob"
              placeholder="请输入职务"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系电话">
            <el-input
              v-model="student.twoMobile"
              placeholder="请输入联系电话"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号">
            <el-input
              v-model="student.twoTel"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电子信箱">
            <el-input
              v-model="student.twoEmail"
              placeholder="请输入电子信箱"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="法定监护人">
            <el-select v-model="student.twoIsLegal" placeholder="请选择">
              <el-option
                v-for="item in oneIsLegal"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <h3>幼儿其他信息</h3>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="户籍管理">
            <el-input
              v-model="student.domicleControl"
              placeholder="请输入户籍管理"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生地">
            <el-input
              v-model="student.birthPlace"
              placeholder="请输入出生地"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="籍贯">
            <el-input
              v-model="student.nativePlace"
              placeholder="请输入籍贯"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="港澳台侨胞">
            <el-select v-model="student.overseas" placeholder="请选择">
              <el-option
                v-for="item in overseas"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保健管理本">
            <el-select v-model="student.helathBook" placeholder="请选择">
              <el-option
                v-for="item in helathBook"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="健康状况">
            <el-select v-model="student.helath" placeholder="请选择">
              <el-option
                v-for="item in helath"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="残疾儿童">
            <el-radio-group v-model="student.isDisabled">
              <el-radio v-for="item in same" :label="item.value">{{
                item.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="残疾类别">
            <el-select v-model="student.disabledLevel" placeholder="请选择">
              <el-option
                v-for="item in disabledLevel"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="独生子女">
            <el-radio-group v-model="student.onlyChild">
              <el-radio v-for="item in same" :label="item.value">{{
                item.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="孤儿">
            <el-radio-group v-model="student.isAlone">
              <el-radio v-for="item in same" :label="item.value">{{
                item.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="低保家庭">
            <el-radio-group v-model="student.lowIncome">
              <el-radio v-for="item in same" :label="item.value">{{
                item.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="接受资助">
            <el-radio-group v-model="student.support">
              <el-radio v-for="item in same" :label="item.value">{{
                item.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="留守儿童">
            <el-radio-group v-model="student.staryHome">
              <el-radio v-for="item in same" :label="item.value">{{
                item.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="随迁子女">
            <el-radio-group v-model="student.migrantChild">
              <el-radio v-for="item in same" :label="item.value">{{
                item.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="寄宿生">
            <el-radio-group v-model="student.resident">
              <el-radio v-for="item in same" :label="item.value">{{
                item.label
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="其他联系人">
            <el-input
              v-model="student.otherPeople"
              placeholder="请输入其他联系人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他人电话">
            <el-input
              v-model="student.otherMobile"
              placeholder="请输入其他人电话"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="就读方式">
            <el-select v-model="student.studyMode" placeholder="请选择">
              <el-option
                v-for="item in studyMode"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="备注">
            <el-input
              v-model="student.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="r">
      <div class="r-w">
        <el-button
          style="width: 100px"
          @click="submit"
          size="medium"
          type="primary"
          v-if="!leaveFlag"
          >提交</el-button
        >
        <el-button
          style="width: 100px"
          @click="handleBack()"
          size="medium"
          type="primary"
          >返回</el-button
        >
      </div>
    </div>
  </basic-container>
</template>

<script>
import SelectTree from "@/views/organ/recipeManager/SelectTree.vue";
import {
  save,
  detail,
  getById,
  updateStu,
  getChildNo,
  tree,
  province,
} from "@/api/system/student";
export default {
  name: "about",
  components: {
    SelectTree,
  },
  data() {
    return {
      leaveFlag: true, //离校状态
      rules: {
        childNo: [
          { required: true, validator: this.validateChildNo, trigger: "blur" },
        ],
        classId: [
          {
            required: true,
            validator: this.validateClassId,
            trigger: "change",
          },
        ],
        name: [
          { required: true, validator: this.validateName, trigger: "blur" },
        ],
        sex: [
          { required: true, validator: this.validateSex, trigger: "change" },
        ],
        birthDate: [
          {
            required: true,
            validator: this.validateBirthDate,
            trigger: "change",
          },
        ],
        cardNo: [{ validator: this.validateCardNo, trigger: "change" }],
        fatherCardNo: [
          { validator: this.validateFatherCardNo, trigger: "change" },
        ],
        momCardNo: [{ validator: this.validateMomCardNo, trigger: "change" }],
        oneCardNo: [{ validator: this.validateOneCardNo, trigger: "change" }],
        twoCardNo: [{ validator: this.validateTwoCardNo, trigger: "change" }],
      },
      className: "",
      // 默认选中值
      student: {
        id: "",
        classId: "",
        childNo: "",
        fileNumber: "",
        name: "",
        sex: "",
        birthDate: "",
        location: "",
        nation: "",
        age: "",
        admissionDate: "",
        educationalCircles: "",
        classSection: "",
        nationality: "",
        province: "",
        address: "",
        accountType: "",
        cardNo: "",
        accountAddress: "",
        isAllergy: "",
        diseaseHistory: "",
        vaccinationProvince: "",
        mobile: "",
        tel: "",
        bloodType: "",
        realtive: "",
        leaveDate: "",
        leaveClassName: "",
        isDelete: "",
        reason: "",
        fatherName: "",
        fatherTel: "",
        fatherNation: "",
        fatherNationlity: "",
        fatherCardType: "",
        fatherCardNo: "",
        fatherLocation: "",
        fatherAccountType: "",
        fatherWorkunit: "",
        fatherEducation: "",
        momName: "",
        momTel: "",
        momNation: "",
        momNationlity: "",
        momCardType: "",
        momCardNo: "",
        momLocation: "",
        momAccountType: "",
        momWorkunit: "",
        momEducation: "",
        oneName: "",
        oneChildRelation: "",
        oneSex: "",
        oneNationlity: "",
        oneCardType: "",
        oneCardNo: "",
        oneNation: "",
        oneBirthDate: "",
        oneAddress: "",
        oneEducation: "",
        oneWorkunit: "",
        oneJob: "",
        oneMobile: "",
        oneTel: "",
        oneEmail: "",
        oneIsLegal: "",
        twoname: "",
        twoChildRelation: "",
        twoSex: "",
        twoNationlity: "",
        twoCardType: "",
        twoCardNo: "",
        twoNation: "",
        twoBirthDate: "",
        twoAddress: "",
        twoEducation: "",
        twoWorkunit: "",
        twoJob: "",
        twoMobile: "",
        twoTel: "",
        twoEmail: "",
        twoIsLegal: "",
        domicleControl: "",
        birthPlace: "",
        nativePlace: "",
        overseas: "",
        helathBook: "",
        helath: "",
        isDisabled: "",
        disabledLevel: "",
        onlyChild: "",
        isAlone: "",
        lowIncome: "",
        support: "",
        staryHome: "",
        migrantChild: "",
        resident: "",
        otherPeople: "",
        otherMobile: "",
        studyMode: "",
        remark: "",
      },
      studyMode: [
        {
          label: "住校",
          value: 1,
        },
        {
          label: "走读",
          value: 0,
        },
      ],
      same: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
      helathBook: [
        {
          label: "有",
          value: 1,
        },
        {
          label: "无",
          value: 0,
        },
      ],
      oneIsLegal: [
        { label: "是", value: 1 },
        { label: "否", value: 0 },
      ],
      state: [
        {
          label: "在校",
          value: 0,
        },
        {
          label: "离园",
          value: 2,
        },
        {
          label: "毕业",
          value: 3,
        },
      ],
      isAllergy: [
        { label: "无", value: 0 },
        { label: "有", value: 1 },
      ],
      accountType: [
        {
          label: "农村户口",
          value: 1,
        },
        {
          label: "城市户口",
          value: 2,
        },
      ],
      location: [
        {
          label: "本片",
          value: "1",
        },
        {
          label: "本区外片",
          value: "2",
        },
        {
          label: "本市外区",
          value: "3",
        },
        {
          label: "外埠",
          value: "4",
        },
        {
          label: "外籍",
          value: "5",
        },
        {
          label: "港澳台",
          value: "6",
        },
      ],
      nation: [
        {
          label: "汉族",
          value: 1,
        },
        {
          label: "满族",
          value: 2,
        },
        {
          label: "蒙古族",
          value: 3,
        },
        {
          label: "回族",
          value: 4,
        },
        {
          label: "藏族",
          value: 5,
        },
        {
          label: "维吾尔族",
          value: 6,
        },
        {
          label: "苗族",
          value: 7,
        },
        {
          label: "彝族",
          value: 8,
        },
        {
          label: "壮族",
          value: 9,
        },
        {
          label: "布依族",
          value: 10,
        },
        {
          label: "侗族",
          value: 11,
        },
        {
          label: "瑶族",
          value: 12,
        },
        {
          label: "白族",
          value: 13,
        },
        {
          label: "土家族",
          value: 14,
        },
        {
          label: "哈尼族",
          value: 15,
        },
        {
          label: "哈萨克族",
          value: 16,
        },
        {
          label: "傣族",
          value: 17,
        },
        {
          label: "黎族",
          value: 18,
        },
        {
          label: "傈僳族",
          value: 19,
        },
        {
          label: "佤族",
          value: 20,
        },
        {
          label: "畲族",
          value: 21,
        },
        {
          label: "高山族",
          value: 22,
        },
        {
          label: "拉祜族",
          value: 23,
        },
        {
          label: "水族",
          value: 24,
        },
        {
          label: "东乡族",
          value: 25,
        },
        {
          label: "纳西族",
          value: 26,
        },
        {
          label: "景颇族",
          value: 27,
        },
        {
          label: "柯尔克孜族",
          value: 28,
        },
        {
          label: "土族",
          value: 29,
        },
        {
          label: "达斡尔族",
          value: 30,
        },
        {
          label: "仫佬族",
          value: 31,
        },
        {
          label: "羌族",
          value: 32,
        },
        {
          label: "布朗族",
          value: 33,
        },
        {
          label: "撒拉族",
          value: 34,
        },
        {
          label: "毛南族",
          value: 35,
        },
        {
          label: "仡佬族",
          value: 36,
        },
        {
          label: "锡伯族",
          value: 37,
        },
        {
          label: "阿昌族",
          value: 38,
        },
        {
          label: "普米族",
          value: 39,
        },
        {
          label: "朝鲜族",
          value: 40,
        },
        {
          label: "塔吉克族",
          value: 41,
        },
        {
          label: "怒族",
          value: 42,
        },
        {
          label: "乌孜别克族",
          value: 43,
        },
        {
          label: "俄罗斯族",
          value: 44,
        },
        {
          label: "鄂温克族",
          value: 45,
        },
        {
          label: "德昂族",
          value: 46,
        },
        {
          label: "保安族",
          value: 47,
        },
        {
          label: "裕固族",
          value: 48,
        },
        {
          label: "京族",
          value: 49,
        },
        {
          label: "塔塔尔族",
          value: 50,
        },
        {
          label: "独龙族",
          value: 51,
        },
        {
          label: "鄂伦春族",
          value: 52,
        },
        {
          label: "赫哲族",
          value: 53,
        },
        {
          label: "门巴族",
          value: 54,
        },
        {
          label: "珞巴族",
          value: 55,
        },
        {
          label: "基诺族",
          value: 56,
        },
      ],
      cardType: [
        {
          label: "居民身份证",
          value: 1,
        },
        {
          label: "香港特区护照/身份证明",
          value: 2,
        },
        {
          label: "澳门特区护照/身份证明",
          value: 3,
        },
        {
          label: "台湾居民来往大陆通行证",
          value: 4,
        },
        {
          label: "境外永久居住证",
          value: 5,
        },
        {
          label: "其他",
          value: 6,
        },
      ],
      nationality: [
        { value: 1, en: "China", label: "中国" },
        { value: 2, en: "United States of America (USA)", label: "美国" },
        { value: 3, en: "Argentina", label: "阿根廷" },
        { value: 4, en: "Andorra", label: "安道尔" },
        { value: 5, en: "United Arab Emirates", label: "阿联酋" },
        { value: 6, en: "Afghanistan", label: "阿富汗" },
        { value: 7, en: "Antigua & Barbuda", label: "安提瓜和巴布达" },
        { value: 8, en: "Anguilla", label: "安圭拉" },
        { value: 9, en: "Albania", label: "阿尔巴尼亚" },
        { value: 10, en: "Armenia", label: "亚美尼亚" },
        { value: 11, en: "Angola", label: "安哥拉" },
        { value: 12, en: "Antarctica", label: "南极洲" },
        { value: 13, en: "American Samoa", label: "美属萨摩亚" },
        { value: 14, en: "Austria", label: "奥地利" },
        { value: 15, en: "Australia", label: "澳大利亚" },
        { value: 16, en: "Aruba", label: "阿鲁巴" },
        { value: 17, en: "Aland Island", label: "奥兰群岛" },
        { value: 18, en: "Azerbaijan", label: "阿塞拜疆" },
        { value: 19, en: "Bosnia & Herzegovina", label: "波黑" },
        { value: 20, en: "Barbados", label: "巴巴多斯" },
        { value: 21, en: "Bangladesh", label: "孟加拉" },
        { value: 22, en: "Belgium", label: "比利时" },
        { value: 23, en: "Burkina", label: "布基纳法索" },
        { value: 24, en: "Bulgaria", label: "保加利亚" },
        { value: 25, en: "Bahrain", label: "巴林" },
        { value: 26, en: "Burundi", label: "布隆迪" },
        { value: 27, en: "Benin", label: "贝宁" },
        { value: 28, en: "Saint Barthélemy", label: "圣巴泰勒米岛" },
        { value: 29, en: "Bermuda", label: "百慕大" },
        { value: 30, en: "Brunei", label: "文莱" },
        { value: 31, en: "Bolivia", label: "玻利维亚" },
        { value: 32, en: "Caribbean Netherlands", label: "荷兰加勒比区" },
        { value: 33, en: "Brazil", label: "巴西" },
        { value: 34, en: "The Bahamas", label: "巴哈马" },
        { value: 35, en: "Bhutan", label: "不丹" },
        { value: 36, en: "Bouvet Island", label: "布韦岛" },
        { value: 37, en: "Botswana", label: "博茨瓦纳" },
        { value: 38, en: "Belarus", label: "白俄罗斯" },
        { value: 39, en: "Belize", label: "伯利兹" },
        { value: 40, en: "Canada", label: "加拿大" },
        { value: 41, en: "Cocos (Keeling) Islands", label: "科科斯群岛" },
        {
          value: 42,
          en: "Democratic Republic of the Congo",
          label: "刚果（金）",
        },
        { value: 43, en: "Central African Republic", label: "中非" },
        { value: 44, en: "Republic of the Congo", label: "刚果（布）" },
        { value: 45, en: "Switzerland", label: "瑞士" },
        { value: 46, en: "Cote d'Ivoire", label: "科特迪瓦" },
        { value: 47, en: "Cook Islands", label: "库克群岛" },
        { value: 48, en: "Chile", label: "智利" },
        { value: 49, en: "Cameroon", label: "喀麦隆" },
        { value: 50, en: "Colombia", label: "哥伦比亚" },
        { value: 51, en: "Costa Rica", label: "哥斯达黎加" },
        { value: 52, en: "Cuba", label: "古巴" },
        { value: 53, en: "Cape Verde", label: "佛得角" },
        { value: 54, en: "Curacao", label: "库拉索" },
        { value: 55, en: "Christmas Island", label: "圣诞岛" },
        { value: 56, en: "Cyprus", label: "塞浦路斯" },
        { value: 57, en: "Czech Republic", label: "捷克" },
        { value: 58, en: "Germany", label: "德国" },
        { value: 59, en: "Djibouti", label: "吉布提" },
        { value: 60, en: "Denmark", label: "丹麦" },
        { value: 61, en: "Dominica", label: "多米尼克" },
        { value: 62, en: "Dominican Republic", label: "多米尼加" },
        { value: 63, en: "Algeria", label: "阿尔及利亚" },
        { value: 64, en: "Ecuador", label: "厄瓜多尔" },
        { value: 65, en: "Estonia", label: "爱沙尼亚" },
        { value: 66, en: "Egypt", label: "埃及" },
        { value: 67, en: "Western Sahara", label: "西撒哈拉" },
        { value: 68, en: "Eritrea", label: "厄立特里亚" },
        { value: 69, en: "Spain", label: "西班牙" },
        { value: 70, en: "Ethiopia", label: "埃塞俄比亚" },
        { value: 71, en: "Finland", label: "芬兰" },
        { value: 72, en: "Fiji", label: "斐济群岛" },
        {
          value: 73,
          en: "Falkland Islands",
          label: "马尔维纳斯群岛（福克兰）",
        },
        {
          value: 74,
          en: "Federated States of Micronesia",
          label: "密克罗尼西亚联邦",
        },
        { value: 75, en: "Faroe Islands", label: "法罗群岛" },
        { value: 76, en: "France", label: "法国 法国" },
        { value: 77, en: "Gabon", label: "加蓬" },
        {
          value: 78,
          en: "Great Britain (United Kingdom; England)",
          label: "英国",
        },
        { value: 79, en: "Grenada", label: "格林纳达" },
        { value: 80, en: "Georgia", label: "格鲁吉亚" },
        { value: 81, en: "French Guiana", label: "法属圭亚那" },
        { value: 82, en: "Guernsey", label: "根西岛" },
        { value: 83, en: "Ghana", label: "加纳" },
        { value: 84, en: "Gibraltar", label: "直布罗陀" },
        { value: 85, en: "Greenland", label: "格陵兰" },
        { value: 86, en: "Gambia", label: "冈比亚" },
        { value: 87, en: "Guinea", label: "几内亚" },
        { value: 88, en: "Guadeloupe", label: "瓜德罗普" },
        { value: 89, en: "Equatorial Guinea", label: "赤道几内亚" },
        { value: 90, en: "Greece", label: "希腊" },
        {
          value: 91,
          en: "South Georgia and the South Sandwich Islands",
          label: "南乔治亚岛和南桑威奇群岛",
        },
        { value: 92, en: "Guatemala", label: "危地马拉" },
        { value: 93, en: "Guam", label: "关岛" },
        { value: 94, en: "Guinea-Bissau", label: "几内亚比绍" },
        { value: 95, en: "Guyana", label: "圭亚那" },
        {
          value: 96,
          en: "Heard Island and McDonald Islands",
          label: "赫德岛和麦克唐纳群岛",
        },
        { value: 97, en: "Honduras", label: "洪都拉斯" },
        { value: 98, en: "Croatia", label: "克罗地亚" },
        { value: 99, en: "Haiti", label: "海地" },
        { value: 100, en: "Hungary", label: "匈牙利" },
        { value: 101, en: "Indonesia", label: "印尼" },
        { value: 102, en: "Ireland", label: "爱尔兰" },
        { value: 103, en: "Israel", label: "以色列" },
        { value: 104, en: "Isle of Man", label: "马恩岛" },
        { value: 105, en: "India", label: "印度" },
        {
          value: 106,
          en: "British Indian Ocean Territory",
          label: "英属印度洋领地",
        },
        { value: 107, en: "Iraq", label: "伊拉克" },
        { value: 108, en: "Iran", label: "伊朗" },
        { value: 109, en: "Iceland", label: "冰岛" },
        { value: 110, en: "Italy", label: "意大利" },
        { value: 111, en: "Jersey", label: "泽西岛" },
        { value: 112, en: "Jamaica", label: "牙买加" },
        { value: 113, en: "Jordan", label: "约旦" },
        { value: 114, en: "Japan", label: "日本" },
        { value: 115, en: "Kenya", label: "肯尼亚" },
        { value: 116, en: "Kyrgyzstan", label: "吉尔吉斯斯坦" },
        { value: 117, en: "Cambodia", label: "柬埔寨" },
        { value: 118, en: "Kiribati", label: "基里巴斯" },
        { value: 119, en: "The Comoros", label: "科摩罗" },
        { value: 120, en: "St. Kitts & Nevis", label: "圣基茨和尼维斯" },
        { value: 121, en: "North Korea", label: "朝鲜" },
        { value: 122, en: "South Korea", label: "韩国" },
        { value: 123, en: "Kuwait", label: "科威特" },
        { value: 124, en: "Cayman Islands", label: "开曼群岛" },
        { value: 125, en: "Kazakhstan", label: "哈萨克斯坦" },
        { value: 126, en: "Laos", label: "老挝" },
        { value: 127, en: "Lebanon", label: "黎巴嫩" },
        { value: 128, en: "St. Lucia", label: "圣卢西亚" },
        { value: 129, en: "Liechtenstein", label: "列支敦士登" },
        { value: 130, en: "Sri Lanka", label: "斯里兰卡" },
        { value: 131, en: "Liberia", label: "利比里亚" },
        { value: 132, en: "Lesotho", label: "莱索托" },
        { value: 133, en: "Lithuania", label: "立陶宛" },
        { value: 134, en: "Luxembourg", label: "卢森堡" },
        { value: 135, en: "Latvia", label: "拉脱维亚" },
        { value: 136, en: "Libya", label: "利比亚" },
        { value: 137, en: "Morocco", label: "摩洛哥" },
        { value: 138, en: "Monaco", label: "摩纳哥" },
        { value: 139, en: "Moldova", label: "摩尔多瓦" },
        { value: 140, en: "Montenegro", label: "黑山" },
        { value: 141, en: "Saint Martin (France)", label: "法属圣马丁" },
        { value: 142, en: "Madagascar", label: "马达加斯加" },
        { value: 143, en: "Marshall islands", label: "马绍尔群岛" },
        { value: 144, en: "Republic of Macedonia (FYROM)", label: "马其顿" },
        { value: 145, en: "Mali", label: "马里" },
        { value: 146, en: "Myanmar (Burma)", label: "缅甸" },
        { value: 147, en: "Mongolia", label: "蒙古国" },
        { value: 148, en: "Northern Mariana Islands", label: "北马里亚纳群岛" },
        { value: 149, en: "Martinique", label: "马提尼克" },
        { value: 150, en: "Mauritania", label: "毛里塔尼亚" },
        { value: 151, en: "Montserrat", label: "蒙塞拉特岛" },
        { value: 152, en: "Malta", label: "马耳他" },
        { value: 153, en: "Mauritius", label: "毛里求斯" },
        { value: 154, en: "Maldives", label: "马尔代夫" },
        { value: 155, en: "Malawi", label: "马拉维" },
        { value: 156, en: "Mexico", label: "墨西哥" },
        { value: 157, en: "Malaysia", label: "马来西亚" },
        { value: 158, en: "Mozambique", label: "莫桑比克" },
        { value: 159, en: "Namibia", label: "纳米比亚" },
        { value: 160, en: "New Caledonia", label: "新喀里多尼亚" },
        { value: 161, en: "Niger", label: "尼日尔" },
        { value: 162, en: "Norfolk Island", label: "诺福克岛" },
        { value: 163, en: "Nigeria", label: "尼日利亚" },
        { value: 164, en: "Nicaragua", label: "尼加拉瓜" },
        { value: 165, en: "Netherlands", label: "荷兰" },
        { value: 166, en: "Norway", label: "挪威" },
        { value: 167, en: "Nepal", label: "尼泊尔" },
        { value: 168, en: "Nauru", label: "瑙鲁" },
        { value: 169, en: "Niue", label: "纽埃" },
        { value: 170, en: "New Zealand", label: "新西兰" },
        { value: 171, en: "Oman", label: "阿曼" },
        { value: 172, en: "Panama", label: "巴拿马" },
        { value: 173, en: "Peru", label: "秘鲁" },
        { value: 174, en: "French polynesia", label: "法属波利尼西亚" },
        { value: 175, en: "Papua New Guinea", label: "巴布亚新几内亚" },
        { value: 176, en: "The Philippines", label: "菲律宾" },
        { value: 177, en: "Pakistan", label: "巴基斯坦" },
        { value: 178, en: "Poland", label: "波兰" },
        {
          value: 179,
          en: "Saint-Pierre and Miquelon",
          label: "圣皮埃尔和密克隆",
        },
        { value: 180, en: "Pitcairn Islands", label: "皮特凯恩群岛" },
        { value: 181, en: "Puerto Rico", label: "波多黎各" },
        { value: 182, en: "Palestinian territories", label: "巴勒斯坦" },
        { value: 183, en: "Portugal", label: "葡萄牙" },
        { value: 184, en: "Palau", label: "帕劳" },
        { value: 185, en: "Paraguay", label: "巴拉圭" },
        { value: 186, en: "Qatar", label: "卡塔尔" },
        { value: 187, en: "Réunion", label: "留尼汪" },
        { value: 188, en: "Romania", label: "罗马尼亚" },
        { value: 189, en: "Serbia", label: "塞尔维亚" },
        { value: 190, en: "Russian Federation", label: "俄罗斯" },
        { value: 191, en: "Rwanda", label: "卢旺达" },
        { value: 192, en: "Saudi Arabia", label: "沙特阿拉伯" },
        { value: 193, en: "Solomon Islands", label: "所罗门群岛" },
        { value: 194, en: "Seychelles", label: "塞舌尔" },
        { value: 195, en: "Sudan", label: "苏丹" },
        { value: 196, en: "Sweden", label: "瑞典" },
        { value: 197, en: "Singapore", label: "新加坡" },
        { value: 198, en: "St. Helena & Dependencies", label: "圣赫勒拿" },
        { value: 199, en: "Slovenia", label: "斯洛文尼亚" },
        {
          value: 200,
          en: "Svalbard and Jan Mayen",
          label: "斯瓦尔巴群岛和扬马延岛",
        },
        { value: 201, en: "Slovakia", label: "斯洛伐克" },
        { value: 202, en: "Sierra Leone", label: "塞拉利昂" },
        { value: 203, en: "San Marino", label: "圣马力诺" },
        { value: 204, en: "Senegal", label: "塞内加尔" },
        { value: 205, en: "Somalia", label: "索马里" },
        { value: 206, en: "Suriname", label: "苏里南" },
        { value: 207, en: "South Sudan", label: "南苏丹" },
        { value: 208, en: "Sao Tome & Principe", label: "圣多美和普林西比" },
        { value: 209, en: "El Salvador", label: "萨尔瓦多" },
        { value: 210, en: "Sint Maarten", label: "荷属圣马丁" },
        { value: 211, en: "Syria", label: "叙利亚" },
        { value: 212, en: "Swaziland", label: "斯威士兰" },
        {
          value: 213,
          en: "Turks & Caicos Islands",
          label: "特克斯和凯科斯群岛",
        },
        { value: 214, en: "Chad", label: "乍得" },
        {
          value: 215,
          en: "French Southern Territories",
          label: "法属南部领地",
        },
        { value: 216, en: "Togo", label: "多哥" },
        { value: 217, en: "Thailand", label: "泰国" },
        { value: 218, en: "Tajikistan", label: "塔吉克斯坦" },
        { value: 219, en: "Tokelau", label: "托克劳" },
        { value: 220, en: "Timor-Leste (East Timor)", label: "东帝汶" },
        { value: 221, en: "Turkmenistan", label: "土库曼斯坦" },
        { value: 222, en: "Tunisia", label: "突尼斯" },
        { value: 223, en: "Tonga", label: "汤加" },
        { value: 224, en: "Turkey", label: "土耳其" },
        { value: 225, en: "Trinidad & Tobago", label: "特立尼达和多巴哥" },
        { value: 226, en: "Tuvalu", label: "图瓦卢" },
        { value: 227, en: "Tanzania", label: "坦桑尼亚" },
        { value: 228, en: "Ukraine", label: "乌克兰" },
        { value: 229, en: "Uganda", label: "乌干达" },
        {
          value: 230,
          en: "United States Minor Outlying Islands",
          label: "美国本土外小岛屿",
        },
        { value: 231, en: "Uruguay", label: "乌拉圭" },
        { value: 232, en: "Uzbekistan", label: "乌兹别克斯坦" },
        { value: 233, en: "Vatican City (The Holy See)", label: "梵蒂冈" },
        {
          value: 234,
          en: "St. Vincent & the Grenadines",
          label: "圣文森特和格林纳丁斯",
        },
        { value: 235, en: "Venezuela", label: "委内瑞拉" },
        { value: 236, en: "British Virgin Islands", label: "英属维尔京群岛" },
        {
          value: 237,
          en: "United States Virgin Islands",
          label: "美属维尔京群岛",
        },
        { value: 238, en: "Vietnam", label: "越南" },
        { value: 239, en: "Vanuatu", label: "瓦努阿图" },
        { value: 240, en: "Wallis and Futuna", label: "瓦利斯和富图纳" },
        { value: 241, en: "Samoa", label: "萨摩亚" },
        { value: 242, en: "Yemen", label: "也门" },
        { value: 243, en: "Mayotte", label: "马约特" },
        { value: 244, en: "South Africa", label: "南非" },
        { value: 245, en: "Zambia", label: "赞比亚" },
        { value: 246, en: "Zimbabwe", label: "津巴布韦" },
      ],
      realtive: [
        {
          label: "父亲",
          value: 1,
        },
        {
          label: "母亲",
          value: 2,
        },
        {
          label: "爷爷",
          value: 3,
        },
        {
          label: "奶奶",
          value: 4,
        },
        {
          label: "其他",
          value: 5,
        },
      ],
      bloodType: [
        {
          label: "未知血型",
          value: 1,
        },
        {
          label: "A血型",
          value: 2,
        },
        {
          label: "B血型",
          value: 2,
        },
        {
          label: "AB血型",
          value: 3,
        },
        {
          label: "O血型",
          value: 4,
        },
        {
          label: "RH阳性血型",
          value: 5,
        },
        {
          label: "RH阴性血型",
          value: 6,
        },
        {
          label: "HLA血型",
          value: 7,
        },
        {
          label: "未定血型",
          value: 8,
        },
        {
          label: "其他血型",
          value: 9,
        },
      ],
      education: [
        {
          label: "小学",
          value: 1,
        },
        {
          label: "初中",
          value: 2,
        },
        {
          label: "高中",
          value: 3,
        },
        {
          label: "大专",
          value: 4,
        },
        {
          label: "大学本科",
          value: 5,
        },
        {
          label: "硕士研究生",
          value: 6,
        },
        {
          label: "博士研究生",
          value: 7,
        },
      ],
      disabledLevel: [
        {
          label: "无",
          value: 1,
        },
        {
          label: "视力残疾",
          value: 2,
        },
        {
          label: "听力残疾",
          value: 3,
        },
        {
          label: "言语残疾",
          value: 4,
        },
        {
          label: "肢体残疾",
          value: 5,
        },
        {
          label: "智力残疾",
          value: 6,
        },
        {
          label: "精神残疾",
          value: 7,
        },
        {
          label: "多重残疾",
          value: 8,
        },
        {
          label: "其他残疾",
          value: 9,
        },
      ],
      helath: [
        {
          label: "健康或良好",
          value: 1,
        },
        {
          label: "一般或较弱",
          value: 2,
        },
        {
          label: "有慢性病",
          value: 3,
        },
        {
          label: "有生理缺陷",
          value: 4,
        },
        {
          label: "残疾",
          value: 5,
        },
      ],
      province: [],
      overseas: [
        {
          label: "无",
          value: 1,
        },
        {
          label: "香港",
          value: 2,
        },
        {
          label: "澳门",
          value: 3,
        },
        {
          label: "台湾",
          value: 4,
        },
        {
          label: "海外华侨",
          value: 5,
        },
        {
          label: "香港同胞亲属",
          value: 6,
        },
        {
          label: "澳门同胞亲属",
          value: 7,
        },
        {
          label: "台湾同胞亲属",
          value: 8,
        },
        {
          label: "侨眷",
          value: 9,
        },
        {
          label: "归侨",
          value: 10,
        },
        {
          label: "归侨子女归国留学人员",
          value: 11,
        },
        {
          label: "非华裔中国人",
          value: 12,
        },
        {
          label: "外籍华裔人",
          value: 13,
        },
        {
          label: "外国人",
          value: 14,
        },
        {
          label: "其他",
          value: 15,
        },
      ],
      childRelation: [
        {
          label: "父亲",
          value: 1,
        },
        {
          label: "母亲",
          value: 2,
        },
        {
          label: "继父或养母",
          value: 3,
        },
        {
          label: "继母或养母",
          value: 4,
        },
        {
          label: "祖父",
          value: 5,
        },
        {
          label: "祖母",
          value: 6,
        },
        {
          label: "外祖父",
          value: 7,
        },
        {
          label: "外祖母",
          value: 8,
        },
        {
          label: "哥哥",
          value: 9,
        },
        {
          label: "姐姐",
          value: 10,
        },
        {
          label: "其他亲属",
          value: 11,
        },
        {
          label: "非亲属",
          value: 12,
        },
      ],
      sexOptions: [
        {
          label: "男",
          value: 1,
        },
        {
          label: "女",
          value: 2,
        },
      ],
      // 数据默认字段
      defaultProps: {
        parent: "parentId", // 父级唯一标识
        value: "id", // 唯一标识
        label: "label", // 标签显示
        children: "children", // 子级
      },
      // 数据列表
      options: [],
    };
  },

  mounted() {
    let that = this;
    //
    province().then((res) => {
      that.$set(that, "vaccinationProvince", res.data.data);
      that.$set(that, "province", res.data.data);
    });
    tree().then((res) => {
      that.options = res.data.data;
      if (that.$route.query.selectClassId) {
        that.$set(that.student, "classId", that.$route.query.selectClassId);
        that.getClassById(that.$route.query.selectClassId);
      }
    });

    this.$set(this.student, "childNo", undefined);
    this.$set(this.student, "age", undefined);

    if (that.$route.query.id) {
      if (that.$route.query.detailFlag) {
        if (that.$route.query.addView) {
          that.leaveFlag = true;
        }
      } else {
        that.leaveFlag = false;
      }
      detail(that.$route.query.id).then((res) => {
        console.log(res.data.data);
        that.student = res.data.data;
        setTimeout(() => {
          that.computeAge();
        }, 200);
        if (that.student.province) {
          that.$set(that.student, "province", that.student.province + "");
        }
        if (that.student.vaccinationProvince) {
          that.$set(
            that.student,
            "vaccinationProvince",
            that.student.vaccinationProvince + ""
          );
        }
        that.$set(
          this.student,
          "educationalCircles",
          that.student.educationalCircles + ""
        );
      });
    } else {
      that.leaveFlag = false;
    }
  },
  methods: {
    submit() {
      let that = this;
      //  debugger
      this.$refs.student.validate(function (valid) {
        if (valid) {
          if (that.$route.query.id) {
            updateStu(that.student).then((res) => {
              if (res.data.success) {
                that.$message({
                  type: "success",
                  message: "修改成功!",
                });
                that.$router.push({ path: "/organ/recipeManager/student" });
              }
            });
          } else {
            save(that.student).then((res) => {
              if (res.data.success) {
                that.$message({
                  type: "success",
                  message: "新增成功!",
                });
                that.$router.push({ path: "/organ/recipeManager/student" });
              }
            });
          }
        }
      });
    },
    validateChildNo(rule, value, callback) {
      //
      if (this.student.childNo == "" || this.student.childNo == undefined) {
        //
        callback(new Error("请输入学号"));
      } else if (this.student.classId === "") {
        this.$set(this.student, "childNo", undefined);
        callback(new Error("请先选择班级"));
      } else {
        let student = {};
        student["classId"] = this.student.classId;
        student["childNo"] = this.student.childNo;
        student["id"] = this.student.id;
        let flag = true;
        getChildNo(student).then((res) => {
          if (res.data.data) {
            callback();
          } else {
            flag = false;
            this.$set(this.student, "childNo", undefined);
            callback(new Error("学号重复"));
          }
        });
      }
    },
    validateClassId(rule, value, callback) {
      this.$nextTick(() => {
        if (this.student.classId == "" || this.student.classId == undefined) {
          callback(new Error("请选择班级"));
        } else {
          callback();
        }
      });
    },
    validateName(rule, value, callback) {
      if (this.student.name == "" || this.student.name == undefined) {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    },
    validateSex(rule, value, callback) {
      this.$nextTick(() => {
        if (this.student.sex == "" || this.student.sex == undefined) {
          callback(new Error("请输入性别"));
        } else {
          callback();
        }
      });
    },
    validateBirthDate(rule, value, callback) {
      if (this.student.birthDate == "" || this.student.birthDate == undefined) {
        callback(new Error("请输入出生日期"));
      } else {
        callback();
      }
    },
    validateCardNo(rule, value, callback) {
      if (
        this.student.cardNo &&
        this.student.cardNo.length != 18 &&
        this.student.cardNo != 0
      ) {
        callback(new Error("请输入18位证件号码"));
      } else {
        callback();
      }
    },
    validateFatherCardNo(rule, value, callback) {
      if (
        this.student.fatherCardNo &&
        this.student.fatherCardNo.length != 18 &&
        this.student.fatherCardNo != 0
      ) {
        callback(new Error("请输入18位证件号码"));
      } else {
        callback();
      }
    },
    validateMomCardNo(rule, value, callback) {
      if (
        this.student.momCardNo &&
        this.student.momCardNo.length != 18 &&
        this.student.momCardNo != 0
      ) {
        callback(new Error("请输入18位证件号码"));
      } else {
        callback();
      }
    },
    validateOneCardNo(rule, value, callback) {
      if (
        this.student.oneCardNo &&
        this.student.oneCardNo.length != 18 &&
        this.student.oneCardNo != 0
      ) {
        callback(new Error("请输入18位证件号码"));
      } else {
        callback();
      }
    },
    validateTwoCardNo(rule, value, callback) {
      if (
        this.student.twoCardNo &&
        this.student.twoCardNo.length != 18 &&
        this.student.twoCardNo != 0
      ) {
        callback(new Error("请输入18位证件号码"));
      } else {
        callback();
      }
    },
    computeAge() {
      if (!this.student.birthDate || this.student.birthDate == "") {
        this.$set(this.student, "age", 0);
      } else {
        if (typeof this.student.birthDate == "string") {
          let s = this.student.birthDate.replace(/-/g, "/");
          var date = new Date(s);
          this.$set(
            this.student,
            "age",
            ((new Date().getTime() - date.getTime()) / 31536000000).toFixed(2)
          );
        } else {
          this.$set(
            this.student,
            "age",
            (
              (new Date().getTime() - this.student.birthDate.getTime()) /
              31536000000
            ).toFixed(2)
          );
        }
      }
    },
    getClassById(classId) {
      this.$set(this.student, "classId", classId);
      console.log("classId");
      console.log(classId);
      if (!classId || classId === "0") return;
      getById(classId).then((res) => {
        this.$set(this.student, "classSection", res.data.data.pparentName);
        if (!this.$route.query.id) {
          this.$set(
            this.student,
            "educationalCircles",
            res.data.data.startYear
          );
        }
      });
    },
    handleBack() {
      this.$router.push({ path: "/organ/recipeManager/student" });
      this.$router.$avueRouter.closeTag();
    },
  },
};
</script>
<style>
.studentInfo .el-input-number.is-without-controls .el-input__inner,
.studentInfo .el-input.is-disabled .el-input__inner {
  text-align: left;
}
.studentInfo .el-form--inline .el-form-item {
  display: flex !important;
  justify-content: flex-start;
}
.studentInfo .el-form-item__label {
  flex-grow: 1 !important;
}
.studentInfo .el-form--inline .el-form-item__content {
  flex-grow: 2 !important;
}
.studentInfo .el-select,
.studentInfo .el-input-number,
.studentInfo .el-date-editor {
  width: 100% !important;
}

.r {
  position: fixed;
  height: 60px;
  bottom: 0;
  width: 82%;
  background-color: #ffffff;
}
.r-w {
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 230px;
  padding-bottom: 10px;
}
.r-stu {
  margin-bottom: 50px;
}
</style>

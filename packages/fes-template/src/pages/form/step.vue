<template>
    <div class="page">
        <div class="page-header">
            <div class="page-header-title">分步表单</div>
            <div class="page-header-desc">将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</div>
        </div>
        <div class="page-body">
            <Steps :current="current" class="step">
                <Step title="填写转账信息"></Step>
                <Step title="确认转账信息"></Step>
                <Step title="完成"></Step>
            </Steps>
            <Wb-form v-show="current === 1" class="step-form">
                <Form-item label="付款账户:">
                    <wb-select v-model="form.payNo" placeholder="请选择付款账户">
                        <wb-option value="fes@alipay.com">fes@alipay.com</wb-option>
                        <wb-option value="fes@wepay.com">fes@wepay.com</wb-option>
                    </wb-select>
                </Form-item>
                <Form-item label="收款账户:">
                    <Wb-input v-model="form.accountNo" placeholder="请输入收款账户" />
                </Form-item>
                <Form-item label="收款人姓名:">
                    <Wb-input v-model="form.name" placeholder="请输入收款人姓名" />
                </Form-item>
                <Form-item label="转账金额:">
                    <Wb-input v-model="form.amount" placeholder="请输入转账金额">
                    </Wb-input>
                </Form-item>
                <Form-item>
                    <Wb-button @click="next" type="primary">提交</Wb-button>
                </Form-item>
            </Wb-form>
            <Wb-form v-show="current === 2" class="step-form">
                <Form-item label="付款账户:">
                    <span class="text">{{form.payNo}}</span>
                </Form-item>
                <Form-item label="收款账户:">
                    <span class="text">{{form.accountNo | card}}</span>
                </Form-item>
                <Form-item label="收款人姓名:">
                    <span class="text">{{form.name}}</span>
                </Form-item>
                <Form-item label="转账金额:">
                    <span class="text big">{{form.amount}}</span>
                </Form-item>
                <Form-item label="支付密码:" class="line">
                    <Wb-input v-model="form.password" type="password" placeholder="请输入支付密码" />
                </Form-item>
                <Form-item>
                    <Wb-button @click="next" type="primary">提交</Wb-button>
                    <Wb-button @click="last" class="ml-16" type="primary">上一步</Wb-button>
                </Form-item>
            </Wb-form>
            <div v-show="current === 3" class="step-form">
                <div class="result-icon">
                    <Process-circle :percent="100" stroke-color="#00cc66" stroke-type="round">
                        <Icon type="md-checkmark" size="50" color="#00cc66"></Icon>
                    </Process-circle>
                </div>
                <div class="result-title">操作成功</div>
                <div class="result-subtitle">预计两小时内到账</div>
                <div class="result-extra">
                    <Wb-button @click="reset" type="primary">再转一笔</Wb-button>
                    <Wb-button class="ml-16">查看账单</Wb-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    FesData() {
        return {
            current: 1,
            form: {
                payNo: 'fes@wepay.com',
                accountNo: '622000011876188',
                name: 'Hali',
                amount: 500,
                password: '11212'
            }
        };
    },
    methods: {
        next() {
            this.current += 1;
        },
        last() {
            this.current -= 1;
        },
        reset() {
            this.current = 1;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables";
.step {
  margin: 40px auto 0;
  width: 800px;
  transform: translateX(12%);
}
.step-form {
  margin: 20px auto;
  width: 500px;
  .text {
    line-height: 32px;
    &.big {
      font-size: 16px;
    }
  }
  .line {
    padding-top: 30px;
    border-top: 1px solid $border-color-split;
  }
  .result-icon {
    text-align: center;
    margin-bottom: 24px;
  }
  .result-title {
    color: $title-color;
    font-size: $font-size-lg;
    line-height: 1.8;
    text-align: center;
  }
  .result-subtitle {
    color: $sub-text-color;
    font-size: $font-size-small;
    line-height: 1.6;
    text-align: center;
  }
  .result-extra{
    margin: 24px 0 0 0;
    text-align: center;
  }
}
</style>

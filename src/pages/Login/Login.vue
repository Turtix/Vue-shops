<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isShowSms}" @click="isShowSms=true">短信登录</a>
          <a href="javascript:;" :class="{on: !isShowSms}" @click="isShowSms=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: isShowSms}">
            <section class="login_message">
              <!-- validate验证 name="phone" 自定义校验规则:v-validate="xxx" -->
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" name="phone"  v-validate="'required|mobile'">
              <button :disabled="!isRightPhone" class="get_verification" :class="{right_phone_number: isRightPhone}" @click.prevent="sendCode">
                {{computeTime>0 ? '已发送('+computeTime+')s': '获取验证码'}}
              </button>
              <!-- validate验证 errors.has('phone') -->
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
            </section>
            <section class="login_verification">
              <!-- validate验证 name="code" 校验规则:v-validate="xxx" -->
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" name="code" v-validate="{required:true,regex:/^.{6}$/}">
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isShowSms}">
            <section>
              <section class="login_message">
                <!-- validate验证 name="name"   name是必须的v-validate=="'required'"  -->
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" name="name" v-validate="'required'">
                <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text': 'password' " maxlength="8" placeholder="密码" v-model="pwd" name="pwd" v-validate="'required'">
                <div class="switch_button " :class="isShowPwd ? 'on': 'off'"  @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right: isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? 'abc': ''}}</span>
                </div>
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" name="captcha" v-validate="{required:true,regex:/^.{4}$/}">
                <!-- 每次刷新页面,都会重新渲染,重新发送请求加载图片 -->
                <!-- 还需要在每次点击图片时,重新发送请求获取图片 -->
                <img ref="captcha" class="get_verification" src="http://localhost:5000/captcha" alt="captcha" @click="updateCaptcha">
                <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </section>
</template>

<script>
  import { reqSendCode,reqLoginSms,reqLoginPwd } from '../../api'
  import {RECEIVE_USER} from '../../store/mutataionsType'
  export default {
    name: 'Login',
    data () {
      return {
        isShowSms: false, // 短信登录  false: 密码登录
        phone: '', // 手机号
        code: '',  //一次性短信验证码
        name: '', // 用户名
        pwd: '',  // 密码
        captcha: '', // 一次性图片验证码
        computeTime: 0, // 倒计时剩余的时间
        isShowPwd: false, // 是否原样显示密码
      }
    },
    computed: {
      isRightPhone(){
        return  /^1\d{10}$/.test(this.phone)
      },

    },
    methods: {
      /* 发送验证码 */
      async sendCode() {
        // 倒计时发送验证码剩余的时间
        this.computeTime = 10
        const intervalId = setInterval(()=>{
          this.computeTime--
          if (this.computeTime <= 0) {
            clearInterval(intervalId)
          }
        },1000)

        // 请求发送验证码
        const result = await  reqSendCode(this.phone)
        if(result.code === 0) {
          // 发送请求成功
          console.log('发送验证码成功')
        }else {
          // 发送请求失败  需要清空定时器  用户需要点击重新发送请求
          this.computeTime = 0
          alert(result.msg)
        }

      },

      /* 登录检验 */
      async login() {
        // 进行前端检验
        const  { isShowSms,phone,isRightPhone,code,name,pwd,captcha } = this
        // 请求登录的结果
        let result = ''

        // 如果是短信登录
        if(isShowSms) {
          // 全部通过发送  短信验证码登录请求
          result = await reqLoginSms(phone,code)
        }else {
          // 如果是密码登录
          // 全部通过发送  用户名密码登录请求
          result = await reqLoginPwd(name,pwd,captcha)

          // 請求失败  重新获取验证码
          if(result.code !== 0) {
            // 重新获取验证码
            this.updateCaptcha()

            // 更新
            this.captcha = ''
          }
        }
        //  统一对两种登录方式的结果进行处理
        if(result.code === 0) {
          const user = result.data
          // 保存用户数据   到状态vuex的state中
          this.$store.commit(RECEIVE_USER, user)

          // 请求成功  跳转到个人中心页面
          this.$router.replace('/profile')
        }else {
          // 登录请求失败
          alert(result.msg)
        }
      },

      /* 点击验证码图片更新图片验证码 */
      updateCaptcha() {
        // 携带事件戳参数  让每次点击图片时发送不同的请求  从而更新图片验证码
        this.$refs.captcha.src = 'http://localhost:5000/captcha?time='+Date.now()
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>

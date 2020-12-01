<template>
  <div id="login_wrap">
    <div class="login_content">
      <login ref="loginRef" :defaultUserName="defaultUserName" :defaultPwd="defaultPwd"
      :tip="tip" @on-login="handleLogin">
        <template #top>
          <img class="logo" src="@/assets/img/logo.png" alt="logo" /> MyApplication
        </template>
      </login>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, Ref,
} from 'vue';
import { useRouter } from 'vue-router';
import {
  timeSpeed, request, Iresponse, exec,
} from '@utils/index';
import Login, { LoginComp } from '../../components/business/login/index.vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    Login,
  },
  setup() {
    const $router = useRouter();
    const defaultUserName: Ref<string> = ref('');
    const defaultPwd: Ref<string> = ref('null');
    const tip: Ref<string> = ref('');
    const setDefaultUserName = (name: string): void => {
      localStorage.username = name;
    };
    const { timeStart, timeEnd } = timeSpeed();
    const loginRef: Ref<LoginComp | null> = ref(null);
    interface IloginParams {
      userName: string;
      password: string;
    }
    interface IloginResult {
      token: string;
      nickName: string;
      userId: string;
    }
    const doLogin = (params: IloginParams): Promise<Iresponse> => request('/login', params);
    onMounted((): void => {
      defaultUserName.value = (localStorage.username || '');
    });
    const handleLogin = (username: string, pwd: string): void => {
      timeStart();
      doLogin({
        userName: username,
        password: pwd,
      }).then((res: Iresponse) => {
        timeEnd('request-login');
        const loginRes: IloginResult = res?.data as IloginResult;
        if (res?.responseCode === '10001') {
          setDefaultUserName(loginRes.nickName);
          localStorage.userId = loginRes.userId;
          localStorage.token = loginRes.token;
          tip.value = '';
          setTimeout(() => {
            $router.push({ path: '/' });
          }, 1000);
        } else {
          tip.value = res?.responseMsg;
          exec(loginRef.value && (loginRef.value as LoginComp).resetStatus());
        }
      });
    };
    return {
      defaultUserName,
      handleLogin,
      defaultPwd,
      tip,
      loginRef,
    };
  },
});
</script>

<style lang="less">
#login_wrap{
  background: url(~@/assets/img/bg.jpg) repeat;
  background-size: 100% auto;
  width:100%;
  height:100%;
  .login_content{
    width: 300px;
    margin: auto;
    text-align: center;
    padding-top: 200px;
    .logo{
      width: 20px;
      vertical-align: -4px;
    }
    .inpt{
      border-color: #999;
      &:hover,&:focus{
        border-color: #333;
      }
    }
    .btn-login{
      width:100%;
      margin-top: 10px;
    }
    .tip{
      color:rgb(231, 85, 17);
      margin-top: 10px;
      display: inline-block;
    }
  }
}
</style>

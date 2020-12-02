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
  defineComponent, ref, Ref,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {
  timeSpeed, request, Iresponse, exec,
} from '@utils/index';
import { LoginState, LoginMutations } from '@/store/login';
import Login, { LoginComp } from '@comp/business/login/index.vue';

export interface IloginParams {
  userName: string;
  password: string;
}
export interface IloginResult {
  token: string;
  nickName: string;
  userId: string;
}
export default defineComponent({
  name: 'LoginPage',
  components: {
    Login,
  },
  setup() {
    const store = useStore();
    const $router = useRouter();
    const defaultUserName: Ref<string> = ref(localStorage.username || '');
    const defaultPwd: Ref<string> = ref('123456');
    const tip: Ref<string> = ref('');
    const loginRef: Ref<LoginComp | null> = ref(null);
    const { timeStart, timeEnd } = timeSpeed();

    const loginApi = '/login';
    const doLogin = (params: IloginParams): Promise<Iresponse> => request(loginApi, params);
    const handleLogin = (username: string, pwd: string): void => {
      timeStart();
      doLogin({
        userName: username,
        password: pwd,
      }).then((res: Iresponse) => {
        timeEnd('request-login');
        const loginRes: IloginResult = res?.data as IloginResult;
        if (res?.responseCode === '10001') {
          store.commit(LoginMutations.setState, { nickName: loginRes.nickName, password: '123456xx' } as LoginState);
          localStorage.username = username;
          localStorage.nickName = loginRes.nickName;
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

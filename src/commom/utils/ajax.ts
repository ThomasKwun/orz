import Axios, { Method } from 'axios';

export interface AxiosResult {
  data?: Iresponse;
}
export type ReponseCode = '10001' | '10002' | '10003' | '10004' | '10005' | '10006' | '10008';
export interface Iresponse {
  responseCode: ReponseCode;
  responseMsg: string;
  data: unknown;
}

const axios = Axios.create({
  baseURL: '/api',
  timeout: 60000,
  withCredentials: true,
});

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

export default async function requestAPI(path: string, params: any, type: Method = 'post',
  showErr?: boolean, unshowCode?: Array<ReponseCode>, otherConfig?: any): Promise<Iresponse> {
  try {
    let res: AxiosResult = {} as AxiosResult;
    if (type === 'post' || type === 'POST') {
      res = await axios.request({
        method: type,
        url: path,
        data: params,
        ...otherConfig,
      });
    } else {
      res = await axios.request({
        method: type,
        url: path,
        params: {
          ...params,
          v: new Date().getTime(),
        },
        ...otherConfig,
      });
    }
    const responseCode = res.data?.responseCode;
    switch (responseCode) {
      case '10001':
        break;
      case '10002':
        if (showErr && !unshowCode?.includes('10002')) {
          console.log(res.data?.responseMsg);
        }
        break;
      case '10003':
      case '10005':
        break;
      default:
        break;
    }
    if (res.data && res.data.responseCode) {
      return res.data;
    }
    return res as Iresponse;
  } catch (err) {
    return Promise.reject(err);
  }
}

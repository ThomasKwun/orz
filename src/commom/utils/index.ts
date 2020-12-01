import { getCurrentInstance } from 'vue';
import timespeed from './timespeed';
import ajax, { Iresponse as _Iresponse } from './ajax';

export const timeSpeed = timespeed;

export function exec(params: any) {
  return params;
}
export function useGlobalConfig() {
  const instance: any = getCurrentInstance();
  if ('$app' in instance.proxy) {
    return instance.proxy.$app;
  }
  return {};
}
export const request = ajax;
export type Iresponse = _Iresponse;

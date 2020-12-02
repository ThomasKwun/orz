interface BaseMutations<S> {
  setState: (state: S, payload?: S) => void;
}
const _baseMutations: BaseMutations<unknown> = {
  setState: (_state: any, payload?: any) => {
    const thisState = _state;
    if (payload) {
      Object.keys(payload).forEach((key) => {
        thisState[key] = payload[key];
      });
    }
  },
};
export const baseMutations = _baseMutations;
export default {};

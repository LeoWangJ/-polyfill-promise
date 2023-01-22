export default class Promise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  status: string;
  result: null;
  // 保留成功回調，避免進入 then 時，上一個非同步函數還沒執行完。
  onFulfillCallbacks: Function[];
  onRejectedCallbacks: Function[];
  constructor(fn: Function) {
    this.status = Promise.PENDING;
    this.result = null;
    this.onFulfillCallbacks = [];
    this.onRejectedCallbacks = [];
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(result: any) {
    if (this.status === Promise.PENDING) {
      this.status = Promise.FULFILLED;
      this.result = result;
      this.onFulfillCallbacks.forEach((fulfilled) => {
        fulfilled(result);
      });
    }
  }

  reject(reason: any) {
    if (this.status === Promise.PENDING) {
      this.status = Promise.REJECTED;
      this.result = reason;
      this.onRejectedCallbacks.forEach((rejected) => {
        rejected(reason);
      });
    }
  }

  then(onFulfilled?: any, onRejected?: any) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value: any) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason: any) => {
            throw reason;
          };
    // 處理當進入 then ，狀態還在 pending 時，將函數存入陣列中，等到狀態更變後再觸發。
    if (this.status === Promise.PENDING) {
      this.onFulfillCallbacks.push(() =>
        setTimeout(() => onFulfilled(this.result), 0)
      );
      this.onRejectedCallbacks.push(() =>
        setTimeout(() => onRejected(this.result), 0)
      );
    }
    if (this.status === Promise.FULFILLED)
      setTimeout(() => onFulfilled(this.result), 0);
    if (this.status === Promise.REJECTED)
      setTimeout(() => onRejected(this.result), 0);
  }
}

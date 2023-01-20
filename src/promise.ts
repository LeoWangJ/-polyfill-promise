export default class Promise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  status: string;
  result: null;
  constructor(fn: Function) {
    this.status = Promise.PENDING;
    this.result = null;
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
    }
  }

  reject(reason: any) {
    if (this.status === Promise.PENDING) {
      this.status = Promise.REJECTED;
      this.result = reason;
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
    if (this.status === Promise.FULFILLED) onFulfilled(this.result);
    if (this.status === Promise.REJECTED) onRejected && onRejected(this.result);
  }
}

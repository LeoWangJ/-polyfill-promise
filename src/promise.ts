class MyPromise<T> {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  status: string;
  result: null;
  // 保留成功回調，避免進入 then 時，上一個非同步函數還沒執行完。
  onFulfillCallbacks: Function[];
  onRejectedCallbacks: Function[];
  constructor(fn: Function) {
    this.status = MyPromise.PENDING;
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
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.result = result;
      this.onFulfillCallbacks.forEach((fulfilled) => {
        fulfilled(result);
      });
    }
  }

  reject(reason: any) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.result = reason;
      this.onRejectedCallbacks.forEach((rejected) => {
        rejected(reason);
      });
    }
  }

  then(onFulfilled?: any, onRejected?: any) {
    const promise = new MyPromise((resolve: Function, reject: Function) => {
      // 處理當進入 then ，狀態還在 pending 時，將函數存入陣列中，等到狀態更變後再觸發。
      if (this.status === MyPromise.PENDING) {
        this.onFulfillCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== "function") {
                resolve(this.result);
              } else {
                const value = onFulfilled(this.result);
                resolvePromise(promise, value, resolve, reject);
              }
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onRejected !== "function") {
                reject(this.result);
              } else {
                const value = onRejected(this.result);
                resolvePromise(promise, value, resolve, reject);
              }
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== "function") {
              resolve(this.result);
            } else {
              const value = onFulfilled(this.result);
              resolvePromise(promise, value, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            if (typeof onRejected !== "function") {
              reject(this.result);
            } else {
              const value = onRejected(this.result);
              resolvePromise(promise, value, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
    });
    return promise;

    /**
     *
     * @param newPromise - 從 then 返回的新 promise
     * @param value - resolve or reject 返回的值
     * @param resolve - 新 promise 的 resolve
     * @param reject - 新 promise 的 reject
     */
    function resolvePromise(
      newPromise: any,
      value: any,
      resolve: any,
      reject: any
    ) {
      if (newPromise === value) {
        throw new TypeError("Chaining cycle detected for promise");
      }

      if (value instanceof MyPromise) {
        value.then((newValue: any) => {
          resolvePromise(newPromise, newValue, resolve, reject);
        }, reject);
      } else if (
        value !== null &&
        (typeof value === "object" || typeof value === "function")
      ) {
        try {
          var then = value.then;
        } catch (e) {
          return reject(e);
        }

        if (typeof then === "function") {
          let called = false;
          try {
            then.call(
              value,
              (newValue: any) => {
                if (called) return;
                called = true;
                resolvePromise(newPromise, newValue, resolve, reject);
              },
              (rejectValue: any) => {
                if (called) return;
                called = true;
                reject(rejectValue);
              }
            );
          } catch (e) {
            if (called) return;
            called = true;
            reject(e);
          }
        } else {
          resolve(value);
        }
      } else {
        return resolve(value);
      }
    }
  }
}

// @ts-ignore
// 測試 promises-aplus-tests 的鉤子
MyPromise.defer = MyPromise.deferred = function () {
  let result: any = {};
  result.promise = new MyPromise((resolve: any, reject: any) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

export = MyPromise;

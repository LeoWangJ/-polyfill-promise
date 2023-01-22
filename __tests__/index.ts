import Promise from "../src/promise";

const pending = "pending";
const fulfilled = "fulfilled";
const rejected = "rejected";
describe("Promise", () => {
  it("Promise 是一個 class", () => {
    expect(new Promise(() => {})).toBeInstanceOf(Promise);
    expect(Promise).toBeInstanceOf(Function);
    expect(Promise.prototype).toBeInstanceOf(Object);
  });
  describe("傳入的 fn", () => {
    it("new Promise 必須接受一個函數，否則直接 rejected", () => {
      // @ts-ignore
      let promise = new Promise(1);
      expect(promise.status).toBe(rejected);
    });

    it("new Promise(fn) 中的 fn 會立即執行。", () => {
      let fn = jest.fn();
      new Promise(fn);
      expect(fn).toBeCalled();
    });

    it("new Promise(fn) 中的 fn 執行時接收 resolve 與 reject 兩個函數", (done) => {
      let fn = jest.fn((resolve: Function, reject: Function) => {
        expect(resolve).toBeInstanceOf(Function);
        expect(reject).toBeInstanceOf(Function);
        done();
      });
      new Promise(fn);
      expect(fn).toBeCalled();
    });
  });
  describe("狀態", () => {
    it("new Promise 呼叫時 status 狀態為 pending", () => {
      let fn = jest.fn();
      let promise = new Promise(fn);
      expect(promise.status).toBe(pending);
    });
    it("new Promise 使用 resolve 後狀態改為 fulfilled", (done) => {
      let promise = new Promise((resolve: Function) => {
        resolve();
        done();
      });
      expect(promise.status).toBe(fulfilled);
    });
    it("new Promise 使用 reject 後狀態改為 rejected", (done) => {
      let promise = new Promise((resolve: Function, reject: Function) => {
        reject();
        done();
      });
      expect(promise.status).toBe(rejected);
    });

    it("狀態值從 pending 轉為 fulfilled 後，不會再被修改", (done) => {
      let promise = new Promise((resolve: Function, reject: Function) => {
        resolve();
        reject();
        done();
      });
      expect(promise.status).toBe(fulfilled);
    });

    it("狀態值從 pending 轉為 rejected 後，不會再被修改", (done) => {
      let promise = new Promise((resolve: Function, reject: Function) => {
        reject();
        resolve();
        done();
      });
      expect(promise.status).toBe(rejected);
    });
  });

  describe("resolve", () => {
    it("能夠傳字串，並且添加到 result 中", (done) => {
      let promise = new Promise((resolve: Function) => {
        resolve("你好");
        done();
      });
      expect(promise.result).toBe("你好");
    });

    it("能夠傳數字，並且添加到 result 中", (done) => {
      let promise = new Promise((resolve: Function) => {
        resolve(1);
        done();
      });
      expect(promise.result).toBe(1);
    });
  });

  describe("reject", () => {
    it("能夠傳字串，並且添加到 result 中", (done) => {
      let promise = new Promise((resolve: Function, reject: Function) => {
        reject("你好");
        done();
      });
      expect(promise.result).toBe("你好");
    });

    it("能夠傳數字，並且添加到 result 中", (done) => {
      let promise = new Promise((resolve: Function, reject: Function) => {
        reject(1);
        done();
      });
      expect(promise.result).toBe(1);
    });
  });

  describe("then", () => {
    it("then 第一個參數是在 fulfilled 才會執行", () => {
      let promise = new Promise((resolve: Function) => {
        resolve(1);
      });
      expect(promise.status === fulfilled);
      let fn = jest.fn();
      promise.then(fn);
      setTimeout(() => {
        expect(fn).toBeCalled();
      });
    });

    it("then 第二個參數是在 rejected 才會執行", () => {
      let promise = new Promise((resolve: Function, reject: Function) => {
        reject(1);
      });

      expect(promise.status === rejected);
      let fn = jest.fn();
      promise.then(undefined, fn);
      setTimeout(() => {
        expect(fn).toBeCalled();
      });
    });

    it("將 resolve 的值傳遞給 onFulfilled", (done) => {
      new Promise((resolve: Function) => {
        resolve(1);
      }).then((result: number) => {
        expect(result).toBe(1);
        done();
      });
    });

    it("將 reject 的值傳遞給 onRejected", (done) => {
      new Promise((resolve: Function, reject: Function) => {
        reject(1);
      }).then(undefined, (result: number) => {
        expect(result).toBe(1);
        done();
      });
    });

    it("then 參數需為異步", (done) => {
      let fn = jest.fn(() => done);
      new Promise((resolve: Function) => {
        resolve(1);
      }).then(fn);

      expect(fn).not.toBeCalled();
      setTimeout(() => {
        expect(fn).toBeCalled();
        done();
      }, 0);
    });

    it("當狀態 pending 時，先執行 then 時，將成功函數保存到 resolve 執行後才執行", (done) => {
      let fn = jest.fn((value) => {
        expect(value).toBe(1);
      });

      let promise = new Promise((resolve: Function) => {
        setTimeout(() => {
          resolve(1);
        }, 1500);
      });
      promise.then(fn);
      setTimeout(() => {
        expect(promise.status).toBe(pending);
        expect(fn).not.toBeCalled();
      }, 1000);
      setTimeout(() => {
        expect(promise.status).toBe(fulfilled);
        expect(fn).toBeCalled();
        done();
      }, 2000);
    });

    it("當狀態 pending 時，先執行 then 時，將失敗函數保存到 reject 執行後才執行", (done) => {
      let fn = jest.fn((value) => {
        expect(value).toBe(1);
      });

      let promise = new Promise((resolve: Function, reject: Function) => {
        setTimeout(() => {
          reject(1);
        }, 1500);
      });
      promise.then(undefined, fn);
      setTimeout(() => {
        expect(promise.status).toBe(pending);
        expect(fn).not.toBeCalled();
      }, 1000);
      setTimeout(() => {
        expect(promise.status).toBe(rejected);
        expect(fn).toBeCalled();
        done();
      }, 2000);
    });
  });
});

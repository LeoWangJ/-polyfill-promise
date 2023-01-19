
import Promise from '../src/promise'
describe('Promise', () => {
    it('Promise 是一個class', () => {
        expect(Promise).toBe(Function)
        expect(Promise.prototype).toBe(Object)
    })
    // describe('傳入的 fn', () => {
    //     it('new Promise 必須接受一個函數', () => {
    //         assert.throw(() => {
    //             // @ts-ignore
    //             new Promise(1)
    //         })
    //     })

    //     it('new Promise(fn) 中的 fn 會立即執行。', () => {
    //         let fn = sinon.fake()
    //         new Promise(fn)
    //         assert.isTrue(fn.called)
    //     })

    //     it('new Promise(fn) 中的 fn 執行時接收 resolve 與 reject 兩個函數', (done) => {
    //         let fn = sinon.fake()
    //         new Promise((resolve, reject) => {
    //             assert.isFunction(resolve)
    //             assert.isFunction(reject)
    //             done()
    //         })
    //         assert.isTrue(fn.called)
    //     })

    // })
    // describe('狀態', () => {
    //     it('new Promise 呼叫時 status 狀態為 pending', () => {
    //         let fn = sinon.fake()
    //         let promise = new Promise(fn)
    //         assert(promise.status === 'pending')
    //     })
    //     it('new Promise 使用 resolve 後狀態改為 fulfilled', (done) => {
    //         let promise = new Promise((resolve) => {
    //             resolve()
    //             setTimeout(() => {
    //                 done()
    //             }, 0)
    //         })
    //         assert(promise.status === 'fulfilled')
    //     })
    //     it('new Promise 使用 reject 後狀態改為 rejected', (done) => {
    //         let promise = new Promise((resolve, reject) => {
    //             reject()
    //             setTimeout(() => {
    //                 done()
    //             }, 0)
    //         })
    //         assert(promise.status === 'rejected')
    //     })

    //     it('狀態值從 pending 轉為 fulfilled 後，不會再被修改', (done) => {
    //         let promise = new Promise((resolve, reject) => {
    //             resolve()
    //             reject()
    //             setTimeout(() => {
    //                 done()
    //             }, 0)
    //         })
    //         assert(promise.status === 'fulfilled')
    //     })

    //     it('狀態值從 pending 轉為 rejected 後，不會再被修改', (done) => {
    //         let promise = new Promise((resolve, reject) => {
    //             reject()
    //             resolve()
    //             setTimeout(() => {
    //                 done()
    //             }, 0)
    //         })
    //         assert(promise.status === 'rejected')
    //     })

    // })

    // describe('resolve', () => {
    //     it('能夠傳字串，並且添加到 result 中', (done) => {
    //         let promise = new Promise((resolve) => {
    //             resolve('你好')
    //             setTimeout(() => {
    //                 done()
    //             }, 0)
    //         })
    //         assert(promise.result === '你好')
    //     })

    //     it('能夠傳數字，並且添加到 result 中', (done) => {
    //         let promise = new Promise((resolve) => {
    //             resolve(1)
    //             setTimeout(() => {
    //                 done()
    //             }, 0)
    //         })
    //         assert(promise.result === 1)
    //     })

    //     it('能夠傳字串，並且添加到 result 中', (done) => {
    //         let promise = new Promise((resolve) => {
    //             resolve('你好')
    //             done()
    //         })
    //         assert(promise.result === '你好')
    //     })
    // })
})

import Promise from '../src/promise'
describe('Promise', () => {
    it('Promise 是一個 class', () => {
        expect(new Promise(() => { })).toBeInstanceOf(Promise)
        expect(Promise).toBeInstanceOf(Function)
        expect(Promise.prototype).toBeInstanceOf(Object)
    })
    describe('傳入的 fn', () => {
        it('new Promise 必須接受一個函數', () => {
            // @ts-ignore
            expect(() => { new Promise(1) }).toThrow()
        })

        it('new Promise(fn) 中的 fn 會立即執行。', () => {
            let fn = jest.fn()
            new Promise(fn)
            expect(fn).toBeCalled()
        })

        it('new Promise(fn) 中的 fn 執行時接收 resolve 與 reject 兩個函數', (done) => {
            let fn = jest.fn((resolve: Function, reject: Function) => {
                expect(resolve).toBeInstanceOf(Function)
                expect(reject).toBeInstanceOf(Function)
                done()
            })
            new Promise(fn)
            expect(fn).toBeCalled()
        })

    })
    describe('狀態', () => {
        it('new Promise 呼叫時 status 狀態為 pending', () => {
            let fn = jest.fn()
            let promise = new Promise(fn)
            expect(promise.status).toBe('pending')
        })
        it('new Promise 使用 resolve 後狀態改為 fulfilled', (done) => {
            let promise = new Promise((resolve: Function) => {
                resolve()
                done()
            })
            expect(promise.status).toBe('fulfilled')
        })
        it('new Promise 使用 reject 後狀態改為 rejected', (done) => {
            let promise = new Promise((resolve: Function, reject: Function) => {
                reject()
                done()
            })
            expect(promise.status).toBe('rejected')
        })

        it('狀態值從 pending 轉為 fulfilled 後，不會再被修改', (done) => {
            let promise = new Promise((resolve: Function, reject: Function) => {
                resolve()
                reject()
                done()
            })
            expect(promise.status).toBe('fulfilled')
        })

        it('狀態值從 pending 轉為 rejected 後，不會再被修改', (done) => {
            let promise = new Promise((resolve: Function, reject: Function) => {
                reject()
                resolve()
                done()
            })
            expect(promise.status).toBe('rejected')
        })

    })

    describe('resolve', () => {
        it('能夠傳字串，並且添加到 result 中', (done) => {
            let promise = new Promise((resolve: Function) => {
                resolve('你好')
                done()
            })
            expect(promise.result).toBe('你好')
        })

        it('能夠傳數字，並且添加到 result 中', (done) => {
            let promise = new Promise((resolve: Function) => {
                resolve(1)
                done()
            })
            expect(promise.result).toBe(1)
        })
    })
})
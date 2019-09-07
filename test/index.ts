import * as chai from 'chai'
import Promise from '../src/promise'
let assert = chai.assert

describe('Promise', () => {
    it('是一個class', () => {
        assert.isFunction(Promise)
        assert.isObject(Promise.prototype)
    })
    it('new Promise 必須接受一個函式', () => {
        assert.throw(() => {
            // @ts-ignore
            new Promise(1)
        })
    })
    it('new Promise(fn) 會生成一個物件，物件中有then 方法', () => {
        let promise = new Promise(() => { })
        assert.isFunction(promise.then)
    })
    it('new Promise(fn) 中的fn會立即執行。', () => {
        let call = false
        new Promise(() => {
            call = true
        })
        assert.isTrue(call)
    })
    it('new Promise(fn) 中的fn執行時接收resolve與reject兩個函數', () => {
        let call = false
        new Promise((resolve, reject) => {
            call = true
            assert.isFunction(resolve)
            assert.isFunction(reject)
        })
        assert.isTrue(call)
    })
    it('Promise.then(success) 中的success會在resolve被調用的時候執行。', (done) => {
        let called = false
        let promise = new Promise((resolve, reject) => {
            assert.isFalse(called)
            resolve()
            setTimeout(() => {
                assert.isTrue(called)
                done()
            })
        })
        // @ts-ignore
        promise.then(() => {
            called = true
        })
    })
})
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)
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
        let fn = sinon.fake()
        new Promise(fn)
        assert.isTrue(fn.called)
    })
    it('new Promise(fn) 中的fn執行時接收resolve與reject兩個函數', (done) => {
        let fn = sinon.fake()
        new Promise((resolve, reject) => {
            assert.isFunction(resolve)
            assert.isFunction(reject)
            done()
        })
        assert.isTrue(fn.called)
    })
    it('Promise.then(success) 中的success會在resolve被調用的時候執行。', (done) => {
        let fn = sinon.fake()
        let promise = new Promise((resolve, reject) => {
            assert.isFalse(fn.called)
            resolve()
            setTimeout(() => {
                assert.isTrue(fn.called)
                done()
            })
        })
        // @ts-ignore
        promise.then(fn)
    })
})
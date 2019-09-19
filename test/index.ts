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
    it('Promise.then(null,fail) 中的fail會在reject被調用的時候執行。', (done) => {
        let fn = sinon.fake()
        let promise = new Promise((resolve, reject) => {
            assert.isFalse(fn.called)
            reject()
            setTimeout(() => {
                assert.isTrue(fn.called)
                done()
            })
        })
        // @ts-ignore
        promise.then(null, fn)
    })
    it('2.2.1', () => {
        let promise = new Promise((resolve) => {
            resolve()
        })
        promise.then(false, null)
        assert(1 === 1)
    })
    it('2.2.2', done=>{
        const succeed = sinon.fake()
        const promise = new Promise(resolve =>{
            assert.isFalse(succeed.called)
            resolve(222)
            resolve(2223)
            setTimeout(()=>{
                assert(promise.status === 'fulfilled')
                assert.isTrue(succeed.calledOnce)
                assert(succeed.calledWith(222))
                done()
            },0)
        })
        promise.then(succeed)
    })
    it('2.2.3', done=>{
        const fail = sinon.fake()
        const promise = new Promise((resolve,reject) =>{
            assert.isFalse(fail.called)
            reject(222)
            reject(2223)
            setTimeout(()=>{
                assert(promise.status === 'rejected')
                assert.isTrue(fail.calledOnce)
                assert(fail.calledWith(222))
                done()
            },0)
        })
        promise.then(null,fail)
    })
    it('2.2.4 在我的代碼執行完之前，不得調用 then 後面的兩個函數',(done)=>{
        const succeed = sinon.fake()
        const promise = new Promise(resolve=>{
            resolve()
        })
        promise.then(succeed)
        assert.isFalse(succeed.called)
        setTimeout(()=>{
            assert.isTrue(succeed.called)
            done()
        },0)
    })
    it('2.2.4 失敗回調',(done)=>{
        const fn = sinon.fake()
        const promise = new Promise((resolve,reject) =>{
            reject()
        })
        promise.then(null,fn)
        assert.isFalse(fn.called)
        setTimeout(()=>{
            assert.isTrue(fn.called)
            done()
        },0)
    })
    it('2.2.5',(done)=>{
        const promise = new Promise(resolve=>{
            resolve()
        })
        promise.then(function(){
            'use strict'
            assert(this === undefined)
            done()
        })
    })
    it('2.2.6 在同一个 promise 实例中，then 可以链式调用多次', done =>{
        const promise = new Promise(resolve=>{
            resolve()
        })
        const callbacks = [sinon.fake(),sinon.fake(),sinon.fake()]
        promise.then(callbacks[0])
        promise.then(callbacks[1])
        promise.then(callbacks[2])
        setTimeout(() => {
            assert.isTrue(callbacks[0].called)
            assert.isTrue(callbacks[1].called)
            assert.isTrue(callbacks[2].called)
            assert.isTrue(callbacks[1].calledAfter(callbacks[0]))
            assert.isTrue(callbacks[2].calledAfter(callbacks[1]))
            done()
        }, 0);
    })
    it('2.2.6.2 在同一个 promise 实例中，then 可以链式调用多次', done =>{
        const promise = new Promise((resolve,reject)=>{
            reject()
        })
        const callbacks = [sinon.fake(),sinon.fake(),sinon.fake()]
        promise.then(null,callbacks[0])
        promise.then(null,callbacks[1])
        promise.then(null,callbacks[2])
        setTimeout(() => {
            assert.isTrue(callbacks[0].called)
            assert.isTrue(callbacks[1].called)
            assert.isTrue(callbacks[2].called)
            assert.isTrue(callbacks[1].calledAfter(callbacks[0]))
            assert.isTrue(callbacks[2].calledAfter(callbacks[1]))
            done()
        }, 0);
    })
    it('2.2.7 then必须返回一个promise', ()=>{
        const promise = new Promise(reslove=>{
            reslove()
        })

        const promise2 = promise.then(()=>{},()=>{})
        assert(promise2 instanceof Promise)
    })
})
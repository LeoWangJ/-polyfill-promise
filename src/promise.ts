class PromisePolyfill {
    succeed = null
    fail = null
    status = "pending"
    resolve(result) {
        setTimeout(() => {
            this.status = "fulfilled"
            if (typeof this.succeed === 'function') {
                this.succeed(result)
            }
        }, 0)
    }
    reject(reason) {
        setTimeout(() => {
            this.status = "rejected"
            if (typeof this.fail === 'function') {
                this.fail(reason)
            }
        }, 0)
    }
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw new Error('只接收函數')
        }
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    then(succeed?, fail?) {
        if (typeof succeed === 'function') {
            this.succeed = succeed
        }
        if (typeof fail === 'function') {
            this.fail = fail
        }
    }
}

export default PromisePolyfill
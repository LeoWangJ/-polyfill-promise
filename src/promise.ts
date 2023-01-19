export default class Promise {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = 'rejected'
    status: string
    result: null
    constructor(fn: Function) {
        this.status = Promise.PENDING
        this.result = null
        fn(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve(result: any) {
        if (this.status === Promise.PENDING) {
            this.status = Promise.FULFILLED
            this.result = result
        }
    }

    reject(reason: any) {
        if (this.status === Promise.PENDING) {
            this.status = Promise.REJECTED
            this.result = reason
        }
    }

    then() {

    }
} 
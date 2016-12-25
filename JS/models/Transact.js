'use strict';
class Transact {
    constructor(plan) {
        this.plan = plan;
        this.currentState = 0;
    }

    tick() {
        const result = this.plan[this.currentState]();
        if (result) {
            /* move forward */
            this.currentState = (this.plan.length > this.currentState + 1) ? this.currentState + 1 : 0;
        }
    }
}

module.exports = Transact;
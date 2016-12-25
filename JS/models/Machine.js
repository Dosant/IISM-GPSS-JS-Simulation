'use strict';
class Machine {
    constructor(name) {
        this.name = name;
        this.busy = false;
        this.workingTime = 0;
        this.workingTimeCap = null;

        this.statCounter = 0;

        this.seize = this.seize.bind(this);
        this.release = this.release.bind(this);
        this.advance = this.advance.bind(this);
    }

    seize() {
        if (this.busy) {
            return false;
        } else {
            this.busy = true;
            console.log('Seize ' + this.name);
            this.statCounter++;
            return true;
        }
    }

    release() {
        this.busy = false;
        this.workingTime = 0;
        this.workingTimeCap = null;
        console.log('Release ' + this.name);
        return true;
    }

    advance(time) {
        if (this.workingTime == 0) {
            /* first advance. Set current Cap */
            if (typeof time === 'function') {
                this.workingTimeCap = time(Math.random());
            } else {
                this.workingTimeCap = time;
            }
        }

        this.workingTime++;

        if (this.workingTimeCap <= this.workingTime) {
            this.workingTime = 0;
            this.workingTimeCap = null;
            return true; /* Machine broke or finished */
        } else {
            return false; /* Machine will work */
        }
    }
}

module.exports = Machine;

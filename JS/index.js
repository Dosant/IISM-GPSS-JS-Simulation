'use strict';
const gaussian = require('gaussian');
const Machine = require('./models/Machine');
const Transact = require('./models/Transact');


const finalTime = 5000;
const tau = 6;
const t = 4;

function startSimulation(N) {
    /* two types of machine. Working and Repairing */
    const machine = new Machine('Working Machine');
    const repaireMachine = new Machine('Repair Machine');

    let time = 0;

    /* prepare generators for gauss rv */
    const gaussForWokingMachine = gaussian(350, 70*70);
    const gaussForRepairMachine = gaussian(8, 0.5);

    /* This is our Details, each have the same plan */
    const transacts = (new Array(N)).fill(true).map((transct) => new Transact([
        machine.seize,
        machine.advance.bind(machine, tau),
        machine.advance.bind(machine, gaussForWokingMachine.ppf.bind(gaussForWokingMachine)),
        machine.advance.bind(machine, t),
        machine.release,
        repaireMachine.seize,
        repaireMachine.advance.bind(machine, gaussForRepairMachine.ppf.bind(gaussForRepairMachine)),
        repaireMachine.release
    ]));


    /* the acutal Simulation */
    while (time <= finalTime) {
        transacts.forEach((transact) => {
            transact.tick();
        });
        time++;
    }

    console.log('Finish Simulation');
    console.log('Detail was changed: ' + machine.statCounter + ' times');
}

startSimulation(3);

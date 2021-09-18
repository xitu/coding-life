"use strict";
exports.__esModule = true;
// Mediocre shim
var worker_threads_1 = require("worker_threads");
var workerAdd = ";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";
exports["default"] = (function (c, _, msg, transfer, cb) {
    var done = false;
    var w = new worker_threads_1.Worker(c + workerAdd, { eval: true })
        .on('error', function (e) { return cb(e, null); })
        .on('message', function (m) { return cb(null, m); })
        .on('exit', function (c) {
        if (c && !done)
            cb(new Error('Exited with code ' + c), null);
    });
    w.postMessage(msg, transfer);
    w.terminate = function () {
        done = true;
        return worker_threads_1.Worker.prototype.terminate.call(w);
    };
    return w;
});

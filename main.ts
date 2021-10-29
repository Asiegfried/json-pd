const fs = require("fs-extra");
async function jobArrived(s: Switch, flowElement: FlowElement, job: Job) {
    const jobPath = await job.get(AccessLevel.ReadOnly);
    var jsondata = JSON.parse(fs.readFileSync(jobPath))
    await job.setPrivateData('item_code', jsondata.item_code);
    for (var key in jsondata) {
        await job.setPrivateData(key, jsondata[key]);
        await job.log(LogLevel.Info, `${key}: ${jsondata[key]}`);
    }
    await job.sendToSingle();
}
const mongoose = require('mongoose');
const taskModel = require('/opt/schema/cmsTaskSchema.js');
const itemModel = require('/opt/schema/itemSchema.js');
mongoose.connect(process.env.DATABASE);

exports.handler = async (event) => {
    try {
        const tasks = await taskModel.find();
        const dailyTasks = tasks.filter(task => task.sla && task.sla.some(s => s.duration && s.duration.recurrence === "daily")).map(task => ({
            manager: task.manager,
            client: task.client,
            processor: task.processor,
            reviewer: task.reviewer,
            sla: task.sla.filter(s => s.duration && s.duration.recurrence === "daily")
        }));
        
        const item = await itemModel.create(dailyTasks);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, response: item }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

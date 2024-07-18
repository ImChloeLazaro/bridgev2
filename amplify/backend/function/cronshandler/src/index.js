const mongoose = require('mongoose');
const taskModel = require('/opt/schema/cmsTaskSchema.js')
mongoose.connect(process.env.DATABASE)

const itemSchema = mongoose.Schema({
    name: String,
    createdBy: {
        type: Date,
        default: Date.now()
    }
})

const itemModel = mongoose.model('item', itemSchema)

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    try {
        const name = 'Hello world' // Extract name from the event body
        const item = await itemModel.create({ name });
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, response: item }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

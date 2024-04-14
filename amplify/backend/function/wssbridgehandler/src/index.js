const AWS = require('aws-sdk');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    const ENDPOINT = 'https://kggqfk9nf5.execute-api.ap-southeast-1.amazonaws.com/production/'
    const client = new AWS.ApiGatewayManagementApi({ endpoint: ENDPOINT });
    const sessions = {}
    const activeMembers = [];

    const sendOne = async (id, body) => {
        try {
            await client.postToConnection({
                ConnectionId: id,
                Data: Buffer.from(JSON.stringify(body))
            }).promise();
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    }
    const sendMany = async (ids, body) => {
        const all = ids.map(i => sendOne(i, body));
        return Promise.all(all);
    }

    const sendActiveMembers = async () => {
        const message = JSON.stringify({ members: activeMembers });
        await sendMany(Object.keys(sessions), message);
    };

    if (event.requestContext) {

        const connectionId = event.requestContext.connectionId; // connectionId of the client
        const routeKey = event.requestContext.routeKey; // routeKey of the client

        let body = {}   // body of the client

        try {
            if (event.body) {
                body = JSON.parse(event.body);
            }
        } catch (error) {
            console.error('Error parsing body: ', error);
        }

        //Router
        switch (routeKey) {
            case '$connect':
                break;
            case '$disconnect':
                await sendMany(Object.keys(sessions), { system: `${sessions[connectionId]} has left the channel` })
                delete sessions[connectionId]
                await sendMany(Object.keys(sessions), { members: Object.values(sessions) })
                break;
            case '$default':
                break;
            case 'setData':
                // Set name for the connectionId
                sessions[connectionId] = body.name;
                // Add the new member to the active members array if not already present
                if (!activeMembers.includes(body.name)) {
                    activeMembers.push(body.name);
                    // Send updated list of active members to all clients
                    await sendActiveMembers();
                }
                await sendMany(Object.keys(sessions), { system: `${sessions[connectionId]} has joined the channel with id ${connectionId}` });
                break;
            case 'emitGlobal':
                await sendMany(Object.keys(sessions), { system: `${sessions[connectionId]} : ${body.message}` });
                break;
            case 'emitOne':
                //const to = Object.keys(sessions).find(key => sessions[key] === body.to)
                await sendOne(body.to, { message: `${sessions[connectionId]} : ${body.message}` })
                break;
            default:
                console.log('Unknown routeKey: ', routeKey);
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};

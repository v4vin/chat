let messages = [];

const resolvers = {
    messages: () => {
        return messages;
    },
    sendMessage: ({username, message}) => {
        messages.push(`${username}: ${message}`);
        return true;
    },
};

module.exports = resolvers;
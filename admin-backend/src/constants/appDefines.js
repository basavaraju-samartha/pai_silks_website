module.exports = {
    SESSION_STATES: {
        SESSION_ACTIVE: 'ACTIVE',
        SESSION_LOGOUT: 'LOGOUT'
    },
    expiryTime: {
        sessionExpiryTime: 1000 * 60 * 60 * 24, // 1 day
        tokenExpiryTime: 1000 * 60 * 60 // 1 hour
    }
};

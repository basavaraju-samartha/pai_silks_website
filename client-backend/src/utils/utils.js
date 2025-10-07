const crypto = require('crypto');

class Utils {
    
    handleMissingParams(res, msg) {
        return res.status(400).json({ error: msg });
    }

    handleInternalError(res, msg) {
        return res.status(500).json({ error: msg });
    }

    handleError(res, code, msg) {
        return res.status(code).json({ error: msg });
    }

    setCookies(res, key, value, expiryTime) {
        res.cookie(key, value, { maxAge: expiryTime, httpOnly: true });
    }

    genToken(data) {
        return crypto.createHash('sha256').update(data + Date.now().toString()).digest('hex');
    }

    createSessionId() {
        return crypto.randomBytes(16).toString('hex');
    }

    getCurrentDTInUTC() {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    convertDaysToMsec(nDays) {
        return nDays * (24 * 60 * 60 * 1000);
    }

    convertHoursToMsec(hours) {
        return hours * 60 * 60 * 1000;
    }
}

module.exports = new Utils();


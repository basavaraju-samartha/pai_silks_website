const dbCmds = require('../../dbOps/adminDbOps');
const utils = require('../../utils/utils');
const appDefines = require('../../constants/appDefines');

// adminAuthManager.js
const validateAdminLogin = async (pri_email, passwd, session_id, token) => {
  const result = {
    success: false,
    validSession: false,
    createSession: false,
    token: null,
    userData: null
  };

  // Step 1: Validate email & password
  const userData = await dbCmds.verifyAdminPasswd(pri_email, passwd);
  if (!userData) {
    return result; // Invalid credentials
  }

  result.userData = userData;

  // Step 2: Get last session
  const lastSession = await dbCmds.getAdminLastSessionByEmail(pri_email);
  const now = new Date();

  if (lastSession) {
    const sessionAgeMs = now - new Date(lastSession.login_date_time);
    const tokenAgeMs = now - new Date(lastSession.token_created_time);

    const sessionExpiryMs = utils.convertDaysToMsec(1); // 1 day
    const tokenExpiryMs = utils.convertHoursToMsec(1); // 1 hour

    if (sessionAgeMs < sessionExpiryMs && lastSession.status === appDefines.SESSION_STATES.SESSION_ACTIVE) {
      // Session valid
      result.validSession = true;

      if (tokenAgeMs < tokenExpiryMs && lastSession.token) {
        // Token valid
        result.success = true;
      } else {
        // Token expired - generate new
        const newToken = utils.genToken(lastSession.sid);
        await dbCmds.updateToken(newToken, lastSession.sid);
        result.success = true;
        result.token = newToken;
      }
    } else {
      // Session expired
      await dbCmds.updateSessionStatus(
        utils.getCurrentDTInUTC(),
        appDefines.SESSION_STATES.SESSION_LOGOUT,
        lastSession.sid
      );
      result.success = true;
      result.validSession = false;
      result.createSession = true;
    }
  } else {
    // No session found - new user
    result.success = true;
    result.createSession = true;
  }

  return result;
};

module.exports = {
  validateAdminLogin,
};
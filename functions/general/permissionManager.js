module.exports.checkPermission = async (functions, message, permission) => {
    functions.createLog("Checking permissions", false, true);
    const permsFor = message.guild.members.me.permissions;
    if (permsFor === null || permsFor === undefined) return false;
    if (!permsFor.has(permission)) return false;
    return true;
};

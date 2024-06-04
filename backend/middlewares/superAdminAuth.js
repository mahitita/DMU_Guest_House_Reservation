require('dotenv').config();
const bcrypt = require('bcrypt');

const superAdminEmail = process.env.SUPERADMIN_EMAIL;
const superAdminPassword = process.env.SUPERADMIN_PASSWORD;

const authenticateSuperAdmin = async (req, res, next) => {
    const { superAdminCredentials } = req.body;
    const { email, password } = superAdminCredentials;
    //const { email, password } = req.body;

    if (email === superAdminEmail) {
        const match = await bcrypt.compare(password, await bcrypt.hash(superAdminPassword, 10));
        if (match) {
            req.user = {
                name: process.env.SUPERADMIN_NAME,
                email: superAdminEmail,
                phoneNumber: process.env.SUPERADMIN_PHONE,
                id: process.env.SUPERADMIN_ID,
                role: 'system_admin'
            };
            return next();
        }
    }

    res.status(401).json({ error: 'Unauthorized' });
};

module.exports = authenticateSuperAdmin;

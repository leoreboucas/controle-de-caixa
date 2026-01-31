const admin = require("firebase-admin");
const fs = require("fs");

let serviceAccount;

if (process.env.NODE_ENV === "production") {
    // Render / produção
    serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT.replace(/\\n/g, "\n")
    );
} else {
    // Local
    serviceAccount = JSON.parse(
        fs.readFileSync("src/private_key.json", "utf8")
    );
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = admin;
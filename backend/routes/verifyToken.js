const jwt = require("jsonwebtoken");

function verifySign(req, resp, nxt) {
    const token = req.header('auth-token');
    if (!token) return resp.status(401).send("Necesitas permisos para acceder");
    try {
        const payload = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = payload;
        nxt();
    } catch (error) {
        resp.status(401).send("Necesitas permisos para acceder");
    }
}

module.exports = verifySign;
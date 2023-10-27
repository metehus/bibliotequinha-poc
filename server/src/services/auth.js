const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const secret = 'secret'

async function geraToken(usuario) {
  return jwt.sign({ userId: usuario._id }, auth.appIdsecret, {
    expiresIn: '4h'
  });
}

async function gerarHash(usuario) {
  if (typeof usuario.senha !== 'undefined') {
    const hash = await bcryptjs.hash(usuario.senha, 10);
    usuario.senha = hash;
  }
  return usuario;
}

function autorizar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'O token não foi enviado!' });
  }

  const partes = authHeader.split(' ');

  if (partes && partes.length !== 2) {
    return res.status(401).send({ error: 'Token incompleto!' });
  }

  const [tipo, token] = partes;

  if (!/^Bearer$/i.test(tipo)) {
    return res.status(401).send({ error: 'Token mal formado!' });
  }

  jwt.verify(token, secret, (err, usuario) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido!' });
    }
    req.userId = usuario.userId;
    return next();
  });
}

module.exports = {
  gerarHash,
  geraToken,
  autorizar
};

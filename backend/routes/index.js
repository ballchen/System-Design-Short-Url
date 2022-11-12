const router = require('express').Router();

const shortUrlRoutes = require('./shortUrl');
const codeHelper = require('../lib/codeHelper');
const eventHelper = require('../lib/eventHelper');
const redisHelper = require('../lib/redisHelper');

router.use('/short-url', shortUrlRoutes);

router.get('/:code', async (req, res) => {
  const cachedUrl = await redisHelper.getCodeCache({ code: req.params.code });
  if (cachedUrl) {
    return res.redirect(cachedUrl);
  }

  const urlObject = await codeHelper.getUrlByCode(req.params.code);
  if (!urlObject) {
    return res.status(404);
  }

  eventHelper.recordUrlEvent({
    code: urlObject.code,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  });
  redisHelper.setCodeCache({ code: urlObject.code, url: urlObject.url });
  return res.redirect(urlObject.url);
});

module.exports = router;

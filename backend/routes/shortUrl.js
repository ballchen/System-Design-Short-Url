const router = require('express').Router();

const { generateUsableCode } = require('../lib/codeHelper');
const redisHelper = require('../lib/redisHelper');
const { ShortUrl } = require('../db');

const isValidUrl = (urlString) => {
  const urlPattern = new RegExp('^(https?:\\/\\/)?' // validate protocol
  + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // validate domain name
  + '((\\d{1,3}\\.){3}\\d{1,3}))' // validate OR ip (v4) address
  + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // validate port and path
  + '(\\?[;&a-z\\d%_.~+=-]*)?' // validate query string
  + '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
  return !!urlPattern.test(urlString);
};

router.post('/', async (req, res) => {
  const { url } = req.body;
  const code = await generateUsableCode();
  if (!isValidUrl(url)) {
    return res.status(400).json({ message: 'Invalid URL' });
  }
  await ShortUrl.create({ url, code });
  await redisHelper.setCodeCache({ code, url });
  res.json({ code });
});

module.exports = router;

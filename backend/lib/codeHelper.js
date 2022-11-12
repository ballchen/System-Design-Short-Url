const { generateRandomCode } = require('../utils/code');
const { ShortUrl } = require('../db');

async function getUrlByCode(code) {
  const urlObject = await ShortUrl.findOne({ code, deletedAt: null });
  return urlObject;
}

async function generateUsableCode() {
  let code = generateRandomCode();
  const existedCode = await getUrlByCode(code);
  if (existedCode) {
    code = generateUsableCode(existedCode);
  }

  return code;
}

module.exports = {
  getUrlByCode,
  generateUsableCode,
};

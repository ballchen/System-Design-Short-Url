function generateRandomCode(length = 6) {
  const OPTIONS = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789';
  let code = '';
  for (let i = 0; i < length; i += 1) {
    code += OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
  }
  return code;
}

module.exports = {
  generateRandomCode,
};

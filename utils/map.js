
module.exports = function g(d, m) {
  let d1 = d.replace(/--([a-zA-Z0-9])/, '$1');
  d1 = d1.split('=');
  if (d1.length < 2) return;
  m[d1[0]] = d1[1]
}
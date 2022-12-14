function slice(arr, { limit, from, to }) {
  if (limit) {
    arr = arr.slice(0, limit);
  } else if (from) {
    arr = arr.slice(from - 1);
    if (to) {
      arr = arr.slice(0, to - from);
    }
  }
  return arr;
}
module.exports = slice;

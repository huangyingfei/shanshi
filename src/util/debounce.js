//防抖函数
export function debounce(fn, delay = 200) {
  let lastFn = null;
  console.log(this)
  return function () {
    if (lastFn) {
      clearTimeout(lastFn);
    }
    lastFn = setTimeout(() => {
      lastFn = null;
      console.log(this)
      fn.call(this);
      console.log('bbbb')
    }, delay);
  }
}
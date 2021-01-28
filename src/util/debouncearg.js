//防抖函数
export function debounce(fn, delay = 200) {
  let lastFn = null;
  // console.log(this)
  return function (...args) {
    if (lastFn) {
      clearTimeout(lastFn);
    }
    lastFn = setTimeout(() => {
      lastFn = null;
      fn.call(this,...args);
      console.log(...arguments)
    }, delay);
  }
}

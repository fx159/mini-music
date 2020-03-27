export function addclass (el, className) {
  console.log(el)
  if (hasclass(el, className)) {
    return
  }
  const arr = el.className.split('')
  arr.push(className)
  el.className = arr.join('')
}
export function hasclass (el, className) {
  const reuslt = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reuslt.test(el.className)
}

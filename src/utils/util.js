export function addclass (el, className) {
  if (hasclass(el, className)) {
    return
  }
  console.log(1)
  const arr = el.className.split('')
  arr.push(className)
  el.className = arr.join('')
}

export function hasclass (el, className) {
  const reuslt = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reuslt.test(el.className)
}

export function getindex (el, name, value) {
  const index = 'data-'
  name = index + name

  if (value) {
    return el.setAttribute(name, value)
  } else {
    return el.getAttribute(name)
  }
}

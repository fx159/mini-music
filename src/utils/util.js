export function addclass (el, className) {
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

export function getindex (el, name, value) {
  const index = 'data-'
  name = index + name

  if (value) {
    return el.setAttribute(name, value)
  } else {
    return el.getAttribute(name)
  }
}

export function shuffle (arr) {
  const newarr = arr.slice()
  for (let i = 0; i < newarr.length; i++) {
    const j = random(0, i)
    const t = newarr[i]
    newarr[i] = newarr[j]
    newarr[j] = t
  }
  return newarr
}

export function random (max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

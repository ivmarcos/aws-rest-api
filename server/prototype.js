Array.prototype.extract = function(prop) {
  return this.reduce(function(arr, item) {
    const val = item[prop]
    if (val) {
      return arr.concat(val);
    }
    
    return arr
  }, [])
}

Array.prototype.groupBy = function(prop, props_sum) {
  var groups = this.reduce(function(groups, item) {
    const val = item[prop]
    if (!groups[val]) {
      groups[val] = {  } //arr: []
      groups[val][prop] = val
    }
    //groups[val].arr.push(item)
    
    if (props_sum) {
      props_sum.forEach(p => {
        if (groups[val][p])
          groups[val][p] += item[p]
        else
          groups[val][p] = item[p]
      })
    }
    
    return groups
  }, {})

  var arr = []
  for(var g in groups) {
    arr.push(groups[g])
  }
  return arr
}

Array.prototype.orderBy = function(prop, desc) {
  if (this.length === 0)
    return this

  const t = typeof this[0][prop]
  switch(t)
  {
    case 'string':
      if (desc) {
        return this.sort(function(a,b) {
          return a[prop] < b[prop] ? 1 : a[prop] > b[prop] ? -1 : 0
        })
      } else {
        return this.sort(function(a,b) {
          return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0
        })
      }

    case 'number':
      if (desc) {
        return this.sort(function(a,b) {
          return b[prop] - a[prop]
        })
      } else {
        return this.sort(function(a,b) {
          return a[prop] - b[prop]
        })
      }
  }

  throw new Error(`Array orderBy: tipo desconhecido ${t}`)
}

Array.prototype.propToArray = function(prop) {
    return this.map(value => {
      return value[prop]
    })
}

Array.prototype.limit = function(limit) {
  return this.slice(0, limit)
}

Array.prototype.top = function(prop, limit) {
  return this.orderBy(prop, 'desc').limit(limit)
}
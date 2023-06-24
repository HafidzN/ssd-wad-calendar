import { DAYS } from "./consts"

export const range = (end) => {
    const { result } = Array.from({ length: end }).reduce(
      ({ result, current }) => ({
        result: [...result, current],
        current: current + 1
      }),
      { result: [], current: 1 }
    )
    return result
}

export const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
}

export const getSortedDays = (month, year) => {
    const dayIndex = new Date(year, month, 1).getDay()
    return [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)]
}

export const getDateObj = (day, month, year) => {
    return new Date(year, month, day)
}

export const areDatesTheSame = (first, second, i) => {
    // console.log({ second, i })
    return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
    )
}

export const generateRandomSaturatedColor = () => {
    const hue = Math.floor(Math.random() * 361)
    const saturation = Math.floor(Math.random() * 51) + 50
    const lightness = Math.floor(Math.random() * 61) + 20
    const rgb = hslToRgb(hue, saturation, lightness)
    const colorHex = rgbToHex(rgb[0], rgb[1], rgb[2])

    return colorHex
}

const hslToRgb = (h, s, l) => {
    h /= 360
    s /= 100
    l /= 100
  
    let r, g, b
  
    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }
  
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}
  
const rgbToHex = (r, g, b) => {
    const componentToHex = (c) => {
      const hex = c.toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }  
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export const generateRandomId = (maxChar = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''
    for (let i = 0; i < maxChar; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      id += chars.charAt(randomIndex)
    }
    return id
}

export const  saveArrayToLocalStorage = (itemName, array) => {
    if (localStorage.getItem(itemName)) {
      localStorage.setItem(itemName, JSON.stringify(array))
    } else {
      localStorage.setItem(itemName, JSON.stringify(array))
    }
  }
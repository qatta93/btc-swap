export const formatDisplayValue = (numStr: string): string => {
  if (numStr === '' || numStr === '-') return numStr

  if (numStr === '.') return '.'

  const [integerPart, decimalPart] = numStr.split('.', 2)

  if (integerPart === '' && decimalPart) return `.${decimalPart}`

  const isNegative = numStr.startsWith('-')
  const numValue = parseFloat(integerPart || '0')

  if (isNaN(numValue)) return ''

  let formattedInteger = Math.abs(numValue).toLocaleString('en-US')

  if (isNegative) formattedInteger = '-' + formattedInteger

  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger
}

export const parseInputValue = (formattedStr: string): string => {
  const isNegative = formattedStr.startsWith('-')

  let cleanValue = formattedStr.replace(/,/g, '').replace(/[^0-9.-]/g, '')

  const parts = cleanValue.split('.')
  if (parts.length > 2) {
    cleanValue = parts[0] + '.' + parts.slice(1).join('')
  }

  if (isNegative && !cleanValue.startsWith('-')) {
    cleanValue = '-' + cleanValue.replace(/-/g, '')
  } else if (!isNegative) {
    cleanValue = cleanValue.replace(/-/g, '')
  }

  return cleanValue
}

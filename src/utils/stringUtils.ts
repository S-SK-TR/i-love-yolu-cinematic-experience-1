import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * String yardımcı fonksiyonları
 * @module stringUtils
 */

/**
 * Metni büyük harfle başlatır
 * @param {string} str - İşlem yapılacak metin
 * @returns {string} Büyük harfle başlayan metin
 * @example
 * capitalize('merhaba') // 'Merhaba'
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Metni belirli bir uzunlukta keser ve sonuna üç nokta ekler
 * @param {string} str - İşlem yapılacak metin
 * @param {number} maxLength - Maksimum uzunluk
 * @returns {string} Kısa metin
 * @example
 * truncate('Bu çok uzun bir metin', 10) // 'Bu çok...'
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.substring(0, maxLength) + '...'
}

/**
 * Metindeki tüm boşlukları kaldırır
 * @param {string} str - İşlem yapılacak metin
 * @returns {string} Boşluksuz metin
 * @example
 * removeSpaces('Merhaba Dünya') // 'MerhabaDünya'
 */
export function removeSpaces(str: string): string {
  return str.replace(/\s+/g, '')
}

/**
 * Metindeki tüm harfleri küçük harfe çevirir
 * @param {string} str - İşlem yapılacak metin
 * @returns {string} Küçük harf metin
 * @example
 * toLowerCase('MERHABA') // 'merhaba'
 */
export function toLowerCase(str: string): string {
  return str.toLowerCase()
}

/**
 * Metindeki tüm harfleri büyük harfe çevirir
 * @param {string} str - İşlem yapılacak metin
 * @returns {string} Büyük harf metin
 * @example
 * toUpperCase('merhaba') // 'MERHABA'
 */
export function toUpperCase(str: string): string {
  return str.toUpperCase()
}

/**
 * Metindeki kelimeleri tersine çevirir
 * @param {string} str - İşlem yapılacak metin
 * @returns {string} Kelimeleri tersine çevrilmiş metin
 * @example
 * reverseWords('Merhaba Dünya') // 'Dünya Merhaba'
 */
export function reverseWords(str: string): string {
  return str.split(' ').reverse().join(' ')
}

/**
 * Metindeki kelimeleri alfabetik sıraya göre sıralar
 * @param {string} str - İşlem yapılacak metin
 * @returns {string} Sıralanmış metin
 * @example
 * sortWords('çilek armut elma') // 'armut çilek elma'
 */
export function sortWords(str: string): string {
  return str.split(' ').sort().join(' ')
}

/**
 * Metindeki kelime sayısını döndürür
 * @param {string} str - İşlem yapılacak metin
 * @returns {number} Kelime sayısı
 * @example
 * countWords('Merhaba Dünya') // 2
 */
export function countWords(str: string): number {
  return str.trim().split(/\s+/).length
}

/**
 * Metindeki sesli harf sayısını döndürür
 * @param {string} str - İşlem yapılacak metin
 * @returns {number} Sesli harf sayısı
 * @example
 * countVowels('Merhaba Dünya') // 5
 */
export function countVowels(str: string): number {
  const vowels = 'aeiouAEIOUüÜöÖıİ'
  return str.split('').filter(char => vowels.includes(char)).length
}

/**
 * Metindeki benzersiz karakterleri döndürür
 * @param {string} str - İşlem yapılacak metin
 * @returns {string} Benzersiz karakterler
 * @example
 * uniqueChars('merhaba') // 'merhab'
 */
export function uniqueChars(str: string): string {
  return [...new Set(str)].join('')
}

/**
 * Metindeki kelimeleri tersine çevirir
 * @param {string} str - İşlem yapılacak metin
 * @returns {string} Kelimeleri tersine çevrilmiş metin
 * @example
 * reverseString('Merhaba') // 'abahreM'
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('')
}

/**
 * Metindeki kelimeleri alfabetik sıraya göre sıralar
 * @param {string} str - İşlem yapılacak metin
 * @returns {string} Sıralanmış metin
 * @example
 * sortChars('çilek') // 'ceikl'
 */
export function sortChars(str: string): string {
  return str.split('').sort().join('')
}

/**
 * Metindeki kelimeleri alfabetik sıraya göre sıralar
 * @param {string} str - İşlem yapılacak metin
 * @returns {string} Sıralanmış metin
 * @example
 * sortChars('çilek') // 'ceikl'
 */
export function sortChars(str: string): string {
  return str.split('').sort().join('')
}

/**
 * Tailwind sınıflarını birleştirir ve çakışmaları çözer
 * @param {...ClassValue} inputs - Birleştirilecek sınıflar
 * @returns {string} Birleştirilmiş ve çözülmüş sınıflar
 * @example
 * cn('p-4', 'bg-red-500', 'p-2') // 'p-2 bg-red-500'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

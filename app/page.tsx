'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// ─── SUPABASE CONFIG ───────────────────────────────────────────────────────
const SUPABASE_URL      = 'https://ldyixpiacgnxgfeskhmj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeWl4cGlhY2dueGdmZXNraG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NjA5NDMsImV4cCI6MjA5MDAzNjk0M30.xKm4cxc0BGp54OjIBJGeRhG1DorfUAPhdV0AWlENMXg'

// ─── ASSETS ───────────────────────────────────────────────────────────────
const ASSETS = {
  tier1:    "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20id%3D%22Layer_1%22%20viewBox%3D%220%200%201080%201080%22%3E%3Cdefs%3E%3Cstyle%3E.st4%7Bfill%3A%23ffaf00%7D%3C/style%3E%3C/defs%3E%3Cpath%20d%3D%22M859.2%20273.1v63.7c0%20178.7-143.7%20421.8-322.1%20425.6-1.6.3-2.9.3-4.5.3-180.3%200-326.5-245.6-326.5-425.9v-132c0-90.2%2073.3-95.1%20163.4-95.1h326.2c90.2%200%20163.4%2073.3%20163.4%20163.4Z%22%20class%3D%22st4%22/%3E%3Cpath%20d%3D%22M532.6%20376.5v445.9%22%20style%3D%22fill%3Anone%22/%3E%3Cpath%20d%3D%22M621.2%20376.7v445.7c0%2047.5-37.3%2086-84.1%2088.6h-4.5c-49.1%200-88.6-39.5-88.6-88.6V376.7c0-49.1%2039.5-88.9%2088.6-88.9s88.6%2039.8%2088.6%2088.9%22%20class%3D%22st4%22/%3E%3Cpath%20d%3D%22M735.5%20929.4c0%2026.8-21.7%2048.7-48.4%2048.7h-309c-26.8%200-48.4-22-48.4-48.7s12.1-56.1%2031.2-75.5c19.4-19.4%2046.2-31.5%2075.8-31.5h191.8c59.2%200%20107%2048.1%20107%20107%22%20class%3D%22st4%22/%3E%3Cpath%20d%3D%22M818.2%20230.5s176.3-42.8%20176.3%2095.2-77%20427-302.6%20345.7%22%20style%3D%22fill%3Anone%3Bstroke-linecap%3Around%3Bstroke-miterlimit%3A10%3Bstroke-width%3A96.4px%3Bstroke%3A%23ffa100%22/%3E%3Cpath%20d%3D%22M255.7%20230.5S79.4%20187.7%2079.4%20325.7s77%20427%20302.6%20345.7%22%20style%3D%22fill%3Anone%3Bstroke%3A%23ffaf00%3Bstroke-linecap%3Around%3Bstroke-miterlimit%3A10%3Bstroke-width%3A96.4px%22/%3E%3Cpath%20d%3D%22M621.2%20742.7v79.6h7.3c59.2%200%20107%2048.1%20107%20107S713.8%20978%20687.1%20978h-150V109.7h158.6c90.2%200%20163.4%205%20163.4%2095.1v132c0%20149.4-100.7%20344-238%20405.8Z%22%20style%3D%22fill%3A%23ffa100%22/%3E%3C/svg%3E",
  tier2:    "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20id%3D%22Layer_1%22%20viewBox%3D%220%200%201080%201080%22%3E%3Cdefs%3E%3Cstyle%3E.st2%2C.st4%7Bfill%3A%23b4bdc7%7D%3C/style%3E%3C/defs%3E%3Cpath%20d%3D%22M859.2%20273.1v63.7c0%20178.7-143.7%20421.8-322.1%20425.6-1.6.3-2.9.3-4.5.3-180.3%200-326.5-245.6-326.5-425.9v-132c0-90.2%2073.3-95.1%20163.4-95.1h326.2c90.2%200%20163.4%2073.3%20163.4%20163.4Z%22%20class%3D%22st4%22/%3E%3Cpath%20d%3D%22M532.6%20376.5v445.9M621.2%20376.7v445.7c0%2047.5-37.3%2086-84.1%2088.6h-4.5c-49.1%200-88.6-39.5-88.6-88.6V376.7c0-49.1%2039.5-88.9%2088.6-88.9s88.6%2039.8%2088.6%2088.9%22%20class%3D%22st2%22/%3E%3Cpath%20d%3D%22M735.5%20929.4c0%2026.8-21.7%2048.7-48.4%2048.7h-309c-26.8%200-48.4-22-48.4-48.7s12.1-56.1%2031.2-75.5c19.4-19.4%2046.2-31.5%2075.8-31.5h191.8c59.2%200%20107%2048.1%20107%20107%22%20class%3D%22st4%22/%3E%3Cpath%20d%3D%22M818.2%20230.5s176.3-42.8%20176.3%2095.2-77%20427-302.6%20345.7%22%20style%3D%22stroke%3A%23a0acba%3Bfill%3Anone%3Bstroke-linecap%3Around%3Bstroke-miterlimit%3A10%3Bstroke-width%3A96.4px%22/%3E%3Cpath%20d%3D%22M255.7%20230.5S79.4%20187.7%2079.4%20325.7s77%20427%20302.6%20345.7%22%20style%3D%22fill%3Anone%3Bstroke-linecap%3Around%3Bstroke-miterlimit%3A10%3Bstroke-width%3A96.4px%3Bstroke%3A%23b4bdc7%22/%3E%3Cpath%20d%3D%22M621.2%20742.7v79.6h7.3c59.2%200%20107%2048.1%20107%20107S713.8%20978%20687.1%20978h-150V109.7h158.6c90.2%200%20163.4%205%20163.4%2095.1v132c0%20149.4-100.7%20344-238%20405.8Z%22%20style%3D%22fill%3A%23a0acba%22/%3E%3C/svg%3E",
  tier3:    "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20id%3D%22Layer_1%22%20viewBox%3D%220%200%201080%201080%22%3E%3Cdefs%3E%3Cstyle%3E.st4%7Bfill%3A%23b56328%7D%3C/style%3E%3C/defs%3E%3Cpath%20d%3D%22M859.2%20273.1v63.7c0%20178.7-143.7%20421.8-322.1%20425.6-1.6.3-2.9.3-4.5.3-180.3%200-326.5-245.6-326.5-425.9v-132c0-90.2%2073.3-95.1%20163.4-95.1h326.2c90.2%200%20163.4%2073.3%20163.4%20163.4Z%22%20style%3D%22fill%3A%23b56328%22/%3E%3Cpath%20d%3D%22M532.6%20376.5v445.9M621.2%20376.7v445.7c0%2047.5-37.3%2086-84.1%2088.6h-4.5c-49.1%200-88.6-39.5-88.6-88.6V376.7c0-49.1%2039.5-88.9%2088.6-88.9s88.6%2039.8%2088.6%2088.9%22%20class%3D%22st4%22/%3E%3Cpath%20d%3D%22M735.5%20929.4c0%2026.8-21.7%2048.7-48.4%2048.7h-309c-26.8%200-48.4-22-48.4-48.7s12.1-56.1%2031.2-75.5c19.4-19.4%2046.2-31.5%2075.8-31.5h191.8c59.2%200%20107%2048.1%20107%20107%22%20class%3D%22st4%22/%3E%3Cpath%20d%3D%22M818.2%20230.5s176.3-42.8%20176.3%2095.2-77%20427-302.6%20345.7%22%20style%3D%22stroke%3A%23a15c2a%3Bfill%3Anone%3Bstroke-linecap%3Around%3Bstroke-miterlimit%3A10%3Bstroke-width%3A96.4px%22/%3E%3Cpath%20d%3D%22M255.7%20230.5S79.4%20187.7%2079.4%20325.7s77%20427%20302.6%20345.7%22%20style%3D%22fill%3Anone%3Bstroke-linecap%3Around%3Bstroke-miterlimit%3A10%3Bstroke-width%3A96.4px%3Bstroke%3A%23b56328%22/%3E%3Cpath%20d%3D%22M621.2%20742.7v79.6h7.3c59.2%200%20107%2048.1%20107%20107S713.8%20978%20687.1%20978h-150V109.7h158.6c90.2%200%20163.4%205%20163.4%2095.1v132c0%20149.4-100.7%20344-238%20405.8Z%22%20style%3D%22fill%3A%23a15c2a%22/%3E%3C/svg%3E",
  shimmer1: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Cdefs%3E%3Cg%20id%3D%22b%22%20fill%3D%22%23f0c863%22%3E%3Cpath%20d%3D%22M100%200h40L55%20100H15zM70%200h15L0%20100h-15z%22/%3E%3CanimateTransform%20attributeName%3D%22transform%22%20calcMode%3D%22spline%22%20dur%3D%222s%22%20keySplines%3D%220.9%200%200.1%201%22%20keyTimes%3D%220%3B%201%22%20repeatCount%3D%22indefinite%22%20type%3D%22translate%22%20values%3D%22-150%200%3B%20200%200%22/%3E%3C/g%3E%3C/defs%3E%3Cpath%20fill%3D%22%23efba3c%22%20stroke%3D%22%23f0c863%22%20stroke-width%3D%224%22%20d%3D%22M0%200h200l-35%20100H0z%22/%3E%3CclipPath%20id%3D%22a%22%3E%3Cpath%20d%3D%22M0%200h200l-35%20100H0z%22/%3E%3C/clipPath%3E%3Cuse%20clip-path%3D%22url%28%23a%29%22%20href%3D%22%23b%22/%3E%3C/svg%3E",
  shimmer2: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Cdefs%3E%3Cg%20id%3D%22b%22%20fill%3D%22%23a0b0b7%22%3E%3Cpath%20d%3D%22M100%200h40L55%20100H15zM70%200h15L0%20100h-15z%22/%3E%3CanimateTransform%20attributeName%3D%22transform%22%20calcMode%3D%22spline%22%20dur%3D%222s%22%20keySplines%3D%220.9%200%200.1%201%22%20keyTimes%3D%220%3B%201%22%20repeatCount%3D%22indefinite%22%20type%3D%22translate%22%20values%3D%22-150%200%3B%20200%200%22/%3E%3C/g%3E%3C/defs%3E%3Cpath%20fill%3D%22%23879ea5%22%20stroke%3D%22%23a0b0b7%22%20stroke-width%3D%224%22%20d%3D%22M0%200h200l-35%20100H0z%22/%3E%3CclipPath%20id%3D%22a%22%3E%3Cpath%20d%3D%22M0%200h200l-35%20100H0z%22/%3E%3C/clipPath%3E%3Cuse%20clip-path%3D%22url%28%23a%29%22%20href%3D%22%23b%22/%3E%3C/svg%3E",
  shimmer3: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22200%22%20height%3D%22100%22%3E%3Cdefs%3E%3Cg%20id%3D%22b%22%20fill%3D%22%23c58152%22%3E%3Cpath%20d%3D%22M100%200h40L55%20100H15zM70%200h15L0%20100h-15z%22/%3E%3CanimateTransform%20attributeName%3D%22transform%22%20calcMode%3D%22spline%22%20dur%3D%222s%22%20keySplines%3D%220.9%200%200.1%201%22%20keyTimes%3D%220%3B%201%22%20repeatCount%3D%22indefinite%22%20type%3D%22translate%22%20values%3D%22-150%200%3B%20200%200%22/%3E%3C/g%3E%3C/defs%3E%3Cpath%20fill%3D%22%23b56329%22%20stroke%3D%22%23c58152%22%20stroke-width%3D%224%22%20d%3D%22M0%200h200l-35%20100H0z%22/%3E%3CclipPath%20id%3D%22a%22%3E%3Cpath%20d%3D%22M0%200h200l-35%20100H0z%22/%3E%3C/clipPath%3E%3Cuse%20clip-path%3D%22url%28%23a%29%22%20href%3D%22%23b%22/%3E%3C/svg%3E",
  sword_acl: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xml%3Aspace%3D%22preserve%22%20id%3D%22Layer_1%22%20x%3D%220%22%20y%3D%220%22%20viewBox%3D%220%200%201080%201080%22%3E%3Cstyle%3E.st0%7Bfill%3A%2371bfdd%7D.st1%7Bfill%3A%23d44e50%7D.st2%7Bfill%3A%236195d9%7D.st4%7Bfill%3A%23fff%7D.st5%7Bfill%3Anone%3Bstroke%3A%239d2323%3Bstroke-width%3A30.0834%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bstroke-miterlimit%3A10%7D.st7%7Bfill%3A%238083bf%7D.st10%7Bopacity%3A.21%3Bfill%3A%23c7a3e8%7D%3C/style%3E%3Cpath%20d%3D%22M901.02%20120.67%20722.8%20198.83a61.6%2061.6%200%200%200-18.81%2012.85L358.24%20557.43%20547.71%20746.9l345.41-345.41a61.6%2061.6%200%200%200%2013.21-19.64l76.18-180.86c21.62-51.31-30.51-102.68-81.49-80.32%22%20class%3D%22st0%22/%3E%3Cpath%20d%3D%22m607.14%20832.65-56.51%2056.47c-8.89%208.89-23.31%208.88-32.2-.01l-88.72-88.72c-8.89-8.89-23.32-8.89-32.21%200l-80.66%2080.71c-8.89%208.89-8.89%2023.31%200%2032.2s8.89%2023.31%200%2032.2l-64.52%2064.52c-8.89%208.89-23.31%208.89-32.2%200L99.14%20889.04c-8.89-8.89-8.89-23.31%200-32.2l64.52-64.52c8.89-8.89%2023.31-8.89%2032.2%200l.06.06c8.89%208.89%2023.32%208.89%2032.21%200l80.66-80.71c8.89-8.89%208.89-23.31%200-32.2l-88.72-88.72c-8.9-8.9-8.89-23.32.01-32.21l56.51-56.47c8.89-8.89%2023.31-8.88%2032.2.01l298.37%20298.37c8.88%208.88%208.88%2023.3-.02%2032.2%22%20class%3D%22st2%22/%3E%3C/svg%3E",
  pot1:     "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xml%3Aspace%3D%22preserve%22%20id%3D%22Layer_1%22%20x%3D%220%22%20y%3D%220%22%20viewBox%3D%220%200%201080%201080%22%3E%3Cstyle%3E.st0%7Bfill%3A%23d44e50%7D.st2%7Bfill%3A%23fff%7D%3C/style%3E%3Cpath%20d%3D%22M867.63%20644.62C859.91%20818.87%20716.16%20957.78%20540%20957.78S220.09%20818.87%20212.37%20644.62c115.01-29.67%20230.55-35.42%20327.63%200%2094.58%2034.51%20206.02%2052.74%20327.63%200%22%20style%3D%22fill%3A%23d65474%22/%3E%3Cpath%20d%3D%22M574.61%20285.31v65.6c0%2035.19%2021.51%2066.8%2054.24%2079.72%2022.23%208.77%2043.04%2020.81%2061.84%2035.78a244.1%20244.1%200%200%201%2048.62%2051.94c28.11%2040.56%2042.97%2088.21%2042.97%20137.81%200%2064.71-25.2%20125.55-70.97%20171.32-45.76%2045.76-106.61%2070.97-171.32%2070.97s-125.55-25.2-171.32-70.97c-45.76-45.76-70.97-106.61-70.97-171.32%200-49.59%2014.86-97.25%2042.97-137.81a243.9%20243.9%200%200%201%2048.62-51.94c18.8-14.97%2039.61-27%2061.84-35.78%2032.73-12.92%2054.24-44.53%2054.24-79.72v-65.6zm85.71-85.7H419.68v151.3c-121.6%2048-207.67%20166.57-207.67%20305.24%200%20181.14%20146.85%20327.99%20327.99%20327.99s327.99-146.85%20327.99-327.99c0-138.68-86.07-257.25-207.67-305.24z%22%20class%3D%22st2%22/%3E%3Cpath%20d%3D%22M655.37%2077.64H418.03c-40.96%200-74.17%2033.21-74.17%2074.17s33.21%2074.17%2074.17%2074.17h237.34c40.96%200%2074.17-33.21%2074.17-74.17s-33.2-74.17-74.17-74.17%22%20class%3D%22st2%22/%3E%3C/svg%3E",
  uhc:      "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xml%3Aspace%3D%22preserve%22%20id%3D%22Layer_1%22%20x%3D%220%22%20y%3D%220%22%20viewBox%3D%220%200%201080%201080%22%3E%3Cstyle%3E.st0%7Bfill%3A%23d44e50%7D%3C/style%3E%3Cpath%20d%3D%22M1002.44%20383.44c0%20198.43-152.88%20402.34-462.4%20544.33C230.52%20785.78%2077.56%20581.87%2077.56%20383.44c0-127.68%20103.52-231.2%20231.27-231.2%20103.73%200%20161.98%2058.25%20231.2%20163.85%2069.15-105.6%20127.4-163.85%20231.2-163.85%20127.69%200%20231.21%20103.51%20231.21%20231.2%22%20class%3D%22st0%22/%3E%3C/svg%3E",
  soup_img:    '',
  bedwars_img: '',
  skywars_img: '',
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────
const MODES = ['sword','pot','uhc','soup','bedwars','skywars'] as const
type Mode = typeof MODES[number]
type Tab = 'overall' | Mode

interface ModeMeta { label: string; icon: string }
const MODE_META: Record<Tab, ModeMeta> = {
  overall:  { label: 'Overall',   icon: ASSETS.sword_acl },
  sword:    { label: 'Sword',     icon: ASSETS.sword_acl },
  pot:      { label: 'Pot',       icon: ASSETS.pot1 },
  uhc:      { label: 'UHC',       icon: ASSETS.uhc },
  soup:     { label: 'Soup',      icon: 'https://bloxdtierz.vercel.app/assets/icons/soup.png' },
  bedwars:  { label: 'Bedwars',   icon: 'https://bloxdtierz.vercel.app/assets/icons/bedwars.png' },
  skywars:  { label: 'Skywars',   icon: 'https://bloxdtierz.vercel.app/assets/icons/skywars.png' },
}

const REGION_META: Record<string, { flag: string; label: string }> = {
  NA:      { flag: '🔴', label: 'NA' },
  EU:      { flag: '🟢', label: 'EU' },
  AS:      { flag: '🔵', label: 'Asia' },
  ASIA:    { flag: '🔵', label: 'Asia' },
  OC:      { flag: '🔷', label: 'OC' },
  OCEANIA: { flag: '🔷', label: 'OC' },
  SA:      { flag: '🟣', label: 'SA' },
  AF:      { flag: '🟤', label: 'AF' },
}

// ─── HELPERS ──────────────────────────────────────────────────────────────
interface TierInfo { type: 'HT' | 'LT'; num: number }

function parseTier(str: string | null | undefined): TierInfo | null {
  if (!str) return null
  const m = str.match(/^(HT|LT)(\d)$/)
  if (!m) return null
  return { type: m[1] as 'HT' | 'LT', num: parseInt(m[2]) }
}

const TIER_SCORES: Record<string, number> = {
  HT1:60, LT1:50, HT2:40, LT2:30, HT3:20, LT3:10, HT4:5, LT4:2, HT5:1, LT5:0,
}

function tierScore(str: string | null | undefined): number {
  if (!str) return -999
  return TIER_SCORES[str.toUpperCase()] ?? -999
}

function tierIconSrc(str: string | null | undefined): string {
  const t = parseTier(str)
  if (!t) return ''
  if (t.type === 'HT') {
    if (t.num <= 2) return ASSETS.tier1
    return ASSETS.tier2
  }
  if (t.num <= 2) return ASSETS.tier2
  return ASSETS.tier3
}

function combatTitleInfo(points: number): { name: string; icon: string } {
  if (points >= 240) return { name: 'Combat Master',     icon: 'https://mctiers.com/titles/combat_master.webp' }
  if (points >= 180) return { name: 'Combat Ace',        icon: 'https://mctiers.com/titles/combat_ace.webp' }
  if (points >= 120) return { name: 'Combat Specialist', icon: 'https://mctiers.com/titles/combat_specialist.svg' }
  if (points >=  60) return { name: 'Combat Cadet',      icon: 'https://mctiers.com/titles/combat_cadet.svg' }
  return                     { name: 'Combat Novice',    icon: 'https://mctiers.com/titles/combat_novice.svg' }
}

// ─── TYPES ────────────────────────────────────────────────────────────────
interface Player {
  id: string
  username: string
  avatar_url: string | null
  title: string
  titleIcon: string
  region: string
  points: number
  tiers: Record<Mode, string | null>
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────
function Avatar({ player, size }: { player: Player; size: number }) {
  const mcUser = encodeURIComponent(player.username)
  const crafatar = `https://crafatar.com/avatars/${mcUser}?size=${size}&overlay`
  const mcheads  = `https://mc-heads.net/avatar/${mcUser}/${size}`
  const src = player.avatar_url || crafatar

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={player.username}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      onError={(e) => {
        const img = e.currentTarget
        if (img.src !== crafatar) { img.src = crafatar; return }
        if (img.src !== mcheads)  { img.src = mcheads;  return }
        img.parentElement!.textContent = '⚔️'
      }}
    />
  )
}

function TierTag({ tier }: { tier: string | null | undefined }) {
  if (!tier) return <span className="tier-tag tier-none">—</span>
  const t = parseTier(tier)
  if (!t) return <span className="tier-tag tier-none">—</span>
  const cls = `tier-tag tier-${tier}`
  const icon = tierIconSrc(tier)
  return (
    <span className={cls}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt={t.type} />
      {tier}
    </span>
  )
}

function ModeIcon({ icon, className = '' }: { icon: string; className?: string }) {
  if (icon.startsWith('data:') || icon.startsWith('http')) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={icon} alt="" className={className} style={{ width: 16, height: 16, objectFit: 'contain' }} />
  }
  return <span style={{ fontSize: 16 }}>{icon}</span>
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────
export default function Home() {
  const [players, setPlayers] = useState<Player[]>([])
  const [activeTab, setActiveTab] = useState<Tab>('overall')
  const [activeRegion, setActiveRegion] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTable, setCurrentTable] = useState<'players' | 'retired'>('players')
  const [loading, setLoading] = useState(true)
  const [dataReady, setDataReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<{ player: Player; rank: number } | null>(null)

  // ── Computed: filtered & sorted ──────────────────────────────────────
  const filteredPlayers = useCallback((): Player[] => {
    const sorted = [...players].sort((a, b) => {
      if (activeTab === 'overall') return b.points - a.points
      return tierScore(b.tiers[activeTab as Mode]) - tierScore(a.tiers[activeTab as Mode]) || b.points - a.points
    })
    return sorted.filter(p => {
      const regionNorm = (p.region || '').toUpperCase()
      const regionMatch =
        activeRegion === 'ALL' ||
        regionNorm === activeRegion ||
        (activeRegion === 'AS' && regionNorm === 'ASIA') ||
        (activeRegion === 'ASIA' && regionNorm === 'AS') ||
        (activeRegion === 'OC' && regionNorm === 'OCEANIA') ||
        (activeRegion === 'OCEANIA' && regionNorm === 'OC')
      const searchMatch = !searchQuery || (p.username || '').toLowerCase().includes(searchQuery)
      return regionMatch && searchMatch
    })
  }, [players, activeTab, activeRegion, searchQuery])

  // ── Load from Supabase ───────────────────────────────────────────────
  const loadFromSupabase = useCallback(async () => {
    try {
      const tableName = currentTable === 'retired' ? 'retired' : 'players'
      setPlayers([])
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/${tableName}?select=*&order=points.desc`,
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const rows = await res.json()
      if (!Array.isArray(rows)) { setPlayers([]); return }

      const mapped: Player[] = rows.map((row: Record<string, unknown>) => {
        const tiers: Record<Mode, string | null> = {
          sword:   (row.sword_tier   as string) || null,
          pot:     (row.pot_tier     as string) || null,
          uhc:     (row.uhc_tier     as string) || null,
          soup:    (row.soup_tier    as string) || null,
          bedwars: (row.bedwars_tier as string) || null,
          skywars: (row.skywars_tier as string) || null,
        }
        const pts = Object.values(tiers).reduce((sum, t) => {
          const s = tierScore(t)
          return sum + (s >= 0 ? s : 0)
        }, 0)
        const titleInfo = combatTitleInfo(pts)
        return {
          id:         (row.discord_id as string) || '',
          username:   (row.username   as string) || 'Unknown',
          avatar_url: (row.avatar_url as string) || null,
          title:      titleInfo.name,
          titleIcon:  titleInfo.icon,
          region:     (row.region     as string) || 'NA',
          points:     pts,
          tiers,
        }
      })
      setPlayers(mapped)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }, [currentTable])

  useEffect(() => {
    loadFromSupabase().finally(() => setDataReady(true))
  }, [loadFromSupabase])

  // Auto-refresh every 60s
  useEffect(() => {
    const interval = setInterval(loadFromSupabase, 60000)
    return () => clearInterval(interval)
  }, [loadFromSupabase])

  // Stamp body so animation polling can detect data ready
  useEffect(() => {
    if (dataReady) document.body.dataset.dataReady = 'true'
  }, [dataReady])

  // Keyboard: Escape closes profile
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setProfile(null) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Cinematic loader animation — 2.4 s total display
  const loaderPlayedRef = useRef(false)
  useEffect(() => {
    if (loaderPlayedRef.current) return
    loaderPlayedRef.current = true

    const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
    const START = Date.now()

    async function playCinematicIntro() {
      const sword   = document.getElementById('loaderSword')
      const label   = document.getElementById('loaderLabel')
      const sub     = document.getElementById('loaderSub')
      const orbIds  = ['loaderOrb0','loaderOrb1','loaderOrb2','loaderOrb3','loaderOrb4']
      const orbs    = orbIds.map(id => document.getElementById(id))
      const wipe    = document.getElementById('introWipe')
      const overlay = document.getElementById('loadingOverlay')
      if (!sword || !wipe || !overlay) return

      // Phase 1: dark screen breathes (180 ms)
      await wait(180)

      // Phase 2: sword hero materialises (transition handles 500 ms)
      sword.classList.add('visible')
      await wait(80)

      // Phase 3: orbs drift in — 80 ms stagger × 5 = 400 ms
      for (const orb of orbs) {
        orb?.classList.add('visible')
        await wait(80)
      }

      // Phase 4: text label fades in
      label?.classList.add('visible')
      await wait(60)
      sub?.classList.add('visible')

      // Phase 5: hold — wait until 2.4 s elapsed AND data is ready
      await new Promise<void>(resolve => {
        const check = () => {
          if (Date.now() - START >= 2400 && document.body.dataset.dataReady === 'true') resolve()
          else setTimeout(check, 50)
        }
        check()
      })

      // Phase 6: graceful exit — elements dissolve
      if (sub)   { sub.style.transition   = 'opacity 0.22s ease'; sub.style.opacity   = '0' }
      if (label) { label.style.transition = 'opacity 0.28s ease'; label.style.opacity = '0' }
      orbs.forEach((orb, i) => {
        if (!orb) return
        orb.style.transition = `opacity 0.28s ease ${i * 22}ms`
        orb.style.opacity    = '0'
      })
      await wait(120)
      if (sword) {
        sword.style.transition = 'opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease'
        sword.style.opacity    = '0'
        sword.style.transform  = 'scale(1.1)'
        sword.style.filter     = 'blur(10px)'
      }
      await wait(340)

      // Phase 7: cinematic wipe (500 ms)
      wipe.classList.add('active')
      await wait(510)

      // Phase 8: done
      overlay.classList.add('hidden')
      setLoading(false)
    }

    playCinematicIntro().catch(console.error)
  }, [])

  // Body theme class
  useEffect(() => {
    document.body.classList.toggle('retired-theme', currentTable === 'retired')
  }, [currentTable])

  const filtered = filteredPlayers()
  const top3 = filtered.slice(0, 3)

  // ── Tab SVG icons (inline data URIs from original HTML) ──────────────
  const TAB_ICONS: Partial<Record<Tab, string>> = {
    overall:  ASSETS.tier1,     // gold trophy — same icon used for tier badges
    sword:    ASSETS.sword_acl,
    pot:      ASSETS.pot1,
    uhc:      ASSETS.uhc,
    soup:     'https://bloxdtierz.vercel.app/assets/icons/soup.png',
    bedwars:  'https://bloxdtierz.vercel.app/assets/icons/bedwars.png',
    skywars:  'https://bloxdtierz.vercel.app/assets/icons/skywars.png',
  }

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <>
      {/* CINEMATIC LOADER */}
      <div id="loadingOverlay" className={`loading-overlay${loading ? '' : ' hidden'}`}>
        <div className="intro-bg" id="introBg" />
        <div className="intro-content" id="introContent">
          <div className="loader-scene" id="loaderScene">
            {/* Sword — hero */}
            <div className="loader-sword" id="loaderSword">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sword.png" alt="" draggable={false} />
              <div className="loader-sword-ring" />
            </div>
            {/* 5 combat title orbs — pentagon formation */}
            {([
              { id: 'loaderOrb0', src: 'https://mctiers.com/titles/combat_master.webp',    ox:    0, oy: -118, fd: '0.0s' },
              { id: 'loaderOrb1', src: 'https://mctiers.com/titles/combat_ace.webp',       ox:  112, oy:  -36, fd: '0.5s' },
              { id: 'loaderOrb2', src: 'https://mctiers.com/titles/combat_specialist.svg', ox:   69, oy:   96, fd: '1.0s' },
              { id: 'loaderOrb3', src: 'https://mctiers.com/titles/combat_cadet.svg',      ox:  -69, oy:   96, fd: '1.5s' },
              { id: 'loaderOrb4', src: 'https://mctiers.com/titles/combat_novice.svg',     ox: -112, oy:  -36, fd: '2.0s' },
            ] as { id: string; src: string; ox: number; oy: number; fd: string }[]).map(o => (
              <div
                key={o.id}
                id={o.id}
                className="loader-orb"
                style={{ '--ox': `${o.ox}px`, '--oy': `${o.oy}px`, '--fd': o.fd } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.src} alt="" draggable={false} />
              </div>
            ))}
          </div>
          <div className="loader-label" id="loaderLabel">
            BLOXD <span className="loader-label-accent">TIERS</span>
          </div>
          <div className="loader-sub" id="loaderSub">Community Rankings</div>
        </div>
        <div className="intro-wipe" id="introWipe" />
      </div>
      {/* HEADER */}
      <header>
        <div className="wrap">
          <div className="header-inner">
            <a className="logo" href="#">
              <div className="logo-diamonds">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://mctiers.com/titles/combat_ace.webp" alt="Combat Ace" style={{ width: 32, height: 32, objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(197,45,45,0.4))' }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://mctiers.com/titles/combat_master.webp" alt="Combat Master" style={{ width: 32, height: 32, objectFit: 'contain', marginLeft: -4, filter: 'drop-shadow(0 0 8px rgba(244,196,66,0.3))' }} />
              </div>
              <div className="logo-text-wrap">
                <span className="logo-text">BLOXD <span>TIERS</span></span>
                <span className="logo-sub">powered by <span>PvP Hub</span></span>
              </div>
            </a>

            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-label">Players</span>
                <span className="stat-val">{players.length}</span>
              </div>
            </div>

            {/* TABLE TOGGLE — in header, matching original */}
            <div className="table-toggle">
              <button
                className={`toggle-btn${currentTable === 'players' ? ' active' : ''}`}
                data-table="current"
                onClick={() => setCurrentTable('players')}
              >CURRENT</button>
              <button
                className={`toggle-btn${currentTable === 'retired' ? ' active' : ''}`}
                data-table="retired"
                onClick={() => setCurrentTable('retired')}
              >RETIRED</button>
            </div>

            <div className="header-right">
              <div className="search-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search players…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value.toLowerCase().trim())}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && filtered.length > 0) setProfile({ player: filtered[0], rank: 1 })
                  }}
                />
              </div>
              <a
                className="discord-btn"
                href="https://discord.gg/pvphub"
                target="_blank"
                rel="noreferrer"
              >
                <svg width="16" height="12" viewBox="0 0 24 18" fill="currentColor">
                  <path d="M20.317 1.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23.077.077 0 0 0-.079-.036A19.496 19.496 0 0 0 3.677 1.492a.07.07 0 0 0-.032.027C.533 6.093-.32 10.555.099 14.961a.08.08 0 0 0 .031.055 19.9 19.9 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z"/>
                </svg>
                Discord
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT + NEWS SIDEBAR */}
      <div className="page-with-news">
      <div className="wrap">
        {/* TABS */}
        <div className="tabs-bar">
          <div className="tabs-inner">
            {/* Table toggle */}
            {/* Mode tabs */}
            {(['overall', ...MODES] as Tab[]).map(tab => (
              <button
                key={tab}
                className={`tab-btn${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {TAB_ICONS[tab] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className={`tab-icon${activeTab === tab ? ' col-active' : ''}`}
                    src={TAB_ICONS[tab]}
                    alt={tab}
                  />
                )}
                {MODE_META[tab].label}
              </button>
            ))}
          </div>
        </div>

        {/* FILTER ROW */}
        <div className="filter-row">
          <span className="filter-label">Region</span>
          {['ALL','NA','EU','AS','OC'].map(r => (
            <button
              key={r}
              className={`region-btn${activeRegion === r ? ' active' : ''}`}
              data-region={r}
              onClick={() => setActiveRegion(r)}
            >
              {r === 'ALL' && '🌍 Global'}
              {r === 'NA'  && '🔴 NA'}
              {r === 'EU'  && '🟢 EU'}
              {r === 'AS'  && '🔵 Asia'}
              {r === 'OC'  && '🔷 OC'}
            </button>
          ))}
          <div className="spacer" />
          <span className="player-count">
            Showing <span>{filtered.length}</span> players
          </span>
        </div>

        {/* PODIUM */}
        {top3.length > 0 && (
          <div className="podium-section">
            <h2>Top Ranked</h2>
            <div className="podium-row">
              {[
                { rank: 2, p: top3[1], cls: 'p2', shimmer: ASSETS.shimmer2 },
                { rank: 1, p: top3[0], cls: 'p1', shimmer: ASSETS.shimmer1 },
                { rank: 3, p: top3[2], cls: 'p3', shimmer: ASSETS.shimmer3 },
              ].filter(c => c.p).map(({ rank, p, cls }) => (
                <div
                  key={rank}
                  className={`podium-card ${cls}`}
                  onClick={() => setProfile({ player: p, rank })}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="podium-rank-badge">
                    <span className="podium-rank-badge-num" style={{ color: 'var(--text-secondary)' }}>{rank}</span>
                  </div>
                  {rank === 1 && <span className="crown">👑</span>}
                  <div className="podium-avatar">
                    <Avatar player={p} size={70} />
                  </div>
                  <div className="podium-name">{p.username}</div>
                  <div className="podium-title" style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                    {p.titleIcon && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.titleIcon} style={{ width: 12, height: 12, objectFit: 'contain' }} alt="" />
                    )}
                    <span>{p.title}</span>
                  </div>
                  <div className="podium-pts">{p.points.toLocaleString()}</div>
                  <div className="podium-pts-label">Points</div>
                  <div className="mode-strip" style={{ justifyContent: 'center', marginTop: 6 }}>
                    {MODES.slice(0, 3).map(m => (
                      <div key={m} className="mode-chip">
                        <ModeIcon icon={MODE_META[m].icon} className="chip-icon" />
                        <span
                          className="chip-tier"
                          style={{ color: tierScore(p.tiers[m]) > 0 ? 'var(--ht-color)' : 'var(--lt-color)' }}
                        >{p.tiers[m] || '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="section-label">Full Rankings</div>

        {/* ERROR */}
        {error && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--red)' }}>
            ⚠️ {error}
          </div>
        )}

        {/* TABLE or GAMEMODE GRID */}
        {activeTab === 'overall' ? (
          <div className="table-wrap">
            {filtered.length === 0 && !loading ? (
              <div id="emptyState" className="empty-state">
                <div style={{ fontSize: 32 }}>🔍</div>
                <p>No players found matching your filters.</p>
              </div>
            ) : (
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th className="center" style={{ width: 60 }}>#</th>
                    <th style={{ minWidth: 200 }}>Player</th>
                    <th className="center" style={{ width: 80 }}>Region</th>
                    {MODES.map(m => (
                      <th key={m} className="center" style={{ width: 72 }} data-col={m}>
                        <span className={`col-mode-icon-wrap${(activeTab as string) === m ? ' col-active' : ''}`} title={m}>
                          <ModeIcon icon={MODE_META[m].icon} />
                        </span><br />
                        <span style={{ fontSize: 9, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                          {m === 'bedwars' ? 'BW' : m === 'skywars' ? 'SW' : m}
                        </span>
                      </th>
                    ))}
                    <th className="center" style={{ width: 100, textAlign: 'right' }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, idx) => {
                    const rank = idx + 1
                    const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : ''
                    const regionKey = (p.region || 'NA').toUpperCase()
                    const regionMeta = REGION_META[regionKey] || { flag: '🌍', label: p.region }
                    return (
                      <tr
                        key={p.id || idx}
                        className={rankClass}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setProfile({ player: p, rank })}
                      >
                        <td className="rank-cell">
                          {rank <= 3 ? (
                            <div className={`rank-badge rank-${rank}`}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                className="shimmer-bg"
                                src={rank === 1 ? ASSETS.shimmer1 : rank === 2 ? ASSETS.shimmer2 : ASSETS.shimmer3}
                                alt={String(rank)}
                              />
                              <span className="rank-num-overlay">{rank}</span>
                            </div>
                          ) : (
                            <span className="rank-num" style={{ color: 'var(--text-muted)' }}>{rank}</span>
                          )}
                        </td>
                        <td className="player-cell">
                          <div className="player-inner">
                            <div className="avatar">
                              <Avatar player={p} size={44} />
                            </div>
                            <div className="player-info">
                              <span className="player-name">{p.username}</span>
                              <span className="player-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                {p.titleIcon && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={p.titleIcon} style={{ width: 13, height: 13, objectFit: 'contain', flexShrink: 0 }} alt="" />
                                )}
                                <span>{p.title}</span>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="region-cell">
                          <span className={`region-tag region-${regionKey}`}>
                            {regionMeta.flag} {regionMeta.label}
                          </span>
                        </td>
                        {MODES.map(m => (
                          <td key={m} className="tier-cell">
                            <TierTag tier={p.tiers[m]} />
                          </td>
                        ))}
                        <td className="points-cell">{p.points.toLocaleString()}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          /* GAMEMODE GRID VIEW */
          <GamemodeGrid
            filtered={filtered}
            activeTab={activeTab as Mode}
            onSelect={(p, rank) => setProfile({ player: p, rank })}
          />
        )}
      </div>{/* end .wrap */}

      {/* NEWS SIDEBAR */}
      <NewsSidebar />
      </div>{/* end .page-with-news */}

      {/* PROFILE MODAL */}
      <div
        className={`profile-overlay${profile ? ' open' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) setProfile(null) }}
      >
        {profile && (
          <div className="profile-card">
            <button className="profile-close" onClick={() => setProfile(null)}>✕</button>
            <div className="profile-head">
              <div className="profile-avatar-wrap">
                <Avatar player={profile.player} size={90} />
              </div>
              <div className="profile-head-text">
                <div className="profile-username">{profile.player.username}</div>
                <div className="profile-title-badge">
                  <span className="profile-title-badge-icon">
                    {profile.player.titleIcon
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={profile.player.titleIcon} style={{ width: 16, height: 16, objectFit: 'contain', verticalAlign: 'middle' }} alt="" />
                      : '◆'
                    }
                  </span>
                  <span>{profile.player.title}</span>
                </div>
                <div className="profile-region">{profile.player.region || '—'}</div>
              </div>
            </div>

            <div className="profile-section-label">Position</div>
            <div className="profile-position-box">
              <div className="profile-position-num">{profile.rank}.</div>
              <div className="profile-position-info">
                <div className="profile-position-mode">
                  🏆 {(MODE_META[activeTab]?.label || 'Overall').toUpperCase()}
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: 13, textTransform: 'none' }}>
                    ({profile.player.points} pts)
                  </span>
                </div>
                <div className="profile-position-pts">Ranked #{profile.rank} overall</div>
              </div>
            </div>

            <div className="profile-section-label">Tiers</div>
            <div className="profile-tiers-grid">
              {MODES.map(m => {
                const tier = profile.player.tiers[m]
                const t = parseTier(tier)
                const hasT = !!t
                const tierType = t ? t.type : null
                const valCls = tierType === 'HT' ? 'ht' : tierType === 'LT' ? 'lt' : 'none'
                const cellCls = hasT ? `has-tier ${tierType === 'HT' ? 'ht-tier' : 'lt-tier'}` : 'empty-tier'
                return (
                  <div key={m} className={`profile-tier-cell ${cellCls}`}>
                    <div className="profile-tier-icon">
                      <ModeIcon icon={MODE_META[m].icon} />
                    </div>
                    <span className={`profile-tier-label ${valCls}`}>{tier || '—'}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// ─── NEWS SIDEBAR ─────────────────────────────────────────────────────────
type NewsType = 'test' | 'promotion' | 'ranking' | 'retirement' | 'removal'

interface NewsEntry {
  id:        string
  type:      NewsType
  player:    string
  desc:      string
  tier?:     string   // e.g. "HT1", "LT4"
  mode?:     string   // e.g. "Sword", "Pot"
  timestamp: Date
}

function timeAgo(d: Date): string {
  const s = Math.floor((Date.now() - d.getTime()) / 1000)
  if (s < 60)    return `${s}s`
  if (s < 3600)  return `${Math.floor(s / 60)}m`
  if (s < 86400) return `${Math.floor(s / 3600)}h`
  return `${Math.floor(s / 86400)}d`
}

// ── Seed data — replace body of fetchNews() with a Supabase query later ──
const NEWS_SEED: NewsEntry[] = [
  { id:'n1', type:'promotion',  player:'dragonfrogman', desc:'promoted',     tier:'HT3', mode:'Sword',   timestamp: new Date(Date.now() - 1000*60*7) },
  { id:'n2', type:'test',       player:'Nv_Falcon',     desc:'test result',  tier:'HT5', mode:'Pot',     timestamp: new Date(Date.now() - 1000*60*21) },
  { id:'n3', type:'ranking',    player:'ShaunMurphy__', desc:'rank #2 EU',                               timestamp: new Date(Date.now() - 1000*60*44) },
  { id:'n4', type:'promotion',  player:'xqlenix',       desc:'promoted',     tier:'LT4', mode:'UHC',     timestamp: new Date(Date.now() - 1000*60*88) },
  { id:'n5', type:'test',       player:'REDSTON_GHG',   desc:'test result',  tier:'LT3', mode:'Sword',   timestamp: new Date(Date.now() - 1000*60*130) },
  { id:'n6', type:'retirement', player:'LordOfBrazil',  desc:'retired',                                  timestamp: new Date(Date.now() - 1000*60*240) },
  { id:'n7', type:'removal',    player:'soufx',         desc:'removed',                                  timestamp: new Date(Date.now() - 1000*60*360) },
  { id:'n8', type:'ranking',    player:'kessokufanboy', desc:'rank updated', tier:'HT3', mode:'Sword',   timestamp: new Date(Date.now() - 1000*60*60*5) },
]

const BADGE_LABELS: Record<NewsType, string> = {
  test:       'Test Result',
  promotion:  'Promoted',
  ranking:    'Ranking',
  retirement: 'Retired',
  removal:    'Removed',
}

// Minimal inline SVG icons — same stroke style as the Discord/search icons already in the file.
// No new libraries; no new icon families.
function NsIcon({ type }: { type: NewsType }) {
  const p: React.SVGProps<SVGSVGElement> = {
    className: 'ns-icon', viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: 2.5, strokeLinecap: 'round' as const,
  }
  if (type === 'test')       return <svg {...p}><polyline points="20 6 9 17 4 12"/></svg>
  if (type === 'promotion')  return <svg {...p}><polyline points="18 15 12 9 6 15"/></svg>
  if (type === 'ranking')    return <svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  if (type === 'retirement') return <svg {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  /* removal */               return <svg {...p}><circle cx="12" cy="12" r="9"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
}

function NewsSidebar() {
  // Swap NEWS_SEED for a useEffect + Supabase fetch when ready for live data
  const items: NewsEntry[] = NEWS_SEED

  return (
    <aside className="news-sidebar">
      <div className="ns-header">
        <span className="ns-header-title">Live Updates</span>
        <span className="ns-live-dot" title="Live" />
      </div>

      <div className="ns-feed">
        {items.length === 0 ? (
          <div className="ns-empty">
            <div className="ns-empty-icon">📭</div>
            No recent updates
          </div>
        ) : items.map(item => {
          const iconSrc  = item.tier ? tierIconSrc(item.tier) : ''
          const tierCls  = item.tier?.startsWith('HT') ? 'ht' : 'lt'
          return (
            <div key={item.id} className="ns-card" data-type={item.type}>
              <div className="ns-card-top">
                <span className="ns-badge">
                  <NsIcon type={item.type} />
                  {BADGE_LABELS[item.type]}
                </span>
                <span className="ns-time">{timeAgo(item.timestamp)}</span>
              </div>
              <div className="ns-card-body">
                <span className="ns-player">{item.player}</span>
                <span className="ns-desc">
                  {item.desc}{item.mode && !item.tier ? ` · ${item.mode}` : ''}
                </span>
                {item.tier && (
                  <span className={`ns-tier ${tierCls}`}>
                    {iconSrc && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={iconSrc} alt="" />
                    )}
                    {item.tier}{item.mode ? ` ${item.mode}` : ''}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="ns-footer">bloxd tiers · updates</div>
    </aside>
  )
}

// ─── GAMEMODE GRID ────────────────────────────────────────────────────────
function GamemodeGrid({
  filtered,
  activeTab,
  onSelect,
}: {
  filtered: Player[]
  activeTab: Mode
  onSelect: (p: Player, rank: number) => void
}) {
  const TIER_ICONS: Record<number, string> = {
    1: 'https://mctiers.com/icons/tier_1.svg',
    2: 'https://mctiers.com/icons/tier_2.svg',
    3: 'https://mctiers.com/icons/tier_3.svg',
  }

  const groups: Record<number, { p: Player; idx: number }[]> = { 1:[], 2:[], 3:[], 4:[], 5:[] }
  filtered.forEach((p, idx) => {
    const t = parseTier(p.tiers[activeTab])
    if (t && groups[t.num]) groups[t.num].push({ p, idx })
  })

  const activeCols = [1,2,3,4,5].filter(n => groups[n].length > 0)

  if (activeCols.length === 0) {
    return (
      <div className="empty-state">
        <div style={{ fontSize: 32 }}>🔍</div>
        <p>No players found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="gamemode-grid">
      {activeCols.map(num => (
        <div key={num} className="tier-col" data-tier={`HT${num}`}>
          <div className="tier-col-header">
            {TIER_ICONS[num] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={TIER_ICONS[num]} className="tier-col-icon" alt={`Tier ${num}`} />
            )}
            <span>Tier {num}</span>
          </div>
          {groups[num].map(({ p, idx }) => (
            <div
              key={p.id || idx}
              className="tier-player-row"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect(p, idx + 1)}
            >
              <span className="tp-rank">#{idx + 1}</span>
              <div className="tp-avatar">
                <Avatar player={p} size={28} />
              </div>
              <span className="tp-name">{p.username}</span>
              <span className="tp-arrow">›</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

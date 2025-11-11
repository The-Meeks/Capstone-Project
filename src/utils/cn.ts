// src/utils/cn.ts
export function cn(...classes: (string | undefined | boolean)[]) {
    return classes.filter(Boolean).join(" ");
  }
  
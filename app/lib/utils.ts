import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTanggalIndoLocale(tanggal: string): string {
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatNoHPWA(raw: string): string {
  if (!raw) return ""

  // 1️⃣ Hapus semua karakter non-digit
  let cleaned = raw.replace(/\D/g, "")

  // 2️⃣ Jika awalnya 62 (kode negara Indonesia), biarkan
  if (cleaned.startsWith("62")) {
    return cleaned
  }

  // 3️⃣ Jika awalnya 0, ubah jadi 62
  if (cleaned.startsWith("0")) {
    return "62" + cleaned.slice(1)
  }

  // 4️⃣ Jika kosong atau tidak diawali 0/62, anggap sudah benar (tapi tetap bersih)
  return cleaned
}

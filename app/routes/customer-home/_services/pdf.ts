import type { getCustomerDataByNoHP } from "./service";
import { PDFDocument, PDFImage, PDFPage, StandardFonts, rgb } from "pdf-lib";


function drawMiniLineChart({
    page,
    x,
    y,
    w,
    h,
    values,
    color,
    font,
    title,
}: {
    page: any
    x: number
    y: number
    w: number
    h: number
    values: number[]
    color: ReturnType<typeof rgb>
    font: any
    title: string
}) {
    // card background
    page.drawRectangle({ x, y, width: w, height: h, color: rgb(0.96, 0.97, 0.98) })
    // title
    page.drawText(title, { x: x + 10, y: y + h - 18, size: 10, font, color: rgb(0.2, 0.22, 0.25) })

    // plot area
    const pad = 28 // tambahkan padding kiri lebih besar untuk label Y
    const px = x + pad
    const py = y + 20
    const pw = w - pad - 10
    const ph = h - 45

    // axes
    page.drawRectangle({
        x: px,
        y: py,
        width: pw,
        height: ph,
        borderColor: rgb(0.85, 0.87, 0.9),
        borderWidth: 1,
        color: undefined,
    })

    if (!values || values.length === 0) return

    const min = Math.min(...values)
    const max = Math.max(...values)
    const span = max - min || 1

    // grid + Y labels (4 level: min, 1/3, 2/3, max)
    const steps = 3
    for (let i = 0; i <= steps; i++) {
        const gy = py + (ph * i) / steps
        const val = (min + (span * i) / steps).toFixed(1)
        page.drawLine({
            start: { x: px, y: gy },
            end: { x: px + pw, y: gy },
            thickness: 0.5,
            color: rgb(0.9, 0.92, 0.94),
        })
        // Y-axis label
        page.drawText(val, {
            x: x + 4,
            y: gy - 4,
            size: 8,
            font,
            color: rgb(0.3, 0.33, 0.36),
        })
    }

    const n = values.length
    const stepX = pw / Math.max(n - 1, 1)

    // polyline
    for (let i = 0; i < n - 1; i++) {
        const v1 = values[i]
        const v2 = values[i + 1]
        const x1 = px + stepX * i
        const x2 = px + stepX * (i + 1)
        const y1 = py + ((v1 - min) / span) * ph
        const y2 = py + ((v2 - min) / span) * ph
        page.drawLine({
            start: { x: x1, y: y1 },
            end: { x: x2, y: y2 },
            thickness: 2,
            color,
        })
    }

    // X labels (awal & akhir)
    if (n > 1) {
        page.drawText("1", {
            x: px,
            y: py - 12,
            size: 8,
            font,
            color: rgb(0.3, 0.33, 0.36),
        })
        page.drawText(String(n), {
            x: px + pw - 8,
            y: py - 12,
            size: 8,
            font,
            color: rgb(0.3, 0.33, 0.36),
        })
    }
}

export async function generateReportPDF(source: Awaited<ReturnType<typeof getCustomerDataByNoHP>>) {

    const data = source[0]

    const pdfDoc = await PDFDocument.create()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // optional logo
    let logoPng: PDFImage
    try {
        const logoBytes = await fetch("/placeholder-logo.png").then((r) => r.arrayBuffer())
        logoPng = await pdfDoc.embedPng(logoBytes)
    } catch { }

    // A4
    const pageSize = { width: 595.28, height: 841.89 }
    const margin = 40

    // Palet (tema orange, total 5 warna)
    const primary = rgb(0.9176, 0.345, 0.047) // #EA580C
    const primaryDark = rgb(0.6039, 0.2039, 0.0706) // #9A3412
    const neutralDark = rgb(0.12, 0.13, 0.16)
    const neutralGray = rgb(0.42, 0.45, 0.5)
    const softBg = rgb(1, 0.985, 0.965) // soft orange tint

    const addBrandHeader = (page: PDFPage, title: string, subtitle?: string) => {
        // background rectangle
        page.drawRectangle({
            x: 0,
            y: pageSize.height - 80,
            width: pageSize.width,
            height: 80,
            color: primary,
        })
        // logo (jika ada)
        if (logoPng) {
            const lw = 28
            const lh = (logoPng.height / logoPng.width) * lw
            page.drawImage(logoPng, {
                x: pageSize.width - margin - lw,
                y: pageSize.height - 52,
                width: lw,
                height: lh,
            })
        }
        // teks utama
        page.drawText(title, {
            x: margin,
            y: pageSize.height - 52,
            size: 20,
            font: bold,
            color: rgb(1, 1, 1),
        })
        if (subtitle) {
            page.drawText(subtitle, {
                x: margin,
                y: pageSize.height - 100,
                size: 10,
                font,
                color: neutralGray,
            })
        }
    }

    const page = pdfDoc.addPage([pageSize.width, pageSize.height])
    addBrandHeader(page, "Laporan Riwayat Kunjungan", "Data ringkas pelanggan dan riwayat pemeriksaanx")





    // Kartu info (2 kolom)
    const cardW = (pageSize.width - margin * 2 - 20) / 2
    const cardH = 58
    const infoTop = pageSize.height - 150

    const drawInfoCard = (x: number, y: number, title: string, value: string) => {
        page.drawRectangle({ x, y, width: cardW, height: cardH, color: softBg })
        page.drawText(title, { x: x + 12, y: y + cardH - 18, size: 10, font, color: neutralGray })
        page.drawText(value, { x: x + 12, y: y + 18, size: 12, font: bold, color: neutralDark })
    }

    drawInfoCard(margin, infoTop - cardH, "Nama", data.nama)
    drawInfoCard(margin + cardW + 20, infoTop - cardH, "Email", data.email ?? "-")
    drawInfoCard(margin, infoTop - cardH * 2 - 16, "No. HP", data.nohp)
    drawInfoCard(
        margin + cardW + 20,
        infoTop - cardH * 2 - 16,
        "Tanggal Lahir",
        new Date(data.tglLahir ?? "now").toLocaleDateString("id-ID"),
    )

    // Kartu jumlah kunjungan penuh lebar
    const visits = data.customerCards?.length || 0
    const bigY = infoTop - cardH * 2 - 16 - 90 - 12
    page.drawRectangle({
        x: margin,
        y: bigY,
        width: pageSize.width - margin * 2,
        height: 90,
        color: softBg,
    })
    page.drawText("Jumlah Kunjungan", { x: margin + 16, y: bigY + 62, size: 12, font: bold, color: primaryDark })
    page.drawText(`${visits} kali`, { x: margin + 16, y: bigY + 34, size: 22, font: bold, color: neutralDark })

    // Tabel riwayat (zebra)
    const rows = [...(data.customerCards || [])].sort(
        (a, b) => new Date(b.tglKunjungan).getTime() - new Date(a.tglKunjungan).getTime(),
    )

    // Bagian Tabel riwayat (ganti dari kode lama)
    const tableTop = bigY - 36
    page.drawText("Riwayat Kunjungan", { x: margin, y: tableTop + 18, size: 12, font: bold, color: neutralDark })
    page.drawLine({
        start: { x: margin, y: tableTop + 14 },
        end: { x: pageSize.width - margin, y: tableTop + 14 },
        thickness: 2,
        color: primary,
    })

    const headers = ["Tanggal", "Gula", "Kol", "As.Urat", "Hb", "Petugas", "Toko"]

    // Kumpulkan data jadi matriks string
    const tableData = rows.map((r) => [
        new Date(r.tglKunjungan).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }),
        String(r.gula ?? "-"),
        String(r.kolesterol ?? "-"),
        String(r.asamUrat ?? "-"),
        String(r.hb ?? "-"),
        r.pegawai?.nama ?? "-",
        r.toko?.namaToko ?? "-",
    ])

    // Hitung lebar max per kolom (pakai font normal untuk data, bold untuk header)
    const fontSize = 10
    const colWidths = headers.map((h, i) => {
        let maxW = bold.widthOfTextAtSize(h, fontSize)
        for (const row of tableData) {
            const w = font.widthOfTextAtSize(row[i], fontSize)
            if (w > maxW) maxW = w
        }
        return maxW + 12 // padding horizontal
    })

    // Scale agar pas dengan lebar halaman
    const totalW = colWidths.reduce((a, b) => a + b, 0)
    const availableW = pageSize.width - margin * 2
    const scale = availableW / totalW
    const scaledWidths = colWidths.map((w) => w * scale)

    // Hitung posisi X untuk tiap kolom
    const colXs: number[] = []
    let curX = margin
    for (const w of scaledWidths) {
        colXs.push(curX)
        curX += w
    }

    // Draw header
    headers.forEach((h, i) => {
        page.drawText(h, { x: colXs[i] + 2, y: tableTop - 6, size: fontSize, font: bold, color: neutralDark })
    })

    const rowH = 20
    const bottom = margin + 30
    let y = tableTop - 28
    let drawn = 0

    // Draw rows
    tableData.forEach((cells, rowIdx) => {
        if (y < bottom) return
        if (drawn % 2 === 0) {
            page.drawRectangle({
                x: margin,
                y: y - 3,
                width: availableW,
                height: rowH,
                color: rgb(0.99, 0.992, 0.996),
            })
        }
        cells.forEach((val, colIdx) => {
            page.drawText(val, { x: colXs[colIdx] + 2, y, size: fontSize, font, color: neutralDark })
        })
        y -= rowH
        drawn++
    })

    // Sisa baris
    const remaining = Math.max(rows.length - drawn, 0)
    if (remaining > 0) {
        page.drawText(`Sisa ${remaining} baris akan dimuat di halaman berikutnya (grafik).`, {
            x: margin,
            y: bottom - 12,
            size: 9,
            font,
            color: neutralGray,
        })
    }

    const trends = pdfDoc.addPage([pageSize.width, pageSize.height])
    addBrandHeader(trends, "Trend Hasil Pemeriksaan")


    // Trends page (4 mini charts)
    if (rows.length > 0) {

        const byAsc = [...rows].sort((a, b) => new Date(a.tglKunjungan).getTime() - new Date(b.tglKunjungan).getTime())
        const vals = {
            gula: byAsc.map((r) => r.gula ?? 0),
            kol: byAsc.map((r) => r.kolesterol ?? 0),
            asam: byAsc.map((r) => r.asamUrat ?? 0),
            hb: byAsc.map((r) => r.hb ?? 0),
        }

        // Kartu info (2 kolom)
        const cw = (pageSize.width - margin * 2 - 20) / 2
        const ch = 140
        const topY = pageSize.height - 250

        // const cw = (pageSize.width - margin * 2 - 20) / 2
        // const ch = 140
        // const topY = pageSize.height - 200

        drawMiniLineChart({
            page: trends,
            x: margin,
            y: topY,
            w: cw,
            h: ch,
            values: vals.gula,
            color: primary,
            font,
            title: "Gula (mg/dL)",
        })
        drawMiniLineChart({
            page: trends,
            x: margin + cw + 20,
            y: topY,
            w: cw,
            h: ch,
            values: vals.kol,
            color: primary,
            font,
            title: "Kolesterol (mg/dL)",
        })
        drawMiniLineChart({
            page: trends,
            x: margin,
            y: topY - ch - 20,
            w: cw,
            h: ch,
            values: vals.asam,
            color: rgb(0.65, 0.58, 0.98),
            font,
            title: "Asam Urat (mg/dL)",
        })
        drawMiniLineChart({
            page: trends,
            x: margin + cw + 20,
            y: topY - ch - 20,
            w: cw,
            h: ch,
            values: vals.hb,
            color: rgb(0.36, 0.28, 0.62),
            font,
            title: "HB (g/dL)",
        })
    }

    // Download
    const pdfBytes = await pdfDoc.save()
    const pdfBuffer = Buffer.from(pdfBytes);
    return pdfBuffer
}
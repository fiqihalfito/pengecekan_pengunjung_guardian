"use client"

import { useState } from "react"
import {
    Search,
    Phone,
    Calendar,
    Activity,
    Droplets,
    Heart,
    History,
    TrendingUp,
    TrendingDown,
    Minus,
    SaladIcon,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"
import type { getCustomerDataByNoHP } from "../_services/service"
import { data, Form, useFetcher } from "react-router"


type CustomerSearchProp = {
    customerLoader: Awaited<ReturnType<typeof getCustomerDataByNoHP>> | null,
    nohp: string | null
}


export function CustomerSearch({ customerLoader, nohp }: CustomerSearchProp) {


    let fetcher = useFetcher()
    let busy = fetcher.state !== "idle";

    // // const customerData = customerRecord?.[0]
    const customerData = customerLoader ? customerLoader : fetcher.data?.customerRecord as Awaited<ReturnType<typeof getCustomerDataByNoHP>>




    const getHealthStatus = (type: string, value: number = 0) => {
        switch (type) {
            case "gula":
                if (value < 70) return { status: "Rendah", color: "destructive" }
                if (value <= 100) return { status: "Normal", color: "default" }
                if (value <= 125) return { status: "Tinggi", color: "secondary" }
                return { status: "Diabetes", color: "destructive" }

            case "kolesterol":
                if (value < 200) return { status: "Normal", color: "default" }
                if (value <= 239) return { status: "Ambang batas", color: "secondary" }
                return { status: "Tinggi", color: "destructive" }

            case "hb":
                if (value < 12) return { status: "Rendah", color: "destructive" }
                if (value <= 15.5) return { status: "Normal", color: "default" }
                return { status: "Tinggi", color: "destructive" }

            case "asamUrat":
                if (value < 2.4) return { status: "Rendah", color: "destructive" }
                if (value <= 7.0) return { status: "Normal", color: "default" }
                return { status: "Tinggi", color: "destructive" }

            default:
                return { status: "Normal", color: "default" }
        }
    }

    const getTrendIcon = (current: number, previous: number) => {
        if (current > previous) return <TrendingUp className="h-4 w-4 text-red-500" />
        if (current < previous) return <TrendingDown className="h-4 w-4 text-green-500" />
        return <Minus className="h-4 w-4 text-gray-500" />
    }

    return (
        <div className="space-y-8">
            {/* Search Section */}
            <Card className="border-2 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-primary" />
                        Pencarian Customer
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form method="get">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                {/* <Input
                                    type="tel"
                                    placeholder="Masukkan nomor telepon (contoh: +62812345678)"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="text-lg"
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                /> */}
                                <Input
                                    type="text"
                                    placeholder="Masukkan nomor telepon (contoh: 0812345678)"
                                    name="nohp"
                                    defaultValue={nohp || ""}
                                    id="nohp"
                                    // value={phoneNumber}
                                    // onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="text-lg"
                                // onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                />

                            </div>
                            <Button type="submit" disabled={busy} className="px-8">
                                {busy ? "Mencari..." : "Cari"}
                            </Button>
                        </div>
                    </Form>
                    {customerData && customerData.length === 0 && <p className="text-destructive text-sm mt-2">{"Customer tidak ditemukan"}</p>}
                    {customerData && customerData.length > 0 && customerData[0]?.customerCards.length === 0 && <p className="text-destructive text-sm mt-2">{"Belum ada Catatan Kunjungan"}</p>}
                </CardContent>
            </Card>

            {/* Customer Data Section */}
            {/* {customerData && ( */}
            {customerData && customerData.length > 0 && customerData[0].customerCards.length > 0 && (
                <div className="space-y-6">
                    {/* Customer Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-primary" />
                                Informasi Customer
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Nama Lengkap</label>
                                        <p className="text-lg font-semibold">{customerData[0].nama}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Nomor Telepon</label>
                                        <p className="text-lg">{customerData[0].nohp}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Tanggal Lahir</label>
                                        <p className="text-lg flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            {customerData[0]?.tglLahir ? (new Date(customerData[0].tglLahir).toLocaleDateString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })) : (
                                                "-"
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">ID Customer</label>
                                        <p className="text-sm font-mono text-muted-foreground">{customerData[0].idCustomer}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Health Data */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-primary" />
                                    Data Kesehatan Terakhir
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {new Date(customerData[0].customerCards[0].tglKunjungan).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-4 gap-6 mb-6">
                                {/* Blood Sugar */}
                                <div className="text-center p-4 rounded-lg bg-accent/50">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Droplets className="h-5 w-5 text-chart-1" />
                                        <span className="font-medium">Gula Darah</span>
                                    </div>
                                    <p className="text-2xl font-bold text-chart-1">{customerData[0].customerCards[0].gula}</p>
                                    <p className="text-sm text-muted-foreground mb-2">mg/dL</p>
                                    <Badge variant={getHealthStatus("gula", customerData[0].customerCards[0].gula).color as any}>
                                        {getHealthStatus("gula", customerData[0].customerCards[0].gula).status}
                                    </Badge>
                                </div>

                                {/* Cholesterol */}
                                <div className="text-center p-4 rounded-lg bg-accent/50">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Heart className="h-5 w-5 text-chart-2" />
                                        <span className="font-medium">Kolesterol</span>
                                    </div>
                                    <p className="text-2xl font-bold text-chart-2">{customerData[0].customerCards[0].kolesterol}</p>
                                    <p className="text-sm text-muted-foreground mb-2">mg/dL</p>
                                    <Badge variant={getHealthStatus("kolesterol", customerData[0].customerCards[0].kolesterol).color as any}>
                                        {getHealthStatus("kolesterol", customerData[0].customerCards[0].kolesterol).status}
                                    </Badge>
                                </div>

                                {/* Asam Urat */}
                                <div className="text-center p-4 rounded-lg bg-accent/50">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <SaladIcon className="h-5 w-5 text-chart-2" />
                                        <span className="font-medium">Asam Urat</span>
                                    </div>
                                    <p className="text-2xl font-bold text-chart-2">{customerData[0].customerCards[0].asamUrat}</p>
                                    <p className="text-sm text-muted-foreground mb-2">mg/dL</p>
                                    <Badge variant={getHealthStatus("asamUrat", customerData[0].customerCards[0].asamUrat).color as any}>
                                        {getHealthStatus("asamUrat", customerData[0].customerCards[0].asamUrat).status}
                                    </Badge>
                                </div>

                                {/* Hemoglobin */}
                                <div className="text-center p-4 rounded-lg bg-accent/50">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Activity className="h-5 w-5 text-chart-3" />
                                        <span className="font-medium">Hemoglobin</span>
                                    </div>
                                    <p className="text-2xl font-bold text-chart-3">{customerData[0].customerCards[0].hb}</p>
                                    <p className="text-sm text-muted-foreground mb-2">g/dL</p>
                                    <Badge variant={getHealthStatus("hb", customerData[0].customerCards[0].hb).color as any}>
                                        {getHealthStatus("hb", customerData[0].customerCards[0].hb).status}
                                    </Badge>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Medical Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Pegawai yang Menangani</label>
                                    <p className="text-lg font-semibold">{customerData[0].customerCards[0].pegawai.nama}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Cabang</label>
                                    <p className="text-lg">{customerData[0].customerCards[0].cabang.namaCabang}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {customerData && customerData.length > 0 && customerData[0].customerCards.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <History className="h-5 w-5 text-primary" />
                                    Riwayat Kunjungan ({customerData[0].customerCards.length} kunjungan)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {customerData[0].customerCards.map((cc, index) => {
                                        const previousVisit = customerData[0].customerCards[index + 1]
                                        return (
                                            <div key={cc.idCustomerCard} className="border rounded-lg p-4 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        {index === 0 ? (
                                                            <Badge variant="secondary" className="text-xs">
                                                                Terbaru
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="secondary" className="text-xs">
                                                                Kunjungan ke-{customerData[0].customerCards.length - index}
                                                            </Badge>
                                                        )}
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <span className="font-medium">
                                                            {new Date(cc.tglKunjungan).toLocaleDateString("id-ID", {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            })}
                                                        </span>

                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {cc.pegawai.nama} • {cc.cabang.namaCabang}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div className="text-center p-3 rounded bg-accent/30">
                                                        <div className="flex items-center justify-center gap-1 mb-1">
                                                            <Droplets className="h-4 w-4 text-chart-1" />
                                                            <span className="text-sm font-medium">Gula</span>
                                                            {previousVisit && getTrendIcon(cc.gula, previousVisit.gula)}
                                                        </div>
                                                        <p className="text-lg font-bold text-chart-1">{cc.gula}</p>
                                                        <Badge variant={getHealthStatus("gula", cc.gula).color as any}>
                                                            {getHealthStatus("gula", cc.gula).status}
                                                        </Badge>
                                                    </div>

                                                    <div className="text-center p-3 rounded bg-accent/30">
                                                        <div className="flex items-center justify-center gap-1 mb-1">
                                                            <Heart className="h-4 w-4 text-chart-2" />
                                                            <span className="text-sm font-medium">Kolesterol</span>
                                                            {previousVisit && getTrendIcon(cc.kolesterol, previousVisit.kolesterol)}
                                                        </div>
                                                        <p className="text-lg font-bold text-chart-2">{cc.kolesterol}</p>
                                                        <Badge variant={getHealthStatus("kolesterol", cc.kolesterol).color as any}>
                                                            {getHealthStatus("kolesterol", cc.kolesterol).status}
                                                        </Badge>
                                                    </div>

                                                    <div className="text-center p-3 rounded bg-accent/30">
                                                        <div className="flex items-center justify-center gap-1 mb-1">
                                                            <SaladIcon className="h-4 w-4 text-chart-2" />
                                                            <span className="text-sm font-medium">Asam Urat</span>
                                                            {previousVisit && getTrendIcon(cc.asamUrat, previousVisit.asamUrat)}
                                                        </div>
                                                        <p className="text-lg font-bold text-chart-2">{cc.asamUrat}</p>
                                                        <Badge variant={getHealthStatus("asamUrat", cc.asamUrat).color as any}>
                                                            {getHealthStatus("asamUrat", cc.asamUrat).status}
                                                        </Badge>
                                                    </div>

                                                    <div className="text-center p-3 rounded bg-accent/30">
                                                        <div className="flex items-center justify-center gap-1 mb-1">
                                                            <Activity className="h-4 w-4 text-chart-3" />
                                                            <span className="text-sm font-medium">HB</span>
                                                            {previousVisit && getTrendIcon(cc.hb, previousVisit.hb)}
                                                        </div>
                                                        <p className="text-lg font-bold text-chart-3">{cc.hb}</p>
                                                        <Badge variant={getHealthStatus("hb", cc.hb).color as any}>
                                                            {getHealthStatus("hb", cc.hb).status}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                {/* {visit.catatan && (
                                                    <div className="pt-2 border-t">
                                                        <p className="text-sm text-muted-foreground">
                                                            <span className="font-medium">Catatan:</span> {visit.catatan}
                                                        </p>
                                                    </div>
                                                )} */}
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    )
}

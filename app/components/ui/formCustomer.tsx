import { Link, useFetcher } from "react-router"
import { Button } from "./button"
import { CalendarPlusIcon, ChevronLeftIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Label } from "./label"
import { Input } from "./input"
import React from "react"
import { DatePicker } from "./date-picker"
import type { tCustomer } from "database/schema"

type FormCustomerProp = {
    mode: "insert" | "update",
    defaultValues?: typeof tCustomer.$inferInsert
}

type FormField = 'nama' | 'nohp' | 'tglLahir'

export function FormCustomer({ mode, defaultValues }: FormCustomerProp) {

    const fetcher = useFetcher()
    let busy = fetcher.state !== "idle"
    const errors = fetcher.data?.errors as Partial<Record<FormField, any>>

    const [date, setDate] = React.useState<Date | undefined>(defaultValues?.tglLahir ? new Date(defaultValues.tglLahir) : undefined)

    const modeMapping = {
        insert: {
            title: "Tambah Customer Baru",
            desc: "Tambahkan riwayat kunjungan customer",
            titleCard: "Tambah Customer"
        },
        update: {
            title: "Edit Customer",
            desc: "Edit data customer",
            titleCard: "Edit Customer"
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 ">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{modeMapping[mode].title}</h1>
                        <p className="text-lg text-muted-foreground text-pretty">
                            {modeMapping[mode].desc}
                        </p>
                    </div>
                    <Link to={mode === "insert" ? `/admin` : ".."} relative="path">
                        <Button className="mb-2" size={"sm"}>
                            <ChevronLeftIcon />
                            Kembali
                        </Button>
                    </Link>
                    <div className="space-y-8">
                        <Card className="border-2 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CalendarPlusIcon className="h-5 w-5 text-primary" />
                                    {modeMapping[mode].titleCard}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {/* <div className="space-y-0.5">
                                        <h6 className="text-sm font-medium text-muted-foreground">Nama Lengkap</h6>
                                        <h1 className="font-bold text-lg">{customer[0].nama}</h1>
                                    </div>
                                    <div className="space-y-0.5">
                                        <h6 className="text-sm font-medium text-muted-foreground">Nomor Telepon</h6>
                                        <h1 className="font-bold text-lg">{customer[0].nohp}</h1>
                                    </div> */}
                                    <fetcher.Form method="post" className="space-y-6">
                                        <div className="flex flex-col gap-y-2">
                                            <Label htmlFor="nama">Nama Lengkap</Label>
                                            <div className="flex-1">
                                                <Input
                                                    type="text"
                                                    placeholder="Masukkan nama lengkap"
                                                    name="nama"
                                                    id="nama"
                                                    className="text-lg"
                                                    defaultValue={defaultValues?.nama ?? undefined}
                                                />
                                            </div>
                                            {errors?.nama && <p className="text-xs text-red-600 ">{errors.nama}</p>}
                                        </div>

                                        <div className="flex flex-col gap-y-2">
                                            <Label htmlFor="nohp">Nomor Telepon</Label>
                                            <div className="flex-1">
                                                <Input
                                                    type="text"
                                                    placeholder="Masukkan Nomor Telepon"
                                                    name="nohp"
                                                    id="nohp"
                                                    className="text-lg"
                                                    defaultValue={defaultValues?.nohp ?? undefined}
                                                />
                                            </div>
                                            {errors?.nohp && <p className="text-xs text-red-600 ">{errors.nohp}</p>}
                                        </div>

                                        <div className="flex flex-col gap-y-2">
                                            <DatePicker name="tglLahir" date={date} setDate={setDate} />
                                            <Input
                                                type="text"
                                                name="tglLahir"
                                                hidden
                                                value={date ? date.toLocaleDateString("en-CA") : ""}
                                            />
                                            {errors?.tglLahir && <p className="text-xs text-red-600 ">{errors.tglLahir}</p>}
                                        </div>



                                        <Button type="submit" className="cursor-pointer" disabled={busy}>
                                            {busy ? "Menyimpan .." : "Simpan"}
                                        </Button>
                                    </fetcher.Form>
                                </div>

                                {/* {error ? <p className="text-destructive text-sm mt-2">{"Customer tidak ditemukan"}</p> : null} */}
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </main>
    )
}
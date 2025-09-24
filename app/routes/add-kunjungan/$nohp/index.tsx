import type { Route } from "./+types/index"
import { getCustomerByNoHP, saveKunjungan, tCustomerCardInsertSchema } from "./_services/service"
import {
    CalendarCheckIcon,
    CalendarPlusIcon,
    ChevronLeftIcon,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Link, redirect, useFetcher } from "react-router"
import { Label } from "~/components/ui/label"
import { z } from "zod"
import type { tCustomerCard } from "database/schema"

export async function loader({ request, params }: Route.LoaderArgs) {

    const customer = await getCustomerByNoHP(params.nohp)
    if (customer.length === 0) {
        throw new Error("customer not found")
    }
    return { customer }
}

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData();
    const raw = Object.fromEntries(formData);

    const cleaned = {
        gula: Number(raw.gula),
        kolesterol: Number(raw.kolesterol),
        asamUrat: Number(raw.asamUrat),
        hb: Number(raw.hb),
    };

    const validated = tCustomerCardInsertSchema.safeParse(cleaned)
    if (!validated.success) {
        const flattened = z.flattenError(validated.error)
        return { errors: flattened.fieldErrors }
    }

    const customer = await getCustomerByNoHP(params.nohp)

    const newDataKunjungan: typeof tCustomerCard.$inferInsert = {
        ...cleaned,
        idCustomer: customer[0].idCustomer,
        idPegawai: "c6354877-c3fe-490c-ad56-d64cd3ba8574",
        idCabang: "0e8d8321-f497-40ab-9684-a8b59ad75f94",
    }

    const res = await saveKunjungan(newDataKunjungan)


    return redirect(`/?nohp=${params.nohp}`)
}

type FormField = 'gula' | 'kolesterol' | 'asamUrat' | 'hb'

export default function addKunjunganInsert({ params, loaderData }: Route.ComponentProps) {

    const { customer } = loaderData

    const fetcher = useFetcher()
    let busy = fetcher.state !== "idle"
    const errors = fetcher.data?.errors as Partial<Record<FormField, any>>
    console.log(errors);


    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 ">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Tambah Kunjungan</h1>
                        <p className="text-lg text-muted-foreground text-pretty">
                            Tambahkan riwayat kunjungan customer
                        </p>
                    </div>
                    <Link to={`/`}>
                        <Button className="mb-2" size={"sm"}>
                            <ChevronLeftIcon />
                            Kembali
                        </Button>
                    </Link>
                    <div className="space-y-8">
                        <Card className="border-2 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between gap-2">
                                    <span className="flex items-center gap-2">
                                        <CalendarPlusIcon className="h-5 w-5 text-primary" />
                                        Tambah Kunjungan
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <CalendarCheckIcon className="h-5 w-5 text-primary" />
                                        {new Date().toLocaleDateString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>

                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="space-y-0.5">
                                        <h6 className="text-sm font-medium text-muted-foreground">Nama Lengkap</h6>
                                        <h1 className="font-bold text-lg">{customer[0].nama}</h1>
                                    </div>
                                    <div className="space-y-0.5">
                                        <h6 className="text-sm font-medium text-muted-foreground">Nomor Telepon</h6>
                                        <h1 className="font-bold text-lg">{customer[0].nohp}</h1>
                                    </div>
                                    <fetcher.Form method="post" className="space-y-6">
                                        <div className="flex flex-col gap-y-2">
                                            <Label htmlFor="gula">Gula Darah</Label>
                                            <div className="flex-1">
                                                <Input
                                                    type="text"
                                                    placeholder="Masukkan Gula"
                                                    name="gula"
                                                    id="gula"
                                                    className="text-lg"
                                                    defaultValue={0}
                                                />
                                            </div>
                                            {errors?.gula && <p className="text-xs text-red-600 ">{errors.gula}</p>}
                                        </div>

                                        <div className="flex flex-col gap-y-2">
                                            <Label htmlFor="kolesterol">Kolesterol</Label>
                                            <div className="flex-1">
                                                <Input
                                                    type="text"
                                                    placeholder="Masukkan Kolesterol"
                                                    name="kolesterol"
                                                    id="kolesterol"
                                                    className="text-lg"
                                                    defaultValue={0}
                                                />
                                            </div>
                                            {errors?.kolesterol && <p className="text-xs text-red-600 ">{errors.kolesterol}</p>}
                                        </div>

                                        <div className="flex flex-col gap-y-2">
                                            <Label htmlFor="asamUrat">Asam Urat</Label>
                                            <div className="flex-1">
                                                <Input
                                                    type="text"
                                                    placeholder="Masukkan Asam Urat"
                                                    name="asamUrat"
                                                    id="asamUrat"
                                                    className="text-lg"
                                                    defaultValue={0}
                                                />
                                            </div>
                                            {errors?.asamUrat && <p className="text-xs text-red-600 ">{errors.asamUrat}</p>}
                                        </div>

                                        <div className="flex flex-col gap-y-2">
                                            <Label htmlFor="hb">HB</Label>
                                            <div className="flex-1">
                                                <Input
                                                    type="text"
                                                    placeholder="Masukkan HB"
                                                    name="hb"
                                                    id="hb"
                                                    className="text-lg"
                                                    defaultValue={0}
                                                />
                                            </div>
                                            {errors?.hb && <p className="text-xs text-red-600 ">{errors.hb}</p>}
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
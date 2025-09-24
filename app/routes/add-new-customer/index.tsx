import type { Route } from "./+types/index"
import {
    CalendarPlusIcon,
    ChevronLeftIcon,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { data, Link, redirect, useFetcher } from "react-router"
import { Label } from "~/components/ui/label"
import { checkCustomerByNoHP, saveCustomer, tCustomerInsertSchema } from "./_services/service"
import z from "zod"
import type { tCustomer } from "database/schema"

// export async function loader({ request, params }: Route.LoaderArgs) {

//     const customer = await getCustomerByNoHP(params.nohp)
//     if (customer.length === 0) {
//         throw new Error("customer not found")
//     }
//     return { customer }
// }

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData();
    const raw = Object.fromEntries(formData);

    const cleaned = {
        nama: String(raw.nama),
        nohp: String(raw.nohp),
    };



    const validated = tCustomerInsertSchema.safeParse(cleaned)
    if (!validated.success) {
        const flattened = z.flattenError(validated.error)
        console.log(flattened.fieldErrors);

        return data({ errors: flattened.fieldErrors }, { status: 400 })
    }

    const existingCustomer = await checkCustomerByNoHP(cleaned.nohp)
    if (existingCustomer.length > 0) {
        return data({
            errors: {
                nohp: "Nomor Telepon sudah ada atau Customer sudah terdaftar!"
            }
        }, { status: 400 })
    }



    const newCustomer: typeof tCustomer.$inferInsert = {
        ...cleaned,
    }

    const customer = await saveCustomer(newCustomer)


    return redirect(`/addKunjungan/${customer[0].nohp}`)
}

type FormField = 'nama' | 'nohp'

export default function addNewCustomer({ params, loaderData }: Route.ComponentProps) {

    // const { customer } = loaderData

    const fetcher = useFetcher()
    let busy = fetcher.state !== "idle"
    const errors = fetcher.data?.errors as Partial<Record<FormField, any>>


    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 ">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Tambah Customer Baru</h1>
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
                                <CardTitle className="flex items-center gap-2">
                                    <CalendarPlusIcon className="h-5 w-5 text-primary" />
                                    Tambah Kunjungan
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
                                                // defaultValue={0}
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
                                                />
                                            </div>
                                            {errors?.nohp && <p className="text-xs text-red-600 ">{errors.nohp}</p>}
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
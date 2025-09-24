
import {
    CalendarArrowUpIcon,
    ChevronLeftIcon,
    ListIcon,
    Search,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Link, useFetcher } from "react-router";
import { searchAllCustomerByNoHP } from "./_services/service";
import type { Route } from "./+types/index";

export async function action({ request, params }: Route.ActionArgs) {

    let formData = await request.formData();
    let nohp = String(formData.get("nohp"));

    if (!nohp || nohp.trim() === "") {
        return { error: true }
    }

    const customers = await searchAllCustomerByNoHP(nohp)
    if (customers.length === 0) {
        return { error: true }
    }

    return { error: false, customers }
}

export default function AddKunjungan({ }: Route.ComponentProps) {

    const fetcher = useFetcher()
    let busy = fetcher.state !== "idle"
    let error = fetcher.data?.error
    let data = fetcher.data?.customers as Awaited<ReturnType<typeof searchAllCustomerByNoHP>>
    // console.log("customers error", error);


    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 ">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Tambah Kunjungan</h1>
                        {/* <p className="text-lg text-muted-foreground text-pretty">
                            Cari dan lihat informasi lengkap customer berdasarkan nomor telepon
                        </p> */}
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
                                    <Search className="h-5 w-5 text-primary" />
                                    Pencarian Customer
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <fetcher.Form method="post">
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <Input
                                                type="text"
                                                placeholder="Masukkan nomor telepon (contoh: 0812345678)"
                                                name="nohp"
                                                className="text-lg"
                                            />

                                        </div>
                                        <Button type="submit" disabled={busy} className="px-8">
                                            {busy ? "Mencari..." : "Cari"}
                                        </Button>
                                    </div>
                                </fetcher.Form>
                                {error ? <p className="text-destructive text-sm mt-2">{"Customer tidak ditemukan"}</p> : null}
                            </CardContent>
                        </Card>
                        {!error && data && (
                            <Card className="border-2 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ListIcon className="h-5 w-5 text-primary" />
                                        Hasil Pencarian
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>

                                    <ul className="space-y-4">
                                        {data.map((c, i) => (
                                            <li key={i} className="p-4 border-2 border-primary/20 rounded-lg shadow flex justify-between items-center bg-white">
                                                <span className="font-semibold">{c.nama}{" - "}{c.nohp}</span>
                                                <Link to={`/addKunjungan/${c.nohp}`}>
                                                    <Button size={"sm"} className="cursor-pointer">
                                                        <CalendarArrowUpIcon />
                                                        Tambah Kunjungan
                                                    </Button>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>


                                </CardContent>
                            </Card>
                        )}

                    </div>
                </div>
            </div>
        </main>
    )
}
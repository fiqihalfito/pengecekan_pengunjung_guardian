"use client"

import {
    Search,
    SearchIcon,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Link, useFetcher } from "react-router"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "~/components/ui/item"
import type { getCustomerDataBySearch } from "~/routes/admin-home/_services/service"
import { formatTanggalIndoLocale } from "~/lib/utils"


// type CustomerSearchProp = {
//     customerLoader: Awaited<ReturnType<typeof getCustomerDataByNoHP>> | [],
//     search: string | null
// }


export function CustomerSearch() {


    let fetcher = useFetcher()
    let searching = fetcher.state !== "idle";
    let customerData = fetcher.data?.customerData ? fetcher.data.customerData as Awaited<ReturnType<typeof getCustomerDataBySearch>> : []
    let error = fetcher.data?.error



    // const searching =
    //     navigation.location &&
    //     new URLSearchParams(navigation.location.search).has(
    //         "search",
    //     );

    // // const customerData = customerRecord?.[0]
    // const customerData = customerLoader

    // useEffect(() => {
    //     const searchField = document.getElementById("search");
    //     if (searchField instanceof HTMLInputElement) {
    //         searchField.value = search || "";
    //     }
    // }, [search]);




    return (
        <div className="space-y-8 ">
            {/* Search Section */}
            <Card className="border-2 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-primary" />
                        Pencarian Customer [nomor telepon] atau [nama lengkap]
                    </CardTitle>
                    {/* <CardAction className="flex items-center gap-x-2">
                        <span className="text-sm text-muted-foreground">Lupa nomor telepon?</span>
                        <Button size={"sm"}>
                            <UserSearchIcon />
                            Cari nama
                        </Button>
                    </CardAction> */}
                </CardHeader>
                <CardContent>
                    <fetcher.Form method="post">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                {/* <Input
                                    type="text"
                                    placeholder="Masukkan nomor telepon (contoh: 0812345678)"
                                    name="nohp"
                                    defaultValue={nohp || ""}
                                    id="nohp"
                                    className="text-lg"
                                /> */}
                                <Input
                                    type="text"
                                    placeholder="Masukkan nomor telepon (contoh: 0812345678) atau nama lengkap"
                                    name="search"
                                    // defaultValue={search || ""}
                                    id="search"
                                    className="text-lg"
                                // required
                                />

                            </div>
                            <Button type="submit" disabled={searching} className="px-6 cursor-pointer">
                                {searching ? "Mencari..." : <span className="flex items-center gap-x-1.5"><SearchIcon /> Cari</span>}
                            </Button>
                        </div>
                    </fetcher.Form>
                    {error ? <p className="text-destructive text-sm mt-2">{error}</p> : null}
                    {(fetcher.data?.customerData && customerData.length === 0) && <p className="text-destructive text-sm mt-2">{"Customer tidak ditemukan"}</p>}
                </CardContent>
            </Card>

            {customerData.length > 0 ? (
                <ItemGroup className="gap-y-3">
                    <h1 className="font-semibold ml-2">Hasil Pencarian</h1>
                    {customerData.map((c, i) => (
                        <Item variant="outline" className="bg-white shadow" key={c.idCustomer}>
                            <ItemContent className="gap-y-2">
                                <ItemTitle className="text-2xl font-semibold">{c.nama}</ItemTitle>
                                <ItemDescription className="md:w-2/5">
                                    <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-y-0">
                                        <li className="font-medium text-gray-600">Nomor Telepon:</li>
                                        <li className="text-gray-900">{c.nohp}</li>
                                        <li className="font-medium text-gray-600">Tanggal Lahir:</li>
                                        <li className="text-gray-900">{c?.tglLahir ? formatTanggalIndoLocale(c.tglLahir) : "-"}</li>
                                    </ul>
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                                    <Link to={`customer/${c.idCustomer}`}>
                                        Buka data customer
                                    </Link>
                                </Button>
                            </ItemActions>
                        </Item>
                    ))}
                </ItemGroup>
            ) : null}


        </div>
    )
}

import { Link } from "react-router";
import { CustomerSearch } from "./_components/customer-search";
import { getCustomerDataByNoHP } from "./_services/service";
import { Button } from "~/components/ui/button";
import { CalendarPlus2Icon, SmilePlusIcon } from "lucide-react";
import type { Route } from "./+types/index";
import { useEffect } from "react";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Pengecekan Customer Guardian" },
        { name: "description", content: "Welcome to Guardian!" },
    ];
}

// export async function action({ request, params }: Route.ActionArgs) {

//   // clear semua search params
//   const url = new URL(request.url);
//   url.searchParams.delete("nohp")
//   // url.search = "";
//   console.log(url);


//   let formData = await request.formData();
//   let nohp = formData.get("nohp") as string;
//   const customerRecord = await getCustomerDataByNoHP(nohp)


//   return { customerRecord }
// }
export async function loader({ request, params }: Route.ActionArgs) {


    // let formData = await request.formData();
    // let nohp = formData.get("nohp") as string;
    const url = new URL(request.url);
    const nohp = url.searchParams.get("nohp");
    if (nohp) {
        const customerRecord = await getCustomerDataByNoHP(nohp)
        return { customerRecord, nohp }
    }



    return { customerRecord: null, nohp }
}

export default function CustomerHome({ loaderData, actionData }: Route.ComponentProps) {

    // const customerRecord = actionData?.customerRecord
    // console.log("customerRecord", customerRecord);
    const { customerRecord, nohp } = loaderData



    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 ">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
                            Riwayat Kunjungan Guardian
                        </h1>
                        <p className="text-lg text-muted-foreground text-pretty">
                            Periksa informasi lengkap kunjungan Anda
                        </p>
                    </div>

                    <CustomerSearch />
                </div>
            </div>
        </main>
    );
}

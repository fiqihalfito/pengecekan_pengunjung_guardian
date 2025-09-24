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

  console.log("customerRecord", customerRecord);

  useEffect(() => {
    const searchField = document.getElementById("nohp");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = nohp || "";
    }
  }, [nohp]);


  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 ">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Sistem Pencarian Data Customer</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Cari dan lihat informasi lengkap customer berdasarkan nomor telepon
            </p>
          </div>
          <div className="mb-3 flex justify-between items-center">
            <Link to={'/addKunjungan'}>
              <Button className="cursor-pointer">
                <CalendarPlus2Icon className="" />
                Tambah Kunjungan
              </Button>
            </Link>

            <div className="flex items-center gap-x-2">
              <span className="text-muted-foreground font-medium text-sm">Tidak menemukan customer ?</span>
              <Link to={'/add-new-customer'}>
                <Button className="cursor-pointer" variant={"default"}>
                  <SmilePlusIcon className="" />
                  Tambah Customer
                </Button>
              </Link>
            </div>
          </div>
          <CustomerSearch customerLoader={customerRecord} nohp={nohp} />
        </div>
      </div>
    </main>
  );
}

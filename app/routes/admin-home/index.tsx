import { Link } from "react-router";
import { CustomerSearch } from "../customer-home/_components/customer-search";
import { getCustomerDataBySearch } from "./_services/service";
import { Button } from "~/components/ui/button";
import { CalendarPlus2Icon, SmilePlusIcon } from "lucide-react";
import type { Route } from "./+types/index";
import z from "zod";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Pengecekan Customer Guardian" },
    { name: "description", content: "Welcome to Guardian!" },
  ];
}

export async function action({ request, params }: Route.ActionArgs) {

  // clear semua search params
  // const url = new URL(request.url);
  // url.searchParams.delete("nohp")
  // // url.search = "";
  // console.log(url);


  let formData = await request.formData();
  let search = formData.get("search") as string;
  const validated = z.string().min(1, "Wajib diisi").safeParse(search)


  if (!validated.success) {

    return { error: z.flattenError(validated.error).formErrors[0] }
  }
  const customerData = await getCustomerDataBySearch(search)


  return { customerData }
}
// export async function loader({ request, params }: Route.ActionArgs) {


//   // let formData = await request.formData();
//   // let nohp = formData.get("nohp") as string;
//   const url = new URL(request.url);
//   const search = url.searchParams.get("search");
//   if (search) {
//     const customerRecord = await getCustomerDataBySearch(search)
//     return { customerRecord, search }
//   }



//   return { customerRecord: null, search }
// }

export default function AdminHome({ loaderData, actionData }: Route.ComponentProps) {

  // const customerRecord = actionData?.customerRecord
  // console.log("customerRecord", customerRecord);
  // const { customerRecord, search } = loaderData





  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 ">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Sistem Pencarian Data Customer Guardian</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Cari dan lihat informasi lengkap customer berdasarkan nomor telepon
            </p>
          </div>
          <div className="mb-3 flex justify-end items-center">
            {/* <Link to={'/admin/addKunjungan'}>
              <Button className="cursor-pointer">
                <CalendarPlus2Icon className="" />
                Tambah Kunjungan
              </Button>
            </Link> */}

            <div className="flex items-center gap-x-2">
              <span className="text-muted-foreground font-medium text-sm">Tidak menemukan customer ?</span>
              <Link to={'/admin/add-new-customer'}>
                <Button className="cursor-pointer" variant={"default"}>
                  <SmilePlusIcon className="" />
                  Tambah Customer Baru
                </Button>
              </Link>
            </div>
          </div>
          <CustomerSearch />
        </div>
      </div>
    </main>
  );
}

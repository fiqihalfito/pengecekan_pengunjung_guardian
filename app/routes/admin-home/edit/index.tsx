import type { Route } from "./+types/index"
import { data, redirect } from "react-router"
import { checkCustomerByNoHP, updateCustomer, tCustomerUpdateSchema, getCurrentCustomer } from "./_service"
import z from "zod"
import type { tCustomer } from "database/schema"
import { FormCustomer } from "~/components/ui/formCustomer"

export async function loader({ request, params }: Route.LoaderArgs) {

    const customer = await getCurrentCustomer(params.idCustomer)
    if (customer.length === 0) {
        throw new Error("customer not found")
    }
    return { customer }
}

export async function action({ request, params }: Route.ActionArgs) {

    const formData = await request.formData();
    const raw = Object.fromEntries(formData);

    const cleaned = {
        nama: String(raw.nama),
        nohp: String(raw.nohp),
        tglLahir: String(raw.tglLahir)
    };

    const validated = tCustomerUpdateSchema.safeParse(cleaned)
    if (!validated.success) {
        const flattened = z.flattenError(validated.error)

        return data({ errors: flattened.fieldErrors }, { status: 400 })
    }

    const currentCustomer = await getCurrentCustomer(params.idCustomer)
    const existingCustomer = await checkCustomerByNoHP(cleaned.nohp)
    if (existingCustomer.length > 0 && existingCustomer[0].nohp !== currentCustomer[0].nohp) {
        return data({
            errors: {
                nohp: "Nomor Telepon sudah ada atau Customer sudah terdaftar!"
            }
        }, { status: 400 })
    }
    console.log("nomor pass", validated.data.nohp);


    const newCustomer: typeof tCustomer.$inferInsert = {
        ...cleaned,
    }

    const customer = await updateCustomer(params.idCustomer, newCustomer)
    return redirect(`/admin/customer/${customer[0].idCustomer}`)
}

type FormField = 'nama' | 'nohp' | 'tglLahir'

export default function EditCustomer({ params, loaderData }: Route.ComponentProps) {

    const { customer } = loaderData



    return (
        <FormCustomer mode="update" defaultValues={customer[0]} />
    )
}

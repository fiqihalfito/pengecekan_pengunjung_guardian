
import { getCustomerDataById } from "./_service"
import { CustomerDetail } from "~/components/ui/customer-detail"
import type { Route } from "./+types/index"

export async function loader({ request, params }: Route.LoaderArgs) {

    const customerData = await getCustomerDataById(params.idCustomer)
    if (customerData.length === 0) {
        throw new Error("customer tidak ditemukan")
    }

    return { customerData }
}


export default function CustomerDetailPage({ loaderData, params }: Route.ComponentProps) {

    const { customerData } = loaderData


    return (
        <CustomerDetail customerData={customerData} statusView="admin" />
    )
}
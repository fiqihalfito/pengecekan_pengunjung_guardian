import { generateReportPDF } from "../_services/pdf";
import { getCustomerDataByNoHP } from "../_services/service";
import type { Route } from "./+types/pdf";


export async function loader({ request, params }: Route.LoaderArgs) {

    const customerData = await getCustomerDataByNoHP(params.nohp)
    const pdfBuffer = await generateReportPDF(customerData)


    return new Response(pdfBuffer, {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=customer-history-${params.nohp}.pdf`,
        },
    });
}
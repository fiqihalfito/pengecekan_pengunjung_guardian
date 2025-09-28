import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/customer-home/index.tsx"),
    route("reportpdf/:nohp", "routes/customer-home/resources/pdf.ts"),



    route("admin", "routes/admin-home/index.tsx"),
    // route(":nohp", "routes/customer-home/$nohp/index.tsx"),
    ...prefix("admin/addKunjungan", [
        index("routes/add-kunjungan/index.tsx"),
        route(":nohp", "routes/add-kunjungan/$nohp/index.tsx")
    ]),
    ...prefix("admin/add-new-customer", [
        index("routes/add-new-customer/index.tsx"),
        // route(":nohp", "routes/add-kunjungan/$nohp/index.tsx")
    ]),
] satisfies RouteConfig;

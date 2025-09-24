import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/customer-home/index.tsx"),
    // route(":nohp", "routes/customer-home/$nohp/index.tsx"),
    ...prefix("addKunjungan", [
        index("routes/add-kunjungan/index.tsx"),
        route(":nohp", "routes/add-kunjungan/$nohp/index.tsx")
    ]),
    ...prefix("add-new-customer", [
        index("routes/add-new-customer/index.tsx"),
        // route(":nohp", "routes/add-kunjungan/$nohp/index.tsx")
    ]),
] satisfies RouteConfig;

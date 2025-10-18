import { Link } from "react-router"
import { Button } from "./button"
import { MessageCircleIcon } from "lucide-react"

type KirimWAButtonProp = {
    nomor: string,
    idCustomer: string
}

export function KirimWAButton({ nomor, idCustomer }: KirimWAButtonProp) {
    const domain = "https://pengecekan-pengunjung-guardian.vercel.app"
    const link = `${domain}/customer/${idCustomer}`

    const pesan = `Halo! 👋
Untuk melihat hasil pemeriksaan kesehatan Anda, silakan klik tautan berikut:
${link}

Terima kasih dan semoga Anda sehat selalu! 💚`

    return (
        <Button size={"sm"} className="bg-green-600 shadow hover:bg-green-700" asChild>
            <Link to={`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`} target="_blank">
                <MessageCircleIcon />
                Kirim Hasil ke Whatsapp customer
            </Link>
        </Button>

    )
}
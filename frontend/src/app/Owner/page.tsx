import Link from "next/link"

const profile = [
    {
        name: "แจ้งวัฒนะ",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxRWsUV2-8W5E0tSmHMxiulei8obW1ilGB_A&s",
        href: "/Owner/branch1"
    },
    {
        name: "กรุงเทพมหานคร อมรรัตรโกสินทร์",
        img: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg",
        href: "/Owner/branch2"
    },
    {
        name: "Central Rama 2",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxRWsUV2-8W5E0tSmHMxiulei8obW1ilGB_A&s",
        href: "/Owner/branch3"
    },
    {
        name: "Icon Siam",
        img: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg",
        href: "/Owner/branch3"
    },
    {
        name: "ไม่บอก",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxRWsUV2-8W5E0tSmHMxiulei8obW1ilGB_A&s",
        href: "/Owner/branch3"
    },
]

export default function page() {
    return (
        <main className="min-h-screen p-8 xl:p-12 flex flex-col justify-center items-center">
            <h2 className="h2">สาขา</h2>

            {/* Show All Branches */}
            <div className="container m-10 w-fit grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 justify-center items-baseline">
                {profile.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2 items-center">
                        {/* Image Link */}
                        <Link
                            href={item.href}
                            className="flex flex-col gap-2 items-center"
                        >
                            <img src={item.img} alt="profile" className="w-36 rounded-lg" />
                        </Link>
                        <p className="max-w-32 text-center">{item.name}</p>
                    </div>
                ))}
            </div>


            {/* Manage Branches */}
            <div className="p-2 border-2">
                <Link href="/Owner/manageBranch">
                    <button className="btn">จัดการสาขาของคุณ</button>
                </Link>
            </div>
        </main>
    )
}
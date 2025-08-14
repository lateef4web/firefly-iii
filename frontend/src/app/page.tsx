import Image from "next/image";
import Link from "next/link";
import LayoutDefault from "../components/LayoutDefault";

interface IndexData {
    message: string;
}

async function getIndexData(): Promise<IndexData> {
    const res = await fetch("/api/index", { cache: "no-store" });
    return res.json();
}

export default async function Home() {
    const data = await getIndexData();
    return (
        <LayoutDefault title="Home">
            <div className="font-sans min-h-screen flex flex-col items-center justify-center p-8">
                <main className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">Welcome to Firefly III</h1>
                    <p className="text-lg">{data.message}</p>
                    <Image src="/next.svg" alt="Next.js Logo" width={180} height={37} />
                    <p>
                        <Link href="https://github.com/firefly-iii/firefly-iii" className="text-blue-500 underline">
                            View on GitHub
                        </Link>
                    </p>
                </main>
            </div>
        </LayoutDefault>
    );
}


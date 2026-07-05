import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#090909] px-6 text-[#f3f1ea]"><div className="text-center"><div className="flex items-center justify-center gap-3"><Image src="/brand/talkey-key.svg" width={90} height={42} alt="" /><Image src="/brand/talkey-wordmark.svg" width={130} height={42} alt="Talkey" /></div><p className="mt-10 text-7xl font-bold text-[#3b3b3b]">404</p><h1 className="mt-3 text-2xl font-bold">Esta página no está disponible</h1><p className="mt-3 text-base text-[#aaa69d]">Puede que el enlace haya cambiado.</p><Link href="/" className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-[#ffc638] px-5 text-sm font-bold text-[#080808]">Volver al inicio</Link></div></main>;
}

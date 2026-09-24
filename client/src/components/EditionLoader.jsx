
export default function EditionLoader({ year }) {
    return (
        <section className="bg-[#23140f] text-white min-h-screen py-16 px-2 sm:px-6">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-4 border-[#d4af37]/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-4 border-4 border-[#ffe9b3]/30 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-[#ffe9b3] text-lg font-semibold animate-pulse tracking-wider">
                        Loading Edition {year}...
                    </p>
                </div>
            </div>
        </section>
    );
}

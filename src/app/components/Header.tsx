import React from 'react';
import Link from 'next/link';

function Header() {
    return (
        <header className="w-full px-10 py-10 flex items-center">
            <Link href="/" className="text-[25px] font-bold font-mono">EZPDF AI</Link>
        </header>
    )
}

export default Header;
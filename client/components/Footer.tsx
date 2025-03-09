import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <div className='footer'>
            <p> {`Copyright © `} {new Date().getFullYear()}
            </p>
            <div className='footer__links'>
                {["About", "privacy Policy", "Licensing", "contact"].map((link) => (
                <Link
                    key={link}
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className='footer__link'
                >
                    {link}
                </Link>
            ))}
            </div>
        </div>
    )
}

import React from 'react';
import styles from './Nav.module.css';
import * as data from './links.json';
import Link from 'next/link';
const linksString = JSON.stringify(data);
const links = JSON.parse(linksString).links;

type Link = {
    label: string;
    href: string;
};

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
    return (
        <div className={styles['links-container']}>
            {links.map((link: Link) => {
                return (
                    <div key={link.href} className={styles['link']}>
                        <Link href={link.href}>
                            {link.label}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
};

const Nav: React.FC<{}> = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles['logo-container']}>
            <span>
                <Link href={"/about"} >About</Link>
                </span>
            </div>
            <Links links={links} />
        </nav>
    )
}

export default Nav;
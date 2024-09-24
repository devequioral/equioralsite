import { WhatsappIcon } from '@virtel/icons';
import Link from 'next/link';
import React from 'react';
import styles from './Whatsapp.module.css';

export default function Whatsapp({ theme }) {
  return (
    <div className={styles.Whatsapp}>
      <Link href="https://web.whatsapp.com/send?phone=573105033808&text=">
        <div className={`${styles.Icon} ${styles[theme]}`}>
          <WhatsappIcon size={12} fill={theme === 'dark' ? '#fff' : '#000'} />
        </div>
        <span>Contáctame por Whatsapp</span>
      </Link>
    </div>
  );
}

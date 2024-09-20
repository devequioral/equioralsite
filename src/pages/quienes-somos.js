import MainNavbar from '@/components/MainNavbar/MainNavbar';
import React, { useContext } from 'react';
import styles from '@/styles/QuienesSomos.module.css';
import { AppContext } from '@/context/AppContext';
import ImageComp from '@/components/ImageComp/ImageComp';
import Link from 'next/link';
import { WhatsappIcon } from '@virtel/icons';
import storiesData from '@/data/defaultStories.json';
import Stories from '@/components/Stories/Stories';
import Metaheader from '@/components/Metaheader/Metaheader';
import Layout from '@/components/Layout/Layout';
import { useSession } from 'next-auth/react';

export default function QuienesSomos() {
  const { data: session } = useSession();
  const { state, dispatch } = useContext(AppContext);
  return (
    <>
      <Metaheader />
      <Layout session={session}>
        <div className={`${styles.Page} ${styles[state.theme]}`}>
          <div className={styles.Container}>
            <div className={styles.About}>
              <div className={styles.Column}>
                <div className={styles.AboutText}>
                  <ImageComp
                    src="/assets/images/quienes-somos.jpg"
                    width={300}
                    height={225}
                    alt=""
                  />
                  <div className={styles.AboutList}>
                    <p>* Odontólogo de la USC , 2003</p>
                    <p>* Odontólogo equino Etfor, 2004</p>
                    <p>* Implantologia oral , MIS , 2007</p>
                    <p>* USA , IAED Ocala , 2012</p>
                    <p>* Brasil , 2013</p>
                    <p>* Chile, 2014</p>
                    <p>* Ortodoncia 2017</p>
                  </div>
                </div>
                <div className={styles.InfoLinks}>
                  <div className={styles.Whatsapp}>
                    <Link href="https://web.whatsapp.com/send?phone=573105033808&text=">
                      <div className={styles.Icon}>
                        <WhatsappIcon
                          size={12}
                          fill={state.theme === 'dark' ? '#fff' : '#000'}
                        />
                      </div>
                      <span>Contáctame por Whatsapp</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.Column}>
                <div className={styles.InfoText}>
                  <div className={styles.titles}>
                    <h1>Diego Posso Castaño</h1>
                    <h2>Odontólogo Equino</h2>
                  </div>
                  <p>
                    Luego de años de dedicación a esta actividad, estoy más
                    convencido de los grandes problemas odontologicos que
                    presentan los caballos, que repercute en su salud general
                    como en lo deportivo, ahora aplicando técnicas en
                    odontología humana avanzada para tratar de la mejor manera
                    las patologías que se puedan presentar.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.CopyRight}>
              <p>
                &copy; Equioral Todos los Derechos Reservados{' '}
                {new Date().getFullYear()}. Powered By Virtel
              </p>
            </div>
            <div className={styles.StoriesCnt}>
              <Stories
                theme={state.theme}
                edgeOffset={40}
                mobileBreakpoint={600}
                data={storiesData}
                showName={true}
                showLinkLabel={false}
                storyFlex="column"
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

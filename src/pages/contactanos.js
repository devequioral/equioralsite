import MainNavbar from '@/components/MainNavbar/MainNavbar';
import React, { useContext, useState } from 'react';
import styles from '@/styles/Contactanos.module.css';
import { AppContext } from '@/context/AppContext';
import ImageComp from '@/components/ImageComp/ImageComp';
import Link from 'next/link';
import { WhatsappIcon } from '@virtel/icons';
import { Button, Input, Textarea } from '@nextui-org/react';

const InputComp = (props) => {
  const { styles, type, label, name, validation } = { ...props };
  return (
    <div className={styles.GroupField}>
      {type === 'textarea' ? (
        <Textarea
          label={label}
          name={name}
          classNames={{
            label: styles.Label,
            input: styles.Input,
            innerWrapper: styles.InputInnerWrapper,
            inputWrapper: `${styles.InputWrapper} ${
              validation ? styles.InputWrapperError : ''
            }`,
          }}
        />
      ) : (
        <Input
          type={type}
          label={label}
          name={name}
          classNames={{
            label: styles.Label,
            input: styles.Input,
            innerWrapper: styles.InputInnerWrapper,
            inputWrapper: `${styles.InputWrapper} ${
              validation ? styles.InputWrapperError : ''
            }`,
          }}
        />
      )}
      {validation && <p className={styles.ErrorMessage}>{validation}</p>}
    </div>
  );
};

export default function Contactanos() {
  const { state, dispatch } = useContext(AppContext);
  const [validation, setValidation] = useState({});
  return (
    <>
      <MainNavbar />
      <div className={`${styles.Page} ${styles[state.theme]}`}>
        <div className={styles.Container}>
          <div className={styles.Left}>
            <div className={styles.Column}>
              <ImageComp
                src="/assets/images/img-contactus.png"
                width={300}
                height={225}
                alt=""
              />
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
                  <h2>¿Conversamos?</h2>
                </div>
                <p>
                  Por favor, Complete el siguiente Formulario y con mucho gusto
                  le responderé a la brevedad posible.
                </p>
                <form className={styles.Form}>
                  <InputComp
                    type="text"
                    label="Nombre *"
                    name="name"
                    styles={styles}
                    validation={validation.name}
                  />
                  <InputComp
                    type="text"
                    label="Apellido *"
                    name="lastname"
                    styles={styles}
                    validation={validation.lastname}
                  />
                  <InputComp
                    type="email"
                    label="Email *"
                    name="email"
                    styles={styles}
                    validation={validation.email}
                  />
                  <InputComp
                    type="text"
                    label="Teléfono *"
                    name="phone"
                    styles={styles}
                    validation={validation.phone}
                  />
                  <InputComp
                    type="text"
                    label="Asunto *"
                    name="subject"
                    styles={styles}
                    validation={validation.subject}
                  />
                  <InputComp
                    type="textarea"
                    label="Mensaje *"
                    name="message"
                    styles={styles}
                    validation={validation.message}
                  />
                  <Button className={styles.BtnSend}>Enviar</Button>
                </form>
              </div>
              <div className={styles.CopyRight}>
                <p>
                  &copy; Equioral Todos los Derechos Reservados{' '}
                  {new Date().getFullYear()}. Powered By Virtel
                </p>
              </div>
            </div>
          </div>

          <div className={styles.Stories}>
            <Link href="#" className={styles.Story}>
              <div className={styles.ImgCnt}>
                <ImageComp
                  src="/assets/images/stories/story-01.png"
                  width={73}
                  height={73}
                  alt=""
                />
              </div>
            </Link>
            <Link href="#" className={styles.Story}>
              <div className={styles.ImgCnt}>
                <ImageComp
                  src="/assets/images/stories/story-02.png"
                  width={73}
                  height={73}
                  alt=""
                />
              </div>
            </Link>
            <Link href="#" className={styles.Story}>
              <div className={styles.ImgCnt}>
                <ImageComp
                  src="/assets/images/stories/story-03.png"
                  width={73}
                  height={73}
                  alt=""
                />
              </div>
            </Link>
            <Link href="#" className={styles.Story}>
              <div className={styles.ImgCnt}>
                <ImageComp
                  src="/assets/images/stories/story-04.png"
                  width={73}
                  height={73}
                  alt=""
                />
              </div>
            </Link>
            <Link href="#" className={styles.Story}>
              <div className={styles.ImgCnt}>
                <ImageComp
                  src="/assets/images/stories/story-05.png"
                  width={73}
                  height={73}
                  alt=""
                />
              </div>
            </Link>
            <Link href="#" className={styles.Story}>
              <div className={styles.ImgCnt}>
                <ImageComp
                  src="/assets/images/stories/story-06.png"
                  width={73}
                  height={73}
                  alt=""
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

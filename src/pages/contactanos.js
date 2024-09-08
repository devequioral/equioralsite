import MainNavbar from '@/components/MainNavbar/MainNavbar';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from '@/styles/Contactanos.module.css';
import { AppContext } from '@/context/AppContext';
import ImageComp from '@/components/ImageComp/ImageComp';
import Link from 'next/link';
import { WhatsappIcon } from '@virtel/icons';
import { Button, Input, Textarea } from '@nextui-org/react';
import lodash from 'lodash';

const InputComp = (props) => {
  const { styles, type, label, name, validation } = { ...props };
  const [className, setClassName] = useState({
    label: styles.Label,
    input: styles.Input,
    innerWrapper: styles.InputInnerWrapper,
    inputWrapper: `${styles.InputWrapper} ${
      validation ? styles.InputWrapperError : ''
    }`,
  });
  useEffect(() => {
    const _className = { ...className };
    _className.inputWrapper = `${styles.InputWrapper} ${
      validation ? styles.InputWrapperError : ''
    }`;
    setClassName(_className);
  }, [validation]);
  return (
    <div className={styles.GroupField}>
      {type === 'textarea' ? (
        <Textarea label={label} name={name} classNames={className} />
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

const sendContact = async (formdata) => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/contactus`;
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formdata)),
  });
};

export default function Contactanos() {
  const { state, dispatch } = useContext(AppContext);
  const [validation, setValidation] = useState({});
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({});
  const formRef = useRef();
  const onSendForm = async (evt) => {
    evt.preventDefault();
    if (!formRef.current) return;
    if (isSubmiting) return;
    setIsSubmitting(true);
    setNotification({});
    const formdata = new FormData(formRef.current);
    const resp = await sendContact(formdata);
    setIsSubmitting(false);
    if (resp && resp.ok) {
      const resp_json = await resp.json();
      if (resp_json && resp_json.message) {
        setNotification({
          success: resp_json.success,
          message: resp_json.message,
        });
        if (resp_json.success) {
          formRef.current.reset();
        }
      }
      if (!lodash.isEmpty(resp_json.validation)) {
        let new_validation = { ...validation };
        ['name', 'lastname', 'phone', 'email', 'subject', 'message'].map(
          (_input) => {
            if (resp_json.validation[_input]) {
              new_validation[_input] = resp_json.validation[_input];
              setValidation(new_validation);
            } else {
              delete new_validation[_input];
              setValidation(new_validation);
            }
          }
        );
      } else {
        setValidation({});
      }
    }
  };
  return (
    <>
      <MainNavbar />
      <div className={`${styles.Page} ${styles[state.theme]}`}>
        <div className={styles.Container}>
          <div className={styles.Left}>
            <div className={`${styles.Column} hide-xs hide-sm hide-md`}>
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
                <form
                  ref={formRef}
                  className={styles.Form}
                  onSubmit={onSendForm}
                >
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
                  <div className={`${styles.FormBottom}`}>
                    <Button
                      className={styles.BtnSend}
                      onClick={onSendForm}
                      isDisabled={isSubmiting}
                    >
                      Enviar
                    </Button>
                    <p
                      className={`${styles.Notification} ${
                        notification.success ? styles.success : ''
                      }`}
                    >
                      {notification.message}
                    </p>
                  </div>
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

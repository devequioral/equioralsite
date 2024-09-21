import React, { useEffect, useState } from 'react';
import styles from './AddPost.module.css';
import { Button, DateInput, Input, Textarea } from '@nextui-org/react';
import { AddIcon } from '@virtel/icons';
import ModalComponent from '@/components/ModalComponent/ModalComponent';
import {
  DateValue,
  now,
  parseAbsoluteToLocal,
  getLocalTimeZone,
} from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import { toast } from 'react-toastify';
import MediaUpload from '../MediaUpload/MediaUpload';

async function createPost(title, description, date, photos) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/posts/new`;
  const body = new FormData();
  body.append('title', title);
  body.append('description', description);
  body.append('date', date);
  let count_photos = 0;
  photos.map((p) => {
    body.append(p.name, p.photo);
    count_photos++;
  });
  body.append('count_photos', count_photos);
  return await fetch(url, {
    method: 'POST',
    body,
  });
  // return await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     record: { title, description, date },
  //   }),
  // });
}

export default function AddPost() {
  const [showModal, setShowModal] = useState(0);
  const [allowSave, setAllowSave] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photosPreview, setPhotosPreview] = useState([]);
  const [date, setDate] = React.useState(
    parseAbsoluteToLocal(new Date().toISOString())
  );
  const onSavePost = async () => {
    setSavingPost(true);
    const date_str = date.toDate(getLocalTimeZone()).toISOString();
    const resp = await createPost(title, description, date_str, photos);
    if (resp.ok) {
      setShowModal(0);
      setTitle('');
      setDescription('');
      setSavingPost(false);
      toast.success('Servicio / Caso Publicado');
    } else {
      toast.error('Ocurrio un problema intente nuevamente');
    }
  };
  useEffect(() => {
    if (title && description) {
      setAllowSave(true);
    } else {
      setAllowSave(false);
    }
  }, [title, description]);
  const onSelectPhoto = (e) => {
    const _photos = [...photos];
    _photos.push({
      name: `Photo-${_photos.length + 1}`,
      photo: e.target.files[0],
    });
    setPhotos(_photos);
    const preview = URL.createObjectURL(e.target.files[0]);
    setPhotosPreview((c) => [...c, preview]);
  };

  return (
    <>
      <div className={styles.AddPostButton}>
        <Button isIconOnly onPress={() => setShowModal((c) => c + 1)}>
          <AddIcon fill={'#fff'} size={36} />
        </Button>
      </div>
      <ModalComponent
        show={showModal}
        onSave={onSavePost}
        title={'Publica un Servicio / Caso'}
        onCloseModal={() => {
          setTitle('');
          setDescription('');
          setSavingPost(false);
        }}
        allowSave={allowSave}
        savingRecord={savingPost}
        size={'xl'}
      >
        <div className={styles.Inputs}>
          <div className={styles.InputGroup}>
            <Input
              type="text"
              label="Titulo"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.InputGroup}>
            <Textarea
              label="Descripción"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.InputGroup}>
            <I18nProvider locale="es-CO">
              <DateInput
                label="Fecha de la Publicación"
                value={date}
                onChange={setDate}
                granularity="day"
              />
            </I18nProvider>
          </div>
          <div className={styles.InputGroup}>
            <input
              type="file"
              id="file"
              onChange={onSelectPhoto}
              className={styles.MediaUploadInput}
            />
            <div className={styles.PhotoPreviews}>
              {photosPreview.map((preview, i) => (
                <div className={styles.PhotoPreview} key={i}>
                  <img src={preview} alt="" />
                </div>
              ))}
            </div>
            <label htmlFor="file" className={styles.MediaUploadInputLabel}>
              Agregar Foto
            </label>
          </div>
        </div>
      </ModalComponent>
    </>
  );
}

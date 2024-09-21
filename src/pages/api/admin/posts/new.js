import { Formidable } from 'formidable';
import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { sanitizeOBJ, generateUUID, sanitize } from '@/utils/utils';
import { consoleError } from '@/utils/error';
const { v4: uuidv4 } = require('uuid');

export const config = {
  api: {
    bodyParser: false,
  },
};

async function createRecord(record) {
  const url = `${process.env.VIDASHY_URL}${process.env.VIDASHY_ORGANIZATION}/${process.env.VIDASHY_DATABASE}/posts`;
  try {
    const new_record = sanitizeOBJ({
      _uid: generateUUID(),
      Title: record.title,
      Description: record.description,
      Date: record.date,
    });
    new_record.Url = sanitize(
      `/servicios-y-casos/${record.title.replaceAll(' ', '').toLowerCase()}`
    );
    const response = await axios({
      method: 'post',
      url,
      headers: {
        Authorization: `Bearer ${process.env.VIDASHY_API_KEY}`,
      },
      data: new_record,
    });
    return response.data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) return res.status(401).send({ message: 'Not authorized' });

    const { id: userid, role } = token;

    if (role !== 'admin') {
      return res.status(401).send({ message: 'Not authorized' });
    }

    const form = new Formidable();
    const [fields, files] = await form.parse(req);

    const formData = new FormData();

    formData.append('Title', sanitize(fields.title[0]));
    formData.append('Description', sanitize(fields.description[0]));
    formData.append('Date', sanitize(fields.date[0]));
    formData.append('Photos', `Photo|${fields.count_photos[0]}`);
    formData.append(
      'Url',
      sanitize(
        `/servicios-y-casos/${fields.title[0]
          .replaceAll(' ', '')
          .toLowerCase()}`
      )
    );

    const count_photos = Number.parseInt(fields.count_photos[0]);

    for (var i = 0; i < count_photos; i++) {
      formData.append(
        `Photo-${i + 1}`,
        fs.createReadStream(files[`Photo-${i + 1}`][0].filepath)
      );
      formData.append(
        `Photo-${i + 1}-name`,
        files[`Photo-${i + 1}`][0].originalFilename
      );
      formData.append(
        `Photo-${i + 1}-mimetype`,
        files[`Photo-${i + 1}`][0].mimetype
      );
    }

    try {
      const url = `${process.env.VIDASHY_URL}${process.env.VIDASHY_ORGANIZATION}/${process.env.VIDASHY_DATABASE}/posts`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.VIDASHY_API_KEY}`,
        },
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();

        const record = {
          ...data,
        };

        res.status(200).json({
          success: true,
          record,
        });
      } else {
        const message = await response.text();
        res.status(500).json({
          success: false,
          message,
        });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        message: 'Code Error 0025',
      });
    }

    return;

    const { record } = req.body;

    const validation = {};

    if (!record.title || record.title === '') {
      validation.title = 'Field Required';
    }
    if (!record.description || record.description === '') {
      validation.description = 'Field Required';
    }
    if (!record.date || record.date === '') {
      validation.date = 'Field Required';
    }

    //EVALUATE IF VALIDATION IS NOT EMPTY
    if (Object.keys(validation).length > 0) {
      return res.status(500).send({
        message: 'Record could not be processed',
        validation,
      });
    }

    const response = await createRecord(record);

    if (!response)
      return res
        .status(500)
        .send({ message: 'Record could not be processed ' });

    res.status(200).json({ response });
  } catch (error) {
    console.error('Error getting token or session:', error);
  }
}

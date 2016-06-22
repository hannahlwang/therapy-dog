'use strict';

const Promise = require('bluebird');
const UploadNotFoundError = require('../errors').UploadNotFoundError;

const UPLOADS = {};

class Upload {
  /**
   * @param {string} id
   * @param {Object} attributes
   */
  constructor(id, attributes) {
    this.id = id;
    this.attributes = attributes;
  }

  /**
   * The original name of the uploaded file.
   * @type {string}
   */
  get name() {
    return this.attributes.name;
  }

  /**
   * The uploaded file's MIME type.
   * @type {string}
   */
  get type() {
    return this.attributes.type;
  }

  /**
   * The size of the uploaded file in bytes.
   * @type {number}
   */
  get size() {
    return this.attributes.size;
  }

  /**
   * The path to the uploaded file.
   * @property path
   * @type {String}
  */
  get path() {
    return this.attributes.path;
  }

  /**
   * Return a JSON API resource object representing this upload.
   * @return {Promise<Object>}
   */
  getResourceObject() {
    return new Promise((resolve) => {
      resolve({
        type: 'upload',
        id: this.id,
        attributes: {
          name: this.name,
          type: this.type,
          size: this.size
        }
      });
    });
  }

  /**
   * Find the upload with the given id.
   * @param {String} id
   * @return {Promise<Upload>}
   */
  static findById(id) {
    return new Promise(function(resolve, reject) {
      let upload = UPLOADS[id];
      if (upload) {
        resolve(upload);
      } else {
        reject(new UploadNotFoundError('Couldn\'t find upload "' + id + '"', { id: id }));
      }
    });
  }

  /**
   * Create a new upload from a multer file object.
   * @param {Object} file
   * @return {Promise<Upload>}
   */
  static createFromFile(file) {
    return new Promise(function(resolve) {
      let upload = new Upload(file.filename, {
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        path: file.path
      });
      UPLOADS[upload.id] = upload;
      resolve(upload);
    });
  }
}

module.exports = Upload;

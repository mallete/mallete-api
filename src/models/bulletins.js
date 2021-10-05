const mongoose = require('mongoose')

// Schema
/*
    agreementDate: '28-06-2021',
    publicationDate: '29-06-2021',
    room: 'V',
    record: '1273/2021',
    plaintiff: 'FARMACIAS DE SIMILARES SA DE CV',
    defendant: 'H. AYUNTAMIENTO DE GUADALAJARA, TESORERIA MUNICIPAL, JEFE DEL DEPARTAMENTO DE CALIFICACION',
    thirdParty: '',
    rawContent: 'SE ABRE PERIODO DE ALEGATOS.',
    viewMoreUrl: '',
    secretary: 'LIC. MARIA ISABEL DE ANDA MUÑOZ'
 */
const trialBulletin = new mongoose.Schema({
  record: {
    type: String,
    required: true
  },
  plaintiff: {
    type: String,
    required: true
  },
  defendant: {
    type: String,
    required: true
  },
  thirdParty: {
    type: String
  },
  rawContent: {
    type: String
  },
  viewMoreUrl: {
    type: String
  },
  created: {
    type: Date,
    required: true
  },
  agreementDate: {
    type: String
  },
  agreementDateFormated: {
    type: Date
  },
  publicationDate: {
    type: String
  },
  publicationDateFormated: {
    type: Date
  }
})

const model = mongoose.model('trials', trialBulletin)

module.exports = model

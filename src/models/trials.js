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
const trialSchema = new mongoose.Schema({
  record: {
    type: String,
    required: true
  },
  plaintiff: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true
  },
  defendant: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  bulletins: [
    {
      type: String,
      user: {
        type: 'ObjectId',
        ref: 'bulletins'
      }
    }
  ]
})

const model = mongoose.model('trials', trialSchema)

module.exports = model

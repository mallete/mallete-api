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
const activeTrialSchema = new mongoose.Schema({
    active:{
        type: Boolean,
    },
    trial: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'trials'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    }
})

const model = mongoose.model('activeTrials', activeTrialSchema)

module.exports = model
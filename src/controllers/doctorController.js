const Doctor = require("../models/Doctor")

const createDoctor = async (req, res) => {
    const { name, crm, specialty, clinic, phone, favorite } = req.body
    try {
        const doctor = await Doctor.create({ name, crm, specialty, clinic, phone, favorite });
        console.log(`Medico ${doctor.name} criado`);
        res.status(201).send(doctor)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

//listar medicos
const getDoctor = async (req, res) => {
    const doctorId = req.params.id
    try {
        const doctor = await Doctor.findOne({
            where: { id: doctorId }
        });
        if (doctor) {
            res.status(200).send(doctor)
        } else {
            res.status(404).send({ message: `Médico não encontrado com o id ${doctorId}` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getAllDoctors = async (req, res) => {
    const favorite = req.query.favorite
    try {
        const where = favorite ? { where: { favorite } } : {}
        const doctors = await Doctor.findAll(where)
        if (doctors && doctors.length > 0) {
            res.status(200).send(doctors)
        } else {
            res.status(204).send()
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}
// const updateDoctorInDB = async ({ name, specialty, phone, crm, favorite, doctorId, clinic }) => {
//     const rowsUpdated = await Doctor.update({ name, crm, specialty, clinic, phone, favorite }, {
//         where: { id: doctorId }
//     })
//     return (rowsUpdated && rowsUpdated[0] > 0) ? true : false
// }

// const sendErrorMessage = error => {
//     res.status(500).send({ message: error.message })
// }

// const updateDoctor = async (req, res) => {
//     const doctorId = req.params.id
//     const { name, crm, specialty, clinic, phone, favorite } = req.body
//     try {
//         const doctorUpdated = await updateDoctorInDB({ name, specialty, phone, crm, favorite, doctorId, clinic })
//         doctorUpdated
//             ? res.status(200).send({ message: "Medico alterado com sucesso" })
//             : res.status(404).send({ message: "Medico nao encontrado para alterar" })
//     } catch (error) {
//         sendErrorMessage(error)
//     }
// }



const updateDoctor = async (req, res) => {
    const doctorId = req.params.id
    const { name, crm, specialty, clinic, phone, favorite } = req.body
    try {
        const rowsUpdated = await Doctor.update({ name, crm, specialty, clinic, phone, favorite }, {
            where: { id: doctorId }
        });
        if (rowsUpdated && rowsUpdated > 0) {
            res.status(200).send({ message: `${rowsUpdated[0]} medico(s) atualizado(s)` })
        } else {
            res.status(404).send({ message: `Medico com id ${doctorId} não encontrado para atualizar` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const updateFavorite = async (req, res) => {
    const doctorId = req.params.id
    const favorite = req.body.favorite
    try {
        const rowsUpdated = await Doctor.update({ favorite }, { where: { id: doctorId } });
        if (rowsUpdated && rowsUpdated > 0) {
            res.status(200).send({ message: `${rowsUpdated[0]} medico(s) com informação de favorito atualizada com sucesso` })
        } else {
            res.status(404).send({ message: `Medico com id ${doctorId} não encontrado para atualizar informação de favorito` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

}

const deleteDoctor = async (req, res) => {
    const doctorId = req.params.id
    try {
        const rowsDeleted = await Doctor.destroy({ where: { id: doctorId } });
        if (rowsDeleted) {
            res.status(200).send({ message: `${rowsDeleted[0]} medico(s) deletado(s) com sucesso` })
        } else {
            res.status(404).send({ message: `Medico com id ${doctorId} não encontrado para deletar` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}


module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor,
    updateFavorite,
    deleteDoctor
}
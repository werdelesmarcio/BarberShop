const express = require('express');
const router = express.Router();
const Barber = require('../models/Barber');

// create barber
router.post('/', async (req, res) => {
  try {
    console.log('POST /barbers - Recebido:', req.body);
    
    if (!req.body.name || !req.body.name.trim()) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const barber = await Barber.create({
      name: req.body.name.trim(),
      specialties: req.body.specialties || [],
    });

    console.log('Barbeiro criado:', barber);
    res.status(201).json(barber);
  } catch (err) {
    console.error('Erro ao criar barbeiro:', err);
    res.status(400).json({ error: err.message });
  }
});

// list all barbers
router.get('/', async (req, res) => {
  try {
    console.log('GET /barbers - Listando barbeiros');
    const barbers = await Barber.find();
    res.json(barbers);
  } catch (err) {
    console.error('Erro ao listar barbeiros:', err);
    res.status(500).json({ error: err.message });
  }
});

// get barber by id
router.get('/:id', async (req, res) => {
  try {
    console.log('GET /barbers/:id -', req.params.id);
    const barber = await Barber.findById(req.params.id);
    if (!barber) return res.status(404).json({ error: 'Not found' });
    res.json(barber);
  } catch (err) {
    console.error('Erro ao buscar barbeiro:', err);
    res.status(500).json({ error: err.message });
  }
});

// update barber
router.put('/:id', async (req, res) => {
  try {
    console.log('PUT /barbers/:id -', req.params.id, 'Dados:', req.body);
    
    if (!req.body.name || !req.body.name.trim()) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const barber = await Barber.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name.trim(),
        specialties: req.body.specialties || [],
      },
      { new: true, runValidators: true }
    );

    if (!barber) {
      return res.status(404).json({ error: 'Barbeiro não encontrado' });
    }

    console.log('Barbeiro atualizado:', barber);
    res.json(barber);
  } catch (err) {
    console.error('Erro ao atualizar barbeiro:', err);
    res.status(400).json({ error: err.message });
  }
});

// delete barber
router.delete('/:id', async (req, res) => {
  try {
    console.log('DELETE /barbers/:id -', req.params.id);
    
    const barber = await Barber.findByIdAndDelete(req.params.id);
    
    if (!barber) {
      return res.status(404).json({ error: 'Barbeiro não encontrado' });
    }

    console.log('Barbeiro deletado:', barber);
    res.json({ message: 'Barbeiro deletado com sucesso', barber });
  } catch (err) {
    console.error('Erro ao deletar barbeiro:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

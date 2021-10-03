import axios from 'axios';
import { Plant, User } from '../db/entities.js';
import { checkNotNull } from '../utils/checkNotNull.js';
import { toID } from '../utils/toID.js';

export const UserController = {
  async getUser(req, res) {
    const { id } = req.params;
    checkNotNull({ id });
    const user = await User.findById(toID(id));
    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }
    return res.send(user);
  },

  async getUserPlants(req, res) {
    const { id } = req.params;
    checkNotNull({ id });
    const user = await Plant.find({ userId: toID(id) }).sort({ createdAt: -1 }).exec();
    return res.send(user);
  },

  async updateProfile(req, res) {
    const { userId } = req;
    const { name, description, cep } = req.body;

    if (!name && !description && !cep) {
      return res.status(400).send({ error: 'Missing update values' });
    }

    const updateObj = {};
    if (name) {
      if (name.length < 3) {
        return res.status(401).send({ error: 'Name with less than 3 characters' });
      }
      updateObj.name = name;
    }

    if (description || description === null) {
      updateObj.description = description;
    }

    if (cep) {
      if (cep.length !== 8) {
        return res.status(401).send({ error: 'CEP without 8 characters' });
      }
      updateObj.cep = cep;
      const resCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (resCep.data.erro) {
        res.status(400).send({ error: resCep.data.erro });
      } else {
        updateObj.location = resCep.data;
      }
    }

    const newUser = await User.findByIdAndUpdate(userId, updateObj, { new: true }).exec();

    return res.send(newUser);
  },
};

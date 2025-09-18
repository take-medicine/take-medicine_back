import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModels.js'; // Importamos el modelo que acabamos de arreglar

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword 
    });

    // Remover la contraseña de la respuesta
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: userResponse
    });
  } catch (err) {
    console.error('Error creating user:', err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secreto_super_seguro',
      { expiresIn: '24h' }
    );

    // Remover contraseña de la respuesta
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({ 
      message: 'Login exitoso',
      user: userResponse, 
      token 
    });
  } catch (err) {
    console.error('Error in login:', err);
    next(err);
  }
};
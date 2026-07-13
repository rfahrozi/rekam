import { Request, Response } from 'express-serve-static-core';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_development_only';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, namaLengkap, statusPegawai, identitas, unitKerja, role } = req.body;

    // Validasi basic
    if (!email || !password || !namaLengkap || !identitas || !unitKerja) {
      res.status(400).json({ error: 'Data registrasi tidak lengkap' });
      return;
    }

    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { identitas }]
      }
    });

    if (existingUser) {
      res.status(400).json({ error: 'Email atau Nomor Identitas sudah terdaftar' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        namaLengkap,
        statusPegawai,
        identitas,
        unitKerja,
        role: role || 'peserta', // Default role
      }
    });

    // Jangan kembalikan password di response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: 'Registrasi berhasil',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body; // identifier bisa email atau NIP

    if (!identifier || !password) {
      res.status(400).json({ error: 'Identifier dan password harus diisi' });
      return;
    }

    // Cari user
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { identitas: identifier }]
      }
    });

    if (!user) {
      res.status(401).json({ error: 'Kredensial tidak valid' });
      return;
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Kredensial tidak valid' });
      return;
    }

    // Buat JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Jangan kembalikan password di response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: 'Login berhasil',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.user diset oleh auth middleware
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      res.status(404).json({ error: 'User tidak ditemukan' });
      return;
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
};

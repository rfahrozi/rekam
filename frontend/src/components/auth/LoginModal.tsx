import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../contexts/RoleContext';
import { useToast } from '../ui/toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const { pushToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Esc key listener to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login gagal');
      }

      // Simpan JWT di localStorage
      localStorage.setItem('diklat_token', data.token);

      // Set role via context based on token payload
      setRole(data.user.role);

      onClose();
      pushToast({
        title: 'Login Berhasil',
        description: `Selamat datang kembali, ${data.user.namaLengkap}.`,
        tone: 'success'
      });

      navigate('/dashboard');
    } catch (err: any) {
      pushToast({
        title: 'Login Gagal',
        description: err.message,
        tone: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop (Dark Overlay) */}
      <div
        className="absolute inset-0 bg-[#000000cc] backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container (Databuddy Split Screen Style) */}
      <div className="relative w-full max-w-4xl bg-[#0c0c0c] rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">

        {/* --- PANEL KIRI (Branding & Abstract Art) --- */}
        <div className="hidden md:flex md:w-1/2 relative flex-col justify-end p-12 overflow-hidden border-r border-white/5">
          {/* Efek abstrak background glow & gradient noise */}
          <div className="absolute inset-0 bg-[#111111]">
            <div className="absolute top-0 -left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px]" />

            {/* Tekstur "veins" mirip Databuddy */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
          </div>

          <div className="relative z-10 text-white space-y-4">
            <h2 className="text-4xl font-light tracking-tight leading-tight">
              Build <span className="font-semibold text-white">better competencies</span><br />
              with <span className="text-zinc-400 font-medium">REKAM</span>
            </h2>
            <p className="text-sm text-zinc-500 max-w-sm">
              Connect your data sources, build insights, and evaluate medical aparatus competencies with your team.
            </p>
          </div>
        </div>

        {/* --- PANEL KANAN (Form Input) --- */}
        <div className="w-full md:w-1/2 bg-[#0c0c0c] p-8 md:p-14 relative flex flex-col justify-center min-h-[550px]">

          {/* Tombol Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white rounded-full transition-colors flex items-center justify-center gap-1 group text-xs font-medium"
          >
            <svg className="w-4 h-4 mr-1 opacity-50 group-hover:opacity-100 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Header Branding */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              REKAM.
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white tracking-tight">Selamat datang kembali</h3>
            <p className="text-sm text-zinc-400 mt-2">Masuk ke akun Anda untuk melanjutkan perjalanan dengan REKAM</p>
          </div>

          {/* Opsi SSO / Pemisah Ala Databuddy */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#1a1a1a] hover:bg-[#252525] border border-white/5 text-zinc-300 text-sm font-medium transition-colors">
              Masuk dengan NIP
            </button>
            <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#1a1a1a] hover:bg-[#252525] border border-white/5 text-zinc-300 text-sm font-medium transition-colors">
              Masuk dengan SSO
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-white/5 flex-1"></div>
            <span className="text-xs text-zinc-600 font-medium uppercase tracking-wider">Atau</span>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Input Email */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Email / NIP*
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Masukkan email atau NIP Anda"
                className="w-full px-4 py-2.5 bg-[#1a1a1a] border-none text-white placeholder-zinc-600 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all duration-200"
              />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">
                Kata Sandi*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 bg-[#1a1a1a] border-none text-white placeholder-zinc-600 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="4" opacity={showPassword ? "1" : "0.5"} />
                  </svg>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-2.5 px-4 mt-4 rounded-md text-sm font-semibold text-black bg-zinc-100 hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all"
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <span>Masuk</span>
              )}
            </button>

            <div className="flex items-center justify-between mt-6">
              <p className="text-xs text-zinc-500">
                Belum punya akun? <span className="text-zinc-300 font-medium cursor-pointer hover:text-white transition-colors">Daftar</span>
              </p>
              <button
                type="button"
                className="text-xs font-medium text-zinc-500 hover:text-white transition-colors"
              >
                Lupa kata sandi?
              </button>
            </div>

            <div className="text-center pt-8 text-xs text-zinc-600">
              Diberdayakan oleh <span className="text-zinc-300 font-medium">REKAM</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

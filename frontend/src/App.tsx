import { useState } from 'react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProposalPage from './pages/ProposalPage';
import ProposalDetailPage from './pages/ProposalDetailPage';
import ProposalFormPage from './pages/ProposalFormPage';
import PostTrainingPage from './pages/PostTrainingPage';
import PostTrainingUploadPage from './pages/PostTrainingUploadPage';
import SertifikatPage from './pages/SertifikatPage';
import UserManagementPage from './pages/UserManagementPage';
import RoleDashboardPage from './pages/RoleDashboardPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminSidebar from './components/layout/AdminSidebar';
import LoginModal from './components/auth/LoginModal';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className={`min-h-screen ${isLandingPage ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${isLandingPage ? 'border-white/10 bg-black/60' : 'border-slate-200 bg-white/80'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-sm shadow-sm ${isLandingPage ? 'bg-zinc-800 text-white border border-white/10' : 'bg-blue-700 text-white'}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.2em] ${isLandingPage ? 'text-zinc-400' : 'text-blue-700'}`}>APLIKASI REKAM</p>
              <h1 className={`text-sm font-medium ${isLandingPage ? 'text-white' : 'text-slate-900'}`}>RSJKO Engku Haji Daud</h1>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-2 text-sm font-medium">
              {!isLandingPage && (
                <>
                  <NavLink to="/dashboard" className={({ isActive }) => `rounded-full px-3 py-2 ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/proposal" className={({ isActive }) => `rounded-full px-3 py-2 ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                    Pengajuan
                  </NavLink>
                  <NavLink to="/post-training" className={({ isActive }) => `rounded-full px-3 py-2 ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                    Pasca Diklat
                  </NavLink>
                  <NavLink to="/sertifikat" className={({ isActive }) => `rounded-full px-3 py-2 ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                    Sertifikat
                  </NavLink>
                </>
              )}
            </nav>

            {/* Dropdown Login Menu */}
            <div className="relative group inline-block">
              <button className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${isLandingPage ? 'text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5' : 'text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
                Akses Portal
                <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-transform group-hover:-rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                <div className={`rounded-xl border shadow-2xl p-2 ring-1 ${isLandingPage ? 'bg-zinc-950/90 backdrop-blur-xl border-white/10 ring-white/5' : 'bg-white border-slate-200 ring-black/5'}`}>
                  <div className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider mb-1 ${isLandingPage ? 'text-zinc-500' : 'text-slate-400'}`}>
                    Portal Login
                  </div>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className={`w-full text-left flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${isLandingPage ? 'text-zinc-300 hover:bg-white/10 hover:text-white' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <svg className={`w-4 h-4 ${isLandingPage ? 'text-zinc-400' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <div className={`font-medium ${isLandingPage ? 'text-white' : 'text-slate-900'}`}>Masuk Pegawai</div>
                      <div className={`text-xs ${isLandingPage ? 'text-zinc-500' : 'text-slate-500'}`}>NIP / Email Anda</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      <main className={`mx-auto max-w-7xl px-6 py-8 ${isLandingPage ? 'pt-0' : ''}`}>
        <div className="flex flex-col gap-6 lg:flex-row">
          {!isLandingPage && <AdminSidebar />}
          <div className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/role-dashboard" element={<ProtectedRoute allowedRoles={['admin', 'bagian_diklat', 'unit_kerja', 'direktur', 'peserta']}><RoleDashboardPage /></ProtectedRoute>} />
              <Route path="/proposal" element={<ProtectedRoute allowedRoles={['admin', 'bagian_diklat', 'unit_kerja', 'direktur']}><ProposalPage /></ProtectedRoute>} />
              <Route path="/proposal/:id" element={<ProtectedRoute allowedRoles={['admin', 'bagian_diklat', 'unit_kerja', 'direktur']}><ProposalDetailPage /></ProtectedRoute>} />
              <Route path="/proposal/form" element={<ProtectedRoute allowedRoles={['admin', 'bagian_diklat', 'unit_kerja', 'direktur', 'peserta']}><ProposalFormPage /></ProtectedRoute>} />
              <Route path="/post-training" element={<ProtectedRoute allowedRoles={['admin', 'bagian_diklat', 'peserta', 'unit_kerja']}><PostTrainingPage /></ProtectedRoute>} />
              <Route path="/post-training/upload" element={<ProtectedRoute allowedRoles={['admin', 'bagian_diklat', 'peserta', 'unit_kerja']}><PostTrainingUploadPage /></ProtectedRoute>} />
              <Route path="/sertifikat" element={<ProtectedRoute allowedRoles={['admin', 'bagian_diklat', 'peserta', 'unit_kerja']}><SertifikatPage /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagementPage /></ProtectedRoute>} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Routes>
          </div>
        </div>
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

export default App;

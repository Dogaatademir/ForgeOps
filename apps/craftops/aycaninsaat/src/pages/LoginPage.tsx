import { useState } from "react";
import { User, Lock, ArrowRight, Building2, AlertCircle } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // .env dosyasından bilgileri alıyoruz
  const ENV_USER = import.meta.env.VITE_ADMIN_USER;
  const ENV_PASS = import.meta.env.VITE_ADMIN_PASS;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simüle edilmiş giriş gecikmesi
    setTimeout(() => {
      // 1. .env'de tanımlı değilse (Geliştirici uyarısı)
      if (!ENV_USER || !ENV_PASS) {
        setError("Sistem Hatası: .env dosyasında kullanıcı bilgileri tanımlanmamış.");
        setLoading(false);
        return;
      }

      // 2. Doğrulama Kontrolü
      if (username === ENV_USER && password === ENV_PASS) {
        // BAŞARILI
        setLoading(false);
        onLogin();
      } else {
        // HATALI
        setError("Hatalı kullanıcı adı veya şifre.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-10 shadow-2xl border-t-4 border-neutral-500 relative">
        
        {/* Logo & Başlık */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-neutral-900 text-white flex items-center justify-center rounded-full mb-4 shadow-lg">
            <Building2 size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-light tracking-tight text-neutral-900">AYCAN İNŞAAT</h1>
          <p className="text-sm text-neutral-400 font-light mt-1">Finans Paneli Girişi</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 flex items-center gap-2 border border-red-100">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-400 tracking-wider uppercase ml-1">Kullanıcı Adı</label>
            <div className="relative">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-neutral-50 border border-neutral-200 text-neutral-900 outline-none focus:border-neutral-900 focus:bg-white transition-all font-light"
                placeholder="Kullanıcı adınız..."
              />
              <User className="absolute left-4 top-4 text-neutral-400" size={20} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-400 tracking-wider uppercase ml-1">Şifre</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-neutral-50 border border-neutral-200 text-neutral-900 outline-none focus:border-neutral-900 focus:bg-white transition-all font-light"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-4 text-neutral-400" size={20} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 bg-neutral-900 text-white font-medium tracking-wide hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                GİRİŞ YAP <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Powered by CraftOps</p>
        </div>
      </div>
    </div>
  );
}
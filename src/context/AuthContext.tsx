import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserStatus } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  entitlements: string[];
  isLoading: boolean;
  enterDirectly: (name?: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  hasAccess: (productId: string) => boolean;
  toggleTestLicense: (productId: string) => Promise<boolean>;
  isAuthModalOpen: boolean;
  authModalProduct?: string;
  openAuthModal: (product?: string) => void;
  closeAuthModal: () => void;
  getUserStatusForProduct: (productId: string) => UserStatus;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'ai_quantum_auth_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [entitlements, setEntitlements] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalProduct, setAuthModalProduct] = useState<string | undefined>(undefined);

  // Validate session on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setEntitlements(data.entitlements || []);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setUser(null);
          setEntitlements([]);
        }
      } catch (err) {
        console.error('Error fetching current user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, [token]);

  // Entrar directamente con un solo clic
  const enterDirectly = async (name: string = 'Visitante Quantum', email?: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/direct-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
        setEntitlements(data.entitlements || []);
        setIsAuthModalOpen(false);
        setAuthModalProduct(undefined);
        return { success: true };
      }
      return { success: false, error: data.error || 'Error al entrar directamente.' };
    } catch (err) {
      // Fallback local seguro si hubiera interrupción de red
      const fallbackUser = {
        id: `usr_${Date.now()}`,
        email: email || 'acceso_directo@aiquantum.studio',
        name,
        createdAt: new Date().toISOString(),
      };
      const allProductIds = ['dividi-mesa', 'tip-quantum', 'turno-pulse', 'margin-quote', 'kitchen-flow', 'dashboard-ventas'];
      setUser(fallbackUser);
      setEntitlements(allProductIds);
      setIsAuthModalOpen(false);
      setAuthModalProduct(undefined);
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Credenciales inválidas' };
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      setEntitlements(data.entitlements || []);
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Error de conexión con el servidor.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
      setEntitlements([]);
    }
  };

  const hasAccess = (productId: string): boolean => {
    if (!user) return false;
    return entitlements.includes(productId);
  };

  const getUserStatusForProduct = (productId: string): UserStatus => {
    if (!user) return 'guest';
    if (entitlements.includes(productId)) return 'authorized';
    return 'registered';
  };

  const toggleTestLicense = async (productId: string): Promise<boolean> => {
    if (!token) {
      await enterDirectly();
      return true;
    }

    try {
      const res = await fetch('/api/entitlements/toggle-test-license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        const data = await res.json();
        setEntitlements(data.entitlements);
        return data.hasAccess;
      }
      return false;
    } catch (err) {
      console.error('Toggle test license error:', err);
      return false;
    }
  };

  const openAuthModal = (product?: string) => {
    setAuthModalProduct(product);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalProduct(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        entitlements,
        isLoading,
        enterDirectly,
        login,
        logout,
        hasAccess,
        toggleTestLicense,
        isAuthModalOpen,
        authModalProduct,
        openAuthModal,
        closeAuthModal,
        getUserStatusForProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

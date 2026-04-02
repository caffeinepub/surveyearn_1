import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createActorWithConfig } from "./config";

const TOKEN_KEY = "surveye_token";

export interface UserProfile {
  userId: string;
  username: string;
  balance: bigint;
}

type AppBackend = {
  register: (u: string, p: string) => Promise<{ ok: string } | { err: string }>;
  login: (u: string, p: string) => Promise<{ ok: string } | { err: string }>;
  getProfile: (t: string) => Promise<{ ok: UserProfile } | { err: string }>;
  logout: (t: string) => Promise<boolean>;
};

interface AuthContextValue {
  token: string | null;
  profile: UserProfile | null;
  login: (token: string, profile: UserProfile) => void;
  logout: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  isLoading: boolean;
  getActor: () => Promise<AppBackend>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function getBackend(): Promise<AppBackend> {
  return createActorWithConfig() as unknown as AppBackend;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      getBackend()
        .then((actor) =>
          actor.getProfile(stored).then((res) => {
            if ("ok" in res) {
              setToken(stored);
              setProfile(res.ok);
            } else {
              localStorage.removeItem(TOKEN_KEY);
            }
            setIsLoading(false);
          }),
        )
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  function login(newToken: string, newProfile: UserProfile) {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setProfile(newProfile);
  }

  async function logout() {
    if (token) {
      try {
        const actor = await getBackend();
        await actor.logout(token);
      } catch {}
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setProfile(null);
  }

  async function refreshBalance() {
    if (!token) return;
    try {
      const actor = await getBackend();
      const res = await actor.getProfile(token);
      if ("ok" in res) {
        setProfile(res.ok);
      }
    } catch {}
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        profile,
        login,
        logout,
        refreshBalance,
        isLoading,
        getActor: getBackend,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

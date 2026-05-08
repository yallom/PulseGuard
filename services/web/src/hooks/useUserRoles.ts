import { useState, useEffect } from 'react';
import { SERVER_URL } from '@/common/serverConfig';

interface UserData {
  role: string;
  id: number;
  lang: string;
  name: string;
}

export const useUserRole = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const authToken = sessionStorage.getItem('authToken');
      const iduser = sessionStorage.getItem('iduser');

      if (!authToken || !iduser) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${SERVER_URL}/user/get/${iduser}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }

        const userData: UserData = await response.json();
        setRole(userData.role);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar role:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { role, loading, error };
};
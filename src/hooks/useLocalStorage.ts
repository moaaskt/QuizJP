import { useState, useEffect } from 'react';

/**
 * Hook personalizado para utilizar o localStorage do navegador de forma reativa.
 * Permite armazenar e recuperar dados no localStorage com atualização de estado React.
 *
 * @param key 
 * @param initialValue
 * @returns 
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado que armazena o valor local (localStorage ou valor inicial)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Tenta pegar o item salvo no localStorage
      const item = window.localStorage.getItem(key);
      
      // Se existir, retorna o valor parseado como JSON
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Em caso de erro na leitura
      console.error(`Erro ao ler a chave "${key}" do localStorage:`, error);
      return initialValue;
    }
  });

  // Função para atualizar o valor no localStorage e no estado
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      
      setStoredValue(valueToStore);

      
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Em caso de erro
      console.error(`Erro ao salvar a chave "${key}" no localStorage:`, error);
    }
  };

  // Retorna o valor armazenado e a função para atualizá-lo
  return [storedValue, setValue] as const;
}
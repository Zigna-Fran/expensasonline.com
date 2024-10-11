import React, { createContext, useContext, useState, useCallback } from 'react';
import CryptoJS from 'crypto-js';

interface EncryptionContextType {
  encrypt: (data: string) => string;
  decrypt: (encryptedData: string) => string;
}

const EncryptionContext = createContext<EncryptionContextType | undefined>(undefined);

export const useEncryption = () => {
  const context = useContext(EncryptionContext);
  if (!context) {
    throw new Error('useEncryption must be used within an EncryptionProvider');
  }
  return context;
};

export const EncryptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [secretKey] = useState(() => CryptoJS.lib.WordArray.random(256 / 8).toString());

  const encrypt = useCallback((data: string) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }, [secretKey]);

  const decrypt = useCallback((encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }, [secretKey]);

  return (
    <EncryptionContext.Provider value={{ encrypt, decrypt }}>
      {children}
    </EncryptionContext.Provider>
  );
};
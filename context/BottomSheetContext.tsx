import React, { createContext, useContext, useState, useCallback } from 'react';
import CustomBottomSheet from '@/components/CustomBottomSheet';

type BottomSheet = {
  id: number;
  content: React.ReactNode;
};

type BottomSheetContextType = {
  bottomSheets: BottomSheet[];
  addBottomSheet: (content: React.ReactNode) => number;
  removeBottomSheet: (id: number) => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export const BottomSheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [bottomSheets, setBottomSheets] = useState<BottomSheet[]>([]);

  const addBottomSheet = useCallback((content: React.ReactNode): number => {
    const id = Date.now();
    console.log("Adding Bottom Sheet with id", id)
    setBottomSheets(prev => {
        const newSheets = [...prev, { id, content }]
        console.log("New Sheets", newSheets)
        return newSheets
    });
    return id;
  }, []);

  const removeBottomSheet = useCallback((id: number) => {
    setBottomSheets(prev => prev.filter(sheet => sheet.id !== id));
  }, []);

  return (
    <BottomSheetContext.Provider value={{ bottomSheets, addBottomSheet, removeBottomSheet }}>
      {children}
      {bottomSheets.map(sheet => (
        <CustomBottomSheet key={sheet.id} id={sheet.id}>
          {sheet.content}
        </CustomBottomSheet>
      ))}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};

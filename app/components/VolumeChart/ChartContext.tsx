import React, { createContext, useContext, useState } from 'react';

type ChartContextType = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
};

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const ChartProvider: React.FC = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<string>('30'); 

  return (
    <ChartContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChart = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a ChartProvider');
  }
  return context;
};

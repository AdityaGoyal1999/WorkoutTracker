import React, { useRef, useCallback } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useBottomSheet } from '@/context/BottomSheetContext';

interface CustomBottomSheetProps {
  id: number;
  children: React.ReactNode;
}

const CustomBottomSheet = ({ id, children }: CustomBottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { removeBottomSheet } = useBottomSheet();

  const handleClose = () => {
    removeBottomSheet(id);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={['95%']}
      enablePanDownToClose
      onClose={handleClose}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={{ flex: 1 }}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
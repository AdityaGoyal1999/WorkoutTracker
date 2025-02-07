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
    // First animate the sheet down
    bottomSheetRef.current?.close();
    // Remove from context after animation (default animation is 500ms)
    setTimeout(() => {
      removeBottomSheet(id);
    }, 500);
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
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Platform, Alert, Modal } from 'react-native';
import { FONT_FAMILY } from '../../theme/typography';
import type { ShiftResponse } from '../../types/shift.types';

interface Props {
  visible: boolean;
  onClose: () => void;
  shifts: ShiftResponse[];
}

const CancelShiftsModal: React.FC<Props> = ({ visible, onClose, shifts }) => {
  const totalPenalty = shifts.reduce((sum, shift) => sum + (shift.penaltyAmount || 0), 0);
  const shiftCount = shifts.length;

  const handleConfirmPay = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Payment feature is coming soon!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Coming Soon', 'Payment feature is coming soon!');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Cancel Shifts?</Text>
          <Text style={styles.desc}>
            Canceling today's shifts will incur a penalty of ₹10 for every shift canceled. This action cannot be undone.
          </Text>

          <View style={styles.penaltyBox}>
            <View style={styles.row}>
              <Text style={styles.penaltyLabel}>Penalty ({shiftCount} shift{shiftCount > 1 ? 's' : ''})</Text>
              <Text style={styles.penaltyValue}>₹{totalPenalty}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Penalty</Text>
              <Text style={styles.totalValue}>₹{totalPenalty}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmPay} activeOpacity={0.85}>
            <Text style={styles.confirmBtnText}>CONFIRM & PAY PENALTY</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.goBackBtn} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.goBackBtnText}>GO BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#0A1730',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.outfitBold,
    color: '#0F172A',
    marginBottom: 12,
  },
  desc: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.outfitRegular,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 20,
  },
  penaltyBox: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#FEE2E2',
    marginVertical: 12,
  },
  penaltyLabel: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.outfitRegular,
    color: '#475569',
  },
  penaltyValue: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bricolageBold,
    color: '#DC2626',
  },
  totalLabel: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.outfitBold,
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.bricolageBold,
    color: '#DC2626',
  },
  confirmBtn: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmBtnText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.outfitBold,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  goBackBtn: {
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  goBackBtnText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.outfitBold,
    color: '#475569',
    letterSpacing: 0.5,
  },
});

export default CancelShiftsModal;

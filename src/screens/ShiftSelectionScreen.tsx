import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Info, Sun, Coffee, Utensils, SunDim, Sunset, Moon, Check, Lock, X } from 'lucide-react-native';
import { FONT_FAMILY } from '../theme/typography';
import useAuthStore from '../hooks/useAuthStore';
import shiftService from '../services/shift.service';
import type { ShiftResponse } from '../types/shift.types';
import CancelShiftsModal from '../components/shifts/CancelShiftsModal';
import HowItWorksModal from '../components/shifts/HowItWorksModal';

type DayTab = 'today' | 'tomorrow';

// Local date string YYYY-MM-DD (offset 0 = today, 1 = tomorrow)
const getDateStr = (offset: number = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const formatDateDisplay = (dateStr: string): string => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const TODAY_STR = getDateStr(0);
const TOMORROW_STR = getDateStr(1);

const getShiftIcon = (code: string, color: string) => {
  const size = 20;
  if (!code) return <Sun size={size} color={color} />;
  const c = code.toUpperCase();
  if (c.includes('MORNING')) return <Sun size={size} color={color} />;
  if (c.includes('BREAKFAST')) return <Coffee size={size} color={color} />;
  if (c.includes('BRUNCH')) return <Sun size={size} color={color} />;
  if (c.includes('LUNCH')) return <Utensils size={size} color={color} />;
  if (c.includes('AFTERNOON')) return <SunDim size={size} color={color} />;
  if (c.includes('EVENING')) return <Sunset size={size} color={color} />;
  if (c.includes('NIGHT')) return <Moon size={size} color={color} />;
  return <Sun size={size} color={color} />;
};

const ShiftSelectionScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { authData } = useAuthStore();
  const partnerId = authData?.partnerId ?? '';

  const [activeTab, setActiveTab] = useState<DayTab>('today');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Server state for active tab
  const [shifts, setShifts] = useState<ShiftResponse[]>([]);
  
  // UI selection state (local changes)
  const [selectedForBooking, setSelectedForBooking] = useState<Set<string>>(new Set());
  const [selectedForCancellation, setSelectedForCancellation] = useState<Set<string>>(new Set());

  // Modals
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const activeDateStr = activeTab === 'today' ? TODAY_STR : TOMORROW_STR;

  const loadShifts = useCallback(async () => {
    if (!partnerId) return;
    setLoading(true);
    try {
      const data = await shiftService.getShifts(partnerId, activeDateStr);
      setShifts(data);
      setSelectedForBooking(new Set());
      setSelectedForCancellation(new Set());
    } catch {
      // network failure — leave lists empty, user can retry
    } finally {
      setLoading(false);
    }
  }, [partnerId, activeDateStr]);

  useEffect(() => {
    loadShifts();
  }, [loadShifts]);

  const toggleBooking = (shiftCode: string) => {
    setSelectedForBooking(prev => {
      const next = new Set(prev);
      next.has(shiftCode) ? next.delete(shiftCode) : next.add(shiftCode);
      return next;
    });
  };

  const toggleCancellation = (shiftId: string) => {
    setSelectedForCancellation(prev => {
      const next = new Set(prev);
      next.has(shiftId) ? next.delete(shiftId) : next.add(shiftId);
      return next;
    });
  };

  const handleClearAll = () => {
    setSelectedForBooking(new Set());
    setSelectedForCancellation(new Set());
  };

  const totalEstimatedEarnings = useMemo(() => {
    let sum = 0;
    shifts.forEach(s => {
      // If booked and not cancelling, or not booked but booking
      const isCancelling = s.id && selectedForCancellation.has(s.id);
      const isBooking = selectedForBooking.has(s.shiftCode);
      if ((s.isBooked && !isCancelling) || (!s.isBooked && isBooking)) {
        sum += s.estimatedEarnings || 0;
      }
    });
    return sum;
  }, [shifts, selectedForBooking, selectedForCancellation]);

  const hasChanges = selectedForBooking.size > 0 || selectedForCancellation.size > 0;

  const handleSave = async () => {
    if (!hasChanges) return;
    
    if (selectedForCancellation.size > 0) {
      // Show Penalty Modal if there are cancellations
      setShowCancelModal(true);
    } else {
      // Direct booking
      executeBooking();
    }
  };

  const executeBooking = async () => {
    setSaving(true);
    try {
      if (selectedForBooking.size > 0) {
        await shiftService.bookShiftsBatch(partnerId, {
          shiftDate: activeDateStr,
          shiftCodes: Array.from(selectedForBooking),
        });
      }
      
      // Schedule local notifications for these shifts in future update
      // scheduleShiftNotifications(Array.from(selectedForBooking));
      
      if (Platform.OS === 'android') {
        ToastAndroid.show('Shifts updated successfully', ToastAndroid.SHORT);
      } else {
        Alert.alert('Updated', 'Your shifts have been saved.');
      }
      loadShifts();
    } catch (err: any) {
      Alert.alert('Failed', err?.message ?? 'Could not update shifts. Try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Shifts</Text>
          <Text style={styles.headerSubtitle}>Choose your shifts</Text>
        </View>
        <TouchableOpacity style={styles.howItWorksBtn} onPress={() => setShowHowItWorks(true)}>
          <Info size={14} color="#1D6BFC" style={{ marginRight: 4 }} />
          <Text style={styles.howItWorksText}>How it works</Text>
        </TouchableOpacity>
      </View>

      {/* Day Tabs */}
      <View style={styles.tabRow}>
        <View style={styles.tabsContainer}>
          {(['today', 'tomorrow'] as DayTab[]).map(tab => {
            const isActive = activeTab === tab;
            const dateStr = tab === 'today' ? TODAY_STR : TOMORROW_STR;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.75}>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab === 'today' ? 'Today' : 'Tomorrow'}
                </Text>
                <Text style={[styles.tabDate, isActive && styles.tabDateActive]}>
                  {formatDateDisplay(dateStr)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.calendarIconBox}>
          <CalendarIcon size={20} color="#64748B" />
        </View>
      </View>

      {/* Static Info Box */}
      <View style={styles.infoBox}>
        <Info size={18} color="#475569" />
        <View style={styles.infoTextCol}>
          <Text style={styles.infoTitle}>High demand expected tomorrow!</Text>
          <Text style={styles.infoSubtitle}>Book your shifts early to earn more.</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#1A6BFF" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {shifts.map(shift => {
            const isCancelling = shift.id ? selectedForCancellation.has(shift.id) : false;
            const isBooking = selectedForBooking.has(shift.shiftCode);
            
            const isHighDemand = shift.demandLevel?.toLowerCase().includes('high');
            const demandColor = isHighDemand ? '#DC2626' : '#64748B';
            const durationDisplay = shift.shiftDuration || shift.totalShiftHours || shift.durationText || '2h';

            return (
              <TouchableOpacity
                key={shift.id || shift.shiftCode}
                style={[
                  styles.shiftRow,
                  isBooking && styles.shiftRowSelected,
                  isCancelling && styles.shiftRowCancel,
                  !shift.canBook && !shift.isBooked && styles.shiftRowDisabled,
                ]}
                disabled={!shift.canBook && !shift.isBooked}
                onPress={() => {
                  if (shift.isBooked && shift.id) {
                    toggleCancellation(shift.id);
                  } else if (shift.canBook) {
                    toggleBooking(shift.shiftCode);
                  }
                }}
                activeOpacity={0.8}
              >
                {/* Left Icon */}
                <View style={[styles.iconWrap, (isBooking || shift.isBooked) ? styles.iconWrapActive : {}]}>
                  {getShiftIcon(shift.shiftCode, (isBooking || shift.isBooked) ? '#FFFFFF' : '#1D6BFC')}
                </View>

                {/* Middle Info */}
                <View style={styles.shiftInfo}>
                  <Text style={[styles.shiftWindow, (isBooking || shift.isBooked) && { color: '#0F172A' }]}>
                    {shift.shiftWindow}
                  </Text>
                  <Text style={styles.shiftName}>{shift.shiftName}</Text>
                  <Text style={styles.shiftMeta}>
                    <Text style={{ fontSize: 11 }}>🕓</Text> {durationDisplay}  •  
                    <Text style={{ color: demandColor, fontFamily: FONT_FAMILY.outfitBold }}> {shift.demandLevel || 'Normal'}</Text>
                  </Text>
                </View>

                {/* Right Area */}
                <View style={styles.shiftRight}>
                  <Text style={styles.earning}>
                    <Text style={{ fontSize: 12 }}>₹</Text>{shift.estimatedEarnings}
                  </Text>
                  <Text style={styles.estLabel}>Est. Earnings</Text>

                  <View style={{ marginTop: 8 }}>
                    {shift.isLocked ? (
                      <View style={styles.statusBadgeWrap}>
                        <View style={styles.greenTick}><Check size={11} color="#FFF" strokeWidth={3} /></View>
                        <View style={[styles.lockBox, isCancelling && styles.lockBoxCancel]}>
                          {isCancelling ? <X size={12} color="#DC2626" strokeWidth={3} /> : <Lock size={12} color="#64748B" />}
                        </View>
                      </View>
                    ) : shift.isBooked ? (
                      <View style={styles.statusBadgeWrap}>
                        <View style={styles.greenTick}><Check size={11} color="#FFF" strokeWidth={3} /></View>
                        <View style={[styles.lockBox, isCancelling && styles.lockBoxCancel]}>
                          {isCancelling ? <X size={12} color="#DC2626" strokeWidth={3} /> : <Lock size={12} color="#64748B" />}
                        </View>
                      </View>
                    ) : shift.canBook ? (
                      <View style={[styles.checkbox, isBooking && styles.checkboxActive]}>
                        {isBooking && <Check size={12} color="#FFF" strokeWidth={3} />}
                      </View>
                    ) : (
                      <View style={styles.checkboxDisabled} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* Footer */}
      {!loading && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          {hasChanges && (
            <TouchableOpacity onPress={handleClearAll} style={styles.clearAllBtn}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          )}
          <View style={styles.footerTop}>
            <Text style={styles.footerLabel}>Estimated Total Earnings</Text>
            <Text style={styles.footerValue}>₹{totalEstimatedEarnings}</Text>
          </View>
          <TouchableOpacity
            style={[styles.saveBtn, (!hasChanges || saving) && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={!hasChanges || saving}
            activeOpacity={0.85}>
            {saving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.saveBtnText}>
                {hasChanges ? 'SAVE CHANGES' : 'UP TO DATE'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <CancelShiftsModal
        visible={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        shifts={shifts.filter(s => s.id && selectedForCancellation.has(s.id))}
      />
      
      <HowItWorksModal
        visible={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.bricolageBold,
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.outfitRegular,
    color: '#64748B',
    marginTop: 2,
  },
  howItWorksBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  howItWorksText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.outfitBold,
    color: '#1D6BFC',
  },

  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  tabActive: {
    borderColor: '#1D6BFC',
    backgroundColor: '#1D6BFC',
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.outfitBold,
    color: '#64748B',
    marginBottom: 2,
  },
  tabLabelActive: { color: '#FFFFFF' },
  tabDate: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.outfitRegular,
    color: '#94A3B8',
  },
  tabDateActive: { color: '#DBEAFE' },
  
  calendarIconBox: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
  },

  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  infoTextCol: {
    marginLeft: 10,
    flex: 1,
  },
  infoTitle: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.outfitBold,
    color: '#334155',
  },
  infoSubtitle: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.outfitRegular,
    color: '#64748B',
  },

  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  scroll: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  shiftRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  shiftRowSelected: {
    borderColor: '#F5A623',
    backgroundColor: '#FFFBF2',
  },
  shiftRowCancel: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  shiftRowDisabled: {
    backgroundColor: '#F8FAFC',
    borderColor: '#F1F5F9',
    opacity: 0.6,
  },
  
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconWrapActive: {
    backgroundColor: '#1D6BFC',
  },
  
  shiftInfo: { flex: 1 },
  shiftWindow: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.bricolageBold,
    color: '#334155',
    marginBottom: 2,
  },
  shiftName: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.outfitBold,
    color: '#64748B',
    marginBottom: 4,
  },
  shiftMeta: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.outfitRegular,
    color: '#94A3B8',
  },

  shiftRight: { alignItems: 'flex-end' },
  earning: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.bricolageBold,
    color: '#16A34A',
  },
  estLabel: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.outfitRegular,
    color: '#94A3B8',
    marginTop: 2,
  },
  
  statusBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenTick: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  lockBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -6,
    paddingLeft: 4,
  },
  lockBoxCancel: {
    backgroundColor: '#FEE2E2',
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#F5A623',
    borderColor: '#F5A623',
  },
  checkboxDisabled: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#F1F5F9',
  },

  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  clearAllBtn: {
    alignSelf: 'center',
    padding: 8,
    marginBottom: 4,
  },
  clearAllText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.outfitBold,
    color: '#64748B',
    textDecorationLine: 'underline',
  },
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLabel: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.outfitBold,
    color: '#0F172A',
  },
  footerValue: {
    fontSize: 22,
    fontFamily: FONT_FAMILY.bricolageBold,
    color: '#16A34A',
  },
  saveBtn: {
    backgroundColor: '#F5A623',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnText: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.outfitBold,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});

export default ShiftSelectionScreen;

export type ShiftType = 'EARLY_MORNING' | 'BREAKFAST' | 'BRUNCH' | 'LUNCH' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
export type ShiftStatus = 'CONFIRMED' | 'CANCELLED' | 'AVAILABLE';

export interface ShiftResponse {
  id: string | null;           // null if not booked
  shiftCode: string;           // Maps to ShiftType or similar
  shiftName: string;           
  shiftWindow: string;         
  shiftDuration?: string;      // Expected from new API (fallback to durationText/totalShiftHours)
  durationText?: string;
  totalShiftHours?: string;
  estimatedEarnings: number;
  demandLevel: string;         // 'High demand' | 'Medium demand' | 'Low demand'
  isBooked: boolean;           // true if active confirmed booking exists
  isLocked: boolean;           // true if today + booked (cannot cancel for free)
  canBook: boolean;            // false if today (same-day booking disabled)
  penaltyAmount: number;       // ₹10.00 for today cancels, ₹0.00 for tomorrow
  status?: ShiftStatus;        // fallback if needed
}

export interface ShiftBookingBatchRequest {
  shiftDate: string;
  shiftCodes: string[];
}

export const SHIFT_LABELS: Record<string, string> = {
  EARLY_MORNING: 'Early Morning Shift',
  BREAKFAST: 'Breakfast Shift',
  BRUNCH: 'Brunch Shift',
  LUNCH: 'Lunch Shift',
  AFTERNOON: 'Afternoon Shift',
  EVENING: 'Evening Shift',
  NIGHT: 'Night Shift',
};

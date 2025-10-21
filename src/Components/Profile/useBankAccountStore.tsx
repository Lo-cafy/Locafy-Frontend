import { create } from 'zustand'; // Import zustand
import api from '@/Api/baseurl';

// --- Interfaces and Initial Data (No changes needed) ---

export interface BankAccount {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName?: string;
  accountType: string;
  isPrimary: boolean;
}

export const initialDataState: BankAccount = {
  accountHolderName: '',
  accountNumber: '',
  ifscCode: '',
  bankName: '',
  branchName: '',
  accountType: 'savings',
  isPrimary: true,
};

// --- Zustand Store Definition ---

interface BankAccountStore {
  account: BankAccount | null; // The "source of truth" from server
  data: BankAccount; // The form/editing state
  loading: boolean;
  edit: boolean;
  errors: any;
  err: string;
  success: string;
  fetchAccount: () => Promise<void>;
  submit: () => Promise<void>;
  change: (key: string, value: any) => void;
  handleCancel: () => void;
  setEdit: (isEditing: boolean) => void;
}

const useBankAccountStore = create<BankAccountStore>((set, get) => ({
  // Initial state
  account: null,
  data: initialDataState,
  loading: true, // Start loading on init
  edit: false,
  errors: {},
  err: '',
  success: '',

  // --- Actions ---

  // Fetches data and syncs both 'account' and 'data' states
  fetchAccount: async () => {
    set({ loading: true, err: '' });
    try {
      const res = await api.get('/bank-account', { withCredentials: true });
      if (res.data.success && res.data.data) {
        // Data found: update both account (source) and data (form)
        set({
          account: res.data.data,
          data: res.data.data,
          edit: false,
        });
      } else {
        // No data found: clear account, reset form, and force edit mode
        set({
          account: null,
          data: initialDataState,
          edit: true,
        });
      }
    } catch (error) {
      console.error('Failed to fetch bank details', error);
      // On error, also reset and force edit mode
      set({
        account: null,
        data: initialDataState,
        edit: true,
      });
    } finally {
      set({ loading: false });
    }
  },

  // Updates the form state ('data')
  change: (key: string, value: any) => {
    set((state) => ({
      data: { ...state.data, [key]: value },
      // Clear the specific error for this field
      errors: { ...state.errors, [key]: undefined },
    }));
  },

  // Handles form submission
  submit: async () => {
    set({ err: '', success: '' });

    // --- Validation (now inside the action) ---
    const data = get().data; // Get current form data
    const e: any = {};
    if (!data.accountHolderName || data.accountHolderName.length < 2)
      e.accountHolderName = 'Min 2 characters required';
    if (!/^\d{9,18}$/.test(data.accountNumber))
      e.accountNumber = 'A valid account number is required (9–18 digits)';
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifscCode))
      e.ifscCode = 'Invalid IFSC format (e.g., HDFC0001234)';
    if (!data.bankName) e.bankName = 'Bank name is required';
    
    set({ errors: e });

    if (Object.keys(e).length > 0) {
      return set({ err: 'Please fix validation errors' });
    }
    // --- End Validation ---

    set({ loading: true });
    try {
      const res = await api.post('/bank-account', data, {
        withCredentials: true,
      });
      if (res.data.success) {
        set({ success: 'Bank account saved successfully!', edit: false });
        get().fetchAccount(); // Re-fetch data to sync state
        setTimeout(() => set({ success: '' }), 3000);
      }
    } catch (err: any) {
      set({ err: err.response?.data?.message || 'Failed to save bank account' });
    } finally {
      set({ loading: false });
    }
  },

  // Resets form data to its last saved state
  handleCancel: () => {
    const account = get().account;
    set({
      data: account ? account : initialDataState,
      edit: false,
      err: '',
      errors: {},
    });
  },

  // Manually sets the edit mode
  setEdit: (isEditing: boolean) => {
    set({ edit: isEditing });
  },
}));

// --- Trigger initial fetch ---
// This replicates the original useEffect(..., [])
useBankAccountStore.getState().fetchAccount();

// --- Refactored Hook (The "Selector") ---
// This is what your components will import and use.
// It has the *exact* same return signature as your original hook.

export function useBankAccount() {
  // Select all state and actions from the store
  const {
    data,
    account,
    edit,
    loading,
    err,
    success,
    errors,
    change,
    submit,
    handleCancel,
    setEdit,
  } = useBankAccountStore();

  // Return them in the same structure as before
  return {
    data,
    account,
    edit,
    loading,
    err,
    success,
    errors,
    change,
    submit,
    handleCancel,
    setEdit,
  };
}
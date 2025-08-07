import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../services/api.service';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

// Generic hook for API calls
export function useApi<T = any>(
  apiCall: () => Promise<any>,
  options: UseApiOptions = {}
): UseApiState<T> & {
  execute: () => Promise<void>;
  reset: () => void;
} {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { immediate = false, onSuccess, onError } = options;

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiCall();
      setState({
        data: result.data || result,
        loading: false,
        error: null,
      });
      
      if (onSuccess) {
        onSuccess(result.data || result);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      
      if (onError) {
        onError(errorMessage);
      }
    }
  }, [apiCall, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
  };
}

// Specific hooks for common operations
export function useDashboardData() {
  return useApi(() => apiService.getDashboardOverview(), { immediate: true });
}

export function useNotifications() {
  return useApi(() => apiService.getNotifications(), { immediate: true });
}

export function usePermits(params?: any) {
  return useApi(() => apiService.getPermits(params), { immediate: true });
}

export function useUsers(params?: any) {
  return useApi(() => apiService.getUsers(params), { immediate: true });
}

export function useCompanies(params?: any) {
  return useApi(() => apiService.getCompanies(params), { immediate: true });
}

export function usePayments(params?: any) {
  return useApi(() => apiService.getPayments(params), { immediate: true });
}

// Hook for form submissions
export function useSubmit<T = any>() {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false,
  });

  const submit = useCallback(async (
    apiCall: () => Promise<any>,
    options?: {
      onSuccess?: (data: any) => void;
      onError?: (error: string) => void;
    }
  ) => {
    setState({ loading: true, error: null, success: false });
    
    try {
      const result = await apiCall();
      setState({ loading: false, error: null, success: true });
      
      if (options?.onSuccess) {
        options.onSuccess(result.data || result);
      }
      
      return result;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setState({ loading: false, error: errorMessage, success: false });
      
      if (options?.onError) {
        options.onError(errorMessage);
      }
      
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, success: false });
  }, []);

  return {
    ...state,
    submit,
    reset,
  };
}

// Hook for handling multiple API calls
export function useMultipleApi<T extends Record<string, any>>(
  apiCalls: { [K in keyof T]: () => Promise<any> },
  options: UseApiOptions = {}
) {
  const [state, setState] = useState<{
    data: Partial<T>;
    loading: boolean;
    error: string | null;
  }>({
    data: {},
    loading: false,
    error: null,
  });

  const { immediate = false, onSuccess, onError } = options;

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const promises = Object.entries(apiCalls).map(async ([key, apiCall]) => {
        const result = await apiCall();
        return [key, result.data || result];
      });
      
      const results = await Promise.all(promises);
      const data = Object.fromEntries(results) as T;
      
      setState({
        data,
        loading: false,
        error: null,
      });
      
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setState({
        data: {},
        loading: false,
        error: errorMessage,
      });
      
      if (onError) {
        onError(errorMessage);
      }
    }
  }, [apiCalls, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({
      data: {},
      loading: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
  };
}
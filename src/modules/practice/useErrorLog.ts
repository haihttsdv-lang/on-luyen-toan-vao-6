import { useCallback, useEffect, useState } from 'react';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { ErrorLogEntry } from '../../types';

export function useErrorLog() {
  const [entries, setEntries] = useState<ErrorLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const log = await localProgressStore.getErrorLog();
    setEntries(log);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { entries, loading, reload };
}

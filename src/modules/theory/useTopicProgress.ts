import { useCallback, useEffect, useState } from 'react';
import { localProgressStore } from '../../data-access/local/progress-store';
import type { TopicProgressRecord } from '../../types';

export function useTopicProgressList() {
  const [records, setRecords] = useState<TopicProgressRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    setRecords(await localProgressStore.listTopicProgress());
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { records, loading, reload };
}

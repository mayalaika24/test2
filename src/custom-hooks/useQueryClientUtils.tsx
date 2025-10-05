import { useQueryClient } from '@tanstack/react-query';
import { queryClientUtils } from '../utils/query';
function useQueryClientUtils(key: string) {
  const queryClient = useQueryClient();
  async function triggerCash() {
    await queryClientUtils.invalidateAll(queryClient, key);
  }
  return triggerCash;
}

export default useQueryClientUtils;

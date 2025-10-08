import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import { User } from '../../../types/users';
function useColumns() {
  const { currentLanguage, t } = useLocalTranslation();
  const columns: ColumnDef<User>[] = useMemo(() => {
    return [
      {
        accessorKey: 'name',
        header: t('Name'),
      },
      {
        accessorKey: 'email',
        header: t('Email'),
      },
      {
        accessorKey: 'phone',
        header: t('Phone'),
      },
    ];
  }, [currentLanguage]);
  return columns;
}

export default useColumns;

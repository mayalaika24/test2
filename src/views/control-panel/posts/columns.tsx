import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import { Post } from '../../../types/posts';
import Icon from '../../../components/ui/icon';
function useColumns() {
  const { currentLanguage, t } = useLocalTranslation();
  const columns: ColumnDef<Post>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: '#',
      },
      {
        accessorKey: 'title',
        header: t('title'),
      },
      {
        accessorKey: 'reactions.likes',
        header: t('likes'),
        cell: ({ getValue }) => {
          const value = getValue<number>();
          return (
            <div className="flex items-center gap-2 text-green">
              <Icon size={20} color="var(--green)" name="Like1" />
              {value}
            </div>
          );
        },
      },
      {
        accessorKey: 'reactions.dislikes',
        header: t('dislikes'),
        cell: ({ getValue }) => {
          const value = getValue<number>();
          return (
            <div className="flex items-center gap-2 text-red">
              <Icon size={20} color="var(--red)" name="Dislike" />
              {value}
            </div>
          );
        },
      },
    ];
  }, [currentLanguage]);
  return columns;
}

export default useColumns;

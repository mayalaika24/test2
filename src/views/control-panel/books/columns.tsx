import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import { Book } from '../../../types/books';
import Icon from '../../../components/ui/icon';
function useColumns() {
  const { currentLanguage, t } = useLocalTranslation();
  const columns: ColumnDef<Book>[] = useMemo(() => {
    return [
      {
        accessorKey: 'title',
        header: t('title'),
      },
      {
        accessorKey: 'author',
        header: t('author'),
      },
      {
        accessorKey: 'rating',
        header: t('rating'),
        cell: ({ row }) => {
          const rating = row.getValue('rating') as number;
          const array = new Array(Math.ceil(Number(rating))).fill('');
          return (
            <div className="flex items-center gap-0.5">
              {array.map((_, i) => (
                <Icon
                  size={18}
                  key={i}
                  name="Star1"
                  variant="Bold"
                  color="#FFBF00"
                />
              ))}
            </div>
          );
        },
      },
    ];
  }, [currentLanguage]);
  return columns;
}

export default useColumns;

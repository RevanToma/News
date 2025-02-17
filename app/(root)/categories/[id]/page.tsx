import { getNews } from '@/actions/news.actions';
import CategoryDetailsPage from './categoryDetails';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Category',
};
const CategoryPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id: category } = await props.params;

  const { data: news } = await getNews(category);

  return <CategoryDetailsPage category={category} news={news} />;
};
export default CategoryPage;

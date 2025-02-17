import { getNews } from '@/actions/news.actions';
import AsideNews from '@/components/aside-news';
import NewsCard from '@/components/news-card';
import { categoryIcons } from '@/lib/constants';
import CategoryDetailsPage from './categoryDetails';

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

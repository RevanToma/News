import CategoryDetailsPage from './categoryDetails';

const CategoryPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id: category } = await props.params;

  return <CategoryDetailsPage category={category} />;
};

export default CategoryPage;

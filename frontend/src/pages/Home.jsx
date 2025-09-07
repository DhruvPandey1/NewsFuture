import { useState } from 'react';
import Navigation from '../components/Navigation';
import NewsCard from '../components/NewsCard';
import useNews from '../hooks/useNews';
import { Button } from '../components/ui/button';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

const Home = () => {
  const { articles, loading, error, refetch } = useNews();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    refetch(query);
  };

  const handleRefresh = () => {
    refetch(searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Latest News</h1>
            <p className="text-muted-foreground">
              Stay updated with the latest news from around the world
            </p>
          </div>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading latest news...</p>
            </div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search terms or refresh the page
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

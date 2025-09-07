import Navigation from '../components/Navigation';
import NewsCard from '../components/NewsCard';
import { useBookmarks } from '../hooks/useBookmarks';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Bookmark, ArrowLeft } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Bookmarks = () => {
  const { user } = useAuth();
  const { bookmarks } = useBookmarks();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to News</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center space-x-2">
                <Bookmark className="h-8 w-8 text-primary" />
                <span>My Bookmarks</span>
              </h1>
              <p className="text-muted-foreground">
                {bookmarks.length} saved {bookmarks.length === 1 ? 'article' : 'articles'}
              </p>
            </div>
          </div>
        </div>

        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
            <p className="text-muted-foreground mb-6">
              Start bookmarking articles to see them here
            </p>
            <Link to="/">
              <Button>Browse News</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookmarks;

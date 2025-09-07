import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useBookmarks } from '../hooks/useBookmarks';
import { useAuth } from '../hooks/useAuth';
import { toast } from '../hooks/use-toast';
import { Bookmark, BookmarkCheck, ExternalLink, Calendar, User } from 'lucide-react';

export const NewsCard = ({ article }) => {
  const { user } = useAuth();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(article.url);

  const handleBookmark = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to bookmark articles.",
        variant: "destructive"
      });
      return;
    }

    if (bookmarked) {
      removeBookmark(article.url);
      toast({
        title: "Bookmark Removed",
        description: "Article removed from your bookmarks."
      });
    } else {
      addBookmark(article);
      toast({
        title: "Article Bookmarked",
        description: "Article saved to your bookmarks."
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      {article.urlToImage && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold line-clamp-2 text-lg leading-tight">
            {article.title}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className="shrink-0"
          >
            {bookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
          {article.description}
        </p>

        <div className="space-y-3 mt-auto">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{article.source.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          {article.author && (
            <p className="text-sm text-muted-foreground">
              By {article.author}
            </p>
          )}

          <Button 
            asChild 
            className="w-full"
            variant="outline"
          >
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2"
            >
              <span>Read Full Article</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
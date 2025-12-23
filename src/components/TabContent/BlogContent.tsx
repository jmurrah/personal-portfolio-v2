import { useState } from 'react';
import BlogFeed from '@/components/Blog/BlogFeed';
import PostView from '@/components/Blog/PostView';
import type { FeedPost } from '@/components/Blog/types';

export default function BlogContent() {
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {selectedPost ? (
        <PostView post={selectedPost} onBack={() => setSelectedPost(null)} />
      ) : (
        <BlogFeed onSelect={setSelectedPost} />
      )}
    </div>
  );
}

import { useState } from 'react';
import BlogFeed from '@/components/BlogFeed';
import PostView from '@/components/PostView';
import type { FeedPost } from '@/components/blogTypes';

export default function BlogContent() {
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);
  const selectedGuid = selectedPost ? selectedPost.guid ?? selectedPost.link ?? selectedPost.title ?? null : null;

  return (
    <div className="flex flex-col gap-4">
      {selectedPost ? (
        <PostView post={selectedPost} onBack={() => setSelectedPost(null)} />
      ) : (
        <BlogFeed onSelect={(post) => setSelectedPost(post)} selectedGuid={selectedGuid} />
      )}
    </div>
  );
}

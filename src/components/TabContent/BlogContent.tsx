import { useState } from 'react';
import BlogFeed from '@/components/BlogFeed';
import PostView from '@/components/PostView';
import type { FeedPost } from '@/components/blogTypes';

export default function BlogContent() {
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);

  if (selectedPost) {
    return <PostView post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[color:var(--text)]">
        Pulling the latest posts from my Substack. Tap a title to read the full story right here,
        or jump out to Substack if you prefer.
      </p>
      <BlogFeed
        onSelect={setSelectedPost}
        selectedGuid={selectedPost?.guid ?? selectedPost?.link ?? selectedPost?.title ?? null}
      />
    </div>
  );
}

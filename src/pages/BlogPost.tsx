import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { getCachedBlogPosts } from '@/components/Blog/feedService';
import { getPostSlug } from '@/components/Blog/postRouting';
import PostView from '@/components/Blog/PostView';
import type { FeedPost } from '@/components/Blog/types';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const cachedPosts = useMemo(() => getCachedBlogPosts(), []);
  const [posts] = useState<FeedPost[]>(cachedPosts ?? []);

  const normalizedSlug = (slug ?? '').toLowerCase();
  const post = useMemo(
    () => posts.find((item) => getPostSlug(item) === normalizedSlug),
    [posts, normalizedSlug],
  );

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  if (!post) {
    return (
      <section className="flex flex-col gap-3">
        <h1>Post not found</h1>
        <p>This post is no longer available.</p>
        <Link className="underline-fill w-fit" to="/blog">
          Back to the blog
        </Link>
      </section>
    );
  }

  return (
    <section>
      <PostView post={post} onBack={() => navigate('/blog')} />
    </section>
  );
}

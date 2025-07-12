
import { notFound } from "next/navigation";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
      <article>
        <header className="mb-8">
          <div className="mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="mr-2">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <Avatar>
              <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint="person" />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {post.date} &middot; {post.readTime}
              </p>
            </div>
          </div>
        </header>

        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            data-ai-hint="reading blog"
          />
        </div>

        <div
          className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

       <Card className="mt-12">
            <CardContent className="p-6">
                 <h3 className="text-xl font-semibold mb-4">About the Author</h3>
                 <div className="flex items-center gap-4">
                     <Avatar className="w-16 h-16">
                         <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint="person" />
                         <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                     </Avatar>
                     <div>
                         <p className="font-bold text-lg">{post.author.name}</p>
                         <p className="text-muted-foreground">{post.author.bio}</p>
                     </div>
                 </div>
            </CardContent>
       </Card>
    </div>
  );
}

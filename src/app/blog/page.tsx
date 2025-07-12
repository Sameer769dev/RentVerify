
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          The GharBhada.com Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Tips, guides, and updates on navigating the rental market with confidence.
        </p>
      </div>

      {/* Featured Post */}
      <section className="mb-16">
        <Link href={`/blog/${featuredPost.slug}`} className="group block">
          <Card className="grid md:grid-cols-2 overflow-hidden transition-shadow hover:shadow-xl">
            <div className="relative h-64 md:h-auto">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover"
                data-ai-hint="house keys"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <p className="text-primary font-semibold mb-2">Featured Article</p>
              <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center font-semibold text-primary">
                Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Card>
        </Link>
      </section>

      {/* Other Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">More Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                <CardHeader className="p-0">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      data-ai-hint="contract signing"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div>
                    {post.tags.map(tag => <Badge key={tag} variant="secondary" className="mr-2">{tag}</Badge>)}
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mt-4">
                    <span>{post.date}</span>
                    <span className="mx-2">&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

import Header from "@/app/components/Header";
import { Post } from "@/app/utils/Interface";
import { client } from "@/sanity/lib/client";
import { Lilita_One, VT323 } from "next/font/google";
import Link from "next/link";
import React from "react";

const dateFont = VT323({ weight: "400", subsets: ["latin"] });

interface Params {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const query = `
    *[_type=="post" && slug.current== "${slug}"][0]{
        title,
        slug,
        publishedAt,
        excerpt,
          _id,
          tags[]->{
            _id,
            slug,
            name
          }
      }
    `;
  const post = await client.fetch(query);
  return post;
}

const page = async ({ params }: Params) => {
  console.log(params, "params");
  const post: Post = await getPost(params?.slug);
  console.log(post, "post");
  return (
    <div>
      <Header title={post?.title}></Header>
      <div className="text-center">
        <span className={`${dateFont?.className} text-purple-500 `}>
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post?.tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <span className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

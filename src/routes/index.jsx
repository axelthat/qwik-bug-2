import { component$, Resource } from "@builder.io/qwik"
import { useEndpoint } from "@builder.io/qwik-city"
import path from "path"

export const onGet = async () => {
  const blogs = []
  const blogFiles = import.meta.glob("/src/content/blogs/*.mdx", {
    import: "frontmatter",
  })
  for (const [name, blogFile] of Object.entries(blogFiles)) {
    const blog = await blogFile()
    blogs.push({
      title: blog.title,
      slug: path.basename(name, ".mdx"),
    })
  }

  return {
    blogs,
  }
}

export default component$(() => {
  const data = useEndpoint()

  return (
    <div>
      <h1>Blogs</h1>
      <Resource
        value={data}
        onResolved={({ blogs }) =>
          blogs.map((blog) => (
            <h3>
              <a href={blog.slug}>{blog.title}</a>
            </h3>
          ))
        }
      />
    </div>
  )
})

export const head = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
}

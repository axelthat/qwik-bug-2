import { component$, Resource } from "@builder.io/qwik"
import { useEndpoint } from "@builder.io/qwik-city"

export const onGet = async ({ params }) => {
  const { frontmatter: blog, default: content } = await import(
    /* @vite-ignore */ `/src/content/blogs/${params.blog}.mdx`
  )
  return {
    blog,
    content,
  }
}

export default component$(() => {
  const data = useEndpoint()

  return (
    <div>
      <h1>Blogs</h1>
      <Resource
        value={data}
        onResolved={({ blog, content }) => (
          <>
            <h1>{blog.title}</h1>
            <article>{content()}</article>
          </>
        )}
      />
    </div>
  )
})

export const head = {}

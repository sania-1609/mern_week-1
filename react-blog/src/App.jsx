
import { useState } from 'react'
import './App.css'

const initialPosts = [
  {
    id: 1,
    title: 'Getting Started with React',
    category: 'Technology',
    excerpt: 'Learn how React components, props, and state help you build interactive web applications.',
    author: 'Sania',
    date: 'October 20, 2026',
  },
  {
    id: 2,
    title: 'Building Better Daily Habits',
    category: 'Lifestyle',
    excerpt: 'Small, consistent actions can help you create a productive and balanced daily routine.',
    author: 'Sania',
    date: 'October 22, 2026',
  },
  {
    id: 3,
    title: 'My Journey into Web Development',
    category: 'Learning',
    excerpt: 'A beginner-friendly reflection on learning HTML, CSS, JavaScript, and React.',
    author: 'Sania',
    date: 'October 25, 2026',
  },
]

function App() {
  const [posts, setPosts] = useState(initialPosts)
  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Technology')
  const [excerpt, setExcerpt] = useState('')

  const filteredPosts = posts.filter((post) =>
    `${post.title} ${post.category} ${post.excerpt}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim() || !excerpt.trim()) return

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      category,
      excerpt: excerpt.trim(),
      author: 'Sania',
      date: new Date().toLocaleDateString(),
    }

    setPosts([newPost, ...posts])
    setTitle('')
    setExcerpt('')
    setCategory('Technology')
  }

  function deletePost(id) {
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <div className="blog-app">
      <header className="site-header">
        <a className="brand" href="#home">Ink & Ideas<span>.</span></a>
        <nav>
          <a href="#home">Home</a>
          <a href="#posts">Articles</a>
          <a href="#write">Write a post</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <p className="eyebrow">A LITTLE SPACE ON THE INTERNET</p>
          <h1>Ideas worth <span>sharing.</span></h1>
          <p className="hero-description">
            Thoughts on technology, learning, creativity, and everyday life.
          </p>
          <a className="primary-link" href="#posts">Explore articles ↓</a>
        </section>

        <section className="content-section" id="posts">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE LATEST</p>
              <h2>From the blog</h2>
            </div>
            <input
              className="search-input"
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search articles"
            />
          </div>

          <div className="post-grid">
            {filteredPosts.map((post) => (
              <article className="post-card" key={post.id}>
                <span className="category">{post.category}</span>
                <h3>{post.title}</h3>
                <p className="excerpt">{post.excerpt}</p>
                <div className="post-meta">
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </div>
                <button
                  className="delete-button"
                  onClick={() => deletePost(post.id)}
                  aria-label={`Delete ${post.title}`}
                >
                  Delete post
                </button>
              </article>
            ))}
            {filteredPosts.length === 0 && (
              <p>No articles found. Try another search.</p>
            )}
          </div>
        </section>

        <section className="write-section" id="write">
          <p className="eyebrow">YOUR TURN</p>
          <h2>Write something new.</h2>
          <p>Have an idea to share? Add your article below.</p>

          <form className="post-form" onSubmit={handleSubmit}>
            <label htmlFor="post-title">Article title</label>
            <input
              id="post-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Give your article a title"
              required
            />

            <label htmlFor="post-category">Category</label>
            <select
              id="post-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Technology</option>
              <option>Lifestyle</option>
              <option>Learning</option>
              <option>Creativity</option>
            </select>

            <label htmlFor="post-excerpt">Article summary</label>
            <textarea
              id="post-excerpt"
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              placeholder="What would you like to share?"
              rows="4"
              required
            />

            <button className="submit-button" type="submit">Publish article</button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#home">Ink & Ideas<span>.</span></a>
        <p>Made with React and a little creativity.</p>
      </footer>
    </div>
  )
}

export default App


import { useEffect, useMemo, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import {
  LayoutGrid,
  Heart,
  Search,
  Sparkles,
  ArrowUpRight,
  Layers3,
  Code2,
  ShoppingBag,
  BriefcaseBusiness,
  Menu,
  X,
  Compass,
  Clock3,
  LogIn,
  LogOut,
  UserRound,
  LoaderCircle,
} from 'lucide-react'
import api from './api/axios'

const categories = [
  { name: 'All Templates', icon: LayoutGrid },
  { name: 'Dashboard', icon: Layers3 },
  { name: 'Landing Page', icon: Compass },
  { name: 'Portfolio', icon: BriefcaseBusiness },
  { name: 'E-commerce', icon: ShoppingBag },
  { name: 'SaaS', icon: Code2 },
  { name: 'Blog', icon: Clock3 },
]

const styleByCategory = {
  Dashboard: 'analytics',
  'Landing Page': 'landing',
  Portfolio: 'portfolio',
  'E-commerce': 'shop',
  SaaS: 'orbit',
  Blog: 'journal',
}

const colorByCategory = {
  Dashboard: '#a78bfa',
  'Landing Page': '#67e8f9',
  Portfolio: '#86efac',
  'E-commerce': '#fda4af',
  SaaS: '#c4b5fd',
  Blog: '#fdba74',
}

function Preview({ template }) {
  return (
    <div
      className={`preview preview-${template.style}`}
      style={{ '--accent': template.color }}
    >
      {template.style === 'analytics' && (
        <div className="mock-window analytics-window">
          <div className="mock-top">
            <i /><i /><i /><span>OVERVIEW / 2026</span>
          </div>
          <div className="mock-label">Total revenue</div>
          <div className="mock-number">
            $48,290 <small>↗ 18.4%</small>
          </div>
          <div className="chart-bars">
            {[32, 54, 43, 75, 50, 88, 64, 100, 71, 85, 57, 95].map(
              (height, index) => (
                <i key={index} style={{ height: `${height}%` }} />
              ),
            )}
          </div>
        </div>
      )}

      {template.style === 'landing' && (
        <div className="landing-preview">
          <div className="mini-nav">
            forma<span>®</span><small>MENU ↗</small>
          </div>
          <div className="landing-head">
            Make room<br />for <em>better.</em>
          </div>
          <div className="landing-bottom">
            <span>Digital experiences<br />for ambitious people.</span>
            <b>↗</b>
          </div>
          <div className="landing-orb" />
        </div>
      )}

      {template.style === 'portfolio' && (
        <div className="portfolio-preview">
          <span className="portfolio-tag">
            INDEPENDENT DESIGNER · 2026
          </span>
          <div className="portfolio-head">
            Less, but<br /><em>meaningful.</em>
          </div>
          <div className="portfolio-shape"><div>m.</div></div>
          <span className="portfolio-foot">SELECTED WORK — 01 / 06</span>
        </div>
      )}

      {template.style === 'shop' && (
        <div className="shop-preview">
          <div className="shop-nav">
            OBJECTS<span>NEW ARRIVALS&nbsp;&nbsp; STUDIO</span>
          </div>
          <div className="shop-object">
            <div className="vase vase-one" />
            <div className="vase vase-two" />
            <div className="shop-sun" />
          </div>
          <div className="shop-caption">
            Everyday objects,<br /><em>extraordinary detail.</em>
          </div>
        </div>
      )}

      {template.style === 'orbit' && (
        <div className="orbit-preview">
          <div className="orbit-label">THE NEXT GENERATION OF WORK</div>
          <div className="orbit-title">
            Work in<br /><em>another orbit.</em>
          </div>
          <div className="planet planet-one" />
          <div className="planet planet-two" />
          <div className="orbit-ring" />
          <span className="orbit-foot">YOUR SPACE. YOUR RULES.</span>
        </div>
      )}

      {template.style === 'journal' && (
        <div className="journal-preview">
          <div className="journal-top">
            the slow edit. <span>ISSUE Nº 08</span>
          </div>
          <div className="journal-image">
            <div className="journal-sun" />
            <div className="journal-hill" />
          </div>
          <div className="journal-title">
            Notes on a<br /><em>slower life.</em>
          </div>
          <div className="journal-foot">CULTURE · DESIGN · EVERYDAY</div>
        </div>
      )}

      <span className="preview-index">TEMPLATEVAULT / ORIGINAL</span>
    </div>
  )
}

function AuthPage({ mode, onLogin }) {
  const navigate = useNavigate()
  const isRegister = mode === 'register'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (isRegister && password.length < 8) {
      setError('Password must contain at least 8 characters.')
      return
    }

    setLoading(true)

    try {
      if (isRegister) {
        await api.post('/auth/register', { name, email, password })
        setSuccess('Account created! You can now log in.')
        setTimeout(() => navigate('/login'), 900)
      } else {
        const response = await api.post('/auth/login', {
          email,
          password,
        })

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        onLogin(response.data.user)
        navigate('/templates')
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to connect. Make sure your backend is running.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link to="/templates" className="brand auth-brand">
          <span className="brand-icon"><Layers3 size={21} /></span>
          <span>template<span className="brand-accent">vault</span><sup>®</sup></span>
        </Link>

        <div className="eyebrow"><span /> YOUR NEXT CHAPTER</div>
        <h1>{isRegister ? 'Create your space.' : 'Welcome back.'}</h1>
        <p className="auth-description">
          {isRegister
            ? 'Create an account to collect and save your favorite templates.'
            : 'Sign in to pick up where your creativity left off.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Full name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>
          )}

          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              minLength={8}
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <button className="primary-button auth-submit" disabled={loading}>
            {loading ? (
              <><LoaderCircle size={17} /> Please wait...</>
            ) : (
              <>{isRegister ? 'Create account' : 'Sign in'} <ArrowUpRight size={17} /></>
            )}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link to={isRegister ? '/login' : '/register'}>
            {isRegister ? 'Log in' : 'Register'}
          </Link>
        </p>

        <Link to="/templates" className="auth-back">← Back to the collection</Link>
      </div>
    </main>
  )
}

function Catalog({ user, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const showFavorites = location.pathname === '/favorites'

  const [templates, setTemplates] = useState([])
  const [favorites, setFavorites] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Templates')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  async function loadTemplates() {
    try {
      const response = await api.get('/templates')
      const mapped = response.data.templates.map((template) => ({
        id: template._id,
        name: template.title,
        category: template.category,
        description: template.description,
        image: template.image,
        price: 'Free',
        style: styleByCategory[template.category] || 'analytics',
        color: colorByCategory[template.category] || '#a78bfa',
        tags: template.tags || [],
      }))
      setTemplates(mapped)
      setError('')
    } catch (err) {
      setError('Could not load templates. Check that your backend is running.')
    } finally {
      setLoading(false)
    }
  }

  async function loadFavorites() {
    if (!localStorage.getItem('token')) {
      setFavorites([])
      return
    }

    try {
      const response = await api.get('/favorites')
      setFavorites(response.data.favorites.map((template) => template._id))
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
      setFavorites([])
    }
  }

  useEffect(() => {
    loadTemplates()
  }, [])

  useEffect(() => {
    loadFavorites()
  }, [user])

  const visibleTemplates = useMemo(() => {
    return templates.filter((template) => {
      const text = `${template.name} ${template.description} ${template.category} ${template.tags.join(' ')}`
      const matchesSearch = text.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        category === 'All Templates' || template.category === category
      const matchesFavorites =
        !showFavorites || favorites.includes(template.id)

      return matchesSearch && matchesCategory && matchesFavorites
    })
  }, [templates, search, category, showFavorites, favorites])

  function selectCategory(name) {
    setCategory(name)
    setMobileMenu(false)
    if (showFavorites) navigate('/templates')
  }

 
async function toggleFavorite(id) {
  if (!localStorage.getItem('token')) {
    navigate('/login')
    return
  }

  setNotice('')

  const alreadyFavorite = favorites.includes(id)

  try {
    if (alreadyFavorite) {
      await api.delete(`/favorites/${id}`)

      setFavorites(current =>
        current.filter(item => item !== id)
      )

      setNotice('Template removed from favorites.')
    } else {
      await api.post(`/favorites/${id}`)

      setFavorites(current =>
        [...new Set([...current, id])]
      )

      setNotice('Template saved to your favorites.')
    }
  } catch (err) {
    setNotice(
      err.response?.data?.message ||
      'Could not update favorites.'
    )
  }
}

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setFavorites([])
    onLogout()
    navigate('/templates')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link
          to="/templates"
          className="brand"
          onClick={() => {
            setCategory('All Templates')
            setSearch('')
          }}
        >
          <span className="brand-icon"><Layers3 size={21} /></span>
          <span>template<span className="brand-accent">vault</span><sup>®</sup></span>
        </Link>

        <div className="topbar-center">
          <span className="live-dot" /> THE CREATOR&apos;S TOOLKIT
          <span className="topbar-divider">/</span> VOL. 001
        </div>

        <button
          className="mobile-menu-button icon-button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>

        <button
          className="favorites-top"
          onClick={() => navigate(showFavorites ? '/templates' : '/favorites')}
        >
          <Heart size={17} fill={showFavorites ? 'currentColor' : 'none'} />
          <span>Saved</span>
          <b>{String(favorites.length).padStart(2, '0')}</b>
        </button>

        {user ? (
          <button className="account-button" onClick={handleLogout} title="Log out">
            <LogOut size={16} /> Logout
          </button>
        ) : (
          <Link className="account-button" to="/login">
            <LogIn size={16} /> Login
          </Link>
        )}
      </header>

      <div className="page-layout">
        <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
          <div className="sidebar-label">WORKSPACE</div>

          <button
            className={`side-link ${!showFavorites && category === 'All Templates' ? 'side-active' : ''}`}
            onClick={() => {
              setCategory('All Templates')
              navigate('/templates')
              setMobileMenu(false)
            }}
          >
            <Compass size={17} /> Explore
            <ArrowUpRight size={15} className="side-arrow" />
          </button>

          <button
            className={`side-link ${showFavorites ? 'side-active' : ''}`}
            onClick={() => {
              navigate('/favorites')
              setMobileMenu(false)
            }}
          >
            <Heart size={17} /> My favorites
            <span className="side-count">{favorites.length}</span>
          </button>

          <div className="sidebar-rule" />
          <div className="sidebar-label">DISCOVER BY TYPE</div>

          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`side-link ${!showFavorites && category === name && name !== 'All Templates' ? 'side-active' : ''}`}
              onClick={() => selectCategory(name)}
            >
              <Icon size={17} /> {name}
            </button>
          ))}

          <div className="sidebar-note">
            <Sparkles size={19} />
            <p>Good ideas deserve<br /><strong>a great starting point.</strong></p>
            <span>Curated for what comes next.</span>
          </div>

          <div className="sidebar-version">TEMPLATEVAULT® · 2026</div>
        </aside>

        <main className="main-content">
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><span /> A BETTER WAY TO BEGIN</div>
              <h1>Start with<br />something <span>remarkable.</span></h1>
              <p>
                A considered collection of website templates for people building
                what&apos;s next. Less setup. More making.
              </p>
              <button
                className="primary-button"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore the collection <ArrowUpRight size={17} />
              </button>
              <div className="hero-footnote">
                <span>✳</span> DESIGNED TO INSPIRE. BUILT TO CUSTOMIZE.
              </div>
            </div>

            <div className="hero-art" aria-label="Abstract orbital artwork">
              <div className="art-grid" />
              <div className="art-orbit art-orbit-one" />
              <div className="art-orbit art-orbit-two" />
              <div className="art-orbit art-orbit-three" />
              <div className="art-core"><Layers3 size={54} strokeWidth={1.1} /></div>
              <div className="art-chip chip-one">IDEA → INTERFACE</div>
              <div className="art-chip chip-two">MADE FOR THE WEB</div>
              <div className="art-chip chip-three">YOUR NEXT CHAPTER ↗</div>
              <div className="art-spark spark-one">✳</div>
              <div className="art-spark spark-two">✦</div>
            </div>

            <div className="hero-index"><span>01</span> / FIND YOUR STARTING POINT</div>
          </section>

          <section className="catalog" id="catalog">
            <div className="catalog-heading">
              <div>
                <div className="eyebrow"><span /> THE COLLECTION</div>
                <h2>
                  {showFavorites
                    ? 'Your saved ideas.'
                    : category === 'All Templates'
                      ? 'Made to move you forward.'
                      : `${category}, reimagined.`}
                </h2>
                <p>
                  {showFavorites
                    ? 'The templates you’ve chosen to keep close.'
                    : 'Distinct starting points. Room to make them your own.'}
                </p>
              </div>
              <span className="catalog-count">
                {String(visibleTemplates.length).padStart(2, '0')} <span>ITEMS</span>
              </span>
            </div>

            <div className="catalog-tools">
              <div className="search-field">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Find your next starting point..."
                />
                <kbd>SEARCH</kbd>
              </div>

              <div className="filter-pills">
                {['All Templates', 'Dashboard', 'Landing Page', 'Portfolio'].map((name) => (
                  <button
                    key={name}
                    className={category === name && !showFavorites ? 'filter-active' : ''}
                    onClick={() => selectCategory(name)}
                  >
                    {name === 'All Templates' ? 'All work' : name}
                  </button>
                ))}
              </div>
            </div>

            {notice && (
              <div className="api-notice" role="status">
                {notice}
                <button onClick={() => setNotice('')} aria-label="Dismiss message">
                  <X size={15} />
                </button>
              </div>
            )}

            {loading ? (
              <div className="empty-state">
                <LoaderCircle size={25} />
                <p>Loading your template collection...</p>
              </div>
            ) : error ? (
              <div className="empty-state">
                <p>{error}</p>
                <button className="primary-button" onClick={loadTemplates}>
                  Try again <ArrowUpRight size={16} />
                </button>
              </div>
            ) : visibleTemplates.length === 0 ? (
              <div className="empty-state">
                <Heart size={27} />
                <h3>{showFavorites ? 'Nothing saved here. Yet.' : 'No templates found.'}</h3>
                <p>
                  {showFavorites
                    ? 'Explore the collection and save something you love.'
                    : 'Try a different search or category.'}
                </p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setCategory('All Templates')
                    setSearch('')
                    navigate('/templates')
                  }}
                >
                  Explore templates <ArrowUpRight size={16} />
                </button>
              </div>
            ) : (
              <div className="template-grid">
                {visibleTemplates.map((template, index) => {
                  const isFavorite = favorites.includes(template.id)

                  return (
                    <article
                      className="template-card"
                      key={template.id}
                      style={{
                        '--card-accent': template.color,
                        '--card-index': index,
                      }}
                    >
                      <div className="card-visual">
                        <Preview template={template} />
                        <button
                          className={`favorite-button ${isFavorite ? 'favorite-selected' : ''}`}
                          onClick={() => toggleFavorite(template.id)}
                          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
                        </button>
                        <span className="card-category">{template.category}</span>
                      </div>

                      <div className="card-info">
                        <div className="card-title-row">
                          <h3>{template.name}</h3>
                          <ArrowUpRight size={17} className="card-arrow" />
                        </div>
                        <p>{template.description}</p>
                        <div className="card-meta">
                          <div className="tag-list">
                            {template.tags.map((tag) => <span key={tag}>{tag}</span>)}
                          </div>
                          <span className="price-label">{template.price}</span>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            <div className="catalog-bottom">
              <span>END OF CURRENT COLLECTION</span>
              <span>MADE FOR YOUR NEXT BIG THING <Sparkles size={14} /></span>
            </div>
          </section>

          <footer className="footer">
            <span>
              templatevault® <span className="footer-muted">— A little inspiration goes a long way.</span>
            </span>
            <span>CRAFTED FOR CURIOUS MINDS · 2026</span>
          </footer>
        </main>
      </div>
    </div>
  )
}

function AppContent() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null
    } catch {
      return null
    }
  })

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user
            ? <Navigate to="/templates" replace />
            : <AuthPage mode="login" onLogin={setUser} />
        }
      />
      <Route
        path="/register"
        element={
          user
            ? <Navigate to="/templates" replace />
            : <AuthPage mode="register" onLogin={setUser} />
        }
      />
      <Route
        path="/templates"
        element={<Catalog user={user} onLogout={() => setUser(null)} />}
      />
      <Route
        path="/favorites"
        element={<Catalog user={user} onLogout={() => setUser(null)} />}
      />
      <Route path="*" element={<Navigate to="/templates" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

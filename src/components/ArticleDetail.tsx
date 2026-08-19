import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';
import Header from './Header';
import Footer from './Footer';
import { articlesApi } from '../lib/api/articles';
import { Article, supabase } from '../lib/supabase';
import { PLACEHOLDER_IMAGES, handleImageError } from '../utils/imageFallback';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAdmin(!!data.session);
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError('ID artikel tidak ditemukan');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await articlesApi.getById(id);

        if (!data) {
          setError('Artikel tidak ditemukan');
        } else {
          setArticle(data);
        }
      } catch (error) {
        console.error('Failed to fetch article:', error);
        setError('Gagal memuat artikel. Silakan refresh halaman.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#F6F6F6] min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat artikel...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !article) {
    return (
      <div className="bg-[#F6F6F6] min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-500 text-xl mb-4">⚠️</div>
              <h1 className="text-4xl font-bold mb-4">{error || 'Artikel Tidak Ditemukan'}</h1>
              <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">
                ← Kembali ke Homepage
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      <Helmet>
        <title>{article.title} | Nopian Hadi</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Header />

      {article.status === 'Draft' && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-orange-500 text-white px-6 py-2 rounded-full font-black text-xs tracking-widest shadow-2xl border-4 border-white animate-bounce">
          PRATINJAU DRAF
        </div>
      )}

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
          <button
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate('/#articles');
              }
            }}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 md:mb-6 transition-colors font-medium text-xs md:text-base group"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Artikel
          </button>

          <div className="mb-4 md:mb-6">
            <span className="inline-block px-3 py-0.5 md:px-4 md:py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] md:text-sm font-semibold rounded-full mb-3 md:mb-4">
              {article.category}
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-sm md:text-xl text-gray-600 mb-4 md:mb-6">{article.excerpt}</p>
          </div>

          {/* Author & Meta */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 border-y border-gray-200 py-3 md:py-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              <img
                src={article.author_avatar || PLACEHOLDER_IMAGES.testimonial}
                alt={article.author_name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                onError={(e) => handleImageError(e, 'testimonial')}
              />
              <div>
                <p className="font-semibold text-xs md:text-base text-gray-900">{article.author_name}</p>
                <p className="text-[10px] md:text-sm text-gray-500">{article.author_bio}</p>
              </div>
            </div>
            <div className="text-left md:text-right text-[10px] md:text-sm text-gray-500">
              <p>{article.date}</p>
              <p>{article.read_time}</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
          <img
            src={article.image || PLACEHOLDER_IMAGES.article}
            alt={article.title}
            className="w-full rounded-2xl md:rounded-3xl shadow-2xl"
            onError={(e) => handleImageError(e, 'article')}
          />
        </div>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="prose prose-lg max-w-none">
            {/* Content dari Supabase (Sanitized) */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content)
              }}
            />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
              <h3 className="text-xs md:text-sm font-semibold text-gray-500 mb-3 md:mb-4">TAGS</h3>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-white rounded-full text-[10px] md:text-sm text-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
            <h3 className="text-xs md:text-sm font-semibold text-gray-500 mb-3 md:mb-4">BAGIKAN ARTIKEL</h3>
            <div className="flex flex-wrap gap-2 md:gap-4">
              <button className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white text-xs md:text-base rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Twitter
              </button>
              <button className="px-4 py-2 md:px-6 md:py-3 bg-blue-800 text-white text-xs md:text-base rounded-lg hover:bg-blue-900 transition-colors font-semibold">
                LinkedIn
              </button>
              <button className="px-4 py-2 md:px-6 md:py-3 bg-green-600 text-white text-xs md:text-base rounded-lg hover:bg-green-700 transition-colors font-semibold">
                WhatsApp
              </button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-8 md:mt-12 p-5 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-lg">
            <div className="flex items-start space-x-4 md:space-x-6">
              <img
                src={article.author_avatar || PLACEHOLDER_IMAGES.testimonial}
                alt={article.author_name}
                className="w-14 h-14 md:w-20 md:h-20 rounded-full flex-shrink-0"
                onError={(e) => handleImageError(e, 'testimonial')}
              />
              <div>
                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">Tentang {article.author_name}</h3>
                <p className="text-gray-600 text-xs md:text-base mb-3 md:mb-4">{article.author_bio}</p>
                <div className="flex space-x-3 md:space-x-4 text-xs md:text-base">
                  <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Twitter</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">LinkedIn</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">GitHub</a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 md:mt-12 text-center p-6 md:p-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl md:rounded-3xl text-white">
            <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">Suka dengan artikel ini?</h2>
            <p className="text-sm md:text-lg mb-4 md:mb-6 opacity-90">Subscribe untuk mendapatkan artikel terbaru langsung ke inbox Anda</p>
            <div className="flex flex-col md:flex-row max-w-md mx-auto gap-2 md:gap-0">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-4 py-2.5 md:px-6 md:py-3 text-xs md:text-base rounded-full md:rounded-l-full md:rounded-r-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-2.5 md:px-8 md:py-3 text-xs md:text-base bg-white text-red-500 font-semibold rounded-full md:rounded-l-none md:rounded-r-full hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;

import Head from 'next/head';

interface SEOProps {
  title: string;
  image?: string;
  description?: string;
  shouldNotIndexPage?: boolean;
  shouldExcludeTitleSufix?: boolean;
}

export default function SEO({
  title,
  image,
  description,
  shouldNotIndexPage,
  shouldExcludeTitleSufix,
}: SEOProps) {
  const pageTitle = `${title} ${
    shouldExcludeTitleSufix ? '' : ' | DevComerce'
  }`;
  const pageImage =
    'https://repository-images.githubusercontent.com/269467613/d8599a00-dcba-11ea-9ae8-18e9a37ded7c';

  return (
    <Head>
      {image && <meta property="og:image" content={pageImage} />}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {shouldNotIndexPage && <meta name="robots" content="noindex,nofollow" />}

      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta name="MobileOptimized" content="320" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="theme-color" content="#121214" />
      <meta name="msapplication-TileColor" content="#121214" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="google" content="notranslate" />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:secure_url" content={pageImage} />
      <meta property="og:image:alt" content="Thumbnail" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rocketseat" />
      <meta name="twitter:creator" content="@rocketseat" />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:src" content={pageImage} />
      <meta name="twitter:image:alt" content="Thumbnail" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="620" />

      {/* https://gist.github.com/diego3g/fa876d6f954390c656e490e538e8953f */}
      <title>{pageTitle}</title>
    </Head>
  );
}

import styles from '@/styles/ServiciosCasos.module.css';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import ImageComp from '@/components/ImageComp/ImageComp';
import Link from 'next/link';
import {
  HeartIcon,
  ShareIcon,
  ThemeDarkIcon,
  ThemeLightIcon,
  WhatsappIcon,
} from '@virtel/icons';
import postsData from '@/data/defaultPosts.json';
import storiesData from '@/data/defaultStories.json';
import Stories from '@/components/Stories/Stories';
import Carousel from '@/components/Carousel/Carousel';
import { Button } from '@nextui-org/react';

async function listPosts(page) {
  await new Promise((res) => setTimeout(res, 5000));
  return { records: postsData, totalPages: 3, page };
}

function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  );
}

function getPost() {
  return postsData[0];
}
function ScreenCaso({ slug }) {
  const { state, dispatch } = useContext(AppContext);
  const [screenWidth, setScreenWidth] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [extraPosts, setExtraPosts] = useState([]);
  const [loadingExtraPosts, setLoadingExtraPosts] = useState(false);
  const currentPost = slug;
  const toggleTheme = () => {
    dispatch({
      type: 'SET_THEME',
      theme: state.theme === 'dark' ? 'light' : 'dark',
    });
  };

  useEffect(() => {
    if (!window) return;
    const handleResize = () => {
      setScreenWidth(window.screen.width);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchPosts = async () => {
    if (loadingExtraPosts) return;
    setLoadingExtraPosts(true);
    const loadedRecords = extraPosts;
    const _extraPosts = await listPosts(currentPage + 1);
    const new_records = _extraPosts.records || [];
    setExtraPosts(loadedRecords.concat(new_records));
    setCurrentPage(currentPage + 1);
    setTotalPages(_extraPosts.totalPages);
    setLoadingExtraPosts(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!document) return;
    const onScrollBottom = (evt) => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        if (loadingExtraPosts) return;
        fetchPosts();
      }
    };
    window.addEventListener('scroll', onScrollBottom);
    return () => {
      window.removeEventListener('scroll', onScrollBottom);
    };
  }, [currentPage, loadingExtraPosts]);
  return (
    <>
      <MainNavbar className={`hide-lg hide-xl`} />
      <div className={`${styles.Page} ${styles[state.theme]}`}>
        <div className={`${styles.SidebarLeft} hide-xs hide-sm hide-md`}>
          <div className={styles.Top}>
            <div className={styles.LogoContainer}>
              <Link href="/">
                {state.theme === 'dark' ? (
                  <ImageComp
                    src="/assets/images/logo-light.png"
                    width={116}
                    height={59}
                    alt="Logo"
                  />
                ) : (
                  <ImageComp
                    src="/assets/images/logo-dark.png"
                    width={116}
                    height={59}
                    alt="Logo"
                  />
                )}
              </Link>
            </div>
            <div className={styles.Nav}>
              <Link href="/">Inicio</Link>
              <Link href="/quienes-somos">Acerca</Link>
              <Link href="/servicios-y-casos">Servicios & Casos</Link>
              <Link href="/contactanos">Contacto</Link>
              <Link href="/login">Login</Link>
            </div>
          </div>
          <div className={styles.Bottom}>
            <div className={styles.Whatsapp}>
              <Link href="https://web.whatsapp.com/send?phone=573105033808&text=">
                <div className={styles.Icon}>
                  <WhatsappIcon
                    size={12}
                    fill={state.theme === 'dark' ? '#fff' : '#000'}
                  />
                </div>
                <span>Contáctame por Whatsapp</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.MainContent}>
          <div className={styles.Container}>
            <div className={styles.Post}>
              <div className={styles.HeaderPost}>
                <div className={styles.LogoSmall}>
                  {state.theme === 'dark' ? (
                    <ImageComp
                      src="/assets/images/logo-light-small.png"
                      width={41}
                      height={42}
                      alt=""
                    />
                  ) : (
                    <ImageComp
                      src="/assets/images/logo-dark-small.png"
                      width={41}
                      height={42}
                      alt=""
                    />
                  )}
                </div>
                <span>Equioral</span>
              </div>
              <Carousel theme={state.theme} data={currentPost.media} />
              <div className={styles.ActionsPost}>
                <div className={styles.Left}>
                  <div className={styles.Action}>
                    <HeartIcon
                      fill={state.theme === 'dark' ? '#fff' : '#000'}
                      size={24}
                    />
                  </div>
                  <div className={styles.Action}>
                    <ShareIcon
                      fill={state.theme === 'dark' ? '#fff' : '#000'}
                      size={24}
                    />
                  </div>
                </div>
                <div className={styles.Right}>
                  <div className={styles.Action}>
                    <WhatsappIcon
                      fill={state.theme === 'dark' ? '#fff' : '#000'}
                      size={24}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.InfoPost}>
                <div className={styles.Title}>
                  <div className={styles.Name}>{currentPost.info.title}</div>
                  <div className={styles.Date}>{currentPost.info.date}</div>
                </div>
                <div className={styles.Description}>
                  {currentPost.info.description}
                </div>
              </div>
            </div>
            {extraPosts.length > 0 &&
              extraPosts.map(
                (post, i) =>
                  post.id !== currentPost.id && (
                    <div className={styles.Post} key={i}>
                      <div className={styles.HeaderPost}>
                        <div className={styles.LogoSmall}>
                          {state.theme === 'dark' ? (
                            <ImageComp
                              src="/assets/images/logo-light-small.png"
                              width={41}
                              height={42}
                              alt=""
                            />
                          ) : (
                            <ImageComp
                              src="/assets/images/logo-dark-small.png"
                              width={41}
                              height={42}
                              alt=""
                            />
                          )}
                        </div>
                        <span>Equioral</span>
                      </div>
                      <Carousel theme={state.theme} data={post.media} />
                      <div className={styles.ActionsPost}>
                        <div className={styles.Left}>
                          <div className={styles.Action}>
                            <HeartIcon
                              fill={state.theme === 'dark' ? '#fff' : '#000'}
                              size={24}
                            />
                          </div>
                          <div className={styles.Action}>
                            <ShareIcon
                              fill={state.theme === 'dark' ? '#fff' : '#000'}
                              size={24}
                            />
                          </div>
                        </div>
                        <div className={styles.Right}>
                          <div className={styles.Action}>
                            <WhatsappIcon
                              fill={state.theme === 'dark' ? '#fff' : '#000'}
                              size={24}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.InfoPost}>
                        <div className={styles.Title}>
                          <div className={styles.Name}>{post.info.title}</div>
                          <div className={styles.Date}>{post.info.date}</div>
                        </div>
                        <div className={styles.Description}>
                          {post.info.description}
                        </div>
                      </div>
                    </div>
                  )
              )}
            {extraPosts.length > 0 && currentPage < totalPages && (
              <Button
                className={styles.BtnLoadMore}
                onClick={fetchPosts}
                isLoading={loadingExtraPosts}
              >
                Cargar Más Casos
              </Button>
            )}
            {extraPosts.length == 0 && (
              <div className={styles.Post}>
                <div className={styles.HeaderPost}>
                  <div className={`${styles.LogoSmall} skeleton`}></div>
                  <span className={`${styles.LogoSmallLabel} skeleton`}></span>
                </div>
                <div className={`${styles.CarouselBlank} skeleton`} />
                <div className={`${styles.InfoPost} skeleton`}></div>
              </div>
            )}
          </div>
        </div>
        <div className={`${styles.SidebarRight}`}>
          <div
            className={`${styles.SidebarRightHeader} hide-xs hide-sm hide-md`}
          >
            <span>Casos Destacados</span>
            <div className={`${styles.BtnTheme}`} onClick={toggleTheme}>
              {state.theme === 'dark' ? (
                <ThemeLightIcon size={24} fill={'#fff'} />
              ) : (
                <ThemeDarkIcon size={24} fill={'#000'} />
              )}
            </div>
          </div>
          <div className={`${styles.SidebarRightBody}`}>
            <Stories
              theme={state.theme}
              edgeOffset={40}
              mobileBreakpoint={599}
              data={storiesData}
              showName={true}
              showLinkLabel={screenWidth > 991 ? true : false}
              storyFlex={screenWidth > 991 ? 'row' : 'column'}
            />
          </div>
          <div className={`${styles.CopyRight} hide-xs hide-sm hide-md`}>
            <p>
              &copy; Equioral Todos los Derechos Reservados{' '}
              {new Date().getFullYear()}. Powered By Virtel
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  let posts = await listPosts();
  let totalPages = 0;
  let paths = [];

  if (!posts || !posts.records || posts.records.length === 0)
    return {
      paths: [{ slug: '' }],
      fallback: 'blocking',
    };

  posts.records.map((post, i) => {
    paths.push({
      params: {
        slug: post.url,
      },
    });
  });

  totalPages = Number(posts.totalPages);

  for (let i = 1; i < totalPages; i++) {
    let posts = await listPosts(i);

    if (posts && posts.records && posts.records.length > 0) {
      posts.records.map((post, i) => {
        paths.push({
          params: {
            slug: post.url,
          },
        });
      });
    }
  }
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(slug) {
  let data = await getPost(slug);
  return {
    props: {
      slug: data,
    },
    revalidate: 10,
  };
}

export default ScreenCaso;

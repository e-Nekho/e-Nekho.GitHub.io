import './LinksBlock.css';

function LinksBlock() {
    const links = new Array
    return (
        <section className="links-block order-1">
            <h2 className="main-field-name">Поле ссылок:</h2>
            <div className="main-field border-box">
                <ul className="ref-list">
                <li><a href="https://www.kubsu.ru/index.php">Ссылка на заглавную страницу Кубгу</a></li>
                <li><a href="https://www.kubsu.ru">Ссылка на официальный сайт КубГу</a></li>
                <li>
                    <img
                    loading="lazy"
                    src="https://avatars.mds.yandex.net/i?id=4480f1b6dc39779541ed076e04586d0042e0da02-12369942-images-thumbs&n=13"
                    width="160"
                    height="90"
                    alt="pdf"
                    />
                </li>
                <li><a href="form.html">Ссылка на внутреннюю страницу сайта</a></li>
                <li><a href="index.html">Ссылка на главную страницу сайта</a></li>
                <li><a href="#HhRu">Ссылка на внутренний элемент</a></li>
                <li><a href="https://www.ya.ru" target="_blank" rel="noopener noreferrer" title="Поисковик Яндекс">Ссылка на страницу с 3 аргументами</a></li>
                <li><a href="https://www.example.com/index.php?id=123">Ссылка на сайт с id в URL</a></li>
                <li><a href="./Meme.html">Относительная на текущий каталог</a></li>
                <li><a href="../about/SecondMeme.html">Ссылка на каталог about</a></li>
                <li><a href="../thirdMeme.html">Ссылка на страницу уровнем выше</a></li>
                <li><a href="../../FourthMeme.html">Ссылка на страницу двумя уровнями выше</a></li>
                <li style={{ marginTop: 8 }}>
                    Я помню{" "}
                    <a
                    href="https://i.pinimg.com/736x/4f/14/33/4f143394cc10e08c9f3425a73e79fd44.jpg"
                    style={{ color: "black" }}
                    >
                    чудное мгновенье
                    </a>
                    :<br />
                    Передо мной явилась ты,<br />
                    Как мимолетное виденье,<br />
                    Как гений чистой красоты.<br />
                </li>
                <li>
                    <a
                    href="https://www.culture.ru/literature/poems/tag-zolotoi-vek?ysclid=mfioylmosh492265940#icon-logo-mini"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Ссылка на элемент внешнего сайта
                    </a>
                </li>
                <li>
                    <img
                    src="https://detisun.ru/foto/1251/raskraska_kvadrat_dlia_detei_30.webp"
                    useMap="#map"
                    height="289"
                    width="555"
                    alt="Figures"
                    />
                    <map name="map">
                    <area
                        shape="rect"
                        coords="338,69,617,273"
                        href="https://es.wikipedia.org/wiki/Wikipedia:Wikipedistas"
                        alt="Wikipedistas"
                        title="Wikipedia"
                    />
                    <area
                        shape="circle"
                        coords="145,145,78"
                        href="https://www.example.com"
                        alt="Example"
                        title="Example"
                    />
                    </map>
                </li>
                <li><a href="">Пустая ссылка</a></li>
                <li><a>Ссылка без href</a></li>
                <li><a rel="nofollow" href="https://www.wikipedia.org">Ссылка с запретом на переход поисковикам</a></li>
                <li><a rel="noindex" href="https://google.com">Сайт с запретом индексации для поисковика</a></li>
                <li>
                    <ol>
                    <li><a href="https://www.kinopoisk.ru/film/535341/" title="Intouchables">1+1</a></li>
                    <li><a href="https://www.kinopoisk.ru/film/258687/" title="Interstellar">Интерстеллар</a></li>
                    <li><a href="https://www.kinopoisk.ru/film/326/" title="The Shawshank Redemption">Побег из Шоушенка</a></li>
                    <li><a href="https://www.kinopoisk.ru/film/1143242/" title="The Gentleman">Джентльмены</a></li>
                    <li><a href="https://www.kinopoisk.ru/film/435/" title="The Green Mile">Зеленая миля</a></li>
                    </ol>
                </li>
                <li>
                    <a href="ftp://username:password@ftp.example.com/file.pdf">Ссылка на ftp-сервер</a>
                </li>
                </ul>
            </div>
        </section>
    );
}

export default LinksBlock;
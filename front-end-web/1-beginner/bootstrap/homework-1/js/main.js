const header = document.createElement("header");

header.innerHTML = `
    <h1 class="header-title">
        <span class="site-title">Sakura</span>
    </h1>
    <nav class="header-nav">
        <a class="header-nav-link" href="index.html">Home Page</a> |
        <a class="header-nav-link" href="store.html">Store</a> |
        <a class="header-nav-link" href="about.html">About</a>
    </nav>
`;

header.classList.add("row");

document.body.prepend(header);
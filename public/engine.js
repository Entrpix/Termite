document.addEventListener('DOMContentLoaded', function () {
    const Container = document.getElementById('container');
    const userInput = document.getElementById('user-input');

    var searchEngine = localStorage.getItem('searchEngine');
    var webProxy = localStorage.getItem('webProxy');
    var favicon = localStorage.getItem('favicon');
    var title = localStorage.getItem('title');
    
    if (!title) {
        title = "Termite";
        localStorage.setItem('title', title);
        document.title = title;
    } else {
        document.title = title;
    };
    
    if (!favicon) {
        favicon = `${window.location.href}/favicon.svg`;
        localStorage.setItem('favicon', favicon);
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = favicon;
        document.getElementsByTagName('head')[0].appendChild(link);
    } else {
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = favicon;
        document.getElementsByTagName('head')[0].appendChild(link);    
    };
    
    if (!searchEngine) {
        searchEngine = "https://www.google.com/search?q=%s";
        localStorage.setItem('searchEngine', searchEngine);
    };
    
    if (!webProxy) {
        webProxy = "uv";
        localStorage.setItem('webProxy', webProxy);
    };

    function addLine(text) {
        const line = document.createElement('div');
        line.textContent = text;
        Container.appendChild(line);
        Container.scrollTop = Container.scrollHeight;
    };

    function handleCommand(command) {
        addLine('$ ' + command);

        const commandParts = command.split(' ');
        const commandName = commandParts[0].toLowerCase();

        switch (commandName) {
            case 'clear':
                Container.innerHTML = '';
                break;
            case 'version':
                version();
                break;
            case 'help':
                help();
                break;
            case 'register':
                registerSW();
                break;
            case 'site':
                url(commandParts.slice(1).join(' '));
                break;  
            case 'se':
                setSearchEngine(commandParts.slice(1).join(' '));
                break;
            case 'cloak':
                cloak(commandParts[1], commandParts.slice(2).join(' '));
                break;
            case 'reset':
                reset();
                break;
            case 'ab':
                ab();
                break;
            case 'proxy':
                proxy(commandParts.slice(1).join(' '));
                break;
            default:
                unknown();
        };

        userInput.value = '';
    };

    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const command = userInput.value.trim();
            handleCommand(command);
        };
    });

    function unknown() {
        addLine('Command not recognized.');
    };

    function version() {
        addLine('Termite - Terminal Webproxy');
        addLine('Version: v1.0.0 (Stable)');
        addLine('License: GPL-3');
        addLine('Source Code: https://github.com/entrpix/Termite');
        addLine('Base Engine: https://github.com/entrpix/FUKK-8');
    };

    function help() {
        addLine('clear - Clears the console');
        addLine('version - Displays verison and info of Termite');
        addLine('help - Ya just ran it :3');
        addLine('site *url or query* - Visit the required site (url: URL) (query: string)');
        addLine('proxy *backend* - Sets webproxy (backend: uv or dynamic)');
        addLine('cloak *type* *value* - Cloaks the tab (types: title, favicon) (value: string or URL)');
        addLine('reset - Resets tab cloaking');
        addLine('ab - Open site in about:blank');
        addLine('se *URL* - Sets search engine (URL: URL)');
        addLine('register - Registers service worker (Run if errors occur)');
    };

    function registerSW() {
        try {
            registerSW();
            location.reload();
        } catch (err) {
            addLine("Failed to register service worker.");
            addLine(err.toString());
        };
    };
    
    function search(input, template) {
        try {

            return new URL(input).toString();
        } catch (err) {
            // input was not a valid URL
        };

        try {
            const url = new URL(`http://${input}`);
            if (url.hostname.includes(".")) return url.toString();
        } catch (err) {
            // input was not valid URL
        };

        return template.replace("%s", encodeURIComponent(input));
    };

    function url(input) {
        if (localStorage.getItem('webProxy') === "uv") {
            const url = search(input, searchEngine);

            const iframe = document.createElement('iframe');
            iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);;

            iframe.style.position = 'fixed';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';

            document.body.appendChild(iframe);   
        } else if (localStorage.getItem('webProxy') === "dynamic") {
            const url = search(input, searchEngine);

            const iframe = document.createElement('iframe');
            iframe.src =  __dynamic$config.prefix + "route?url=" + encodeURIComponent(url);

            iframe.style.position = 'fixed';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';

            document.body.appendChild(iframe);
        };
    };

    function setSearchEngine(url) {
        localStorage.setItem('searchEngine', url);
    }

    function cloak(Type, Value) {
        if (Type === "title") {
            localStorage.setItem('title', Value);
            document.title = Value;
        } else if (Type === "favicon") {
            let faviconUrl = `https://www.google.com/s2/favicons?domain=${Value}`;
            localStorage.setItem('favicon', faviconUrl);
            let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = faviconUrl;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    }

    function reset() {
        localStorage.setItem('title', 'Termite');
        document.title = "Termite";

        localStorage.setItem('favicon', `${window.location.href}/favicon.svg`);
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = `${window.location.href}/favicon.svg`;
        document.getElementsByTagName('head')[0].appendChild(link);

        localStorage.setItem('searchEngine', 'https://www.google.com/search?q=%s');
        localStorage.setItem('webProxy', 'uv');
    };

    if (location.pathname.startsWith(__uv$config.prefix)) {
        addLine("Error: The service worker is not registered. Run 'register'");
    };

    function ab() {
        var win = window.open()
        var url = `${window.location.href}`
        var iframe = win.document.createElement('iframe')
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.style.overflow = "hidden";
        iframe.style.margin = "0";
        iframe.style.padding = "0";
        iframe.style.position = "fixed";
        iframe.style.top = "0";
        iframe.style.bottom = "0";
        iframe.style.left = "0";
        iframe.style.right = "0";
        iframe.src = url
        win.document.body.appendChild(iframe)
    };

    function proxy(type) {
        if (type === "uv") {
            localStorage.setItem('webProxy', "uv");
        } else if (type === "dynamic") {
            localStorage.setItem('webProxy', "dynamic");
        } else {
            addLine('Invalid proxy (Types: uv, dynamic)');
        };
    };
});